import React, {useEffect, useState} from "react";
import Modal from "../../components/modal";
import useModal from "../../hooks/useModal";
import {useStateValue} from "../../states/StateProvider";
import CompanyInfoPopUp from "../../components/modal/companyInfoPopUp";
import {BestantCompanyInfo} from "../../dummyData/bestantInfo";
import CompanyData from "./partial/companyData";
import Status from "./partial/status";
import Api from "../../Api/api";
import MilestoneTabs from "../../card/milestoneTabs";
import {ScaleLoader} from "react-spinners";
import SubSteps from "./partial/subSteps";
import {useParams} from "react-router";


const Bestant = () => {

    const [{companyInfoModal, currentMilestone, noteSent}, dispatch] = useStateValue();
    const {toggleCompanyInfoModal} = useModal();
    const [loading, setLoading] = useState(true)
    const [stepsLoading, setStepsLoading] = useState(true)
    const [hasOptions, setHasOptions] = useState(false)
    const [notes, setNotes] = useState([])
    const [subSteps, setSubSteps] = useState([])
    const [filtered, setFiltered] = useState([])
    const [nextStep, setNextStep] = useState([])
    const [grid, setGrid] = useState([])
    const [milestoneTabs, setMilestoneTabs] = useState([])
    const [lastIndex, setLastIndex] = useState(null)
    const [lastDoneIndex, setLastDoneIndex] = useState(0)
    const [currentSubStep, setCurrentSubStep] = useState([])
    const param = useParams()
    const [options, setOptions] = useState([])

    useEffect(() => {
        setSubSteps([])
        setOptions([])
    }, [currentMilestone]);

    useEffect(() => {
        let data = new FormData()
        data.append('firma', param.id.replaceAll('_', ' '))

        Api().post('/milestones', data).then(res => {
                setMilestoneTabs(res.data.tabs)
                setLastDoneIndex(res.data.done)
                dispatch({type: "SET_CURRENTMILESTONE", item: Number(res.data.done) + 1})
                setNotes(res.data.notes)
                setLoading(false)
            }
        )
    }, [dispatch, noteSent, param.id]);

    useEffect(() => {
        setStepsLoading(true)
        let Data = new FormData()
        Data.append('index', currentMilestone)
        Data.append('name', param.id.replaceAll('_', ' '))

        if (lastDoneIndex > 0) {
            Api().post('/sub-steps', Data).then(res => {
                setSubSteps(res.data.subSteps)
                let filter = res.data.subSteps.filter(d => d.fieldType === 'option')
                setFiltered(filter)
                if (filter.length === 0) {
                    setStepsLoading(false)
                }
                setGrid(res.data.grid)
                setNextStep(res.data.next)
            })
        }
    }, [lastDoneIndex, currentMilestone, param.id]);

    useEffect(() => {
        let arr = []
        if (filtered?.length > 0) {
            filtered.map(async (f, i) => {
                arr.push(f.substepID)
                let Data = new FormData()
                Data.append('milestoneID', currentMilestone)
                Data.append('subStepID', f.substepID)
                await Api().post('/options', Data).then(res => {
                    setOptions(res.data)
                    if (i + 1 === filtered.length) {
                        setStepsLoading(false)
                    }
                }).catch(e => {
                    setStepsLoading(false)
                })
                setCurrentSubStep(arr)
            })
        }
    }, [currentMilestone, filtered]);

    useEffect(() => {
        let index = Object.keys(milestoneTabs).length - 1
        setLastIndex(index)
    }, [milestoneTabs]);

    return (
        <div className='dashboardContainer'>
            <CompanyData data={BestantCompanyInfo}
                         company={param.id.replaceAll('_', ' ')}
                         toggle={toggleCompanyInfoModal}
            />

            <div className='lg:flex justify-between my-3 rounded-lg sm:block'>
                {
                    loading ?
                        <div style={{height: '30vh'}} className='centerItemsAbsolute bg-white w-11/12'>
                            <div className='mt-24'>
                                <ScaleLoader size={110}/>
                            </div>
                        </div>
                        :
                        <>
                            <div className='bg-white px-2 m-1 pb-10 lg:min-w-max lg:ml-0 rounded-lg h-fit'>
                                {
                                    milestoneTabs.map(tab => (
                                        <MilestoneTabs
                                            key={tab.milestoneID}
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

                            <div className='lg:w-2/4 2xl:w-2/4 lg:ml-0 h-fit text-left'>
                                <div className='bg-white p-5 m-2 pb-10'>
                                    <h2 className='text-2xl text-center text-bold mb-2 '>Platzhalter</h2>
                                    {/*<hr/>*/}
                                    <br/>
                                    <h2 className='text-xl absolute'>{milestoneTabs[Number(currentMilestone)]?.milestoneLabel.substring(2)}</h2>
                                    <SubSteps
                                        data={subSteps}
                                        loading={stepsLoading}
                                        lastDoneIndex={lastDoneIndex}
                                        currentSubStep={currentSubStep}
                                        options={options}
                                        grid={grid}
                                    />
                                </div>

                                <div
                                    hidden={stepsLoading || Number(currentMilestone) < Number(lastDoneIndex) + 1 || nextStep.length === 0}
                                    className='my-4 bg-white p-5 m-2 pb-10'
                                >
                                    <h2 className='text-2xl'>{milestoneTabs[Number(currentMilestone) + 1]?.milestoneLabel.substring(2)}(Bevorstehende)</h2>
                                    <SubSteps
                                        data={nextStep}
                                        loading={stepsLoading}
                                        lastDoneIndex={lastDoneIndex}
                                        currentSubStep={currentSubStep}
                                        next
                                        options={options}
                                        grid={grid}
                                    />
                                </div>
                            </div>

                            <div className='bg-white px-3 2xl:w-2/4 pb-10 xl:w-1/3 xl:ml-0 rounded-lg h-fit'>
                                <Status company={param.id.replaceAll('_', ' ')} notes={notes}/>
                            </div>
                        </>
                }
            </div>

            <Modal toggle={toggleCompanyInfoModal}
                   visible={companyInfoModal}
                   component={<CompanyInfoPopUp data={BestantCompanyInfo}/>}
            />
        </div>
    )
}

export default Bestant