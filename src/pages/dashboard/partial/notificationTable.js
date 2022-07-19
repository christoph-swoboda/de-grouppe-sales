import React, {useState, useEffect} from "react";

const NotificationTable = () => {
    return (
        <div className='box-content rounded-2xl bg-white mt-6  p-6 h-fit'>
            <h2 className='text-left text-xl font-bold mb-2'>Upcoming Dates</h2>
            <h2 className='text-left text-grey mb-4'>Show:
                <span className='text-mainBlue'>
                    <select className='bg-transparent'>
                      <option value={50}>  50 Days</option>
                      <option value={100}>  100 Days</option>
                     </select>
                </span>
            </h2>

            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full  sm:px-6 lg:px-8">
                        <div className="overflow-hidden">
                            <table className="min-w-full">
                                <thead className=" border-y border-silver border-x-0">
                                <tr>
                                    <th scope="col" className="text-sm font-medium text-grey px-6 py-4 ">
                                        #
                                    </th>
                                    <th scope="col" className="w-2/12 text-sm font-medium text-grey px-6 py-4 ">
                                        Company Name
                                    </th>
                                    <th scope="col" className=" w-7/12 text-sm font-medium text-grey px-6 py-4 ">
                                        Current Stage
                                    </th>
                                    <th scope="col" className="w-2/12 text-sm font-medium text-grey px-6 py-4">
                                        Expire Date
                                    </th>
                                    <th scope="col" className="w-1/12 text-sm font-medium text-grey px-6 py-4">
                                        Status
                                    </th>
                                    <th scope="col" className="w-1/12 text-sm font-medium text-grey px-6 py-4"/>
                                </tr>
                                </thead>
                                <tbody>

                                <tr className=" border-y border-silver border-x-0 bg-errorBg ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Coca Cola
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Sk Appointment (Strategy Concept Presentation Appointment)
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        10/06/22
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Inactive
                                    </td>
                                    <td className=" text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        <h2 className='bg-mainBlue rounded-3xl pl-3 pr-3 pt-1 pb-1 text-white uppercase'> Update</h2>
                                    </td>
                                </tr>

                                <tr className=" border-y border-silver border-x-0">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Coca Cola
                                    </td>
                                    <td className="text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Sk Appointment (Strategy Concept Presentation Appointment)
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        10/06/22
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Active
                                    </td>
                                </tr>

                                <tr className=" border-y border-silver border-x-0">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Coca Cola
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Sk Appointment (Strategy Concept Presentation Appointment)
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        10/06/22
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        Active
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <a className='text-mainBlue underline uppercase font-bold text-sm cursor-pointer'>See More Notifications</a>
        </div>
    )
}

export default NotificationTable