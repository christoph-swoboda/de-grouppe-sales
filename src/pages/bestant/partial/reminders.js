import React, {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import Api from "../../../Api/api";
import {toast} from "react-toastify";
import {formatDate} from "../../../helper/formatDate";
import {AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import {SkewLoader} from "react-spinners";
import CustomInput from "../../../helper/customInput";

const Reminders = ({id, userID}) => {

    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [editing, setEditing] = useState(false)
    const [updated, setUpdated] = useState(0)
    const [options, setOptions] = useState([])
    const [author, setAuthor] = useState([])
    const [exists, setExists] = useState('0')
    const UserInfo = localStorage.user
    let user = JSON.parse(UserInfo ? UserInfo : false)

    const {
        register, getValues, setValue, watch, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});

    function convertLocalToUTCDate(date) {
        if (!date) {
            return date
        }
        date = new Date(date)
        date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
        return date
    }

    useEffect(() => {
        setLoadingData(true)
        Api().get(`/reminderOptions/${id}`).then(res => {
            setOptions(res.data.options)
            setAuthor(res.data.author)
            setExists(res.data.exists)
            setLoadingData(false)
        })
    }, [updated]);

    const onSubmit = (Data) => {
        setLoading(true)
        Api().post('/saveReminders', Data).then(res => {
            toast.success('Erinnerung erfolgreich gespeichert')
            setLoading(false)
            setUpdated(updated + 1)
            setEditing(false)
        }).catch(e => {
            toast.error('irgendwas ist schief gelaufen!')
            setLoading(false)
        })
    };

    function deleteReminder() {
        confirm('Diese Erinnerung löschen?') &&
        Api().get(`/deleteReminders/${id}`).then(res => {
            setUpdated(updated + 1)
            toast.success('Erfolgreich gelöscht')
            setValue('message', 'Wähle eine Option')
            setValue('date', null)
        }).catch(e => {
            toast.error('Etwas ist schief gelaufen!')
            setUpdated(updated + 1)
        })
    }

    function setEditStates() {
        setEditing(true)
        // setValue('message', 'Wiedervorlage Platzhalter Nr. 2 von 6')
        setValue('message', author[0].wvText)
        setValue('date', convertLocalToUTCDate(author[0].datum))
    }

    function cancelEditStates() {
        setEditing(false)
        setValue('message', 'Wähle eine Option')
        setValue('date', null)
    }

    return (
        <div className='text-left px-2 pt-5 pb-2'>
            {
                loadingData ?
                    <div style={{minHeight: '150px'}}>
                        <SkewLoader size={10} color={'grey'}/>
                    </div>
                    :
                    <div>
                        <h2 className='text-xl mb-2 font-bold'>Wiedervorlage</h2>
                        <hr/>
                        {
                            exists === '0' || editing ?
                                <form onSubmit={handleSubmit(onSubmit)} className='grid grid-cols-2 gap-2 p-5'>
                                    <section className='col-span-2'>
                                        <select {...register('message')}
                                                className={`w-full p-3 md:w-full bg-white border border-whiteDark rounded-md subStepSelect bg-white`}
                                        >
                                            <option hidden>
                                                Wähle eine Option
                                            </option>
                                            {
                                                options?.map((op, index) => (
                                                    <option key={index}>{op.optionText}</option>
                                                ))
                                            }
                                        </select>
                                    </section>
                                    <section>
                                        <input hidden {...register('uID')} value={userID}/>
                                        <input hidden {...register('fpID')} value={id}/>
                                        <Controller
                                            control={control}
                                            name='date'
                                            render={({field}) => (
                                                <DatePicker
                                                    closeOnScroll={true}
                                                    locale="de" dateFormat="P" showYearDropdown
                                                    placeholderText={`Datum wählen`}
                                                    onChange={(date) => field.onChange(convertLocalToUTCDate(date))}
                                                    selected={field.value}
                                                    cssClass={'datePicker'}
                                                    isClearable
                                                    readOnly={false}
                                                    customInput={<CustomInput val={getValues('date')}/>}
                                                />
                                            )}
                                        />
                                    </section>
                                    <input
                                        className={`bg-mainBlue rounded-2xl px-3 py-2 mt-2 text-white cursor-pointer text-sm ${(!watch('date')) || watch('message') === 'Wähle eine Option' ? 'bg-disableBlue cursor-no-drop' : 'bg-mainBlue hover:bg-lightBlue'}`}
                                        type="submit"
                                        disabled={(!watch('date')) || watch('message') === 'Wähle eine Option'}
                                        value={`${!loading ? 'Speichern' : 'sparen...'}`}
                                    />
                                    <input
                                        className={`${!editing && 'hidden'} bg-grey hover:bg-cancel col-span-2 rounded-2xl px-3 py-2 mt-2 cursor-pointer text-white text-sm text-center`}
                                        value={`abbrechen`}
                                        onClick={cancelEditStates}
                                    />
                                </form>
                                : !editing &&
                                <div className='flex items-center justify-between p-5'>
                                    <div className='text-sm text-grey'>
                                        <p>Wiedervorlage von: {author[0].autor}</p>
                                        <p>Wiedervorlage am: {formatDate(author[0].datum, false)}</p>
                                        <p>Grund: {author[0].wvText}</p>
                                    </div>
                                    {
                                        author[0].autor === user.fullname &&
                                        <div className='flex justify-between flex-wrap'>
                                            <div onClick={setEditStates} className='cursor-pointer'>
                                                <AiOutlineEdit color={'#1c3aa1'} size={'19px'}/>
                                            </div>
                                            <div onClick={deleteReminder} className='cursor-pointer'>
                                                <AiOutlineDelete color={'#987474'} size={'19px'}/>
                                            </div>
                                        </div>
                                    }

                                </div>
                        }
                        <hr/>
                    </div>
            }

        </div>
    )
}

export default Reminders