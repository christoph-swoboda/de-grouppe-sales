import React from "react";
import {Milestones} from "../../../dummyData/milestones";
import BarChartComponent from "../../../components/barChart";

const ISTSection = ({project}) => {
    return (
        <div className='flex justify-start flex-wrap'>
            <div className='mt-2 lg:w-3/12 md:w-screen '>
                {
                    Milestones.map((m, i) => (
                        <p className='lg:border-hidden md:border-b md:border-offWhite milestonesBesideChart'
                           key={m.id}>
                            {i + 1} <span className='ml-1.5'>{m.title}</span>
                        </p>
                    ))
                }
            </div>
            <div className='w-9/12 text-left'>
                <BarChartComponent project={project}/>
            </div>
        </div>
    )
}

export default ISTSection