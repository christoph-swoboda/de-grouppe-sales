import React, {useEffect, useState} from "react";
import {RiArrowDownSFill, RiArrowUpSFill} from "react-icons/ri";
import {ClipLoader} from "react-spinners";
import FirmenprojekteView from "./firmenprojekteView";
import Pagination from "../../../components/pagination";
import {useStateValue} from "../../../states/StateProvider";
import ProjectTafelView from "./projekt-tafelView";
import {formatDate} from "../../../helper/formatDate";
import VertriebView from "./vertriebView";
import DgapiView from "./dgapiView";
import BeratungView from "./beratungView";
import ExcelExport from "./excelFormat";
import {AiTwotonePrinter} from "react-icons/ai";
import {IoMdArrowDropdown} from "react-icons/io";

const BestandListDataSection = ({
                                    users,
                                    loading,
                                    printPDFRef,
                                    headers,
                                    portal,
                                    printing,
                                    sortColumn,
                                    sortMethod,
                                    total,
                                    PageSize,
                                    filterID,
                                    filter,
                                    view,
                                    views,
                                    isOpen,
                                    toggleDropdown,
                                    dropdownRef,
                                    setViewName,
                                    clearFilters,
                                    hasFilter,
                                    setPrintState,
                                    loadingViews,
                                    user,
                                    url,
                                    count,
                                    rows,
                                    portalChanged
                                }) => {
    const [{pageBestand, dateFilter}, dispatch] = useStateValue();
    const searChableFields = view === 'Firmenprojekte' ? [1, 2, 3, 4, 5, 7] : [1, 2, 4, 5, 6, 7]
    const checkboxFields = (view === 'Firmenprojekte' || view === 'Projekt-Tafel') ? [] : view === 'Auswertung Vertrieb' ? [8, 9, 10, 11, 12, 13, 14] : view === 'Auswertung DGAPI' ? [8, 9, 10, 11, 12, 13, 14] : [8, 9, 10, 11]
    const sortableFields = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]
    const [selectedView, setSelectedView] = useState(views[0]?.viewName);

    useEffect(() => {
        if (filter.h === null) {
            dispatch({type: "SET_SORTBESTANDFILTER", item: {...filter, h: 1}})
            dispatch({type: "SET_SORTBESTANDFILTERID", item: {...filterID, h: 111}})
        }
    }, [filter]);


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
        if (id === 6) {
            dispatch({type: "SET_SORTBESTANDFILTER", item: {...filter, f: val}})
            dispatch({type: "SET_SORTBESTANDFILTERID", item: {...filterID, f: 6}})
        }
        if (id === 7) {
            dispatch({type: "SET_SORTBESTANDFILTER", item: {...filter, g: val}})
            dispatch({type: "SET_SORTBESTANDFILTERID", item: {...filterID, g: 7}})
        }
        if (id === 111) {
            dispatch({type: "SET_SORTBESTANDFILTER", item: {...filter, h: val}})
            dispatch({type: "SET_SORTBESTANDFILTERID", item: {...filterID, h: 111}})
        }
        if (id === 112) {
            dispatch({type: "SET_SORTBESTANDFILTER", item: {...filter, i: val}})
            dispatch({type: "SET_SORTBESTANDFILTERID", item: {...filterID, i: 112}})
        }
        if (id === 113) {
            dispatch({type: "SET_SORTBESTANDFILTER", item: {...filter, j: val}})
            dispatch({type: "SET_SORTBESTANDFILTERID", item: {...filterID, j: 113}})
        }
    }

    function enableDateFilter(id, value) {
        dispatch({type: "SET_DATEFILTER", item: {id: id, value: value}})
        dispatch({type: "SET_SORTBESTANDCOLUMN", item: id})
        dispatch({type: "SET_SORTBESTANDMETHOD", item: 'desc'})
    }

    useEffect(() => {
        portalChanged()
        if (portal === 'dgg') {
            setSelectedView(views[0]?.viewName);
        }
    }, [portal, views, portalChanged]);

    const handleViewChange = (e) => {
        setSelectedView(e.target.value);
        setViewName(e.target.value)
    };

    return (
        <div>
            <div className={`bg-white pt-3 pb-1 px-3 lg:flex sm:block`}>
                <ExcelExport all url={url} count={count} rows={rows} title={'Excel Export'} loading={loading}
                             len={users?.length} portal={portal}/>
                <ExcelExport Gesamt url={url} count={count} rows={rows} title={'Excel Export Gesamt'} loading={loading}
                             len={users?.length} portal={portal}/>
                {/*<CsvExport Gesamt title={'Csv Export Gesamt'} loading={loading} len={users?.length}/>*/}
                {/*<CsvExport all title={'Csv Export'} loading={loading} len={users?.length}/>*/}
                <div
                    className={`${loading ? 'opacity-50' : 'opacity-0'} ${(users?.length === 0) && 'hideDiv'} flex justify-center m-1 cursor-pointer`}
                    onClick={setPrintState}>
                    <AiTwotonePrinter className='mr-1' size='25px' color={'#DB2955'}/>
                    <span className='mr-1 mb-2 text-grey text-sm'>Drucken</span>
                </div>
                <div className={`flex m-auto justify-center ml-64`}>
                    <select disabled={loading}
                            value={selectedView} onChange={handleViewChange}
                            className={`${(user?.role !== 'Internal' && user?.role !== 'Controller') && 'hideDiv'} ${loadingViews ? 'hideDiv' : ''} justify-center w-fit rounded-md border border-offWhite shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
                        {
                            views.map((v, i) => (
                                <option key={i} disabled={portal === 'dgg' ? i > 0 : i > 4} value={v.viewName}>
                                    {v.viewName}
                                </option>
                            ))
                        }

                    </select>
                    <button disabled={hasFilter} onClick={clearFilters}
                            className={`${hasFilter && 'hideDiv bg-white text-text'} ${loading ? 'hideDiv' : ''} ml-1 justify-center w-full rounded-md border border-offWhite shadow-sm px-4 opacity-80 py-2 bg-cancel text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                    >
                        {!hasFilter ? 'Such-Filter zurücksetzen' : 'Kein Suche Filter'}
                    </button>
                    <div
                        className={`float-right text-right ${loading && loadingViews ? 'opacity-50 -mt-4' : ''} ${loading && !loadingViews ? 'opacity-50' : ''}`}
                        ref={dropdownRef}>
                        <div className='absolute right-16'>
                            <button
                                type="button"
                                disabled={loading}
                                className="inline-flex justify-center w-full rounded-md border border-offWhite shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                onClick={toggleDropdown}
                            >
                                Filter
                                <span><IoMdArrowDropdown/></span>
                            </button>
                        </div>

                        {isOpen && (
                            <div style={{zIndex: 99999}}
                                 className="mt-14 origin-top-right absolute right-4 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                <div className="py-1" role="menu" aria-orientation="vertical"
                                     aria-labelledby="options-menu">
                                    <label className="flex items-center px-4 py-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="laufende"
                                            className="mr-2"
                                            defaultChecked={true}
                                            disabled={loading}
                                            value={filter.h}
                                            onChange={(e) => enableFilter(111, e.target.checked ? 1 : 0)}
                                        />
                                        laufende Projekte
                                    </label>
                                    <label className="flex items-center px-4 py-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="beendete"
                                            className="mr-2"
                                            disabled={loading}
                                            checked={filter.i === 1}
                                            onChange={(e) => enableFilter(112, e.target.checked ? 1 : 0)}
                                        />
                                        beendete Projekte
                                    </label>
                                    <label className="flex items-center px-4 py-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="abgesagte"
                                            className="mr-2"
                                            disabled={loading}
                                            checked={filter.j === 1}
                                            onChange={(e) => enableFilter(113, e.target.checked ? 1 : 0)}
                                        />
                                        abgesagte Projekte
                                    </label>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8"
                         style={view === 'Firmenprojekte' ? {minHeight: '60vh'} : {minHeight: '60vh'}}>
                        <div className="overflow-hidden pt-1">
                            {
                                (users?.length === 0 && !loading) &&
                                <div className='centerItemsAbsolute'>
                                    <h2 className='text-2xl text-text font-bold'>
                                        Es wurden keine Daten zu Ihrer Suche gefunden.
                                    </h2>
                                    <h2 className='text-2xl text-text font-bold'>
                                        Bitte prüfen Sie ggf. die Filter-Einstellungen.
                                    </h2>
                                </div>
                            }
                            <div className='overflow-x-hidden table-wrp block' ref={printPDFRef}
                                 style={view === 'Firmenprojekte' ? {maxHeight: '60vh'} : {maxHeight: '60vh'}}>
                                <table className='min-w-full text-left bg-white' id="table-to-xls">
                                    <thead
                                        className="whitespace-nowrap bg-white border-y border-silver border-x-0 sticky top-0">
                                    <tr>
                                        {
                                            !loading &&
                                            headers.map(header => (
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
                                                        className={`${!(searChableFields.includes(header.id)) && 'hideDiv'}`}>
                                                        <input className='w-full h-2 px-2 py-3 search mb-4' type='text'
                                                               hidden={printing}
                                                               maxLength="50"
                                                               value={header.id === 1 ? filter.a : header.id === 2 ? filter.b : header.id === 3 ? filter.c : header.id === 4 ? filter.d : header.id === 5 ? filter.e : header.id === 6 ? filter.f : filter.g}
                                                               onChange={(e) => enableFilter(header.id, e.target.value)}
                                                               placeholder='Suche...'
                                                        />
                                                    </span>
                                                    <span
                                                        className={`${!(checkboxFields.includes(header.id)) && 'hideDiv'} cursor-pointer`}>
                                                            <input className='w-full mb-4' type='radio'
                                                                   hidden={printing}
                                                                   checked={dateFilter.id === header.id && dateFilter.value}
                                                                   onChange={(e) => enableDateFilter(header.id, e.target.checked)}
                                                            />
                                                    </span>
                                                    <span className={`${header.title === 'MA' && 'opacity-0'}`}>
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
                                        (!loading && view === 'Firmenprojekte' && portal==='ruv') ?
                                            users?.map((u, index) => (
                                                <FirmenprojekteView
                                                    key={index}
                                                    FirmaKurz={u.FirmaKurz}
                                                    FirmaID={u.FP_ID}
                                                    FBKBank={u.FBKBank}
                                                    ZustBerater={u.ZustFKB}
                                                    Bank={u.Bank}
                                                    RegioBereich={u.RegioBereich}
                                                    MA={u.MA}
                                                    PStatus={u.PStatus}
                                                    Note={u.Note}
                                                    date={u.Datum}
                                                    printing={printing}
                                                    portal={portal}
                                                />
                                            ))   :
                                            (!loading && view === 'Firmenprojekte' && portal==='dgg') ?
                                            users?.map((u, index) => (
                                                <FirmenprojekteView
                                                    key={index}
                                                    FirmaKurz={u.FirmaKurz}
                                                    FirmaID={u.FP_ID}
                                                    FBKBank={u.ZustADM}
                                                    ZustBerater={u.Firma}
                                                    Bank={u.MA}
                                                    RegioBereich={u.ZustVP}
                                                    MA={u.PStatus}
                                                    PStatus={u.Datum}
                                                    Note={u.Note}
                                                    date={null}
                                                    printing={printing}
                                                    portal={portal}
                                                />
                                            ))
                                            : (!loading && view === 'Projekt-Tafel') ?
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
                                                        portal={portal}
                                                    />
                                                )) : (!loading && view === 'Auswertung DGAPI') ?
                                                    users?.map((u, index) => (
                                                        <DgapiView
                                                            key={index}
                                                            FirmaID={u.FP_ID}
                                                            FirmaKurz={u.FirmaKurz}
                                                            Firmenname={u.Firmenname}
                                                            ZustandigerFKB={u.ZuständigerFKB}
                                                            BD={u.BD}
                                                            FD={u.FD}
                                                            DGAPIKAM={u.DGAPIKAM}
                                                            MA={u.MA}
                                                            Auftrag_DL_Paket={u.Auftr_DL_P}
                                                            DL_Kanzl_Auftrag_versandt={u.DL_KA_vers}
                                                            DL_Kanzl_Auftrag_zurück={u.DL_KA_zur}
                                                            FP_Grundl_abgeschlossen={u.FP_Grdl_abg}
                                                            FP_Def_vollständig={u.FP_Def_vollst}
                                                            CIB_abgeschlossen={u.CIB_abg}
                                                            FP_Freischaltung={u.FP_Freischltg}
                                                            Note={u.Note}
                                                            printing={printing}
                                                            portal={portal}
                                                        />
                                                    )) : (!loading && view === 'Auswertung Beratung') ?
                                                        users?.map((u, index) => (
                                                            <BeratungView
                                                                key={index}
                                                                FirmaID={u.FP_ID}
                                                                FirmaKurz={u.FirmaKurz}
                                                                Firmenname={u.Firmenname}
                                                                ZustandigerFKB={u.ZuständigerFKB}
                                                                BD={u.BD}
                                                                FD={u.FD}
                                                                DGAPIKAM={u.DGAPIKAM}
                                                                MA={u.MA}
                                                                FP_Freischaltung={u.FP_Freischaltung}
                                                                FP_Briefing_erfolgt={u.FP_Briefing_erfolgt}
                                                                FP_Start_fix={u.FP_Start_fix}
                                                                FP_Abschluss_Umsetzung={u.FP_Abschluss_Umsetzung}
                                                                Note={u.Note}
                                                                printing={printing}
                                                                portal={portal}
                                                            />
                                                        ))
                                                        : (!loading && view === 'Auswertung Vertrieb') &&
                                                        users?.map((u, index) => (
                                                            <VertriebView
                                                                key={index}
                                                                FirmaID={u.FP_ID}
                                                                FirmaKurz={u.FirmaKurz}
                                                                Firmenname={u.Firmenname}
                                                                ZustandigerFKB={u.ZuständigerFKB}
                                                                BD={u.BD}
                                                                FD={u.FD}
                                                                DGAPIKAM={u.DGAPIKAM}
                                                                MA={u.MA}
                                                                Überl_R_V={u.Überl_R_V}
                                                                Ersttermin={u.Ersttermin}
                                                                Analyseb_vollst={u.Analyseb_vollst}
                                                                SK_Termin={u.SK_Termin}
                                                                iForm_DGAPI_AM={u.iForm_DGAPI_AM}
                                                                Auftrag_DL_Paket={u.Auftrag_DL_Paket}
                                                                iForm_Termin={u.iForm_Termin}
                                                                Note={u.Note}
                                                                printing={printing}
                                                                portal={portal}
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
                        </div>
                    </div>
                </div>
                <div className={`centerItemsRelative mt-5 mb-2 pb-2 ${loading && 'opacity-0'}`}>
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
    )
}

export default BestandListDataSection