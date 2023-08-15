import React, {useState, useEffect} from "react";
import BarChartComponent from "../../../components/barChart";

const SummerySection = ({project, data, loading}) => {

    const [values, setValues] = useState([])

    useEffect(() => {
        let arr = []
        data?.map(d => {
            arr.push(Number(d.summe))
        })
        setValues(arr)
    }, [data]);


    return (
        <div className='flex justify-start flex-wrap'>
            <div className='mt-2 lg:w-3/12 md:w-screen '>
                {
                    data?.map((m, i) => (
                        <p className='lg:border-hidden md:border-b md:border-offWhite milestonesBesideChart'
                           key={i}>
                            <span className='ml-2'>{m.milestone}</span>
                        </p>
                    ))
                }
            </div>
            <div className='w-8/12 text-left'>
                <BarChartComponent loading={loading} values={values} project={project}/>
            </div>
        </div>
    )
}

export default SummerySection