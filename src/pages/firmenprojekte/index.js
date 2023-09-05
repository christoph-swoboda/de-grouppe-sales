import React, {useEffect, useRef, useState} from "react";
import {BestandViewHeaders} from "../../dummyData/bestandViewHeaders";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {useStateValue} from "../../states/StateProvider";
import {useReactToPrint} from "react-to-print"
import BestandListDataSection from "../../components/bestandListDataSection";
import {BestandView2Headers} from "../../dummyData/bestandView2Headers";
import {AES, enc} from "crypto-js";
import {BestandView3Headers} from "../../dummyData/bestandView3Headers";
import {BestandView4Headers} from "../../dummyData/bestandView4Headers";
import {BestandView5Headers} from "../../dummyData/bestandView5Headers";

const BestantList = () => {
    try {
        let user = localStorage.user
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
    const [{pageBestand, sortColumn, sortMethod, filterID, filter, secretKey}, dispatch] = useStateValue();
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const componentRef = useRef();

    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const userID = user.ID
    const role = user.role === 'Internal' ? 'i' : user.role === 'External' ? 'e' : user.role === 'Controller' ? 'c' : 's'

    useEffect(() => {
        dispatch({type: "SET_PAGE_BESTAND", item: 1})
    }, [viewName, filter]);

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
        } else if (viewName === 'Auswertung Vertrieb') {
            url = 'getBestands3'
        } else if (viewName === 'Auswertung DGAPI') {
            url = 'getBestands4'
        } else if (viewName === 'Auswertung Beratung') {
            url = 'getBestands5'
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
        const keys = Object.keys(filter);
        const keysToRestore = keys.slice(-3);
        const valuesToRestore = keysToRestore.map(key => ({ [key]: filter[key] }));
        keysToRestore.forEach(key => delete filter[key]);
        const isNullUndefEmptyStr = Object.values(filter).every(value => {
            return value === null || value === undefined || value === '';
        });
        if (isNullUndefEmptyStr) {
            setHasFilter(true)
        } else {
            setHasFilter(false)
        }
        valuesToRestore.forEach(valueObj => {
            const key = Object.keys(valueObj)[0];
            filter[key] = valueObj[key];
        });
    }, [filter]);

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

    function clearFilters() {
        dispatch({type: "SET_SORTBESTANDFILTER", item: {a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: 1, i: null, j: null}})
        dispatch({type: "SET_SORTBESTANDFILTERID", item: {a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: 111, i: null, j: null}})

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
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <div className={`dashboardContainer`}>
                <h2 className='text-left text-2xl pt-2 pb-4'>Firmenprojekt</h2>
                <div className='bg-white'>
                    <BestandListDataSection
                        views={views}
                        setPrintState={setPrintState}
                        hasFilter={hasFilter}
                        clearFilters={clearFilters}
                        setViewName={setViewName}
                        dropdownRef={dropdownRef}
                        toggleDropdown={toggleDropdown}
                        isOpen={isOpen}
                        user={user}
                        loadingViews={loadingViews}
                        users={users}
                        loading={loading}
                        printPDFRef={componentRef}
                        headers={viewName === 'Firmenprojekte' ? BestandViewHeaders : viewName === 'Projekt-Tafel' ? BestandView2Headers : viewName === 'Auswertung Vertrieb' ? BestandView3Headers : viewName === 'Auswertung DGAPI' ? BestandView4Headers : BestandView5Headers}
                        printing={printing}
                        sortColumn={sortColumn}
                        sortMethod={sortMethod}
                        total={total}
                        PageSize={PageSize}
                        filterID={filterID}
                        filter={filter}
                        view={viewName}
                    />
                    <div
                        className={`${loading ? 'hideDiv' : ''} absolute ${viewName === 'Firmenprojekte' ? 'right-0' : 'right-0'}  ${viewName === 'Firmenprojekte' ? '-mt-16' : '-mt-18'} -mt-14 pb-9 mx-10`}>
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