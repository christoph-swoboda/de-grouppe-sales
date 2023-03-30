import React, {useEffect, useRef, useState} from "react";
import {AiTwotonePrinter} from "react-icons/ai";
import {BestantTableHeaders} from "../../dummyData/bestantTableHeaders";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {useStateValue} from "../../states/StateProvider";
import {useReactToPrint} from "react-to-print"
import ExcelExport from "./partial/excelFormat";
import BestandListDataSection from "../../components/bestandListDataSection";
import {BestandView2Headers} from "../../dummyData/bestandView2Headers";

const BestantList = () => {
    try {
        let user = JSON.parse(localStorage.user)
    } catch (e) {
        window.location.replace('/anmeldung')
    }
    const [printing, setPrinting] = useState(false)
    const [loading, setLoading] = useState(true);
    const [hasFilter, setHasFilter] = useState(false);
    const [loadingViews, setLoadingViews] = useState(false);
    const [rows, setRows] = useState('10');
    const [viewName, setViewName] = useState('Firmenprojekte');
    const [views, setViews] = useState([]);
    let PageSize = rows;
    const [{pageBestand, sortColumn, sortMethod, filterID, filter}, dispatch] = useStateValue();
    const [users, setUsers] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'))
    const userID = user.ID
    const role = user.role === 'Internal' ? 'i' : user.role === 'External' ? 'e' : 's'
    const [total, setTotal] = useState(0);
    const componentRef = useRef();

    useEffect(() => {
        dispatch({type: "SET_PAGE_BESTAND", item: 1})
    }, [viewName]);

    useEffect(() => {
        setLoadingViews(true)
        Api().get(`/getRoleViews/${role}`).then(res => {
            setViews(Object.values(res.data.views))
            setLoadingViews(false)
        }).catch(e => {
            setLoadingViews(false)
            toast.error('Etwas ist schief gelaufen!!')
        })
    }, [])

    useEffect(() => {
        let url = '/getBestands'
        if (viewName === 'Projekt-Tafel') {
            url = 'getBestands2'
        }
        const delayQuery = setTimeout(async () => {
            setLoading(true)
            let data = new FormData()
            data.append('userID', userID)
            data.append('rows', rows)
            data.append('page', pageBestand)
            data.append('sortColumn', sortColumn)
            data.append('sortMethod', sortMethod)
            data.append('filterID', JSON.stringify(filterID))
            data.append('filter', JSON.stringify(filter))

            Api().post(url, data).then(res => {
                setUsers(res.data.bestands)
                setTotal(Number(res.data?.bestands[0]?.totalCustomers))
                setLoading(false)
                if (printing && users?.length > 0 && rows === '10000') {
                    setTimeout(() => handlePrint(), 1);
                    setTimeout(() => setPrinting(false), 1);
                    setRows('10')
                }
            }).catch(e => {
                setLoading(false)
                toast.error('Etwas ist schief gelaufen!!')
            })
        }, filter ? 800 : 0)

        return () => clearTimeout(delayQuery)
    }, [rows, userID, pageBestand, sortColumn, sortMethod, filter, viewName])

    useEffect(() => {
        setLoading(true)
        clearFilters()
    }, [viewName]);

    useEffect(() => {
        const isNullUndefEmptyStr = Object.values(filter).every(value => {
            if (value === null || value === undefined || value === '') {
                return true;
            }
            return false;
        });
        if (isNullUndefEmptyStr) {
            setHasFilter(true)
        } else {
            setHasFilter(false)
        }
    }, [filter]);

    function clearFilters() {
        dispatch({type: "SET_SORTBESTANDFILTER", item: {a: null, b: null, c: null, d: null, e: null, f: null}})
        dispatch({type: "SET_SORTBESTANDFILTERID", item: {a: null, b: null, c: null, d: null, e: null, f: null}})
    }

    function setPageStates(e) {
        dispatch({type: "SET_PAGE_BESTAND", item: 1})
        setRows(e.target.value)
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    async function setPrintState() {
        setPrinting(true)
        setRows('10000')
    }

    return (
        <>
            <div className={`dashboardContainer`}>
                <h2 className='text-left text-2xl pt-5 pb-5'>Firmenprojekt</h2>
                <div className='bg-white'>
                    <div className={`bg-white pt-3 pb-1 px-3 lg:flex sm:block`}>
                        <ExcelExport all title={'Excel Export'} loading={loading} len={users?.length}/>
                        <ExcelExport Gesamt title={'Excel Export Gesamt'} loading={loading} len={users?.length}/>
                        <div
                            className={`${loading ? 'opacity-50' : ''} ${(users?.length === 0) && 'hideDiv'} flex justify-center m-1 cursor-pointer`}
                            onClick={setPrintState}>
                            <AiTwotonePrinter className='mr-1' size='25px' color={'#DB2955'}/>
                            <span className='mr-1 mb-2 text-grey text-sm'>Drucken</span>
                        </div>
                        <div className={`flex m-auto justify-center m-1`}>
                            <select disabled={loading} onChange={(e) => setViewName(e.target.value)}
                                    className={`${(user?.role !== 'Internal' && user?.role !== 'Controller') && 'hideDiv'} w-44 bg-transparent capitalize border border-offWhite px-3 py-1.5 rounded-lg text-sm`}>
                                {
                                    views.map((v, i) => (
                                        <option key={i} disabled={i > 1} value={v.viewName}>
                                            {v.viewName}
                                        </option>
                                    ))
                                }

                            </select>
                            <button disabled={hasFilter} onClick={clearFilters}
                                    className={`${hasFilter && 'opacity-0'} px-3 py-2 border border-offWhite text-cancel rounded-lg text-sm ml-3`}
                            >
                                Alle Filter löschen
                            </button>
                        </div>

                        <p className={`${(users?.length === 0) && 'hideDiv'}  text-sm text-grey ml-auto mt-2`}>
                            {pageBestand === 1 ? pageBestand : (1 + (Number(rows) * pageBestand)) - Number(rows)} bis {(users?.length < Number(rows)) ? users.length + Number(rows) < total ? users.length + (Number(rows) * pageBestand) - Number(rows) : total : (Number(rows) + (Number(rows) * pageBestand)) - Number(rows)} von {total} Einträge
                        </p>
                        <h2 className={`${(users?.length === 0) && 'hideDiv'}  text-sm text-grey ml-6 mt-2 ml-10`}>
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
                    <BestandListDataSection
                        users={users}
                        loading={loading}
                        printPDFRef={componentRef}
                        headers={viewName === 'Firmenprojekte' ? BestantTableHeaders : BestandView2Headers}
                        printing={printing}
                        sortColumn={sortColumn}
                        sortMethod={sortMethod}
                        total={total}
                        PageSize={PageSize}
                        filterID={filterID}
                        filter={filter}
                        view={viewName}
                    />
                </div>
            </div>
        </>
    )
}

export default BestantList