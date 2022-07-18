import React, {useState, useEffect} from "react";
import {VscFilePdf} from "react-icons/vsc";
import {RiFileExcel2Fill} from "react-icons/ri";

const Bestant = () => {
    const [search, setSearch] = useState()
    return (
        <div className='dashboardContainer'>
            <h2 className='text-left text-xl pt-5 pb-5'>Bestant</h2>
            <div className='bg-white p-8 flex'>

                <div className='flex justify-start w-6/12'>
                    <input className='mr-5 search' type='search' placeholder='sueche..'
                           onChange={(e) => setSearch(e.target.value)}
                    />
                    <RiFileExcel2Fill className='mr-1' size='25px' color={'#388E3C'}/>
                    <span className='mr-5 text-grey'>Excel Export</span>
                    <VscFilePdf className='mr-1' size='25px' color={'#DB2955'}/>
                    <span className='mr-3 text-grey'>PDF Export</span>
                </div>

                <div className='flex  justify-end w-6/12'>
                    <p className='text-sm text-grey'>1 bis 10 von 596 Eintragen</p>
                    <h2 className='text-sm text-grey ml-10'>
                        Eintrage anzigen: <span>
                        <select className='bg-transparent text-mainBlue'>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </span>
                    </h2>
                </div>

            </div>
        </div>
    )
}

export default Bestant