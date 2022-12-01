import React, {useEffect, useState} from 'react';
import IstSection from "./istSection";
import SummerySection from "./summerySection";
import Api from "../../../Api/api";
import {toast} from "react-toastify";

export const Graph = ({header, IST, User}) => {

    const [project, setProject] = useState(true)
    const [user, setUser] = useState(false)
    const [milestones, setMilestones] = useState([])
    const [funnel, setFunnel] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let url = 'getMilestoneDashboard'
        if (user) {
            url = 'getMilestoneUsersDashboard'
        }
        if (User?.ID && IST) {
            setLoading(true)
            Api().get(`/${url}/${User?.ID}`).then(res => {
                setMilestones(res.data)
                setLoading(false)
            }).catch(e => {
                toast.error('etwas ist schief gelaufen!')
            })
        }
    }, [user, project, User]);

    useEffect(() => {
        let url = 'getFunnel'
        if (user) {
            url = 'getFunnelEmp'
        }
        if (User?.ID && !IST) {
            setLoading(true)
            Api().get(`/${url}/${User?.ID}`).then(res => {
                setFunnel(res.data)
                setLoading(false)
            }).catch(e => {
                toast.error('etwas ist schief gelaufen!')
            })
        }
    }, [user, project, User]);


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
            <h2 className='text-xl font-bold'>{header}</h2>
            <div className='bg-offWhite my-3 text-sm font-bold border border-offWhite w-fit h-10 rounded-3xl'>
                <button
                    className={`uppercase h-10 rounded-3xl py-2 px-3 ${project ? 'bg-mainBlue text-white' : 'bg-transparent'}`}
                    onClick={projectClicked}
                >
                    firmenprojekte
                </button>
                <button
                    className={`h-10 uppercase rounded-3xl py-2 px-3 ${user ? 'bg-mainBlue text-white' : 'bg-transparent'}`}
                    onClick={userClicked}
                >
                    mitarbeiter
                </button>
            </div>
            {
                IST ?
                    <IstSection loading={loading} data={milestones} project={project}/>
                    :
                    <SummerySection loading={loading} data={funnel} project={project}/>
            }
        </div>
    )
}
