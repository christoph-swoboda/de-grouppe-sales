import React, {useEffect, useState} from "react";
import Api from "../../../Api/api";
import {toast} from "react-toastify";
import {BeatLoader} from "react-spinners";
import AdminEditNotesTable from "./table";
import {AES, enc} from "crypto-js";
import {useStateValue} from "../../../states/StateProvider";
import {useForm} from "react-hook-form";

const AdminEditNotes = () => {

    const [tableData, setTableData] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingSave, setLoadingSave] = useState(false)

    const [{secretKey, portal}, dispatch] = useStateValue();
    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))

    const {
        register, getValues, setValue, watch, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;


    useEffect(() => {
        getData().then(r=>r)
    }, [portal]);

    const getData=async ()=>{
        if (portal) {
            setLoading(true)
            await Api().get(`/reminderOptions/${portal}/${user.ID}`).then(res => {
                    setTableData(res.data.options)
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

    const onSubmit = async (data) => {
        setLoadingSave(true)

        const modifiedData = {
            ...data,
            portal: portal,
        };

        Api().post('/sp_putNewReminderOption', modifiedData).then(res => {
            if (res.status === 200) {
                toast.success('Der Datensatz wurde erfolgreich geändert.')
            }
            getData().then(r=>r)
            setLoadingSave(false)
        }).catch(e => {
            setLoadingSave(false)
            toast.error('Beim Speichern von Abschnitt 1 ist ein Fehler aufgetreten!')
        })
    };


    return (
        <div className='dashboardContainer'>
            <div className='flex justify-start items-center content-center pb-5'>
                <h2 className='text-2xl lg:text-left'> MS Verwaltung</h2>
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
                {
                    loading && <div className='centerItemsRelative h-72'><BeatLoader size='10px'/></div>
                }
                {
                    !loading && tableData.length > 0 &&
                    <table className='min-w-full text-left px-10'>
                        <thead className="whitespace-nowrap border-y border-silver border-x-0">
                        <tr>
                            <th className="text-sm text-grey pl-1.5" scope="col">Reminder ID</th>
                            <th className="text-sm text-grey pl-1.5" scope="col">Reminder Title</th>
                            <th className="text-sm text-grey pl-1.5" scope="col"></th>
                        </tr>
                        </thead>
                        {
                            tableData?.map((td) => (
                                <AdminEditNotesTable
                                    key={td.rmID}
                                    title={td.rmTitle}
                                    id={td.rmID}
                                    portal={portal}
                                />
                            ))
                        }
                    </table>
                }
                <hr/>
                <div className='flex flex-col w-12/12 text-center mt-12'>
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <section>
                          <h2 className='font-bold text-lg my-2'>Neue Erinnerung hinzufügen</h2>
                          <input type='text'
                                 placeholder='Neue Erinnerung'
                                 className='w-96'
                                 {...register('newNote')}
                                 style={{border: errors.newNote && '1px solid red'}}
                          />
                      </section>
                       <section>
                           <input
                               className={`${(watch('newNote')!=='') ? 'bg-mainBlue cursor-pointer' : 'bg-grey cursor-no-drop '} w-52 mt-4 text-white hover:bg-offWhite hover:text-mainBlue text-center px-3 py-2 rounded-md`}
                               type="submit"
                               disabled={watch('newNote')===''}
                               value={`${loadingSave ? 'Sparen...' : 'Speichern'}`}
                           />
                       </section>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AdminEditNotes