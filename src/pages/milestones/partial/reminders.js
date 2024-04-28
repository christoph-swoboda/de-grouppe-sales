import React, {useEffect, useRef, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import Api from "../../../Api/api";
import {toast} from "react-toastify";
import {formatDate} from "../../../helper/formatDate";
import {AiFillCloseCircle, AiOutlineDelete, AiOutlineEdit} from "react-icons/ai";
import {SkewLoader} from "react-spinners";
import useModal from "../../../hooks/useModal";
import {useStateValue} from "../../../states/StateProvider";
import {GoCalendar} from "react-icons/go";
import {AES, enc} from "crypto-js";
import Modal from "../../../hooks/modal";

const Reminders = ({id, userID, role, portal}) => {

    const [loading, setLoading] = useState(false)
    const [loadingData, setLoadingData] = useState(false)
    const [editing, setEditing] = useState(false)
    const [updated, setUpdated] = useState(0)
    const [options, setOptions] = useState([])
    const [author, setAuthor] = useState([])
    const [exists, setExists] = useState('0')
    const {toggleRemindersModal} = useModal();
    const [{remindersModal, secretKey}, dispatch] = useStateValue();
    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const datePickerRef2 = useRef(null);

    const {
        register,
        getValues,
        setValue,
        watch,
        handleSubmit,
        formState,
        reset,
        formState: {errors, touchedFields, isValid},
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
        Api().get(`/reminderOptions/${portal}/${id}`).then(res => {
            setOptions(res.data.options)
            setAuthor(res.data.author)
            setExists(res.data.exists)
            setLoadingData(false)
        })
    }, [updated]);

    const onSubmit = (Data) => {
        setLoading(true)
        Data.portal = portal

        Api().post('/saveReminders', Data).then(res => {
            toast.success('Erinnerung erfolgreich gespeichert')
            setLoading(false)
            setUpdated(updated + 1)
            setEditing(false)
            dispatch({type: "SET_REMINDERS_MODAL", item: !remindersModal})
        }).catch(e => {
            toast.error('irgendwas ist schief gelaufen!')
            setLoading(false)
        })
    };

    function deleteReminder() {
        confirm('Diese Erinnerung löschen?') &&
        Api().get(`/deleteReminders/${portal}/${id}`).then(res => {
            setUpdated(updated + 1)
            toast.success('Erfolgreich gelöscht')
            setValue('rmTitle', 'Wähle eine Option')
            reset()
        }).catch(e => {
            toast.error('Etwas ist schief gelaufen!')
            setUpdated(updated + 1)
        })
    }

    function setEditStates() {
        setEditing(true)
        setValue('rmTitle', author[0].rmTitle)
        setValue('rmText', author[0].rmText)
        setValue('uEmail', author[0].rmMail1)
        setValue('uEmail2', author[0].rmMail2)
        setValue('uEmail3', author[0].rmMail3)
        setValue('rmMailAMS', author[0].rmMailAMS === '1')
        setValue('rmMailKAM', author[0].rmMailKAM === '1')
        setValue('date', convertLocalToUTCDate(author[0].rmDate))
        dispatch({type: "SET_REMINDERS_MODAL", item: !remindersModal})
    }

    function setInitialStates() {
        toggleRemindersModal()
        setValue('uEmail', user.email)
    }

    function cancelEditStates() {
        setEditing(false)
        dispatch({type: "SET_REMINDERS_MODAL", item: !remindersModal})
    }

    return (
        <div className='text-left px-2 pt-5 pb-2'>
            {
                loadingData ?
                    <div style={{minHeight: '150px'}}>
                        <SkewLoader size={10} color={'grey'}/>
                    </div>
                    :
                    <div className='border border-b-1 border-b-offWhite border-x-0 border-t-0'>
                        {
                            exists === '0' ?
                                <button
                                    className={`${role === 'Controller' && 'hidden'} px-3 py-2 my-4 hover:bg-lightBlue rounded-3xl bg-mainBlue text-white text-sm`}
                                    onClick={setInitialStates}
                                >
                                    Neue Wiedervorlage
                                </button>
                                :
                                <div>
                                    <h2 className='text-xl mb-2 font-bold'>Wiedervorlage</h2>
                                    <div className='flex items-center justify-between p-5'>
                                        <div className='text-sm text-grey'>
                                            <p>Wiedervorlage von: {author[0].rmUser}</p>
                                            <p>Wiedervorlage am: {formatDate(author[0].rmDate, false)}</p>
                                            <p>Grund: {author[0].rmTitle}</p>
                                        </div>
                                        <div className='flex justify-between flex-wrap'>
                                            <a title='bearbeiten' onClick={setEditStates}
                                               className='cursor-pointer'>
                                                <AiOutlineEdit color={'#1c3aa1'} size={'19px'}/>
                                            </a>
                                            <a title='löschen' onClick={deleteReminder} className='cursor-pointer'>
                                                <AiOutlineDelete color={'#987474'} size={'19px'}/>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
            }
            <Modal toggle={toggleRemindersModal}
                   visible={remindersModal}
                   component={
                       <div>
                           <p style={{float: 'right', cursor: 'pointer'}}
                              onClick={() => dispatch({type: "SET_REMINDERS_MODAL", item: !remindersModal})}>
                               <AiFillCloseCircle size='35px' color={'#232323'}/>
                           </p>
                           <form onSubmit={handleSubmit(onSubmit)} style={{marginTop: '-5vh'}}
                                 className='centerItemsAbsolute grid grid-cols-2 gap-2'>
                               <section className='col-span-2'>
                                   <select {...register('rmTitle', {required: true})}
                                           className={`w-full p-3 md:w-full cursor-pointer bg-white border border-whiteDark rounded-md subStepSelect`}
                                   >
                                       <option hidden>
                                           Wähle eine Option
                                       </option>
                                       {
                                           options?.filter(o => o.rmTitle !== null).map((op, index) => (
                                               <option key={index}>{op.rmTitle}</option>
                                           ))
                                       }
                                   </select>
                               </section>

                               <section className='col-span-2'>
                                       <textarea
                                           rows={1}
                                           className={`w-full p-3 md:w-full bg-white border border-whiteDark rounded-md subStepSelect`}
                                           placeholder='zusätzliche Bermerkung'
                                           {...register('rmText', {required: false})}
                                       />
                               </section>
                               <input
                                   className={`w-full p-3 md:w-full bg-white border border-whiteDark rounded-md subStepSelect`}
                                   placeholder='Email an: '
                                   type='email'
                                   {...register('uEmail', {
                                       required: 'Email is required',
                                       pattern: {
                                           value: /^\S+@\S+\.\S+$/,
                                           message: 'Please enter a valid email address',
                                       }
                                   })}
                                   style={{border: (!watch('uEmail')) && '1px solid red'}}
                               />
                               <section className='col-span-1'>

                               </section>
                               <section className='col-span-1'>
                                   <input hidden {...register('uID')} value={userID}/>
                                   <input hidden {...register('fpID')} value={id}/>
                                   <Controller
                                       control={control}
                                       name='date'
                                       render={({field}) => (
                                           <div ref={datePickerRef2}
                                                className="flex justify-between items-center border border-1 border-whiteDark">
                                               <DatePicker
                                                   closeOnScroll={true}
                                                   locale="de" dateFormat="P" showYearDropdown
                                                   placeholderText={`Datum wählen`}
                                                   onChange={(date) => field.onChange(convertLocalToUTCDate(date))}
                                                   selected={field.value}
                                                   cssClass={'datePicker'}
                                                   isClearable
                                                   className={'border-none'}
                                                   readOnly={(role === 'ManRUV' || role === 'ManDGG')}
                                               />
                                               <div
                                                   className={`absolute ${getValues('date') && 'mr-6'} md:right-60 sm:right-48`}
                                                   style={{pointerEvents: 'none'}}>
                                                   <GoCalendar color={'#4d57a8'} size={'18px'}/>
                                               </div>
                                           </div>
                                       )}
                                   />
                               </section>
                               <section className='col-span-1'>

                               </section>

                               <input
                                   className={`w-full p-3 md:w-full bg-white border border-whiteDark rounded-md subStepSelect`}
                                   placeholder='Email ebenfalls an:'
                                   {...register('uEmail2', {
                                       required: false,
                                       pattern: {
                                           value: /^\S+@\S+\.\S+$/,
                                           message: 'Please enter a valid email address',
                                       }
                                   })}
                                   style={{border: errors.uEmail2 && '1px solid red'}}
                               />
                               <input
                                   className={`w-full p-3 md:w-full bg-white border border-whiteDark rounded-md subStepSelect`}
                                   placeholder='Email ebenfalls an:'
                                   {...register('uEmail3', {
                                       required: false,
                                       pattern: {
                                           value: /^\S+@\S+\.\S+$/,
                                           message: 'Please enter a valid email address',
                                       }
                                   })}
                                   style={{border: errors.uEmail3 && '1px solid red'}}
                               />

                               <section className='flex justify-start text-grey items-center gap-2'>
                                   <input
                                       type='checkbox'
                                       className={`cursor-pointer`}
                                       placeholder='Mail an DG AMS'
                                       {...register('rmMailAMS', {required: false})}
                                   />
                                   <label>Mail an DG AMS</label>
                               </section>

                               <section className='flex justify-start text-grey items-center gap-2'>
                                   <input
                                       type='checkbox'
                                       className={`cursor-pointer`}
                                       placeholder='Mail an DG KAM'
                                       {...register('rmMailKAM', {required: false})}

                                   />
                                   <label>Mail an DG KAM</label>
                               </section>
                               <section className='flex justify-center text-grey items-center gap-2 col-span-2 text-sm'>
                                   <input
                                       type='checkbox'
                                       className={`cursor-pointer`}
                                       {...register('aaa', {required: false})}

                                   />
                                   <label>infomail in der Zwischenzeit pausieren</label>
                               </section>
                               <input
                                   className={`bg-mainBlue rounded-2xl col-span-2 px-3 py-2 mt-2 text-white cursor-pointer text-sm ${(!watch('date')) || !isValid || watch('rmTitle') === 'Wähle eine Option' ? 'bg-disableBlue cursor-no-drop' : 'bg-mainBlue hover:bg-lightBlue'}`}
                                   type="submit"
                                   disabled={(!watch('date')) || watch('rmTitle') === 'Wähle eine Option' || !isValid || (role === 'ManRUV' || role === 'ManDGG')}
                                   value={`${!loading ? 'Speichern' : 'sparen...'}`}
                               />

                               <input
                                   className={`bg-grey hover:bg-cancel col-span-2 rounded-2xl px-3 py-2 mt-2 cursor-pointer text-white text-sm text-center`}
                                   value={`abbrechen`}
                                   onClick={cancelEditStates}
                               />
                           </form>
                       </div>
                   }
            />
        </div>
    )
}

export default Reminders