import React from "react"
import '../../styles/dashboard.scss'
import Banner from "./partial/banner";
import NotificationTable from "./partial/notificationTable";


const Navbar = () => {

    return (
        <div className='dashboardContainer'>
            <Banner/>
            <NotificationTable/>
        </div>
    )
}

export default Navbar