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

    const [{companyInfoModal, currentMilestone,noteSent}, dispatch] = useStateValue();
    const {toggleCompanyInfoModal} = useModal();
    const [loading, setLoading] = useState(true)
    const [stepsLoading, setStepsLoading] = useState(true)
    const [notes, setNotes] = useState([])
    const [subSteps, setSubSteps] = useState([])
    const [nextStep, setNextStep] = useState([])
    const [grid, setGrid] = useState([])
    const [milestoneTabs, setMilestoneTabs] = useState([])
    const [lastIndex, setLastIndex] = useState(null)
    const [lastDoneIndex, setLastDoneIndex] = useState(0)
    const param = useParams()

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
    }, [noteSent]);

    useEffect(() => {
        setStepsLoading(true)
        let Data = new FormData()
        Data.append('index', currentMilestone)
        Data.append('name', param.id.replaceAll('_', ' '))

        if (lastDoneIndex > 0) {
            Api().post('/sub-steps', Data).then(res => {
                setSubSteps(res.data.subSteps)
                setGrid(res.data.grid)
                setNextStep(res.data.next)
                setStepsLoading(false)
            })

        }
    }, [lastDoneIndex, currentMilestone]);

    useEffect(() => {
        let index = Object.keys(milestoneTabs).length - 1
        setLastIndex(index)
    }, [milestoneTabs]);


    return (
        <div className='dashboardContainer'>
            <div className='lg:flex justify-start mt-10 sm:block mb-5'>
                <h2 className='text-2xl lg:text-left font-extrabold'>Milensteine Projektverlauf</h2>
            </div>

            <CompanyData data={BestantCompanyInfo} toggle={toggleCompanyInfoModal}/>

            <div className='lg:flex justify-between my-3 rounded-lg sm:block'>
                <div className='bg-white px-2 m-1 pb-10 lg:w-1/4 lg:ml-0 rounded-lg h-fit'>
                    {
                        loading ?
                            <div style={{height: '80vh'}}>
                                <div className='mt-24'>
                                    <ScaleLoader size={110}/>
                                </div>
                            </div>
                            :
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

                <div className='lg:w-2/4 lg:ml-0 h-fit text-left'>
                    <div className='bg-white p-5 m-2 pb-10'>
                        <h2 className='text-2xl absolute'>{milestoneTabs[Number(currentMilestone)]?.milestoneLabel.substring(3)}</h2>
                        <SubSteps data={subSteps} loading={stepsLoading} lastDoneIndex={lastDoneIndex} grid={grid}/>
                    </div>

                    <div
                        hidden={stepsLoading || Number(currentMilestone) < Number(lastDoneIndex) + 1 || nextStep.length === 0}
                        className='my-4 bg-white p-5 m-2 pb-10'
                    >
                        <h2 className='text-2xl'>{milestoneTabs[Number(currentMilestone) + 1]?.milestoneLabel.substring(3)}(Bevorstehende)</h2>
                        <SubSteps data={nextStep} loading={stepsLoading} lastDoneIndex={lastDoneIndex} next
                                  grid={grid}/>
                    </div>
                </div>


                <div className='bg-white px-3 pb-10 lg:w-1/4 lg:ml-0 rounded-lg h-fit'>
                    {
                        loading ?
                            <div style={{height: '30vh'}}>
                                <div className='mt-24'>
                                    <ScaleLoader size={110}/>
                                </div>
                            </div>
                            :
                            <Status company={param.id.replaceAll('_', ' ')} notes={notes}/>
                    }
                </div>

            </div>

            <Modal toggle={toggleCompanyInfoModal}
                   visible={companyInfoModal}
                   component={<CompanyInfoPopUp data={BestantCompanyInfo}/>}
            />
        </div>
    )
}

export default Bestant