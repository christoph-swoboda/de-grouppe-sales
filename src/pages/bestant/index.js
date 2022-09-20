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
import {SyncLoader} from "react-spinners";
import SubSteps from "./partial/subSteps";


const Bestant = () => {

    const [{companyInfoModal, currentMilestone}, dispatch] = useStateValue();
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

    useEffect(() => {
        Api().post('/milestones').then(res => {
                console.log('tabs', res.data)
                setMilestoneTabs(res.data.tabs)
                setLastDoneIndex(res.data.done)
                dispatch({type: "SET_CURRENTMILESTONE", item: Number(res.data.done) + 1})
                setNotes(res.data.notes)
                setLoading(false)
            }
        )

    }, []);

    useEffect(() => {
        setStepsLoading(true)
        let Data = new FormData()
        Data.append('index', currentMilestone)
        Data.append('name', 'Heller')

        if (lastDoneIndex > 0) {
            Api().post('/sub-steps', Data).then(res => {
                console.log('subSteps', res.data)
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
                <h2 className='text-2xl lg:text-left font-extrabold'>Milestone Steps</h2>
            </div>

            <CompanyData data={BestantCompanyInfo} toggle={toggleCompanyInfoModal}/>

            <div className='lg:flex justify-between my-5 rounded-lg sm:block'>
                <div className='bg-white px-5 m-2 pb-10 lg:w-1/4 lg:ml-0 rounded-lg h-fit'>
                    {
                        loading ?
                            <div style={{height: '80vh'}}>
                                <div className='mt-24'>
                                    <SyncLoader size='10' color='grey'/>
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
                        <h2 className='text-2xl absolute'>{milestoneTabs[Number(currentMilestone)]?.milestoneLabel}</h2>
                        <SubSteps data={subSteps} loading={stepsLoading} lastDoneIndex={lastDoneIndex}/>
                    </div>

                    <div hidden={stepsLoading} className='my-4 bg-white p-5 m-2 pb-10'>
                        <h2 className='text-2xl'>{milestoneTabs[Number(currentMilestone) + 1]?.milestoneLabel}(Bevorstehende)</h2>
                        <SubSteps data={nextStep} loading={stepsLoading} lastDoneIndex={lastDoneIndex} next/>
                    </div>
                </div>


                <div className='bg-white px-5 pb-10 lg:w-1/4 lg:ml-0 rounded-lg h-fit'>
                    <Status notes={notes}/>
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