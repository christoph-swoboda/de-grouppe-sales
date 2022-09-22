import React from "react";
import {IoIosArrowUp} from "react-icons/io";
import PropTypes from "prop-types";

const CompanyData = ({data, toggle}) => {
    return (
        <div className='bg-white text-left'>
            <div className='flex justify-between'>
                <h2 className='lg:text-left font-extrabold p-5'>Firmenname</h2>
                <p className='p-5'><IoIosArrowUp size='25px'/></p>
            </div>
            <div className='px-5 pb-1 flex flex-wrap'>
                {Object.keys(data).slice(0, 10).map((key, index) => {
                    return (
                        <div key={index}>
                            <p className='m-2 bg-lightgrey border-offWhite text-sm border-2 p-1'>
                                {key}: {data[key]}
                            </p>
                        </div>
                    );
                })}
            </div>
            <button onClick={toggle} className='p-2 text-mainBlue underline ml-5 text-xs'>Firmendetails</button>
        </div>
    )
}

export default CompanyData

CompanyData.propTypes = {
    data: PropTypes.object,
    toggle: PropTypes.func
}
