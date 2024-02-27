import React, {useState, useEffect} from "react";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {useForm} from "react-hook-form";
import {BeatLoader} from "react-spinners";
import AdminEditTable from "./partial/adminEditTable";

const AdminEdit = () => {

    const [milestones, setMilestones] = useState([])
    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(false)
    const [milestoneID, setMilestoneID] = useState()

    const {
        register, getValues, setValue, watch, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    useEffect(() => {
        Api().get('/getDataAdminMilestones').then(res => {
                setMilestones(res.data)
            }
        ).catch(e => {
            toast.error('Etwas ist schief gelaufen!!')
        })
    }, []);

    const onSubmit = async (data) => {
        console.log('data', data)
    };
    const handleSelectChange = (e) => {
        setMilestoneID(e.target.value)
        setLoading(true)
        Api().get(`/getDataAdminMSSubsteps/${e.target.value}`).then(res => {
                setTableData(res.data)
                setLoading(false)
            }
        ).catch(e => {
            toast.error('Etwas ist schief gelaufen!!')
            setLoading(false)
        })
    };

    return (
        <div className='py-10 px-10 min-h-screen'>
            <h2 className='mt-16 text-2xl text-left font-light'>Admin Edit</h2>
            <div className='bg-white rounded-md my-5 px-5 pt-4 pb-10 min-h-screen'>
                <section className='flex flex-col text-left text-grey text-sm mt-3 mb-7 pb-4 py-2 rounded-lg'>
                    <label className='py-2'>Bitte wählen Sie zuerst einen Meilenstein</label>
                    <select placeholder='Milestone'
                            className='p-3 bg-transparent border border-whiteDark rounded-lg w-fit'
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