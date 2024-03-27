import React, {useEffect, useState} from "react"
import '../../styles/dashboard.scss'
import {Graph} from "./partial/graph";
import Api from "../../Api/api";
import Boxes from "./partial/boxes";
import {MdDone} from "react-icons/md";
import {SiVirustotal} from "react-icons/si";
import {AES, enc} from "crypto-js";
import {useStateValue} from "../../states/StateProvider";
import {AiOutlineClose} from "react-icons/ai";
import {Link} from "react-router-dom";
import {formatDate} from "../../helper/formatDate";
import {BeatLoader, ClipLoader, SkewLoader} from "react-spinners";

const Dashboard = () => {
    const [total, setTotal] = useState([])
    const [strofalles, setStrofalles] = useState([])
    const [done, setDone] = useState([])
    const [superAdmin, setSuperAdmin] = useState('')
    const [toggle, setToggle] = useState(false)
    const [loadingBoxes, setLoadingBoxes] = useState(true)
    const [loadingStrofalle, setLoadingStrofalle] = useState(true)
    const [canceled, setCanceled] = useState([])
    const [{secretKey, portal}, dispatch] = useStateValue();

    // Function to update the state
    const updateMainState = (newValue) => {
        setToggle((prevState) => !prevState);
    };

    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const role = user.role

    useEffect(() => {
        if (portal) {
            setLoadingBoxes(true)
            setLoadingStrofalle(true)
            Api().get(`/getDashboardCounts/${portal}/${user.ID}`).then(res => {
                setTotal(res.data.slice(0, 2))
                setDone(res.data.slice(2, 4))
                setCanceled(res.data.slice(4, 6))
                setLoadingBoxes(false)
            }).then(res => {
                Api().get(`/sp_getDataDashStoerfaelle/${portal}/${user.ID}`).then(res => {
                    setStrofalles(res.data)
                    setLoadingStrofalle(false)
                }).catch(e=>{
                    setLoadingStrofalle(false)
                })
            }).catch(e=>{
                setLoadingBoxes(false)
            })
        }
    }, [portal]);

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

    function portalSelect(e) {
        dispatch({type:'SET_PORTAL', item:e.target.value})
        localStorage.setItem('portal', e.target.value)
    }

    return (
        <div className='dashboardContainer'>
            <div className='flex justify-start items-center content-center pb-5'>
                <h2 className='text-2xl lg:text-left'>Dashboard</h2>
                {
                    (superAdmin === '1' || role === 'Internal' || role === 'Controller') &&
                    <div className='flex justify-start items-center w-fit bg-transparent py-2 px-4 ml-2 rounded-sm'>
                        <p className='w-fit mr-2 text-grey'>Portal:  </p>
                        <select
                            disabled={loadingBoxes || loadingStrofalle}
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
            <div className='bg-white rounded-xl text-left p-8'>
                <div
                    className='grid lg:grid-cols-10 md:grid-cols-2 sm:grid-cols-1 gap-3 items-center content-center mb-10'>
                    <Boxes loading={loadingBoxes} rotate={toggle} toggleState={updateMainState} col={'#2f2f2f'}
                           data={total}
                           icon={<SiVirustotal color={'#ffffff'} size='27px'/>} title={'Alle Projekte'}/>
                    {
                        toggle.toString() === 'false' ?
                            <Boxes loading={loadingBoxes} rotate={toggle} toggleState={updateMainState} col={'#2f2f2f'}
                                   data={done}
                                   icon={<MdDone color={'#ffffff'} size='30px'/>} title={'Abgeschlossen'}/>
                            :
                            <Boxes loading={loadingBoxes} rotate={toggle} toggleState={updateMainState} col={'#2f2f2f'}
                                   data={canceled}
                                   icon={<AiOutlineClose color={'#ffffff'} size='30px'/>} title={'Abgesagt'}/>
                    }
                    <div className="flex flex-col col-span-4 rounded-md shadow-lg px-4">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="h-36 overflow-auto">
                                    <h2 className='text-center text-xl text-white font-bold bg-cancel w-full px-10 opacity-90'>
                                        <Link to={'storfalle'}>Störfälle</Link>
                                    </h2>
                                    <hr/>
                                    <table className="min-w-full text-left text-sm font-light">
                                        <thead className="border-b font-medium border-whiteDark">
                                        <tr>
                                            {/*<th scope="col" className="px-6 py-1">#</th>*/}
                                            <th scope="col" className="px-6 py-1">Firma</th>
                                            <th scope="col" className="px-6 py-1">Bemerkung</th>
                                            <th scope="col" className="px-6 py-1">WV-Datum</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            strofalles.length > 0 ?
                                                strofalles.slice(0, 5).map(str => (
                                                    <tr className="border-b border-whiteDark" key={str.FP_ID}>
                                                        {/*<td className="whitespace-nowrap px-6 py-1 font-medium">1</td>*/}
                                                        <td className="px-2 py-1 text-mainBlue">
                                                            <Link to={`firmenprojekte/${portal}/${str.FP_ID}`}
                                                                  target='_blank'>{str.FirmaKurz}
                                                            </Link>
                                                        </td>
                                                        <td className="px-1 py-1">{str.Bemerkung}</td>
                                                        <td className="px-1 py-1">{formatDate(str.StörfallDatum, false)}</td>
                                                    </tr>
                                                )) : !loadingStrofalle &&
                                                <tr className='centerItemsRelative border-b border-whiteDark'>
                                                    <td className='px-2 py-1 text-mainBlue'></td>
                                                    <td className='px-2 py-1 text-mainBlue'>No Data</td>
                                                </tr>
                                        }
                                        </tbody>
                                    </table>
                                    {
                                        loadingStrofalle &&
                                        <div className='centerItemsRelative mt-2'>
                                            <ClipLoader color='lightGrey'/>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Graph portal={portal} User={user} IST header={'IST-Potenzial im jeweiligen Schritt'}/>
            </div>
        </div>
    )
}

export default Dashboard