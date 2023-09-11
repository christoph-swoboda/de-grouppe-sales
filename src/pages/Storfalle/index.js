import React, {useState, useEffect} from "react";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {RiArrowDownSFill, RiArrowUpSFill} from "react-icons/ri";
import {ClipLoader} from "react-spinners";
import {StorfalleHeaders} from "../../staticData/storfalleHeaders";
import StrofalleTable from "./partial/strofalleTable";
import {useStateValue} from "../../states/StateProvider";
import {formatDate} from '../../helper/formatDate'
import ExcelExport from "../firmenprojekte/partial/excelFormat";
import {AiTwotonePrinter} from "react-icons/ai";
import {IoMdArrowDropdown} from "react-icons/io";

const Storfalle = () => {

    try {
        let user = localStorage.user
    } catch (e) {
        window.location.replace('/anmeldung')
    }

    const searChableFields = []
    const sortableFields = []
    const [loading, setLoading]=useState(true)
    const [data, setData]=useState([])
    const [{sortColumn, sortMethod}, dispatch] = useStateValue();

    useEffect(() => {
        Api().get('sp_getDataStoerfaelle').then(res => {
            setData(res.data)
            setLoading(false)
        }).catch(e => {
            toast.error('Etwas ist schief gelaufen!!')
            setLoading(false)
        })
    }, []);

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
            <h2 className='text-2xl lg:text-left mb-3'>Störfälle</h2>
            {/*<div className={`bg-white pt-3 pb-1 px-3 lg:flex sm:block`}>*/}
            {/*</div>*/}
            <div className="flex flex-col p-10 bg-white">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8"
                         style={{minHeight: '60vh'}}>
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
                                            StorfalleHeaders.map(header => (
                                                <th key={header.id} scope="col"
                                                    className="text-sm text-grey pl-1.5 tooltip"
                                                    style={{minWidth: searChableFields.includes(header.id) ? '8rem' : 'fit-content'}}
                                                >
                                                <span className='flex justify-left'>
                                                    <span
                                                        className={`tooltip mt-1.5 text-center xl:h-fit lg:h-14 ${sortColumn === header.id && 'text-mainBlue'}`}
                                                    >
                                                            {header.title}
                                                        </span>
                                                        <span
                                                              className={`${!(sortableFields.includes(header.id)) && 'opacity-0'}`}>
                                                            <p className={`cursor-pointer ${sortColumn === header.id && sortMethod === 'asc' ? 'text-mainBlue' : ''}`}
                                                               onClick={() => ascSort(header.id)}
                                                            >
                                                                <RiArrowUpSFill size='22px'/>
                                                            </p>
                                                            <p className={`-mt-3.5 cursor-pointer ${sortColumn === header.id && sortMethod === 'desc' ? 'text-mainBlue' : ''}`}
                                                               onClick={() => descSort(header.id)}
                                                            >
                                                                <RiArrowDownSFill size='22px'/>
                                                            </p>
                                                        </span>
                                                    </span>
                                                    <span
                                                        className={`${!(searChableFields.includes(header.id)) && 'hideDiv'}`}>
                                                        <input className='w-full h-2 px-2 py-3 search mb-4' type='text'
                                                               maxLength="50"
                                                               // value={header.id === 1 ? filter.a : header.id === 2 ? filter.b : header.id === 3 ? filter.c : header.id === 4 ? filter.d : header.id === 5 ? filter.e : header.id === 6 ? filter.f : filter.g}
                                                               // onChange={(e) => enableFilter(header.id, e.target.value)}
                                                               placeholder='Suche...'
                                                        />
                                                    </span>
                                                    <br/>
                                                    {/*<span  className={`${header.title==='MA' && 'opacity-0'}`}>*/}
                                                    {/*  <input className='w-full mb-4 opacity-0' type='text'*/}
                                                    {/*  />*/}
                                                    {/*</span>*/}
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
                                            data?.map((u, index) => (
                                                <StrofalleTable
                                                    key={index}
                                                    FirmaKurz={u.FirmaKurz}
                                                    Firma={u.Firma}
                                                    FirmaID={u.FP_ID}
                                                    ZustFKB={u.ZustFKB}
                                                    Bank={u.Bank}
                                                    MA={u.MA}
                                                    PStatus={u.PStatus}
                                                    Bemerkung={u.Bemerkung}
                                                    PDatum={formatDate(u.PDatum, false)}
                                                    StorfallDatum={formatDate(u.StörfallDatum, false)}
                                                    sortColumn={sortColumn}
                                                    sortMethod={sortMethod}
                                                />
                                            ))
                                    }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`text-center flex justify-center mt-4`}>
                    <p className='font-bold text-text border border-whiteDark px-5 py-2 w-fit rounded-md'>{data[0]?.totalSF} Gesamtprojekte</p>
                </div>
            </div>
        </div>
    )
}

export default Storfalle