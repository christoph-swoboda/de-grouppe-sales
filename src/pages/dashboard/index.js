import React, {useEffect, useState} from "react"
import '../../styles/dashboard.scss'
import Banner from "./partial/banner";
import NotificationTable from "./partial/notificationTable";
import {Graph} from "./partial/graph";
import Api from "../../Api/api";

const Dashboard = () => {
    const [user, setUser] = useState([])

    useEffect(() => {
        try {
            setUser(JSON.parse(localStorage.user))
        } catch (e) {
            window.location.replace('/anmeldung')
        }
    }, []);

    return (
        <div className='dashboardContainer'>
            {/*<Banner/>*/}
            {/*<div className='lg:flex justify-start gap-3'>*/}
            {/*    <div>*/}
            {/*        <NotificationTable header={'Overdue Dates'} status={2}/>*/}
            {/*    </div>*/}
            {/*    <NotificationTable header={'Upcoming Dates'} status={1}/>*/}
            {/*</div>*/}
            <div className='bg-white my-4 rounded-xl text-left p-8'>
                <Graph User={user} IST header={'IST-Potenzial im jeweiligen Schritt'}/>
            </div>
            <div className='bg-white my-4 rounded-xl text-left p-8'>
                <Graph header={'Projekt-Schritte im Vergleich'}/>
            </div>
        </div>
    )
}

export default Dashboard