import React, {useEffect, useState} from "react";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {RiArrowDownSFill, RiArrowUpSFill} from "react-icons/ri";
import {ClipLoader} from "react-spinners";
import UpsellingTable from "./partial/upsellingTable";
import {useStateValue} from "../../states/StateProvider";
import {AES, enc} from "crypto-js";
import {UpsellingHeadersDGG} from "../../staticData/upsellingHeadersDGG";

const Upselling = () => {

    const searchableFields = [0, 1, 2]
    const dropdownsearchFields = [3, 4, 5, 6, 7, 8, 9]
    const sortableFields = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState([])
    const [data, setData] = useState([])
    const [headers, setHeaders] = useState([])
    const [{sortUpsellingColum, sortMethodUpselling, secretKey, portal}, dispatch] = useStateValue();
    const [superAdmin, setSuperAdmin] = useState('')

    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const userID = user.ID
    const role = user.role === 'Internal' ? 'i' : user.role === 'ExtRUV' ? 'er' : user.role === 'ExtDGG' ? 'ed' : user.role === 'ManRUV' ? 'mr' : user.role === 'ManDGG' ? 'md' : 'c'


    useEffect(() => {
        setLoading(true)
        setData([])
        if (portal) {
            if (portal === 'dgg') {
                setHeaders(UpsellingHeadersDGG)
            } else if (portal === 'ruv') {
                setHeaders(UpsellingHeadersDGG)
            }
            try {
                Api().get(`sp_getDataUpselling/dgg/${userID}`).then(res => {
                    setData(res.data)
                    setLoading(false)
                }).catch(e => {
                    toast.error('Etwas ist schief gelaufen!!')
                    setLoading(false)
                })

            } catch (e) {
                window.location.replace('/anmeldung')
            }

            Api().get(`sp_getUpsellingOptions/${'dgg'}`)
                .then(res => {
                    setOptions(res.data)
                })
        }
    }, [portal]);

    useEffect(() => {
        setSuperAdmin(user.isSAdmin)
        if ((user.role === 'ExtDGG' || user.role === 'ManDGG')) {
            dispatch({type: 'SET_PORTAL', item: 'dgg'})
            localStorage.setItem('portal', 'dgg')
        } else if ((user.role === 'ExtRUV' || user.role === 'ManRUV')) {
            dispatch({type: 'SET_PORTAL', item: 'ruv'})
            localStorage.setItem('portal', 'ruv')
        } else {
            if (localStorage.getItem('portal')) {
                dispatch({type: 'SET_PORTAL', item: localStorage.getItem('portal')})
            } else {
                dispatch({type: 'SET_PORTAL', item: 'dgg'})
            }
        }
    }, []);

    function portalSelect(e) {
        dispatch({type: 'SET_PORTAL', item: e.target.value})
        localStorage.setItem('portal', e.target.value)
    }

    function ascSort(id) {
        dispatch({type: "SET_SORTBESTANDCOLUMN", item: id})
        dispatch({type: "SET_SORTBESTANDMETHOD", item: 'asc'})
    }

    function descSort(id) {
        dispatch({type: "SET_SORTBESTANDCOLUMN", item: id})
        dispatch({type: "SET_SORTBESTANDMETHOD", item: 'desc'})
    }

    return (
        <div className='dashboardContainer'>
            <div className='flex justify-start items-center content-center pb-5'>
                <h2 className='text-2xl lg:text-left'> Upselling</h2>
                {/*{*/}
                {/*    (superAdmin === '1' || role === 'i' || role === 'c') &&*/}
                {/*    <div className='flex justify-start items-center w-fit bg-transparent py-2 px-4 ml-2 rounded-sm'>*/}
                {/*        <p className='w-fit mr-2 text-grey'>Portal: </p>*/}
                {/*        <select*/}
                {/*            disabled={loading}*/}
                {/*            className='col-span-2 text-center text-mainBlue mx-auto pr-1 bg-transparent border border-offWhite rounded-sm lg:w-fit'*/}
                {/*            onChange={portalSelect}*/}
                {/*            value={portal}*/}
                {/*        >*/}
                {/*            <option selected value='dgg'>DGG</option>*/}
                {/*            <option value='ruv'>R+V</option>*/}
                {/*        </select>*/}
                {/*    </div>*/}
                {/*}*/}
            </div>
            {/*<div className={`bg-white pt-3 pb-1 px-3 lg:flex sm:block`}>*/}
            {/*</div>*/}
            <div className="flex flex-col p-10 bg-white" style={{height: '75vh'}}>
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="overflow-hidden pt-1">
                            {
                                (data?.length === 0 && !loading) &&
                                <div className='centerItemsAbsolute'>
                                    <h2 className='text-2xl text-text font-bold'>
                                        Entschuldigung, keine Daten gefunden
                                    </h2>
                                </div>
                            }
                            <div className='overflow-x-hidden table-wrp block'
                                 style={{maxHeight: '60vh'}}>
                                <table className='min-w-full text-left bg-white'>
                                    <thead
                                        className="whitespace-nowrap bg-white border-y border-silver border-x-0 sticky top-0">
                                    <tr>
                                        {
                                            !loading &&
                                            headers?.map(header => (
                                                <th key={header.id} scope="col"
                                                    className="text-sm text-grey pl-1.5 tooltip"
                                                    style={{minWidth: searchableFields.includes(header.id)? '8rem' : 'fit-content'}}
                                                >
                                                <span className='flex justify-left'>
                                                    <span
                                                        className={`tooltip mt-1.5 text-center xl:h-fit lg:h-14 ${sortUpsellingColum === header.id && 'text-mainBlue'}`}
                                                    >
                                                            {header.title}
                                                        </span>
                                                        <span
                                                            className={`${!(sortableFields.includes(header.id)) && 'opacity-0'}`}>
                                                            <p className={`cursor-pointer ${sortUpsellingColum === header.id && sortMethodUpselling === 'asc' ? 'text-mainBlue' : ''}`}
                                                               onClick={() => ascSort(header.id)}
                                                            >
                                                                <RiArrowUpSFill size='22px'/>
                                                            </p>
                                                            <p className={`-mt-3.5 cursor-pointer ${sortUpsellingColum === header.id && sortMethodUpselling === 'desc' ? 'text-mainBlue' : ''}`}
                                                               onClick={() => descSort(header.id)}
                                                            >
                                                                <RiArrowDownSFill size='22px'/>
                                                            </p>
                                                        </span>
                                                    </span>
                                                    <span
                                                        className={`${!(searchableFields.includes(header.id)) && 'hideDiv'}`}>
                                                        <input className='w-full h-8 px-2 py-3 search mb-7' type='text'
                                                               maxLength="50"
                                                            // value={header.id === 1 ? filter.a : header.id === 2 ? filter.b : header.id === 3 ? filter.c : header.id === 4 ? filter.d : header.id === 5 ? filter.e : header.id === 6 ? filter.f : filter.g}
                                                            // onChange={(e) => enableFilter(header.id, e.target.value)}
                                                               placeholder='Suche...'
                                                        />
                                                    </span>
                                                    <span
                                                        className={`${!(dropdownsearchFields.includes(header.id)) && 'hideDiv'}`}>
                                                         <select className='px-4 text-xs py-2 search rounded-md bg-white cursor-pointer mb-7'>
                                                            {
                                                                // watch('status') === 'Keine Information' &&
                                                                <option value=''>Status wählen</option>
                                                            }
                                                             {
                                                                 options?.map(op => (
                                                                     <option key={op.ID} value={op.title}>
                                                                         <img
                                                                             src={`${window.location.origin}/icons/${op.icon}`}/>
                                                                         <span className='ml-2'>{op.title}</span>
                                                                     </option>
                                                                 ))
                                                             }
                                                        </select>
                                                    </span>
                                                    <br/>
                                                    {
                                                        header.mouseOver?.length > 0 &&
                                                        <p className='tooltiptextInstantOver'>{header.mouseOver}</p>
                                                    }
                                                </th>
                                            ))
                                        }
                                        {/*<th scope="col" className="text-sm w-1/12 text-grey px-2"/>*/}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        loading &&
                                        <tr className='centerItemsAbsolute'>
                                            <td><ClipLoader size={50} color={'#b4b4b4'}/></td>
                                        </tr>
                                    }
                                    {
                                        data?.map((u) => (
                                            <UpsellingTable
                                                key={u.FP_ID}
                                                FirmaID={u.FP_ID}
                                                portal={portal}
                                                Firma={u.Firma}
                                                Closer={u.Closer}
                                                bav={u.bav}
                                                bkv={u.bkv}
                                                GehaltsExtras={u.GehaltsExtras}
                                                CLS={u.CLS}
                                                HRMT={u.HRMT}
                                                NBG={u.NBG}
                                                bbu={u.bbu}
                                                sortColumn={sortUpsellingColum}
                                                sortMethod={sortMethodUpselling}
                                            />
                                        ))
                                    }
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

export default Upselling