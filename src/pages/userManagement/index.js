import React, {useState} from "react";
import {GrCheckbox} from "react-icons/gr";

const UserManagement = () => {
    const [search, setSearch] = useState()

    return (
        <div className='dashboardContainer'>
            <div className='lg:flex justify-between mt-10 sm:block'>
                <h2 className='text-2xl lg:text-left font-extrabold'>Benutzerverwaltung</h2>
                <p className='px-3 py-2 rounded-2xl bg-mainBlue text-sm text-white ml-2'>ADD NEW USER</p>
            </div>

            <div className='bg-white my-4'>
                <div className='rounded-xl p-8 lg:flex sm:block'>
                    <input className='mr-5 search' type='search' placeholder='sueche..'
                           onChange={(e) => setSearch(e.target.value)}
                    />
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
                                    <thead className="border-y border-silver border-x-0">
                                    <tr>
                                        <th scope="col" className="text-sm font-medium text-grey px-6 py-4 ">
                                            #
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-grey px-6 py-4 ">
                                            eMail
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-grey px-6 py-4 ">
                                            partnernummer
                                        </th>
                                        <th scope="col" className="text-sm text-left font-medium text-grey px-6 py-4">
                                            eMail bestätigt
                                        </th>
                                        <th scope="col" className="text-sm font-medium text-grey px-6 py-4"/>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    <tr className=" border-y border-silver border-x-0">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            susanne.kindler@ruv.de
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            69018003
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <GrCheckbox/>
                                        </td>
                                        <td className=" text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <h2 className='border border-mainBlue rounded-3xl pl-3 pr-3 pt-1 pb-1 text-mainBlue font-extrabold uppercase'> Edit</h2>
                                        </td>
                                    </tr>

                                    <tr className=" border-y border-silver border-x-0">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            susanne.kindler@ruv.de
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            69018003
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <GrCheckbox/>
                                        </td>
                                        <td className=" text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <h2 className='border border-mainBlue rounded-3xl pl-3 pr-3 pt-1 pb-1 text-mainBlue font-extrabold uppercase'> Edit</h2>
                                        </td>
                                    </tr>

                                    <tr className=" border-y border-silver border-x-0">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            susanne.kindler@ruv.de
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            69018003
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <GrCheckbox/>
                                        </td>
                                        <td className=" text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <h2 className='border border-mainBlue rounded-3xl pl-3 pr-3 pt-1 pb-1 text-mainBlue font-extrabold uppercase'> Edit</h2>
                                        </td>
                                    </tr>

                                    <tr className=" border-y border-silver border-x-0">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            susanne.kindler@ruv.de
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            69018003
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <GrCheckbox/>
                                        </td>
                                        <td className=" text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <h2 className='border border-mainBlue rounded-3xl pl-3 pr-3 pt-1 pb-1 text-mainBlue font-extrabold uppercase'> Edit</h2>
                                        </td>
                                    </tr>

                                    <tr className=" border-y border-silver border-x-0">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            susanne.kindler@ruv.de
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            69018003
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <GrCheckbox/>
                                        </td>
                                        <td className=" text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <h2 className='border border-mainBlue rounded-3xl pl-3 pr-3 pt-1 pb-1 text-mainBlue font-extrabold uppercase'> Edit</h2>
                                        </td>
                                    </tr>

                                    <tr className=" border-y border-silver border-x-0">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            susanne.kindler@ruv.de
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            69018003
                                        </td>
                                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <GrCheckbox/>
                                        </td>
                                        <td className=" text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                            <h2 className='border border-mainBlue rounded-3xl pl-3 pr-3 pt-1 pb-1 text-mainBlue font-extrabold uppercase'> Edit</h2>
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

export default UserManagement