import React, {useEffect, useRef, useState} from "react";
import {BestandViewHeaders, BestandViewHeadersDGG} from "../../staticData/bestandViewHeaders";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {useStateValue} from "../../states/StateProvider";
import {useReactToPrint} from "react-to-print"
import BestandListDataSection from "./partial/bestandListDataSection";
import {BestandView2Headers} from "../../staticData/bestandView2Headers";
import {AES, enc} from "crypto-js";
import {BestandView3Headers} from "../../staticData/bestandView3Headers";
import {BestandView4Headers} from "../../staticData/bestandView4Headers";
import {BestandView5Headers} from "../../staticData/bestandView5Headers";

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
    const [url, setUrl] = useState('getBestands');
    const [viewName, setViewName] = useState('Firmenprojekte');
    const [superAdmin, setSuperAdmin] = useState('')
    const [views, setViews] = useState([]);
    let PageSize = rows;
    const [{pageBestand, sortColumn, sortMethod, filterID, filter, dateFilter, secretKey, portal}, dispatch] = useStateValue();
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const componentRef = useRef();

    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const userID = user.ID
    const role = user.role === 'Internal' ? 'i' : user.role === 'ExtRUV' ? 'er' : user.role === 'ExtDGG' ? 'ed' : user.role === 'ManRUV' ? 'mr' : user.role === 'ManDGG' ? 'md' : 'c'


    useEffect(() => {
        setSuperAdmin(user.isSAdmin)
        if ((user.role === 'ExtDGG' || user.role === 'ManDGG')) {
            dispatch({type:'SET_PORTAL', item:'dgg'})
            localStorage.setItem('portal', 'dgg')
        } else if ((user.role === 'ExtRUV' || user.role === 'ManRUV')) {
            dispatch({type:'SET_PORTAL', item:'ruv'})
            localStorage.setItem('portal', 'ruv')
        } else {
            if(localStorage.getItem('portal')){
                dispatch({type:'SET_PORTAL', item:localStorage.getItem('portal')})
            }else{
                dispatch({type:'SET_PORTAL', item:'dgg'})
            }
        }
    }, []);


    useEffect(() => {
        dispatch({type: "SET_PAGE_BESTAND", item: 1})
    }, [viewName, filter, dateFilter]);

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
        if (portal) {
            if (viewName === 'Firmenprojekte') {
                setUrl('getBestands')
            } else if (viewName === 'Projekt-Tafel') {
                setUrl('getBestands2')
            } else if (viewName === 'Auswertung Vertrieb') {
                setUrl('getBestands3')
            } else if (viewName === 'Auswertung DGAPI') {
                setUrl('getBestands4')
            } else if (viewName === 'Auswertung Beratung') {
                setUrl('getBestands5')
            }

            const delayQuery = setTimeout(async () => {
                setLoading(true)
                let data = new FormData()
                data.append('portal', portal)
                data.append('userID', userID)
                data.append('rows', rows)
                data.append('page', pageBestand)
                data.append('sortColumn', sortColumn)
                data.append('sortMethod', sortMethod)
                data.append('filterID', JSON.stringify(filterID))
                data.append('filter', JSON.stringify(filter))
                data.append('dateFilter', JSON.stringify(dateFilter))

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
            }, filter || dateFilter ? 1500 : 0)

            return () => clearTimeout(delayQuery)
        }

    }, [rows, userID, pageBestand, sortColumn, sortMethod, filter, viewName, dateFilter, portal])

    useEffect(() => {
        setLoading(true)
        clearFilters()
        if (viewName === 'Auswertung Vertrieb') {
            dispatch({
                type: "SET_DATEFILTER",
                item: {id: 14, value: true}
            })
            dispatch({type: "SET_SORTBESTANDCOLUMN", item: 14})
            dispatch({type: "SET_SORTBESTANDMETHOD", item: 'desc'})

        } else if (viewName === 'Auswertung DGAPI') {
            dispatch({
                type: "SET_DATEFILTER",
                item: {id: 14, value: true}
            })
            dispatch({type: "SET_SORTBESTANDCOLUMN", item: 14})
            dispatch({type: "SET_SORTBESTANDMETHOD", item: 'desc'})

        } else if (viewName === 'Auswertung Beratung') {
            dispatch({
                type: "SET_DATEFILTER",
                item: {id: 11, value: true}
            })
            dispatch({type: "SET_SORTBESTANDCOLUMN", item: 11})
            dispatch({type: "SET_SORTBESTANDMETHOD", item: 'desc'})
        } else {
            dispatch({type: "SET_SORTBESTANDCOLUMN", item: 7})
            dispatch({type: "SET_SORTBESTANDMETHOD", item: 'asc'})
        }
    }, [viewName]);

    useEffect(() => {
        const keys = Object.keys(filter);
        const keysToRestore = keys.slice(-3);
        const valuesToRestore = keysToRestore.map(key => ({[key]: filter[key]}));
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
        dispatch({
            type: "SET_SORTBESTANDFILTER",
            item: {a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: 1, i: null, j: null}
        })
        dispatch({
            type: "SET_SORTBESTANDFILTERID",
            item: {a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: 111, i: null, j: null}
        })
        // dispatch({
        //     type: "SET_DATEFILTER",
        //     item: {id: null, value: null}
        // })
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

    function portalSelect(e) {
        dispatch({type:'SET_PORTAL', item:e.target.value})
        localStorage.setItem('portal', e.target.value)
    }

    function onPortalChanged(){
        if(portal==='dgg'){
            setViewName('Firmenprojekte')
        }
    }

    return (
        <div className={`dashboardContainer`}>
            <div className='flex justify-start items-center content-center pb-5'>
                <h2 className='text-2xl lg:text-left'> Firmenprojekt</h2>
                {
                    (superAdmin === '1' || role === 'i' || role === 'c') &&
                    <div className='flex justify-start items-center w-fit bg-transparent py-2 px-4 ml-2 rounded-sm'>
                        <p className='w-fit mr-2 text-grey'>Portal:  </p>
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
            <div className='bg-white'>
                <BestandListDataSection
                    views={views}
                    rows={rows}
                    setPrintStte={setPrintState}
                    hasFilter={hasFilter}
                    clearFilters={clearFilters}
                    setViewName={setViewName}
                    dropdownRef={dropdownRef}
                    toggleDropdown={toggleDropdown}
                    isOpen={isOpen}
                    user={user}
                    url={url}
                    loadingViews={loadingViews}
                    users={users}
                    loading={loading}
                    printPDFRef={componentRef}
                    headers={(viewName === 'Firmenprojekte' && portal === 'ruv') ? BestandViewHeaders : (viewName === 'Firmenprojekte' && portal === 'dgg') ? BestandViewHeadersDGG : viewName === 'Projekt-Tafel' ? BestandView2Headers : viewName === 'Auswertung Vertrieb' ? BestandView3Headers : viewName === 'Auswertung DGAPI' ? BestandView4Headers : BestandView5Headers}
                    count={viewName === (viewName === 'Firmenprojekte' && portal === 'ruv') ? BestandViewHeaders.length - 2 : (viewName === 'Firmenprojekte' && portal === 'dgg') ? BestandViewHeadersDGG.length - 2 : viewName === 'Projekt-Tafel' ? BestandView2Headers.length - 2 : viewName === 'Auswertung Vertrieb' ? BestandView3Headers.length - 2 : viewName === 'Auswertung DGAPI' ? BestandView4Headers.length - 2 : BestandView5Headers.length - 2}
                    printing={printing}
                    sortColumn={sortColumn}
                    sortMethod={sortMethod}
                    total={total}
                    PageSize={PageSize}
                    filterID={filterID}
                    filter={filter}
                    view={viewName}
                    portalChanged={onPortalChanged}
                    portal={portal}
                />
                <div
                    className={`${loading ? 'hideDiv' : ''} absolute ${viewName === 'Firmenprojekte' ? 'right-0' : 'right-0'}  ${viewName === 'Firmenprojekte' ? '-mt-16' : '-mt-18'} -mt-14 pb-9 mx-10`}>
                    <div className='flex justify-center'>
                        <p className={`${(users?.length === 0) && 'hideDiv'} mr-2 text-sm text-grey mt-2`}>
                            {pageBestand === 1 ? pageBestand : (1 + (Number(rows) * pageBestand)) - Number(rows)} bis {(users?.length < Number(rows)) ? users.length + Number(rows) < total ? users.length + (Number(rows) * pageBestand) - Number(rows) : total : (Number(rows) + (Number(rows) * pageBestand)) - Number(rows)} von {total} Einträge
                        </p>
                        <h2 className={`${(users?.length === 0) && 'hideDiv'}  text-sm text-grey mt-2 ml-10`}>
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
    )
}

export default BestantList