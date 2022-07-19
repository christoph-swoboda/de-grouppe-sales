import React from "react";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import BestantStatus from "../../components/bestantStatus";
import {Link} from "react-router-dom";
import Modal from "../../components/modal";
import Dashboard from "../dashboard";
import useModal from "../../hooks/useModal";
import {useStateValue} from "../../states/StateProvider";
import StatusPopUp from "../../components/statusPopUp";

const Bestant = () => {

    const [{statusModal}, dispatch] = useStateValue();
    const {toggleStatusModal} = useModal();

    return (
        <div className='dashboardContainer'>
            <div className='lg:flex justify-start mt-10 sm:block'>
                <h2 className='text-2xl lg:text-left font-extrabold'>Wittrock Landtechnik</h2>
                <Link to={'/bestant-list'} className='ml-auto text-mainBlue px-3 py-2 text-sm'>BACK TO LIST</Link>
                <p onClick={()=> dispatch({type: "SET_STATUS_MODAL", item: !statusModal})} className='px-3 py-2 rounded-2xl bg-mainBlue text-sm text-white ml-2'>EDIT USER</p>
            </div>
            <div className=' lg:flex justify-start my-5 rounded-lg sm:block'>
                <div>
                    <div className='bg-white'>
                        <div className='flex justify-between'>
                            <h2 className='text-lg lg:text-left font-extrabold p-5'>Company Master Data</h2>
                            <p className='p-5'><IoIosArrowUp size='25px'/></p>
                        </div>
                        <div className='px-5 pb-5 flex customContainer'>
                            <div className='grid grid-cols-1 gap-2 text-sm text-left'>
                                <p className='p-2 bg-lightgrey '>Tax ID</p>
                                <p className='p-2 bg-lightgrey'>Internet Address</p>
                                <p className='p-2 bg-lightgrey'>Transform to R+V</p>
                                <p className='p-2 bg-lightgrey'>1. Appointment Analysis</p>
                                <p className='p-2 bg-lightgrey'>PM DGAPI</p>
                                <p className='p-2 bg-lightgrey'>2. Appointment Ask </p>
                                <p className='p-2 bg-lightgrey'>3rd Appointment </p>
                                <p className='p-2 bg-lightgrey'>iForm To DGAPI </p>
                                <p className='p-2 bg-lightgrey'>DL Package Sent</p>
                                <p className='p-2 bg-lightgrey'>DL Package Back</p>
                                <p className='p-2 bg-lightgrey'>Accompanying Office</p>
                                <p className='p-2 bg-lightgrey'>Report Package To Company</p>
                            </div>
                            <div className='grid grid-cols-1 gap-2 text-sm text-left ml-3'>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>DE213000588234343</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>www.demo.com</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>''</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>1/1/1900</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>1/1/1900</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>1/1/1900</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>1/1/1900</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>1/1/1900</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>1/1/1900</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>1/1/1900</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>''</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>''</p>
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
                            <div className='grid grid-cols-1 gap-2 text-sm text-left'>
                                <p className='p-2 bg-lightgrey w-60'>Project</p>
                                <p className='p-2 bg-lightgrey'>Condition Advisor</p>
                                <p className='p-2 bg-lightgrey'>Bank</p>
                                <p className='p-2 bg-lightgrey'>Sort Code</p>
                                <p className='p-2 bg-lightgrey'>Region</p>
                                <p className='p-2 bg-lightgrey'>KD Advisor Bank </p>
                                <p className='p-2 bg-lightgrey'>N/B </p>
                                <p className='p-2 bg-lightgrey'>Company Short </p>
                                <p className='p-2 bg-lightgrey'>Company</p>
                                <p className='p-2 bg-lightgrey'>Company Contact Details</p>
                                <p className='p-2 bg-lightgrey'>Accompanying Office</p>
                                <p className='p-2 bg-lightgrey'>MA </p>
                                <p className='p-2 bg-lightgrey'>Company Ansrpr Salutation </p>
                                <p className='p-2 bg-lightgrey'> Company Claim: Title </p>
                                <p className='p-2 bg-lightgrey'> Company Claim: First Name</p>
                                <p className='p-2 bg-lightgrey'> Company Claim: Surname</p>
                                <p className='p-2 bg-lightgrey'> Company Claim: Position</p>
                            </div>
                            <div className='grid grid-cols-1 gap-2 text-sm text-left ml-3'>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>DE213000588238</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>www.demo.com</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>''</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>1/1/1900</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>1/1/1900</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>1/1/1900</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>1/1/1900</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>1/1/1900</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>1/1/1900</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>1/1/1900</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>''</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>''</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>''</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>''</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>''</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>''</p>
                                <p className='p-2 bg-lightgrey whitespace-pre-wrap break-all'>''</p>
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