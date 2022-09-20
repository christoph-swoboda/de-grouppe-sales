import React from "react"
import {useStateValue} from "../../states/StateProvider"
import {GrClose} from "react-icons/gr";
import PropTypes from "prop-types";
import {IoIosArrowUp} from "react-icons/io";

const CompanyInfoPopUp = ({data}) => {
    const [{companyInfoModal}, dispatch] = useStateValue()

    return (
        <div className='p-3 rounded-lg'>
            <div className='lg:flex justify-between mt-10 sm:block'>
                <GrClose onClick={() => dispatch({type: "SET_COMPANYINFO_MODAL", item: !companyInfoModal})} size='20px'/>
                <div className=' lg:flex justify-start my-5 rounded-lg sm:block'>
                    <div>
                        <div className='bg-white'>
                            <div className='flex justify-between'>
                                <h2 className='text-lg lg:text-left font-extrabold p-5'>Company Master Data</h2>
                                <p className='p-5'><IoIosArrowUp size='25px'/></p>
                            </div>
                            <div className='px-5 pb-5 flex customContainer'>
                                <div className='text-xs text-left'>
                                    {Object.keys(data).map((key, index) => {
                                        return (
                                            <div key={index}>
                                                <p className='grid grid-cols-2 gap-2 whitespace-nowrap'>
                                                    <span className='p-2 bg-lightgrey my-1 '>{key}</span>
                                                    <span
                                                        className='p-2 bg-lightgrey ml-1 my-1 '>{data[key]}</span>
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        <div className='bg-white mt-5'>
                            <div className='flex justify-between'>
                                <h2 className='text-lg lg:text-left font-extrabold p-5'>Contact Details Of Contact
                                    Person</h2>
                                <p className='p-5'><IoIosArrowUp size='25px'/></p>
                            </div>
                            <div className='px-5 pb-5 flex customContainer'>
                                <div className='text-sm text-left'>
                                    {Object.keys(data).map((key, index) => {
                                        return (
                                            <div key={index}>
                                                <p className='grid grid-cols-2 gap-2 whitespace-nowrap'>
                                                    <span className='p-2 bg-lightgrey my-1 '>{key}</span>
                                                    <span
                                                        className='p-2 bg-lightgrey ml-1 my-1 '>{data[key]}</span>
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyInfoPopUp

CompanyInfoPopUp.propTypes = {
    data: PropTypes.object,
}
