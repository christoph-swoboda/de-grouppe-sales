import React, {useState, useEffect} from "react";
import {VscFilePdf} from "react-icons/vsc";
import {RiArrowDownSFill, RiArrowUpSFill, RiFileExcel2Fill} from "react-icons/ri";
import {BestantTableHeaders} from "../../dummyData/bestantTableHeaders";
import {BsChatLeftText} from "react-icons/bs";
import {Link} from "react-router-dom";

const BestantList = () => {
    const [search, setSearch] = useState()
    const [modal, setModal] = useState(false);

    return (
        <div className='dashboardContainer'>
            <h2 className='text-left text-xl pt-5 pb-5'>Bestant</h2>
            <div className=' bg-white'>
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

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full  sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className=" border-y border-silver border-x-0">
                                    <tr>
                                        <th scope="col" className="text-xs text-grey px-2 py-1 ">
                                            #
                                        </th>
                                        {
                                            BestantTableHeaders.map(header => (
                                                <th key={header.id} scope="col"
                                                    className="text-sm  text-grey px-2 py-1 ">
                                                    <p className='flex justify-center'>
                                                        <div>
                                                            <RiArrowUpSFill size='22px'/>
                                                            <p className='-mt-4'>
                                                                <RiArrowDownSFill size='22px'/>
                                                            </p>
                                                        </div>
                                                        <span className='tooltip mt-1'>{header.title}
                                                            {/*<span className='tooltiptextclose'>*/}
                                                            {/*    Hannoversche Volksbank description*/}
                                                            {/*</span>*/}
                                                        </span>
                                                    </p>
                                                </th>
                                            ))
                                        }
                                        <th scope="col" className="text-xs text-grey px-2 py-1"/>
                                        <th scope="col" className="text-xs text-grey px-2 py-1"/>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    <tr className="border-y border-silver border-x-0 ">
                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">1</td>
                                        <td className="w-3/12 text-xs text-mainBlue underline font-light px-6 py-4 whitespace-pre-wrap">
                                            <Link to={`/bestant/1`}>
                                                Wittrock Landtechnik
                                            </Link>
                                        </td>
                                        <td className="w-3/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            Buschmann, Sebastian
                                        </td>
                                        <td className="w-2/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            Hannoversche Volksbank
                                        </td>
                                        <td className="w-2/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            Landkreis Vechta
                                        </td>
                                        <td className="w-3/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            Luckebergfeld, Matthias
                                        </td>
                                        <td className="w-1/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            WVG Lehmann
                                        </td>
                                        <td className="w-1 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            P-Abschluss
                                        </td>
                                        <td className="w-1 tooltip text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            <BsChatLeftText size='18px'/>
                                            <td className='tooltiptext'>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </td>
                                        </td>
                                        <td className="w-1  text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <h2 className='border border-mainBlue text-mainBlue rounded-3xl px-2 py-1 font-bold uppercase'> Edit</h2>
                                        </td>
                                    </tr>

                                    <tr className="border-y border-silver border-x-0 ">
                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">1</td>
                                        <td className="w-3/12 text-xs text-mainBlue underline font-light px-6 py-4 whitespace-pre-wrap">
                                            <Link to={`/bestant/1`}>
                                                Wittrock Landtechnik
                                            </Link>
                                        </td>
                                        <td className="w-3/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            Buschmann, Sebastian
                                        </td>
                                        <td className="w-2/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            Hannoversche Volksbank
                                        </td>
                                        <td className="w-2/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            Landkreis Vechta
                                        </td>
                                        <td className="w-3/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            Luckebergfeld, Matthias
                                        </td>
                                        <td className="w-1/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            WVG Lehmann
                                        </td>
                                        <td className="w-1 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            P-Abschluss
                                        </td>
                                        <td className="w-1 tooltip text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            <BsChatLeftText size='18px'/>
                                            <td className='tooltiptext'>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </td>
                                        </td>
                                        <td className="w-1  text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <h2 className='border border-mainBlue text-mainBlue rounded-3xl px-2 py-1 font-bold uppercase'> Edit</h2>
                                        </td>
                                    </tr>

                                    <tr className="border-y border-silver border-x-0 ">
                                        <td className="px-6 py-4 whitespace-nowrap text-xs font-medium text-gray-900">1</td>
                                        <td className="w-3/12 text-xs text-mainBlue underline font-light px-6 py-4 whitespace-pre-wrap">
                                            <Link to={`/bestant/1`}>
                                                Wittrock Landtechnik
                                            </Link>
                                        </td>
                                        <td className="w-3/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            Buschmann, Sebastian
                                        </td>
                                        <td className="w-2/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            Hannoversche Volksbank
                                        </td>
                                        <td className="w-2/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            Landkreis Vechta
                                        </td>
                                        <td className="w-3/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            Luckebergfeld, Matthias
                                        </td>
                                        <td className="w-1/12 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            WVG Lehmann
                                        </td>
                                        <td className="w-1 text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            P-Abschluss
                                        </td>
                                        <td className="w-1 tooltip text-xs text-gray-900 font-light px-6 py-4 whitespace-pre-wrap">
                                            <BsChatLeftText size='18px'/>
                                            <td className='tooltiptext'>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                            </td>
                                        </td>
                                        <td className="w-1  text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <h2 className='border border-mainBlue text-mainBlue rounded-3xl px-2 py-1 font-bold uppercase'> Edit</h2>
                                        </td>
                                    </tr>

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BestantList