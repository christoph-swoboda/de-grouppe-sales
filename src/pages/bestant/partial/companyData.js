import React, {useState} from "react";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import PropTypes from "prop-types";
import CollapseExpand from "../../../components/collapseExpandSection";
import {useStateValue} from "../../../states/StateProvider";

const CompanyData = ({data, toggle, company}) => {

    const [{collapse1}] = useStateValue();

    return (
        <div className='bg-white text-left'>
            <div className='flex justify-between'>
                <h2 className='lg:text-left text-lg font-extrabold p-5 text-mainBlue'>
                    Firmenprojekt: <span className='font-light opacity-90'>{company}</span>
                </h2>
                <CollapseExpand show={collapse1} id={1}/>
            </div>
            <div className={`${!collapse1 && 'hidden'}`}>
                <div className={`px-5 pb-1 flex flex-wrap`}>
                    {Object.keys(data).slice(0, 10).map((key, index) => {
                        return (
                            <div key={index}>
                                <p className='my-2 text-sm p-1'>
                                    <span className='font-bold text-grey'>{key}:</span> {data[key]},
                                </p>
                            </div>
                        );
                    })}
                </div>
                <button onClick={toggle} className='p-2 text-mainBlue underline ml-5 text-xs'>Firmendetails</button>
            </div>
        </div>
    )
}

export default CompanyData

CompanyData.propTypes = {
    data: PropTypes.object,
    toggle: PropTypes.func
}
