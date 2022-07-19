import React from "react";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import BestantStatus from "../../components/bestantStatus";
import {Link} from "react-router-dom";
import Modal from "../../components/modal";
import useModal from "../../hooks/useModal";
import {useStateValue} from "../../states/StateProvider";
import StatusPopUp from "../../components/statusPopUp";
import {BestantCompanyInfo} from "../../dummyData/bestantInfo";

const Bestant = () => {

    const [{statusModal}, dispatch] = useStateValue();
    const {toggleStatusModal} = useModal();

    return (
        <div className='dashboardContainer'>
            <div className='lg:flex justify-start mt-10 sm:block'>
                <h2 className='text-2xl lg:text-left font-extrabold'>Wittrock Landtechnik</h2>
                <Link to={'/bestant-list'} className='ml-auto text-mainBlue px-3 py-2 text-sm'>BACK TO LIST</Link>
                <p onClick={() => dispatch({type: "SET_STATUS_MODAL", item: !statusModal})}
                   className='px-3 py-2 rounded-2xl bg-mainBlue text-sm text-white ml-2'>EDIT USER</p>
            </div>
            <div className=' lg:flex justify-start my-5 rounded-lg sm:block'>
                <div>
                    <div className='bg-white'>
                        <div className='flex justify-between'>
                            <h2 className='text-lg lg:text-left font-extrabold p-5'>Company Master Data</h2>
                            <p className='p-5'><IoIosArrowUp size='25px'/></p>
                        </div>
                        <div className='px-5 pb-5 flex customContainer'>
                            <div className='text-sm text-left'>
                                {Object.keys(BestantCompanyInfo).map((key, index) => {
                                    return (
                                        <div key={index}>
                                            <p className='grid grid-cols-2 gap-2 whitespace-nowrap'>
                                                <span className='p-2 bg-lightgrey my-1 '>{key}</span>
                                                <span
                                                    className='p-2 bg-lightgrey ml-1 my-1 '>{BestantCompanyInfo[key]}</span>
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
                                {Object.keys(BestantCompanyInfo).map((key, index) => {
                                    return (
                                        <div key={index}>
                                            <p className='grid grid-cols-2 gap-2 whitespace-nowrap'>
                                                <span className='p-2 bg-lightgrey my-1 '>{key}</span>
                                                <span
                                                    className='p-2 bg-lightgrey ml-1 my-1 '>{BestantCompanyInfo[key]}</span>
                                            </p>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between bg-white mt-5'>
                        <h2 className='text-lg lg:text-left font-extrabold p-5'>Remark History</h2>
                        <p className='p-5'><IoIosArrowDown size='25px'/></p>
                    </div>
                </div>

                <div className='bg-white px-5 pb-10 w-full lg:ml-5 rounded-lg h-fit'>
                    <div className='flex justify-between bg-white mt-5'>
                        <h2 className='text-lg lg:text-left font-extrabold'>Status</h2>
                        <p><IoIosArrowUp size='25px'/></p>
                    </div>
                    <BestantStatus/>
                    <BestantStatus/>
                    <BestantStatus/>
                </div>
            </div>

            <Modal toggle={toggleStatusModal}
                   visible={statusModal}
                   component={<StatusPopUp/>}
                   className='addEmployeeContainer'
            />
        </div>
    )
}

export default Bestant