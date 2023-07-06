import * as React from 'react';
import {useEffect, useState} from "react";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {formatDate} from "../../helper/formatDate";
import {IoArrowBackSharp} from 'react-icons/io5';
import {Link, useNavigate} from "react-router-dom";
import {BeatLoader, ClipLoader, SkewLoader} from "react-spinners";

const MailHistory = () => {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate();

    useEffect(() => {
        Api().get('/sp_getICMails').then(res => {
            setLoading(false)
            setData(res.data)
        }).catch(e => {
            toast.error('etwas ist schief gelaufen!')
        })
    }, []);

    return (
        <div className='dashboardContainer mx-24'>
            <h2 className='text-center text-3xl mt-3 font-bold border border-b-0 border-x-0 border-t-0 border-white'>Mail
                Verlauf</h2>
            <div className='float-right'>
                <a title='vorherige Seite' onClick={()=>navigate(-1)} className='cursor-pointer'>
                    <IoArrowBackSharp size={'30px'}/>
                </a>
            </div>
            {
                loading ?
                    <div className='centerItemsAbsolute'>
                        <ClipLoader size={'40px'} color={'black'}/>
                    </div>
                    :
                    <table className='min-w-full text-left bg-white'>
                        <thead className="whitespace-nowrap border-y border-silver border-x-0">
                        <tr className='text-sm text-grey pl-1.5'>
                            <td>Empfänger</td>
                            <td>CC Empfänger</td>
                            <td>Betreff</td>
                            <td>Mailtext</td>
                            <td>Datum</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map(d => (
                                <tr className='border-y border-silver border-x-0 text-sm'>
                                    <td className='w-40 text-gray-900 font-light pr-3'>
                                        {d.Empfänger}
                                    </td>
                                    <td className='w-40 text-gray-900 font-light pr-3'>
                                        {d.CC_Empfänger}
                                    </td>
                                    <td className='w-40 text-gray-900 font-light pr-3'>
                                        {d.Betreff}
                                    </td>
                                    <td className='w-96 text-gray-900 font-light pr-3'>
                                        {d.Mailtext}
                                    </td>
                                    <td className='w-28 text-gray-900 font-light pr-3'>
                                        {formatDate(d.Datum, false)}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
            }

        </div>
    );
};

export default MailHistory