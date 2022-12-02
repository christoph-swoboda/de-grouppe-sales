import React, {useEffect, useState} from "react";
import BarChartComponent from "../../../components/barChart";

const ISTSection = ({project, data, loading, dataEmp}) => {

    const [values, setValues] = useState([])
    const [valuesEmp, setValuesEmp] = useState([])

    useEffect(() => {
        let arr = []
        let arr2 = []
        data?.map(d => {
            arr.push(Number(d.summe))
        })
        dataEmp?.map(d => {
            arr2.push(Number(d.summe))
        })
        setValues(arr)
        setValuesEmp(arr2)
    }, [data,dataEmp]);

    return (
        <div className='flex justify-start '>
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
            <div className='flex  text-left'>
                <BarChartComponent loading={loading} values={values} project={project}/>
                <BarChartComponent loading={loading} values={valuesEmp} project={project}/>
            </div>
        </div>
    )
}

export default ISTSection