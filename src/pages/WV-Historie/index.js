import * as React from 'react';
import {useEffect, useState} from 'react';
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {formatDate} from "../../helper/formatDate";
import {IoArrowBackSharp} from 'react-icons/io5';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {ClipLoader} from "react-spinners";
import {AES, enc} from "crypto-js";
import {useStateValue} from "../../states/StateProvider";
import Pagination from "../../components/pagination";

const MailHistory = () => {

    const [{pageWvHistory, secretKey}, dispatch] = useStateValue();

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [rows, setRows] = useState('10');
    const navigate = useNavigate();
    const location = useLocation();
    const [total, setTotal] = useState(100);
    let PageSize = rows;

    useEffect(() => {
        try {
            const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
            const User = JSON.parse(decryptedBytes.toString(enc.Utf8))
            if (User.role !== 'Internal') {
                location.replace('/')
            } else {
                setLoading(true)
                let data = new FormData()
                data.append('perPage', rows)
                data.append('page', pageWvHistory)

                Api().post('/sp_getDataWVHistorie',data).then(res => {
                    setData(res.data)
                    setLoading(false)
                }).catch(e => {
                    toast.error('etwas ist schief gelaufen!')
                })
            }
        } catch (e) {
            window.location.replace('/anmeldung')
        }
    }, [pageWvHistory, rows]);

    function setPageStates(e) {
        dispatch({type: "SET_PAGE_WVHISTORY", item: 1})
        setRows(e.target.value)
    }

    return (
        <div className='dashboardContainer'>
            <h2 className='text-2xl lg:text-left'> WV-Historie</h2>
            <div className='float-right'>
                <a title='vorherige Seite' onClick={() => navigate(-1)} className='cursor-pointer'>
                    <IoArrowBackSharp size={'30px'}/>
                </a>
            </div>
            {
                loading ?
                    <div className='centerItemsAbsolute'>
                        <ClipLoader size={'40px'} color={'black'}/>
                    </div>
                    :
                    <table className='min-w-full text-left bg-white rounded-lg'>
                        <thead className="whitespace-nowrap border-y border-silver border-x-0">
                        <tr className='text-sm text-grey pl-1.5'>
                            <td>Ersteller</td>
                            <td>Erstellungs Datum</td>
                            <td>Firma</td>
                            <td>Grund</td>
                            <td>Inhalt</td>
                            <td>WV Datum</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            data.map(d => (
                                <tr className='border-y border-silver border-x-0 text-sm' key={d.FP_ID}>
                                    <td className='text-gray-900 font-light pr-3'>
                                        {d.Ersteller}
                                    </td>
                                    <td className='text-gray-900 font-light pr-3'>
                                        {formatDate(d.Erstellungs_Datum, false)}
                                    </td>
                                    <td className='text-mainBlue font-light pr-3'>
                                        <Link target='_blank' to={`/firmenprojekte/${d.module}/${d.FP_ID}`}>
                                            {d.Firma}
                                        </Link>
                                    </td>
                                    <td className='text-gray-900 font-light pr-3'>
                                        {d.Grund}
                                    </td>
                                    <td className='text-gray-900 font-light pr-3'>
                                        {d.Inhalt}
                                    </td>
                                    <td className='text-gray-900 font-light pr-3'>
                                        {formatDate(d.WV_Datum, false)}
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
            }
            <div className={`flex justify-evenly ${loading && 'opacity-0'}`}>
                <h2 className={`${(data?.length === 0) && 'hideDiv'}  text-sm text-grey mt-10`}>
                    Einträge anzeigen:
                    <span>
                        <select onChange={setPageStates} className={` bg-transparent text-mainBlue`}>
                            <option value={'10'}>{10}</option>
                            <option value={'25'}>{25}</option>
                            <option value={'10000'}>Alle</option>
                        </select>
                    </span>
                </h2>
                <div className={`mt-10 ${loading && 'opacity-0'}`}>
                    {
                        data.length > 0 &&
                        <Pagination
                            className="pagination-bar"
                            currentPage={pageWvHistory}
                            totalCount={total}
                            pageSize={PageSize}
                            onPageChange={pageNo => dispatch({
                                type: "SET_PAGE_WVHISTORY",
                                item: pageNo
                            })}
                        />
                    }
                </div>
                <p className={`${(data?.length === 0) && 'hideDiv'} mr-2 text-sm text-grey  mt-10`}>
                    {pageWvHistory === 1 ? pageWvHistory : (1 + (Number(rows) * pageWvHistory)) - Number(rows)} bis {(data?.length < Number(rows)) ? data.length + Number(rows) < total ? data.length + (Number(rows) * pageWvHistory) - Number(rows) : total : (Number(rows) + (Number(rows) * pageWvHistory)) - Number(rows)} von {total} Einträge
                </p>
            </div>
        </div>
    );
};

export default MailHistory