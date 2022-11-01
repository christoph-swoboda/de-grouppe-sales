import React, {useEffect, useRef, useState} from "react";
import {VscFilePdf} from "react-icons/vsc";
import {RiArrowDownSFill, RiArrowUpSFill, RiFileExcel2Fill} from "react-icons/ri";
import {BestantTableHeaders} from "../../dummyData/bestantTableHeaders";
import Api from "../../Api/api";
import BestantListTable from "./partial/table";
import {toast} from "react-toastify";
import {ScaleLoader} from "react-spinners";
import Pagination from "../../components/pagination";
import {useStateValue} from "../../states/StateProvider";
import {useReactToPrint} from "react-to-print"
import ExcelExport from "./partial/excelFormat";

const BestantList = () => {
    const [printing, setPrinting] = useState(false)
    const [loading, setLoading] = useState(true);
    const [loadingViews, setLoadingViews] = useState(false);
    const [rows, setRows] = useState('10');
    const [viewCount, setViewCount] = useState('');
    const [views, setViews] = useState([]);
    const [sortColumn, setSortColumn] = useState(7);
    const [sortMethod, setSortMethod] = useState('asc');
    let PageSize = rows;
    const [{pageBestand}, dispatch] = useStateValue();
    const [users, setUsers] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'))
    const userID = user.ID
    const role = user.role === 'Internal' ? 'i' : user.role === 'External' ? 'e' : 's'
    const [total, setTotal] = useState(0);
    const componentRef = useRef();

    useEffect(() => {
        let data = new FormData()
        data.append('role', role)
        setLoadingViews(true)
        Api().post('/getRoleViews', data).then(res => {
            setViewCount(Object.values(res.data.viewCount[0])[0])
            setViews(Object.values(res.data.views))
            setLoadingViews(false)
        }).catch(e => {
            setLoadingViews(false)
            toast.error('Something went wrong!!')
        })
    }, [])

    useEffect(() => {
        let data = new FormData()
        data.append('userID', userID)
        data.append('rows', rows)
        data.append('page', pageBestand)
        data.append('sortColumn', sortColumn)
        data.append('sortMethod', sortMethod)

        Api().post('/getBestands', data).then(res => {
            setUsers(res.data.bestands)
            console.log('res.data.bestands',res.data.bestands)
            setTotal(Number(res.data?.bestands[0]?.totalCustomers))
            setLoading(false)
        }).catch(e => {
            setLoading(false)
            toast.error('Something went wrong!!')
        })
    }, [rows, userID, pageBestand, sortColumn, sortMethod]);

    function setPageStates(e) {
        dispatch({type: "SET_PAGE_BESTAND", item: 1})
        setRows(e.target.value)
    }

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    async function setPrintState() {
        if (!loading) {
            setPrinting(true)
            setTimeout(() => handlePrint(), 1);
            setTimeout(() => setPrinting(false), 1);
        }
    }

    function ascSort(id) {
        setSortColumn(id)
        setSortMethod('asc')
    }

    function descSort(id) {
        setSortColumn(id)
        setSortMethod('desc')
    }

    return (
        <div className='dashboardContainer'>
            <h2 className='text-left text-2xl pt-5 pb-5'>Bestand</h2>
            <div className=' bg-white'>
                <div className='bg-white p-8 lg:flex sm:block'>
                    <ExcelExport data={users} title={'Excel Export'} loading={loading}/>
                    <ExcelExport all title={'Excel Export All'} loading={loading}/>
                    <div className={`${loading ? 'opacity-50' : ''} flex justify-center m-1 cursor-pointer`}
                         onClick={setPrintState}>
                        <VscFilePdf className='mr-1' size='25px' color={'#DB2955'}/>
                        <span className='mr-1 mb-2 text-grey text-sm'>PDF Export</span>
                    </div>

                    <div className={`flex m-auto justify-center m-1 ${user?.role !== 'Internal' && 'hidden'}`}>
                        <select disabled={loading} className='w-44 bg-transparent capitalize border border-offWhite px-3 py-1.5 rounded-lg text-sm'>
                            {/*<option disabled selected>View</option>*/}
                            {
                                views.map((v, i) => (
                                    <option key={i} value={v.viewName}> {v.viewName}</option>
                                ))
                            }

                        </select>
                    </div>

                    <p className='text-sm text-grey ml-auto mt-2'>
                        {pageBestand === 1 ? pageBestand : (1 + (Number(rows) * pageBestand)) - Number(rows)} bis {(users.length < Number(rows)) ? users.length + Number(rows) < total ? users.length + (Number(rows) * pageBestand) - Number(rows) : total : (Number(rows) + (Number(rows) * pageBestand)) - Number(rows)} von {total} Eintragen
                    </p>
                    <h2 className='text-sm text-grey ml-6 mt-2 ml-10'>
                        Eintrage anzigen: <span>
                        <select onChange={setPageStates} className='bg-transparent text-mainBlue'>
                            <option value={'10'}>{10}</option>
                            <option value={'25'}>{25}</option>
                            <option value={'10000'}>Alle</option>
                        </select>
                    </span>
                    </h2>
                </div>

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8" style={{minHeight: '50vh'}}>
                            <div className="overflow-hidden">
                                <table className="min-w-full text-left" ref={componentRef} id="table-to-xls">
                                    <thead className=" border-y border-silver border-x-0">
                                    <tr>
                                        {
                                            !loading &&
                                            BestantTableHeaders.map(header => (
                                                <th key={header.id} scope="col"
                                                    className="text-sm pl-5 text-grey px-2 py-1 "
                                                >
                                                    <span className='flex justify-left'>
                                                          <span
                                                              className={`tooltip mt-1.5 text-center xl:h-fit lg:h-14 ${sortColumn === header.id && 'text-mainBlue'}`}
                                                          >
                                                            {header.title}
                                                              {/*<span className='tooltiptextclose'>*/}
                                                              {/*    Hannoversche Volksbank description*/}
                                                              {/*</span>*/}
                                                        </span>
                                                        <span hidden={printing}>
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
                                                    <span className={`${(header.title === 'MA' || header.title==='Daten') && 'opacity-0'}`}>
                                                        <input className='w-full h-2 px-2 py-3 search mb-4' type='text'
                                                               hidden={printing}
                                                               placeholder='Sueche...'
                                                        />
                                                    </span>
                                                </th>
                                            ))
                                        }
                                        <th scope="col" className="text-sm w-1/12 text-grey px-2 py-1"/>
                                    </tr>
                                    </thead>
                                    <tbody>

                                    {
                                        loading ?
                                            <tr className='centerItemsAbsolute'>
                                                <td><ScaleLoader size={110}/></td>
                                            </tr>
                                            :
                                            users?.map((u, index) => (
                                                <BestantListTable
                                                    key={index}
                                                    index={index}
                                                    FirmaKurz={u.FirmaKurz}
                                                    FBKBank={u.FBKBank}
                                                    ZustBerater={u.ZustBerater}
                                                    Bank={u.Bank}
                                                    RegioBereich={u.RegioBereich}
                                                    MA={u.MA}
                                                    PStatus={u.PStatus}
                                                    Note={u.Note}
                                                />
                                            ))
                                    }
                                    </tbody>
                                </table>
                                <div className={`centerItemsRelative mt-3 mb-2 ${loading && 'opacity-0'}`}>
                                    <Pagination
                                        className="pagination-bar"
                                        currentPage={pageBestand}
                                        totalCount={total}
                                        pageSize={PageSize}
                                        onPageChange={pageNo => dispatch({type: "SET_PAGE_BESTAND", item: pageNo})}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BestantList