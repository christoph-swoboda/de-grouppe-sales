import React, {useEffect, useState} from "react";
import Modal from "../../hooks/modal";
import useModal from "../../hooks/useModal";
import {useStateValue} from "../../states/StateProvider";
import CompanyInfoPopUp from "../../components/modal/companyInfoPopUp";
import CompanyData from "./partial/companyData";
import Status from "./partial/status";
import Api from "../../Api/api";
import MilestoneTabs from "../../card/milestoneTabs";
import {ClipLoader} from "react-spinners";
import SubSteps from "./partial/subSteps";
import {useParams} from "react-router";

const Bestant = () => {
    const [{companyInfoModal, currentMilestone, noteSent, noteRows, subStepSaved}, dispatch] = useStateValue();
    const {toggleCompanyInfoModal} = useModal();
    const [loading, setLoading] = useState(true)
    const [loadingNotes, setLoadingNotes] = useState(false)
    const [stepsLoading, setStepsLoading] = useState(true)
    const [info, setInfo] = useState(null)
    const [notes, setNotes] = useState([])
    const [subSteps, setSubSteps] = useState([])
    const [filtered, setFiltered] = useState([])
    const [nextStep, setNextStep] = useState([])
    const [grid, setGrid] = useState([])
    const [milestoneTabs, setMilestoneTabs] = useState([])
    const [lastIndex, setLastIndex] = useState(null)
    const [lastDoneIndex, setLastDoneIndex] = useState(0)
    const [notesCount, setNotesCount] = useState(20)
    const [subString, setSubString] = useState(2)
    const [currentSubStep, setCurrentSubStep] = useState([])
    const param = useParams()
    const [options, setOptions] = useState([])
    const user = JSON.parse(localStorage.user)
    const role = user.role

    useEffect(() => {
        setSubSteps([])
        setOptions([])
    }, [currentMilestone]);

    useEffect(() => {
        let index = Object.keys(milestoneTabs).length
        setLastIndex(index)
    }, [milestoneTabs]);

    useEffect(() => {
        Api().get(`/milestones/${param.id.replaceAll('_', ' ')}`).then(res => {
                setMilestoneTabs(res.data.tabs)
                setLastDoneIndex(res.data.done)
                dispatch({type: "SET_CURRENTMILESTONE", item: Number(res.data.done) + 1})
                setLoading(false)
            }
        )
    }, [dispatch, param.id, subStepSaved]);

    useEffect(() => {
        setStepsLoading(true)
        Api().get(`/customerDetails/${param.id.replaceAll('_', ' ')}`).then(res => {
            setInfo(res.data[0])
        })
    }, []);

    useEffect(() => {
        setStepsLoading(true)
        if (lastDoneIndex >= 0 && currentMilestone) {
            Api().get(`/sub-steps/${currentMilestone}/${param.id.replaceAll('_', ' ')}`).then(res => {
                setSubSteps(res.data.subSteps)
                let filter = res.data.subSteps.filter(d => d.fieldType === 'option')
                setFiltered(filter)
                if (filter.length === 0) {
                    setStepsLoading(false)
                }
                setGrid(res.data.grid)
                // setNextStep(res.data.next)
            })
        }
    }, [lastDoneIndex, currentMilestone, param.id, subStepSaved]);

    useEffect(() => {
        if (filtered.length > 0) {
            Api().get(`/options/${currentMilestone}/${JSON.stringify(filtered)}`).then(res => {
                setOptions(res.data)
                setStepsLoading(false)
            }).catch(e => {
                setStepsLoading(false)
            })
        }
    }, [currentMilestone, filtered]);

    useEffect(() => {
        setLoadingNotes(true)
        Api().get(`/getNotes/${param.id.replaceAll('_', ' ')}/${noteRows}`).then(res => {
                setNotes(res.data)
                setNotesCount(res.data[0]?.total)
                setLoadingNotes(false)
            }
        )
    }, [noteRows, noteSent]);

    useEffect(() => {
        let arr = []
        if (filtered?.length > 0) {
            filtered.map(async (f, i) => {
                arr.push(f.substepID)
                setCurrentSubStep(arr)
            })
        }
    }, [currentMilestone, filtered]);

    useEffect(() => {
        if (Number(currentMilestone) === lastIndex) {
            setSubString(0)
        } else {
            setSubString(2)
        }
    }, [currentMilestone, lastIndex, subString]);


    return (
        <div className='dashboardContainer'>
            <CompanyData info={info}
                         company={param.id.replaceAll('_', ' ')}
                         toggle={toggleCompanyInfoModal}
            />

            <div className='lg:flex justify-between my-3 rounded-lg sm:block'>
                {
                    loading ?
                        <div style={{height: '30vh'}} className='centerItemsAbsolute bg-white w-11/12'>
                            <div className='mt-24'>
                                <ClipLoader size={50} color={'#888888'}/>
                            </div>
                        </div>
                        :
                        <>
                            <div className='bg-white px-2 m-1 pb-10 lg:min-w-max lg:ml-0 rounded-lg h-fit'>
                                <h2 className='text-xl font-bold text-left py-5 px-2'>Projekt-Fortschritt</h2>
                                {
                                    milestoneTabs.map((tab, i) => (
                                        <MilestoneTabs
                                            key={i}
                                            id={tab.milestoneID}
                                            label={tab.milestoneLabel}
                                            loading={stepsLoading}
                                            done={tab.milestoneDone}
                                            lastIndex={lastIndex}
                                            lastDoneIndex={lastDoneIndex}
                                        />
                                    ))
                                }
                            </div>

                            <div className='2xl:w-2/4 lg:ml-0 lg:w-5/12 h-fit text-left'>
                                <div className='bg-white p-5 my-1 mx-2 pb-10  rounded-lg'>
                                    <h2 className='text-xl absolute text-center font-bold mb-2'>{milestoneTabs[Number(currentMilestone) - 1]?.milestoneLabel.substring(subString)}</h2>
                                    <SubSteps
                                        data={subSteps}
                                        loading={stepsLoading}
                                        lastDoneIndex={lastDoneIndex}
                                        options={options}
                                        grid={grid}
                                        firma={param.id.replaceAll('_', ' ')}
                                    />
                                </div>

                                {/*<div*/}
                                {/*    hidden={stepsLoading || Number(currentMilestone) < Number(lastDoneIndex) + 1 || nextStep.length === 0}*/}
                                {/*    className='my-4 bg-white p-5 m-2 pb-10'*/}
                                {/*>*/}
                                {/*    <h2 className='text-2xl'>{milestoneTabs[Number(currentMilestone) + 1]?.milestoneLabel.substring(subString)}(Bevorstehende)</h2>*/}
                                {/*    <SubSteps*/}
                                {/*        data={nextStep}*/}
                                {/*        loading={stepsLoading}*/}
                                {/*        lastDoneIndex={lastDoneIndex}*/}
                                {/*        currentSubStep={currentSubStep}*/}
                                {/*        next*/}
                                {/*        options={options}*/}
                                {/*        grid={grid}*/}
                                {/*    />*/}
                                {/*</div>*/}
                            </div>
                            <div className='bg-white mt-1 px-3 2xl:w-2/4 pb-10 lg:w-5/12 xl:ml-0 rounded-lg min-h-full'>
                                <Status company={param.id.replaceAll('_', ' ')} notes={notes}
                                        role={role}
                                        loadingNotes={loadingNotes} count={notesCount}
                                />
                            </div>
                        </>
                }
            </div>

            <Modal toggle={toggleCompanyInfoModal}
                   visible={companyInfoModal}
                   component={<CompanyInfoPopUp Info={info} company={param.id.replaceAll('_', ' ')}/>}
            />
        </div>
    )
}

export default Bestant