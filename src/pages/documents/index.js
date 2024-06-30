import React, {useState, useEffect} from "react";
import Api from "../../Api/api";
import {toast} from "react-toastify";

const Documents = () => {

    const [loading,setLoading]=useState(false)
    const [data,setData]=useState([])

    useEffect(() => {
        setLoading(true)
        Api().get(`/sp_getDataDocuments/810447`).then(res => {
            console.log('data', res.data)
            setData(res.data)
        }).catch(e => {
            toast.error('Firmendetails konnten nicht geladen werden!')
        })
    }, []);

    return (
        <div className='py-10 px-4 min-h-screen'>
            <h2 className='mt-16 text-2xl text-left font-light'>Dokumente List</h2>
            <div className='bg-offWhite rounded-md my-5'>
                <table className='min-w-full text-left bg-white'>
                    <thead className="whitespace-nowrap border-y border-silver border-x-0">
                        <tr>
                            <th className="text-sm text-grey pl-1.5" scope="col">Dateinachweise</th>
                            <th className="text-sm text-grey pl-1.5 w-36" scope="col">iForm</th>
                            <th className="text-sm text-grey pl-1.5 w-28" scope="col"></th>
                            <th className="text-sm text-grey pl-1.5 w-28" scope="col"></th>
                            <th className="text-sm text-grey pl-1.5 w-28" scope="col"></th>
                            <th className="text-sm text-grey pl-1.5" scope="col">Upload Datum, Zeit</th>
                            <th className="text-sm text-grey pl-1.5" scope="col">Upload von</th>
                        </tr>
                    </thead>
                    <tbody className='mt-3'>
                        <tr>
                            <td>XXXXXXXXXXXX</td>
                            <td>XXXXXXXXXXXX.ZY</td>
                            <td>
                                <span className='bg-mainBlue px-4 py-1 text-white rounded-lg'>
                                    Upload
                                </span>
                            </td>
                            <td>
                                <span className='bg-green px-4 py-1 text-white rounded-lg'>
                                    Download
                                </span>
                            </td>
                            <td>
                                <span className='bg-cancel px-4 py-1 text-white rounded-lg'>
                                    Delete
                                </span></td>
                            <td>28.10.12</td>
                            <td>XXXXXXXXX</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Documents