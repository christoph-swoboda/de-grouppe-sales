import React, {useState} from "react";
import {useParams} from "react-router";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import Api from "../../../Api/api";
import {toast} from "react-toastify";

const SubmitPassword = () => {
    const {token} = useParams();
    const {email} = useParams();

    const [loading, setLoading] = useState(false)
    const {register, handleSubmit, watch, formState, formState: {errors, touchedFields}} = useForm({mode: "onChange"});
    const {isValid} = formState;
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        setLoading(true)
        Api().post('/saveResetPassword', data).then(res => {
            setLoading(false)
            if (res.data[0].success) {
                toast.success(res.data[0].success)
            } else if (res.data[0].error) {
                toast.error(res.data[0].error)
            }
            navigate('/anmeldung')
            // window.location.replace(`/anmeldung`)
        }).catch(e => {
            toast.error('Etwas ist schief gelaufen!')
            setLoading(false)
        })
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}
                  className='mb-10 p-10 w-full md:w-6/12 lg:w-4/12 centerItemsAbsolute bg-white border border-whiteDark rounded-lg'
            >
                <h2 className='text-2xl mb-3'>#DG-Projektportal</h2>
                <h2 className='text-xl '>Neues Passwort speichern</h2>

                <input type={'hidden'}  {...register('token')} value={atob(token)}/>
                <input type={'hidden'}  {...register('email')} value={atob(email)}/>
                <section className='flex flex-col text-left text-grey text-sm'>
                    <label className='py-2'>Passwort *</label>
                    <input placeholder='Neues Passwort eingeben'
                           type='password'
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
                    <label className='py-2'>Bestätigen Passwort *</label>
                    <input placeholder='Bestätige neues Passwort'
                           type='password'
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
                    <label className='opacity-0'>Passwort *</label>
                    <input
                        className={(isValid) ? 'bg-mainBlue text-white cursor-pointer' : 'bg-disableBlue text-white'}
                        disabled={!isValid} type="submit"
                        value={(!loading) ? 'Speichern' : 'Sparen...'}
                    />
                </section>
            </form>
        </div>
    )
}

export default SubmitPassword