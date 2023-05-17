import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {Link} from "react-router-dom";
import {GrClose} from "react-icons/gr";
import {useStateValue} from "../../states/StateProvider";

const AddUsers = () => {
    const [loading, setLoading] = useState(false)
    const [{addUsersModal, addUsersDone}, dispatch] = useStateValue();
    const {
        register, getValues, setValue, watch, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {
        setLoading(true)
        Api().post('/registerByAdmin', data).then(res => {
            if (res.status === 201) {
                setLoading(false)
                dispatch({type: "SET_ADDUSERS_MODAL", item: !addUsersModal})
                dispatch({type: "SET_ADDUSERS_DONE", item: !addUsersDone})
                toast.success('Benutzer erfolgreich hinzugefügt und E-Mail gesendet')
            }
        }).catch(e => {
            setLoading(false)
            if (e.response.status === 503) {
                toast.error(e.response.data)
            } else {
                toast.error('Etwas ist schief gelaufen!')
            }
        })
    };

    return (
        <div>
            <GrClose className='cursor-pointer float-right'
                     onClick={() => dispatch({type: "SET_ADDUSERS_MODAL", item: !addUsersModal})} size='24px'/>
            <h2 className='text-xl text-center'>Neuen Benutzer Hinzufügen</h2>
            <p className='text-xs text-grey text-center'>* Pflichtfeld</p>

            <form onSubmit={handleSubmit(onSubmit)} className='mb-10 px-16 py-1 bg-white rounded-lg'>
                <section className='flex flex-col text-left text-grey text-sm'>
                    <label className='py-2'>E-mail *</label>
                    <input placeholder='E-Mail'
                           {...register('email', {
                               required: 'E-Mail ist erforderlich',
                               pattern: {
                                   value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                   message: 'Bitte geben Sie eine gültige E-Mail ein',
                               },
                           })}
                           type="email"
                           required
                           style={{border: errors.email && '1px solid red'}}
                    />
                    {errors.email && touchedFields && <p>{errors.email.message}</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label className='py-2'>Passwort *</label>
                    <input placeholder='Passwort'
                           type='text'
                           {...register('password', {
                               required: 'Ihr Passwort ist erforderlich',
                               pattern: {
                                   value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                                   message: 'Mindestens acht Zeichen, mindestens ein Großbuchstabe, ein Kleinbuchstabe und eine Zahl',
                               },
                           })}
                           required
                           style={{border: errors.password && '1px solid red'}}
                    />
                    {errors.password && touchedFields && <p>{errors.password.message}</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label className='py-2'>Passwort wiederholen *</label>
                    <input placeholder='Passwort wiederholen'
                           type='text'
                           {...register("confirm_password", {
                               required: 'Ihr Passwort ist erforderlich',
                               validate: (val) => {
                                   if (watch('password') !== val) {
                                       return "Ihre Passwörter stimmen nicht überein";
                                   }
                               }
                           })}
                           required
                           style={{border: errors.confirm_password && '1px solid red'}}
                    />
                    {errors.confirm_password && touchedFields && <p>{errors.confirm_password.message}</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label className='py-2'>Vorname </label>
                    <input placeholder='Vorname'
                           type='text'
                           {...register('vorname', {
                               pattern: {
                                   value: /^.{1,50}$/,
                                   message: 'maximal 50 Zeichen erlaubt',
                               },
                           })}
                           style={{border: errors.vorname && '1px solid red'}}
                    />
                    {errors.vorname && touchedFields && <p>{errors.vorname.message}</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label className='py-2'>Nachname </label>
                    <input placeholder='Nachname'
                           type='text'
                           {...register('nachname', {
                               pattern: {
                                   value: /^.{1,50}$/,
                                   message: 'maximal 50 Zeichen erlaubt',
                               },
                           })}
                           style={{border: errors.nachname && '1px solid red'}}
                    />
                    {errors.nachname && touchedFields && <p>{errors.nachname.message}</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm py-2'>
                    <label className='pb-2'>VP-Nummer </label>
                    <input placeholder='VP-Nummer'
                           type='text'
                           {...register('partnernr', {
                               pattern: {
                                   value: /^.{1,20}$/,
                                   message: 'maximal 20 Zeichen erlaubt',
                               },
                           })}
                           style={{border: errors.partnernr && '1px solid red'}}
                    />
                    {errors.partnernr && touchedFields && <p>{errors.partnernr.message}</p>}
                </section>

                <label htmlFor="field-aktiv" className='mt-5'>
                    <input
                        {...register("aktiv")}
                        type="checkbox"
                        id="field-aktiv"
                    />
                    <span className='mx-1 text-sm text-grey'> Aktiv</span>
                </label>

                <section className='text-sm text-text py-3'>
                    <label htmlFor="field-role">
                        <input
                            {...register("role")}
                            type="radio"
                            value="1"
                            id="field-role"
                        />
                        <span className='mr-8 ml-1'>Innendienst</span>
                    </label>
                    <label htmlFor="field-role">
                        <input
                            {...register("role")}
                            type="radio"
                            defaultChecked
                            value="2"
                            id="field-role"
                        />
                        <span className='mr-8'> FKB</span>
                    </label>
                    <label htmlFor="field-role">
                        <input
                            {...register("role")}
                            type="radio"
                            value="3"
                            id="field-role"
                        />
                        <span className='mr-8'> Vorstand </span>
                    </label>
                    <label htmlFor="field-role">
                        <input
                            {...register("role")}
                            type="radio"
                            value="4"
                            id="field-role"
                        />
                        <span className='mr-1'> Controlling </span>
                    </label>
                </section>

                <label htmlFor="field-aktiv" className='mt-5' hidden={watch('role') !== '1'}>
                    <input
                        className='mx-1'
                        {...register("admin")}
                        type="checkbox"
                        id="field-aktiv"
                    />
                    <span className='mx-1 text-sm text-grey'> Darf Benutzer verwalten</span>
                </label>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label className='opacity-0'>*</label>
                    <input
                        className={(isValid) ? 'bg-mainBlue text-white cursor-pointer' : 'bg-disableBlue text-white'}
                        disabled={!isValid} type="submit"
                        value={(!loading) ? 'Benutzer speichern' : 'Überprüfen Sie...'}
                    />
                </section>
            </form>
        </div>
    )
}

export default AddUsers