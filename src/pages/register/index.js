import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import Api from "../../Api/api";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

const Login = () => {

    const [loading, setLoading] = useState(false)
    let keys = ''
    const {
        register, getValues, setValue, watch, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {
        setLoading(true)
        Api().post('/register', data).then(res => {
            if (res.status === 200) {
                window.location.replace('/login')
                setLoading(false)
            }
        }).catch(e => {
            setLoading(false)
            toast.error('Something Went Wrong!!')
        })
    };


    return (
        <div className='rounded-lg'>
            <form onSubmit={handleSubmit(onSubmit)}
                  className='mb-10 p-10 w-full md:w-6/12 lg:w-4/12 centerItemsAbsolute bg-white border border-whiteDark rounded-lg'
            >
                <h2 className='text-2xl mb-3'>#DG-Projektportal</h2>
                <h2 className='text-xl '>Register</h2>
                <section className='flex flex-col text-left text-grey text-sm'>
                    <label className='py-2'>Email *</label>
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
                    <input placeholder='Bestätigen Passwort'
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
                        value={(!loading) ? 'Registrieren' : 'Überprüfen Sie...'}
                    />
                </section>
                <br/>
                <Link className='text-sm' to={'/login'}>Sie haben bereits ein Konto?
                    <span className='ml-1 underline text-mainBlue'> Hier einloggen</span>
                </Link>
            </form>
        </div>
    )
}

export default Login