import React, {useEffect, useState} from "react";
import Api from "../../../Api/api";
import {toast} from "react-toastify";
import {BeatLoader} from "react-spinners";
import AdminEditFooterTable from "./table";
import {AES, enc} from "crypto-js";
import {useStateValue} from "../../../states/StateProvider";

const AdminEditFooter = () => {

    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(true)

    const [{secretKey, portal}, dispatch] = useStateValue();
    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))

    useEffect(() => {
        getData().then(r => r)
    }, [portal]);

    const getData = async () => {
        if (portal) {
            setLoading(true)
            await Api().get(`/sp_getDataAdminFooterString/${portal}`).then(res => {
                    setTableData(res.data)
                }
            ).catch(e => {
                toast.error('Etwas ist schief gelaufen!!')
            })
            setLoading(false)
        }
    }

    function portalSelect(e) {
        dispatch({type: 'SET_PORTAL', item: e.target.value})
        localStorage.setItem('portal', e.target.value)
        setTableData([])
    }

    return (
        <div className='dashboardContainer'>
            <div className='flex justify-start items-center content-center pb-5'>
                <h2 className='text-2xl lg:text-left'> Footerzeile</h2>
                {/*{*/}
                {/*    <div className='flex justify-start items-center w-fit bg-transparent py-2 px-4 ml-2 rounded-sm'>*/}
                {/*        <p className='w-fit mr-2 text-grey'>Portal: </p>*/}
                {/*        <select*/}
                {/*            disabled={loading}*/}
                {/*            className='col-span-2 text-center text-mainBlue mx-auto pr-1 bg-transparent border border-offWhite rounded-sm lg:w-fit'*/}
                {/*            onChange={portalSelect}*/}
                {/*            value={portal}*/}
                {/*        >*/}
                {/*            <option selected value='dgg'>DGG</option>*/}
                {/*            <option value='ruv'>R+V</option>*/}
                {/*        </select>*/}
                {/*    </div>*/}
                {/*}*/}
            </div>
            <div className='bg-white rounded-md mb-5 px-5 pt-4 pb-10 min-h-screen'>
                {
                    loading && <div className='centerItemsRelative h-72'><BeatLoader size='10px'/></div>
                }
                {
                    !loading && tableData?.length > 0 &&
                    <table className='min-w-full text-left px-10 border border-offWhite'>
                        <thead className="whitespace-nowrap border-y border-silver border-x-0">
                        <tr className='text-lg'>
                            <th className="text-grey pl-1.5" scope="col">Footer String</th>
                        </tr>
                        </thead>
                        {
                            tableData?.map((td, i) => (
                                <AdminEditFooterTable
                                    key={i}
                                    index={i}
                                    string={td.string}
                                    id={td.milestoneID}
                                    portal={portal}
                                />
                            ))
                        }
                    </table>
                }
            </div>
        </div>
    )
}

export default AdminEditFooter