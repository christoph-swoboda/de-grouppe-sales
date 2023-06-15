import React from "react";
import {RiArrowDownSFill, RiArrowUpSFill} from "react-icons/ri";
import {ClipLoader} from "react-spinners";
import FirmenprojekteView from "../pages/bestantList/partial/firmenprojekteView";
import Pagination from "./pagination";
import {useStateValue} from "../states/StateProvider";
import ProjectTafelView from "../pages/bestantList/partial/projekt-tafelView";
import {formatDate} from "../helper/formatDate";

const BestandListDataSection = ({
                                    users,
                                    loading,
                                    printPDFRef,
                                    headers,
                                    printing,
                                    sortColumn,
                                    sortMethod,
                                    total,
                                    PageSize,
                                    filterID,
                                    filter,
                                    view
                                }) => {
    const [{pageBestand}, dispatch] = useStateValue();
    const searChableFields = [1, 2, 3, 4, 5, 7]
    const sortableFields = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]

    function ascSort(id) {
        dispatch({type: "SET_SORTBESTANDCOLUMN", item: id})
        dispatch({type: "SET_SORTBESTANDMETHOD", item: 'asc'})
    }

    function descSort(id) {
        dispatch({type: "SET_SORTBESTANDCOLUMN", item: id})
        dispatch({type: "SET_SORTBESTANDMETHOD", item: 'desc'})
    }

    function enableFilter(id, val) {
        if (id === 1) {
            dispatch({type: "SET_SORTBESTANDFILTER", item: {...filter, a: val}})
            dispatch({type: "SET_SORTBESTANDFILTERID", item: {...filterID, a: 1}})
        }
        if (id === 2) {
            dispatch({type: "SET_SORTBESTANDFILTER", item: {...filter, b: val}})
            dispatch({type: "SET_SORTBESTANDFILTERID", item: {...filterID, b: 2}})
        }
        if (id === 3) {
            dispatch({type: "SET_SORTBESTANDFILTER", item: {...filter, c: val}})
            dispatch({type: "SET_SORTBESTANDFILTERID", item: {...filterID, c: 3}})
        }
        if (id === 4) {
            dispatch({type: "SET_SORTBESTANDFILTER", item: {...filter, d: val}})
            dispatch({type: "SET_SORTBESTANDFILTERID", item: {...filterID, d: 4}})
        }
        if (id === 5) {
            dispatch({type: "SET_SORTBESTANDFILTER", item: {...filter, e: val}})
            dispatch({type: "SET_SORTBESTANDFILTERID", item: {...filterID, e: 5}})
        }
        if (id === 7) {
            dispatch({type: "SET_SORTBESTANDFILTER", item: {...filter, f: val}})
            dispatch({type: "SET_SORTBESTANDFILTERID", item: {...filterID, f: 7}})
        }
    }

    return (
        <div className="flex flex-col">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8" style={{minHeight: '50vh'}}>
                    <div className="overflow-hidden">
                        {
                            (users?.length === 0 && !loading) &&
                            <div className='centerItemsAbsolute'>
                                <h2 className='text-2xl text-text font-bold'>Entschuldigung, keine Daten
                                    gefunden</h2>
                            </div>
                        }
                        <div ref={printPDFRef}>
                            <table className='min-w-full text-left bg-white' id="table-to-xls">
                                <thead className="whitespace-nowrap border-y border-silver border-x-0">
                                <tr>
                                    {
                                        !loading &&
                                        headers.map(header => (
                                            <th key={header.id} scope="col"
                                                className="text-sm text-grey pl-1.5"
                                                style={{minWidth: searChableFields.includes(header.id) ? '8rem' : 'fit-content'}}
                                            >
                                                    <span className='flex justify-left'>
                                                          <span
                                                              className={`tooltip mt-1.5 text-center xl:h-fit lg:h-14 ${sortColumn === header.id && 'text-mainBlue'}`}
                                                          >
                                                            {header.title}
                                                        </span>
                                                        <span hidden={printing}
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
                                                    className={`${!(searChableFields.includes(header.id)) && 'opacity-0'}`}>
                                                        <input className='w-full h-2 px-2 py-3 search mb-4' type='text'
                                                               hidden={printing}
                                                               maxLength="50"
                                                               value={header.id === 1 ? filter.a : header.id === 2 ? filter.b : header.id === 3 ? filter.c : header.id === 4 ? filter.d : header.id === 5 ? filter.e : filter.f}
                                                               onChange={(e) => enableFilter(header.id, e.target.value)}
                                                               placeholder='Suche...'
                                                        />
                                            </span>
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
                                    (!loading && view === 'Firmenprojekte') ?
                                        users?.map((u, index) => (
                                            <FirmenprojekteView
                                                key={index}
                                                FirmaKurz={u.FirmaKurz}
                                                FirmaID={u.FP_ID}
                                                FBKBank={u.FBKBank}
                                                ZustBerater={u.ZustBerater}
                                                Bank={u.Bank}
                                                RegioBereich={u.RegioBereich}
                                                MA={u.MA}
                                                PStatus={u.PStatus}
                                                Note={u.Note}
                                                date={u.Datum}
                                                printing={printing}
                                            />
                                        ))
                                        : (!loading && view === 'Projekt-Tafel') &&
                                        users?.map((u, index) => (
                                            <ProjectTafelView
                                                key={index}
                                                FirmaID={u.FP_ID}
                                                FirmaKurz={u.FirmaKurz}
                                                Firmenname={u.Firmenname}
                                                ZustandigerFKB={u.ZuständigerFKB}
                                                BD={u.BD}
                                                FD={u.FD}
                                                DGAPIKAM={u.DGAPIKAM}
                                                MA={u.MA}
                                                DL_Kzl_vollst={u.DL_Kzl_vollst}
                                                Projtd_vollst={u.Projtd_vollst}
                                                Projtd_abge={u.Projtd_abge}
                                                AA_FA_hin={u.AA_FA_hin}
                                                StSvGA_erst={u.StSvGA_erst}
                                                ArTfGA_erst={u.ArTfGA_erst}
                                                ProjStart={u.ProjStart}
                                                MAV_an_FKB={u.MAV_an_FKB}
                                                MAB_fertig={u.MAB_fertig}
                                                Note={u.Note}
                                                printing={printing}
                                            />
                                        ))
                                }
                                </tbody>
                            </table>
                            <div className={`${!printing && 'hideDiv'} text-center mt-6`}>
                                <p className='font-bold text-mainBlue'>{total} Zeilen gedruckt</p>
                                <p className='text-mainBlue'>{'Firmenprojekte -' + formatDate(new Date(), true)}</p>
                            </div>
                        </div>
                        <div className={`centerItemsRelative mt-3 mb-2 ${loading && 'opacity-0'}`}>
                            {
                                users.length > 0 &&
                                <Pagination
                                    className="pagination-bar"
                                    currentPage={pageBestand}
                                    totalCount={total}
                                    pageSize={PageSize}
                                    onPageChange={pageNo => dispatch({
                                        type: "SET_PAGE_BESTAND",
                                        item: pageNo
                                    })}
                                />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BestandListDataSection