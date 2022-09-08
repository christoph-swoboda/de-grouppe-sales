import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import Api from "../../Api/api";
import {Link} from "react-router-dom";

const Login = () => {

    const [loading, setLoading] = useState(false)
    let keys = ''
    const {
        register, getValues, setValue, watch, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {
        Api().post('/register', data).then(res=>{
            console.log('res', res)
        })
    };


    return (
        <div className='container'>
            <div className='bg-white rounded-lg'>
                <form onSubmit={handleSubmit(onSubmit)} className='mb-10 lg:p-10 sm:p-1 lg:w-4/12 sm:12/12 centerItemsAbsolute'>
                <h2 className='text-3xl'>Register</h2>
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
                            className={(isValid) ? 'bg-mainBlue text-white cursor-pointer' : 'bg-whiteDark text-grey'}
                            disabled={!isValid} type="submit"
                            value={(!loading) ? 'Registrieren' : 'Überprüfen Sie...'}
                        />
                    </section>
                    <br/>
                    <Link className='text-sm text-mainBlue' to={'/login'}>Sie haben bereits ein Konto? Hier
                        einloggen</Link>
                </form>
            </div>
        </div>
    )
}

export default Login