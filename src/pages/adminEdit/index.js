import React, {useState, useEffect, useCallback} from "react";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {BeatLoader} from "react-spinners";
import AdminEditTable from "./partial/adminEditTable";
import {AES, enc} from "crypto-js";
import {useStateValue} from "../../states/StateProvider";

const AdminEdit = () => {

    const [milestones, setMilestones] = useState([])
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)
    const [milestoneID, setMilestoneID] = useState('')
    const [portal, setPortal] = useState('')
    const [superAdmin, setSuperAdmin] = useState('')

    const [{secretKey}, dispatch] = useStateValue();
    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const role = user.role

    const {
        register, getValues, setValue, watch, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    useEffect(() => {
        if(portal){
            Api().get(`/getDataAdminMilestones/${portal}`).then(res => {
                    setMilestones(res.data)
                }
            ).catch(e => {
                toast.error('Etwas ist schief gelaufen!!')
            })
        }
    }, [portal]);

    const handleSelectChange = (e) => {
        setMilestoneID(e.target.value)
        setLoading(true)
        Api().get(`/getDataAdminMSSubsteps/${portal}/${e.target.value}`).then(res => {
                setTableData(res.data)
                setLoading(false)
            }
        ).catch(e => {
            toast.error('Etwas ist schief gelaufen!!')
            setLoading(false)
        })
    };

    useEffect(() => {
        setSuperAdmin(user.isSAdmin)
        if ((user.role === 'ExtDGG' || user.role === 'ManDGG')) {
            setPortal('dgg')
        } else if ((user.role === 'ExtRUV' || user.role === 'ManRUV')) {
            setPortal('r+v')
        } else {
            setPortal('dgg')
        }
    }, []);

    function portalSelect(e) {
        setPortal(e.target.value)
        setMilestones([])
        setTableData([])
    }


    return (
        <div className='dashboardContainer'>
            <div className='flex justify-between'>
                <h2 className='text-2xl lg:text-left pb-5'>MS Verwaltung</h2>
                {
                    (superAdmin === '1' || role === 'Internal' || role === 'Controlling') &&
                    <div className='flex justify-start items-center w-fit'>
                        <p className='w-fit mr-6'>Portal </p>
                        <select
                            className='pl-3 col-span-2 text-center mx-auto pr-1 py-2 bg-white border border-offWhite rounded-sm lg:w-fit px-12'
                            onChange={portalSelect}
                            value={portal}
                        >
                            <option selected value='dgg'>DGG</option>
                            <option value='r+v'>R+V</option>
                        </select>
                    </div>
                }
            </div>
            <div className='bg-white rounded-md mb-5 px-5 pt-4 pb-10 min-h-screen'>
                <section className='flex flex-col text-left text-grey text-sm mt-3 mb-7 pb-4 py-2 rounded-lg'>
                    <label className='py-2'>Bitte wählen Sie zuerst einen Meilenstein</label>
                    <select placeholder='Milestone'
                            className='p-3 bg-transparent border border-whiteDark rounded-lg w-72'
                            onChange={handleSelectChange}
                    >
                        <option value=''>Wähle eine Option</option>
                        {
                            milestones?.map((m, i) => (
                                <option value={m.milestoneID} key={i}>{m.milestoneName}</option>
                            ))
                        }
                        <option>

                        </option>
                    </select>
                    {errors.email && touchedFields && <p>{errors.email.message}</p>}
                </section>
                {
                    loading && <BeatLoader size='10px'/>
                }
                {
                    !loading && tableData.length > 0 &&
                    <table className='min-w-full text-left px-10'>
                        <thead className="whitespace-nowrap border-y border-silver border-x-0">
                        <tr>
                            <th className="text-sm text-grey pl-1.5" scope="col">SubStep ID</th>
                            <th className="text-sm text-grey pl-1.5" scope="col">SubStep Bezeichnung </th>
                            <th className="text-sm text-grey pl-1.5" scope="col"> Mouseover Text </th>
                            <th className="text-sm text-grey pl-1.5" scope="col"> Typ </th>
                            <th className="text-sm text-grey pl-1.5" scope="col">Feld in Cobra</th>
                            <th className="text-sm text-grey pl-1.5" scope="col"></th>
                        </tr>
                        </thead>
                        {
                            tableData?.map((td, i) => (
                               <AdminEditTable
                                   key={i}
                                   addressesField={td.addressesField}
                                   stepName={td.stepName}
                                   substepID={td.substepID}
                                   milestoneID={milestoneID}
                                   mouseoverText={td.mouseoverText}
                                   fieldType={td.fieldType}
                               />
                            ))
                        }
                    </table>

                }
            </div>
        </div>
    )
}

export default AdminEdit