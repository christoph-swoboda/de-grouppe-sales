import React, {useState, useEffect} from "react";

const NotificationTable = () => {
    return (<div className='box-content rounded-2xl bg-white mt-6  p-6 h-fit'>
        <h2 className='text-left text-xl font-bold mb-2'>Upcoming Dates</h2>
        <h2 className='text-left text-grey mb-4'>Show:
            <span className='text-mainBlue'>
                    <select className='bg-transparent'>
                      <option value={50}>  50 Days</option>
                      <option value={100}>  100 Days</option>
                     </select>
                </span>
        </h2>

        <table className='table-auto'>
            <tr className='text-grey font-light text-sm'>
                <th>#</th>
                <th className='w-2/12 '>Company Name</th>
                <th className='w-8/12'>Current Stage</th>
                <th className='w-1/12'>Expire Date</th>
                <th className='w-1/12'>Status</th>
                <th className='w-1/12'/>
            </tr>
            <tr className='border border-y-silver border-x-0 p-10'>
                <td>1</td>
                <td>Coca Cola</td>
                <td>Maria Anders Anders Anders Anders Anders Anders Anders Anders Anders Anders</td>
                <td>06/15/22</td>
                <td>Active</td>
                <td>Update</td>
            </tr>
            <tr className='border border-y-silver border-x-0'>
                <td>1</td>
                <td>Coca Cola</td>
                <td>Maria Anders Anders Anders Anders Anders Anders Anders Anders Anders Anders</td>
                <td>06/15/22</td>
                <td>Active</td>
                <td>Update</td>
            </tr>
            <tr className='border border-y-silver border-x-0'>
                <td>1</td>
                <td>Coca Cola</td>
                <td>Maria Anders Anders Anders Anders Anders Anders Anders Anders Anders Anders</td>
                <td>06/15/22</td>
                <td>Active</td>
                <td>Update</td>
            </tr>
        </table>
    </div>)
}

export default NotificationTable