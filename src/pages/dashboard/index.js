import React, {useEffect, useState} from "react"
import '../../styles/dashboard.scss'
import {Graph} from "./partial/graph";
import Api from "../../Api/api";
import Boxes from "./partial/boxes";
import {MdDone} from "react-icons/md";
import {AiOutlineClose} from "react-icons/ai";
import {SiVirustotal} from "react-icons/si";

const Dashboard = () => {
    const [user, setUser] = useState([])
    const [total, setTotal] = useState([])
    const [done, setDone] = useState([])
    const [canceled, setCanceled] = useState([])

    useEffect(() => {
        try {
            let User = JSON.parse(localStorage.user)
            setUser(User)
            Api().get(`/getDashboardCounts/${User.ID}`).then(res => {
                setTotal(res.data.slice(0,2))
                setDone(res.data.slice(2,4))
                setCanceled(res.data.slice(4,6))
                console.log('res', res.data.slice(4,6))
            })
        } catch (e) {
            window.location.replace('/anmeldung')
        }
    }, []);

    return (
        <div className='dashboardContainer'>
            <div className='bg-white rounded-xl text-left p-8'>
                <div
                    className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 items-center content-center mb-10'>
                    <Boxes col={'#2f2f2f'} data={total} title={'FP Gesamt'} sub={'MA Gesamt'} icon={<SiVirustotal color={'#ffffff'} size='30px'/>}/>
                    <Boxes col={'#2f2f2f'} data={done} title={'FP Abgeschlossen'} sub={'MA Abgeschlossen'} icon={<MdDone color={'#ffffff'} size='30px'/>}/>
                    <Boxes col={'#2f2f2f'} data={canceled} title={'FP Abgesagt'} sub={'MA Abgesagt'}  icon={<AiOutlineClose  color={'#ffffff'} size='30px'/>}/>
                </div>
                <Graph User={user} IST header={'IST-Potenzial im jeweiligen Schritt'}/>
            </div>
        </div>
    )
}

export default Dashboard