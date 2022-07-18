import React from "react"
import '../../styles/dashboard.scss'
import Banner from "./partial/banner";
import NotificationTable from "./partial/notificationTable";
import FunnelSection from "./partial/funnel";
import {PieChart} from "./partial/pieChart";


const Navbar = () => {

    return (
        <div className='dashboardContainer'>
            <Banner/>
            <NotificationTable/>
            <FunnelSection/>
            <div className='lg:grid lg:grid-cols-3 gap-6 sm:grid-cols-1 gap-6'>
                <PieChart header='Beantargt, iForm eingerereicht' color={'#23B882'}/>
                <PieChart header='gestartet' color={'#EC4872'}/>
                <PieChart header='abgeschlossen' color={'#FFC700'}/>
            </div>
        </div>
    )
}

export default Navbar