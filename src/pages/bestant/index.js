import React, {useState, useEffect} from "react";
import {VscFilePdf} from "react-icons/vsc";
import {RiFileExcel2Fill} from "react-icons/ri";

const Bestant = () => {
    const [search, setSearch] = useState()
    return (
        <div className='dashboardContainer'>
            <h2 className='text-left text-xl pt-5 pb-5'>Bestant</h2>
            <div className='bg-white p-8 lg:flex sm:block'>
                <input className='mr-5 search' type='search' placeholder='sueche..'
                       onChange={(e) => setSearch(e.target.value)}
                />
                <div className='flex justify-center m-1'>
                    <RiFileExcel2Fill className='mr-1' size='25px' color={'#388E3C'}/>
                    <span className='mr-1 mb-1 text-grey '>Excel Export</span>
                </div>
                <div className='flex justify-center m-1'>
                    <VscFilePdf className='mr-1' size='25px' color={'#DB2955'}/>
                    <span className='mr-1 mb-2 text-grey'>PDF Export</span>
                </div>

                <p className='text-sm text-grey ml-auto mt-2'>1 bis 10 von 596 Eintragen</p>
                <h2 className='text-sm text-grey ml-6 mt-2 ml-10'>
                    Eintrage anzigen: <span>
                        <select className='bg-transparent text-mainBlue'>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </span>
                </h2>
            </div>
        </div>
    )
}

export default Bestant