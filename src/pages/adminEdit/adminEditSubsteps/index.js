import React, {useEffect, useState} from "react";
import Api from "../../../Api/api";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {BeatLoader} from "react-spinners";
import AdminEditSubstepsTable from "./table";
import {AES, enc} from "crypto-js";
import {useStateValue} from "../../../states/StateProvider";

const AdminEditSubsteps = () => {

    const [milestones, setMilestones] = useState([])
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)
    const [milestoneID, setMilestoneID] = useState('')

    const [{secretKey, portal}, dispatch] = useStateValue();
    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const role = user.role

    const {
        register, getValues, setValue, watch, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    useEffect(() => {
        if (portal) {
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

    function portalSelect(e) {
        dispatch({type: 'SET_PORTAL', item: e.target.value})
        localStorage.setItem('portal', e.target.value)
        setMilestones([])
        setTableData([])
    }

    return (
        <div className='dashboardContainer'>
            <div className='flex justify-start items-center content-center pb-5'>
                <h2 className='text-2xl lg:text-left'> MS Schritte</h2>
                {
                    <div className='flex justify-start items-center w-fit bg-transparent py-2 px-4 ml-2 rounded-sm'>
                        <p className='w-fit mr-2 text-grey'>Portal: </p>
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
                            <th className="text-sm text-grey pl-1.5" scope="col">SubStep Bezeichnung</th>
                            <th className="text-sm text-grey pl-1.5" scope="col"> Mouseover Text</th>
                            <th className="text-sm text-grey pl-1.5" scope="col"> Typ</th>
                            <th className="text-sm text-grey pl-1.5" scope="col">Feld in Cobra</th>
                            <th className="text-sm text-grey pl-1.5" scope="col"></th>
                        </tr>
                        </thead>
                        {
                            tableData?.map((td, i) => (
                                <AdminEditSubstepsTable
                                    key={i}
                                    addressesField={td.addressesField}
                                    stepName={td.stepName}
                                    substepID={td.substepID}
                                    milestoneID={milestoneID}
                                    mouseoverText={td.mouseoverText}
                                    fieldType={td.fieldType}
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

export default AdminEditSubsteps