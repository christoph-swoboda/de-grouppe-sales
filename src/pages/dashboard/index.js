import React, {useEffect} from "react"
import '../../styles/dashboard.scss'
import Banner from "./partial/banner";
import NotificationTable from "./partial/notificationTable";
import FunnelSection from "./partial/funnel";
import {PieChart} from "./partial/pieChart";
import Api from "../../Api/api";


const Navbar = () => {

    const user=JSON.parse(localStorage.user)

    useEffect(() => {
        let data= new FormData
        data.append('userID', user.ID)
        Api().post('/checkAdmin',data).then(res=>{
            localStorage.admin = Object.values(res.data[0])[0] === '1';
        })
    }, []);


    return (
        <div className='dashboardContainer'>
            <Banner/>
            <div className='lg:flex justify-between'>
                <div className='mr-4'>
                    <NotificationTable header={'Overdue Dates'} status={2}/>
                </div>
                <NotificationTable header={'Upcoming Dates'} status={1}/>
            </div>
            <div className='lg:grid lg:grid-cols-3 gap-6 sm:grid-cols-1 gap-6'>
                <PieChart header='Beantargt, iForm eingerereicht' color={'#23B882'}/>
                <PieChart header='gestartet' color={'#EC4872'}/>
                <PieChart header='abgeschlossen' color={'#FFC700'}/>
            </div>
            <FunnelSection/>
        </div>
    )
}

export default Navbar