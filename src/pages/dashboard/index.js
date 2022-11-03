import React from "react"
import '../../styles/dashboard.scss'
import Banner from "./partial/banner";
import NotificationTable from "./partial/notificationTable";
import FunnelSection from "./partial/funnel";
import {BarChart} from "./partial/barChart";
import {Milestones} from "../../dummyData/milestones";

const Navbar = () => {

    return (
        <div className='dashboardContainer'>
            <Banner/>
            <div className='lg:flex justify-between'>
                <div className='mr-4'>
                    <NotificationTable header={'Overdue Dates'} status={2}/>
                </div>
                <NotificationTable header={'Upcoming Dates'} status={1}/>
            </div>

            <div className='bg-white my-4 rounded-xl text-left p-8'>
                <h2 className='text-xl font-bold'>IST-Potenzial im jeweiligen Schritt</h2>
                <h2 className='mb-6'>IST-Potenzial im jeweiligen Schritt</h2>

                <div className='flex justify-between'>
                    <div className='mt-2'>
                        {
                            Milestones.map(m => (
                                <p className='border-b border-offWhite' key={m.id}
                                   style={{paddingBottom: '.2px', fontSize: '1.8vh'}}
                                >
                                    {m.title}
                                </p>
                            ))
                        }
                    </div>
                    <div className='w-9/12 text-left'>
                        <BarChart data={15}/>
                    </div>
                </div>
            </div>

            <FunnelSection/>
        </div>
    )
}

export default Navbar