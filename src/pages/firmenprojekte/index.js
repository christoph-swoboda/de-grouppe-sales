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
import CsvExport from "./partial/csvFormat";
import {IoMdArrowDropdown} from "react-icons/io";

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
    const role = user.role === 'Internal' ? 'i' : user.role === 'External' ? 'e' : user.role === 'Controller' ? 'c' : 's'
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

    const [isOpen, setIsOpen] = useState(false);
    const [checkboxValues, setCheckboxValues] = useState({
        checkbox1: false,
        checkbox2: false,
        checkbox3: false,
        checkbox4: false,
        checkbox5: false,
    });

    const dropdownRef = useRef(null);

    useEffect(() => {
        const closeDropdown = (event) => {
            if (!dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('click', closeDropdown);

        return () => {
            document.removeEventListener('click', closeDropdown);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleCheckboxChange = (event) => {
        const { name, checked } = event.target;
        setCheckboxValues((prevState) => ({
            ...prevState,
            [name]: checked,
        }));
    };

    return (
        <>
            <div className={`dashboardContainer`}>
                <h2 className='text-left text-2xl pt-2 pb-4'>Firmenprojekt</h2>
                <div className='bg-white'>
                    <div className={`bg-white pt-3 pb-1 px-3 lg:flex sm:block`}>
                        {/*<ExcelExport all title={'Excel Export'} loading={loading} len={users?.length}/>*/}
                        <ExcelExport Gesamt title={'Excel Export Gesamt'} loading={loading} len={users?.length}/>
                        {/*<CsvExport Gesamt title={'Csv Export Gesamt'} loading={loading} len={users?.length}/>*/}
                        {/*<CsvExport all title={'Csv Export'} loading={loading} len={users?.length}/>*/}
                        <div
                            className={`${loading ? 'opacity-50' : ''} ${(users?.length === 0) && 'hideDiv'} flex justify-center m-1 cursor-pointer`}
                            onClick={setPrintState}>
                            <AiTwotonePrinter className='mr-1' size='25px' color={'#DB2955'}/>
                            <span className='mr-1 mb-2 text-grey text-sm'>Drucken</span>
                        </div>
                        <div className={`flex m-auto justify-center ml-64`}>
                            <select disabled={loading} onChange={(e) => setViewName(e.target.value)}
                                    className={`${(user?.role !== 'Internal' && user?.role !== 'Controller') && 'hideDiv'} ${loadingViews? 'hideDiv' : ''} justify-center w-fit rounded-md border border-offWhite shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
                                {
                                    views.map((v, i) => (
                                        <option key={i} disabled={i > 1} value={v.viewName}>
                                            {v.viewName}
                                        </option>
                                    ))
                                }

                            </select>
                            <button disabled={hasFilter} onClick={clearFilters}
                                    className={`${hasFilter && 'opacity-20 bg-white text-text'} ${loading? 'hideDiv' : ''} ml-1 justify-center w-full rounded-md border border-offWhite shadow-sm px-4 opacity-80 py-2 bg-cancel text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                            >
                                { !hasFilter? 'Alle Filter löschen' : 'Kein Filter'}
                            </button>
                            <div className={`float-right text-right ${loading && loadingViews? 'opacity-50 -mt-4' : ''} ${loading && !loadingViews? 'opacity-50' : ''}`} ref={dropdownRef}>
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
                                    <div style={{zIndex:99999}} className="mt-14 origin-top-right absolute right-4 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                                            <label className="flex items-center px-4 py-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="checkbox1"
                                                    className="mr-2"
                                                    checked={checkboxValues.checkbox1}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Checkbox 1
                                            </label>
                                            <label className="flex items-center px-4 py-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="checkbox2"
                                                    className="mr-2"
                                                    checked={checkboxValues.checkbox2}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Checkbox 2
                                            </label>
                                            <label className="flex items-center px-4 py-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="checkbox3"
                                                    className="mr-2"
                                                    checked={checkboxValues.checkbox3}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Checkbox 3
                                            </label>
                                            <label className="flex items-center px-4 py-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="checkbox4"
                                                    className="mr-2"
                                                    checked={checkboxValues.checkbox4}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Checkbox 4
                                            </label>
                                            <label className="flex items-center px-4 py-2 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    name="checkbox5"
                                                    className="mr-2"
                                                    checked={checkboxValues.checkbox5}
                                                    onChange={handleCheckboxChange}
                                                />
                                                Checkbox 5
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
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
                    <div className={`${loading?'hideDiv':''} absolute ${viewName==='Firmenprojekte'? 'left-14': 'left-0'}  ${viewName==='Firmenprojekte'? '-mt-16': '-mt-18'} -mt-14 pb-9 mx-10`}>
                        <div className='flex justify-center'>
                            <p className={`${(users?.length === 0) && 'hideDiv'} mr-2 text-sm text-grey mt-2`}>
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
                    </div>
                </div>
            </div>
        </>
    )
}

export default BestantList