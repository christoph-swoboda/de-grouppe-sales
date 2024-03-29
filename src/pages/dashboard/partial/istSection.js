import React, {useEffect, useState} from "react";
import BarChartComponent from "../../../components/barChart";

const ISTSection = ({project, data, loading, dataEmp}) => {

    const [formattedValuesString, setFormattedValuesString] = useState([])
    const [formattedValuesEmpString, setFormattedValuesEmpString] = useState([])
    const [values, setValues] = useState([])
    const [valuesEmp, setValuesEmp] = useState([])

    useEffect(() => {
        let arr = [];
        let arr2 = [];

        data?.forEach(d => {
            arr.push(Number(d.summe));
        });

        dataEmp?.forEach(d => {
            arr2.push(Number(d.summe));
        });

        setFormattedValuesString(arr.map(value => value.toLocaleString()))
        setFormattedValuesEmpString(arr2.map(value => value.toLocaleString()))

        setValues(arr);
        setValuesEmp(arr2);

    }, [data, dataEmp]);
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
                <BarChartComponent left loading={loading} values={values} formattedValues={formattedValuesString} project={project}/>
                <BarChartComponent loading={loading} values={valuesEmp} formattedValues={formattedValuesEmpString} project={project}/>
            </div>
        </div>
    )
}

export default ISTSection