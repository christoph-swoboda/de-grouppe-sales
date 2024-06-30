import React, {useEffect, useState} from "react";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {RiArrowDownSFill, RiArrowUpSFill} from "react-icons/ri";
import {ClipLoader} from "react-spinners";
import {StorfalleHeaders} from "../../staticData/storfalleHeaders";
import StrofalleTable from "./partial/strofalleTable";
import {useStateValue} from "../../states/StateProvider";
import {formatDate} from '../../helper/formatDate'
import {AES, enc} from "crypto-js";
import {StorfalleHeadersDGG} from "../../staticData/storfalleHeadersDGG";
import Pagination from "../../components/pagination";

const Storfalle = () => {
    const [{
        sortColumnStorfalle,
        sortMethodStorfalle,
        secretKey,
        portal,
        pageStorfalle,
        filterStorfalle,
        filterIDStorfalle
    }, dispatch] = useStateValue();

    const searChableFields = portal==='dgg'? [1, 2, 4, 5, 7]: [1, 2, 4, 5, 6, 7]
    const sortableFields =  portal==='dgg'? [1, 2, 3, 4, 5, 6, 7, 8, 9]: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [headers, setHeaders] = useState([])
    const [superAdmin, setSuperAdmin] = useState('')
    const [rows, setRows] = useState('10');
    const [total, setTotal] = useState(0);
    let PageSize = rows;

    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const userID = user.ID
    const role = user.role === 'Internal' ? 'i' : user.role === 'ExtRUV' ? 'er' : user.role === 'ExtDGG' ? 'ed' : user.role === 'ManRUV' ? 'mr' : user.role === 'ManDGG' ? 'md' : 'c'


    useEffect(() => {
        const delayQuery = setTimeout(async () => {
        setLoading(true)
        setData([])
        if (portal) {
            if (portal === 'dgg') {
                setHeaders(StorfalleHeadersDGG)
            } else if (portal === 'ruv') {
                setHeaders(StorfalleHeaders)
            }
            try {
                let Data = new FormData
                Data.append('portal', portal)
                Data.append('userID', userID)
                Data.append('perPage', rows)
                Data.append('page', pageStorfalle)
                Data.append('sortMethod', sortMethodStorfalle)
                Data.append('sortColumn', sortColumnStorfalle)
                Data.append('filterID', JSON.stringify(filterIDStorfalle))
                Data.append('filter', JSON.stringify(filterStorfalle))

                Api().post(`sp_getDataStoerfaelle`, Data).then(res => {
                    setData(res.data)
                    setTotal(res.data[0]?.totalSF)
                    setLoading(false)
                }).catch(e => {
                    toast.error('Etwas ist schief gelaufen!!')
                    setLoading(false)
                })

            } catch (e) {
                console.log(e)
                // window.location.replace('/anmeldung')
            }
        }
        }, filterStorfalle ? 1500 : 0)

        return () => clearTimeout(delayQuery)

    }, [portal, pageStorfalle, rows, sortColumnStorfalle, sortMethodStorfalle, filterStorfalle, filterIDStorfalle]);

    useEffect(() => {
        dispatch({type: "SET_PAGE_STORFALLE", item: 1})
    }, [filterStorfalle]);

    function enableFilter(id, val) {
        console.log('id', id)
        if (id === 1) {
            dispatch({type: "SET_SORTSTORFALLEFILTER", item: {...filterStorfalle, a: val}})
            dispatch({type: "SET_SORTSTORFALLEFILTERID", item: {...filterIDStorfalle, a: 1}})
        }
        if (id === 2) {
            dispatch({type: "SET_SORTSTORFALLEFILTER", item: {...filterStorfalle, b: val}})
            dispatch({type: "SET_SORTSTORFALLEFILTERID", item: {...filterIDStorfalle, b: 2}})
        }
        if (id === 3) {
            dispatch({type: "SET_SORTSTORFALLEFILTER", item: {...filterStorfalle, c: val}})
            dispatch({type: "SET_SORTSTORFALLEFILTERID", item: {...filterIDStorfalle, c: 3}})
        }
        if (id === 4) {
            dispatch({type: "SET_SORTSTORFALLEFILTER", item: {...filterStorfalle, d: val}})
            dispatch({type: "SET_SORTSTORFALLEFILTERID", item: {...filterIDStorfalle, d: 4}})
        }
        if (id === 5) {
            dispatch({type: "SET_SORTSTORFALLEFILTER", item: {...filterStorfalle, e: val}})
            dispatch({type: "SET_SORTSTORFALLEFILTERID", item: {...filterIDStorfalle, e: 5}})
        }
        if (id === 6) {
            dispatch({type: "SET_SORTSTORFALLEFILTER", item: {...filterStorfalle, f: val}})
            dispatch({type: "SET_SORTSTORFALLEFILTERID", item: {...filterIDStorfalle, f: 6}})
        }
        if (id === 7) {
            dispatch({type: "SET_SORTSTORFALLEFILTER", item: {...filterStorfalle, g: val}})
            dispatch({type: "SET_SORTSTORFALLEFILTERID", item: {...filterIDStorfalle, g: 7}})
        }
    }

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

    function setPageStates(e) {
        dispatch({type: "SET_PAGE_STORFALLE", item: 1})
        setRows(e.target.value)
    }

    function portalSelect(e) {
        clearFilters()
        dispatch({type: 'SET_PORTAL', item: e.target.value})
        localStorage.setItem('portal', e.target.value)
    }

    function ascSort(id) {
        dispatch({type: "SET_SORT_COLUMN_STORFALLE", item: id})
        dispatch({type: "SET_SORT_STORFALLE_METHOD", item: 'asc'})
    }

    function descSort(id) {
        dispatch({type: "SET_SORT_COLUMN_STORFALLE", item: id})
        dispatch({type: "SET_SORT_STORFALLE_METHOD", item: 'desc'})
    }

    function clearFilters() {
        dispatch({
            type: "SET_SORTSTORFALLEFILTER",
            item: {a: null, b: null, c: null, d: null, e: null, f: null, g: null,}
        })
        dispatch({
            type: "SET_SORTSTORFALLEFILTERID",
            item: {a: null, b: null, c: null, d: null, e: null, f: null, g: null,}
        })
    }

    return (
        <div className='dashboardContainer'>
            <div className='flex justify-start items-center content-center pb-5'>
                <h2 className='text-2xl lg:text-left'> Störfälle</h2>
                {
                    (superAdmin === '1' || role === 'i' || role === 'c') &&
                    <div className='flex justify-start items-center w-fit bg-transparent py-2 px-4 ml-2 rounded-sm'>
                        <p className='w-fit mr-2 text-grey'>Portal: </p>
                        <select
                            disabled={loading}
                            className='col-span-2 text-center text-mainBlue mx-auto pr-1 bg-transparent border border-offWhite rounded-sm lg:w-fit'
                            onChange={portalSelect}
                            value={portal}
                        >
                            <option selected value='dgg'>DGG</option>
                            <option value='ruv'>R+V</option>
                        </select>
                    </div>
                }
            </div>
            {/*<div className={`bg-white pt-3 pb-1 px-3 lg:flex sm:block`}>*/}
            {/*</div>*/}
            <div className="flex flex-col p-10 bg-white" style={{height: '75vh'}}>
                <div className="overflow-x-auto overflow-y-hidden sm:-mx-6 lg:-mx-8">
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
                                                    style={{minWidth: searChableFields.includes(header.id) ? '8rem' : 'fit-content'}}
                                                >
                                                <span className='flex justify-left'>
                                                    <span
                                                        className={`tooltip mt-1.5 text-center xl:h-fit lg:h-14 ${sortColumnStorfalle === header.id && 'text-mainBlue'}`}
                                                    >
                                                            {header.title}
                                                        </span>
                                                        <span
                                                            className={`${!(sortableFields.includes(header.id)) && 'opacity-0'}`}>
                                                            <p className={`cursor-pointer ${sortColumnStorfalle === header.id && sortMethodStorfalle === 'asc' ? 'text-mainBlue' : ''}`}
                                                               onClick={() => ascSort(header.id)}
                                                            >
                                                                <RiArrowUpSFill size='22px'/>
                                                            </p>
                                                            <p className={`-mt-3.5 cursor-pointer ${sortColumnStorfalle === header.id && sortMethodStorfalle === 'desc' ? 'text-mainBlue' : ''}`}
                                                               onClick={() => descSort(header.id)}
                                                            >
                                                                <RiArrowDownSFill size='22px'/>
                                                            </p>
                                                        </span>
                                                    </span>
                                                    <span
                                                        className={`${!(searChableFields.includes(header.id)) && 'hideDiv'}`}>
                                                        <input className={`w-full h-2 px-2 py-3 search mb-4`} type='text'
                                                               maxLength="50"
                                                               value={header.id === 1 ? filterStorfalle.a : header.id === 2 ? filterStorfalle.b : header.id === 3 ? filterStorfalle.c : header.id === 4 ? filterStorfalle.d : header.id === 5 ? filterStorfalle.e :header.id === 6 ? filterStorfalle.f: header.id === 7 && filterStorfalle.g}
                                                               onChange={(e) => enableFilter(header.id, e.target.value)}
                                                               placeholder='Suche...'
                                                        />
                                                    </span>
                                                    {/*<br/>*/}
                                                    <span  className={`${header.title==='MA' && 'opacity-0'}`}>
                                                      <input className='w-full mb-4 opacity-0' type='text'
                                                      />
                                                    </span>
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
                                            <StrofalleTable
                                                key={u.FP_ID}
                                                portal={portal}
                                                FirmaKurz={u.FirmaKurz}
                                                Firma={u.Firma}
                                                FirmaID={u.FP_ID}
                                                ZustFKB={u.ZustFKB}
                                                ZustBerater={u.ZustBerater}
                                                DGAPIKAM={u.DGAPIKAM}
                                                Bank={u.Bank}
                                                MA={u.MA}
                                                PStatus={u.PStatus}
                                                Bemerkung={u.Bemerkung}
                                                PDatum={formatDate(u.PDatum, false)}
                                                StorfallDatum={formatDate(u.StörfallDatum, false)}
                                                sortColumn={sortColumnStorfalle}
                                                sortMethod={sortMethodStorfalle}
                                            />
                                        ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`flex justify-end gap-20 ${loading && 'opacity-0'}`}>
                    <div className={`mt-10 ${loading && 'opacity-0'}`}>
                        {
                            data.length > 0 &&
                            <Pagination
                                className="pagination-bar"
                                currentPage={pageStorfalle}
                                totalCount={total}
                                pageSize={PageSize}
                                onPageChange={pageNo => dispatch({
                                    type: "SET_PAGE_STORFALLE",
                                    item: pageNo
                                })}
                            />
                        }
                    </div>
                    <p className={`${(data?.length === 0) && 'hideDiv'} mr-2 text-sm text-grey ml-10 mt-10`}>
                        {pageStorfalle === 1 ? pageStorfalle : (1 + (Number(rows) * pageStorfalle)) - Number(rows)} bis {(data?.length < Number(rows)) ? data.length + Number(rows) < total ? data.length + (Number(rows) * pageStorfalle) - Number(rows) : total : (Number(rows) + (Number(rows) * pageStorfalle)) - Number(rows)} von {total} Einträge
                    </p>
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
                </div>

            </div>
        </div>
    )
}

export default Storfalle