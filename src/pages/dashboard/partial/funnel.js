import React, {useState, useEffect} from "react";
import {Chart} from "./chart";

const FunnelSection = () => {
    return (
        <div className='box-content rounded-2xl bg-offWhite mt-6  p-6 h-fit lg:flex justify-between'>
            <div className="flex flex-col lg:w-5/12 sm:w-12/12">
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
                                        Step
                                    </th>
                                    <th scope="col" className=" w-7/12 text-sm font-medium text-grey px-6 py-4 ">
                                        Users
                                    </th>
                                    <th scope="col" className="w-2/12 text-sm font-medium text-grey px-6 py-4">
                                       New Users
                                    </th>
                                </tr>
                                </thead>
                                <tbody>

                                <tr className="border-y border-silver border-x-0 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                       First Appointment
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                </tr>
                                <tr className="border-y border-silver border-x-0 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                       First Appointment
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                </tr>

                                <tr className="border-y border-silver border-x-0 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                       First Appointment
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                </tr>
                                <tr className="border-y border-silver border-x-0 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                       First Appointment
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                </tr>
                                <tr className="border-y border-silver border-x-0 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                       First Appointment
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                </tr>
                                <tr className="border-y border-silver border-x-0 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                       First Appointment
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                </tr>
                                <tr className="border-y border-silver border-x-0 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                       First Appointment
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                </tr>
                                <tr className="border-y border-silver border-x-0 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                       First Appointment
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                </tr>
                                <tr className="border-y border-silver border-x-0 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                       First Appointment
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                </tr>
                                <tr className="border-y border-silver border-x-0 ">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1</td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                       First Appointment
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                        491
                                    </td>
                                </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

            <div className='flex flex-col lg:w-6/12 sm:w-12/12"'>
                <Chart/>
            </div>
        </div>
    )
}

export default FunnelSection