import React, {useEffect, useState} from 'react';
import IstSection from "./istSection";
import SummerySection from "./summerySection";
import Api from "../../../Api/api";
import {toast} from "react-toastify";

export const Graph = ({loadingBoxes, IST, User, portal, onChangeDgg, onChangeHm, dggFilter, hmFilter}) => {

    const [project, setProject] = useState(true)
    const [user, setUser] = useState(false)
    const [milestones, setMilestones] = useState([])
    const [milestonesEmp, setMilestonesEmp] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if(portal){
            let url1 = 'getFunnel'
            let url2 = 'getFunnelEmp'
            if (user) {
                url1 = 'getMilestoneDashboard'
                url2 = 'getMilestoneUsersDashboard'
            }
            if (User?.ID && IST) {
                setLoading(true)
                Api().get(`/${url1}/${portal}/${User?.ID}/${dggFilter}/${hmFilter}`).then(res => {
                    setMilestones(res.data)
                }).catch(e => {
                    toast.error('etwas ist schief gelaufen!')
                }).then(r=>{
                    Api().get(`/${url2}/${portal}/${User?.ID}/${dggFilter}/${hmFilter}`).then(res => {
                        setMilestonesEmp(res.data)
                        setLoading(false)
                    }).catch(e => {
                        toast.error('etwas ist schief gelaufen!')
                        setLoading(false)
                    })
                })

            }
        }
    }, [project, portal, dggFilter, hmFilter]);


    function projectClicked() {
        setProject(true)
        setUser(false)
    }

    function userClicked() {
        setProject(false)
        setUser(true)
    }

    return (
        <div>
            {/*<h2 className='text-xl font-bold'>{header}</h2>*/}
            <div className='flex justify-start'>
                <div className='bg-offWhite my-3 text-sm font-bold border border-offWhite w-fit h-10 rounded-l-3xl'>
                    <button
                        className={`capitalize h-10 hover:bg-mainBlue hover:text-white rounded-3xl py-2 px-3 ${project ? 'bg-mainBlue text-white' : 'bg-transparent'}`}
                        onClick={projectClicked}
                    >
                        IST-Analyse
                    </button>
                    <button
                        className={`h-10 capitalize hover:bg-orange hover:text-white rounded-l-3xl py-2 px-3 ${user ? 'bg-orange text-white' : 'bg-transparent'}`}
                        onClick={userClicked}
                    >
                        Gesamtfortschritt
                    </button>
                </div>
                <span className='my-3 py-2 px-3 text-sm border border-b-1 border-x-0 border-t-0 border-b-offWhite font-bold h-10 '>der Firmenprojekte</span>
                <span hidden={portal==='ruv'} className='my-3 py-2 px-3 text-sm border border-b-1 border-x-0 border-t-0 border-b-offWhite font-bold h-10'>
                    <section>
                        <input disabled={loadingBoxes || loading} type='checkbox' checked={dggFilter} onChange={onChangeDgg}/>
                        <label> DG-Gruppe</label>
                    </section>
                </span>
                <span  hidden={portal==='ruv'} className='my-3 py-2 px-3 text-sm border border-b-1 border-x-0 border-t-0 border-b-offWhite font-bold h-10 '>
                    <section>
                        <input disabled={loadingBoxes || loading} type='checkbox' checked={hmFilter} onChange={onChangeHm}/>
                        <label> Helmsauer-Kunden</label>
                    </section>
                </span>
            </div>
            <IstSection loading={loading} data={milestones} dataEmp={milestonesEmp} project={project}/>
        </div>
    )
}
