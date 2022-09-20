import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import Api from "../../Api/api";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {BeatLoader} from "react-spinners";

const Login = () => {

    const [loading, setLoading] = useState(false)
    const {
        register, getValues, setValue, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {
        setLoading(true)
        Api().post('/login', data).then(res => {
            if (res.status === 200) {
                localStorage.user = JSON.stringify(res.data[0])
                localStorage.role = JSON.stringify(res.data[0].role)
                window.location.replace('/')
                setLoading(false)
            }
        }).catch(e => {
            setLoading(false)
            toast.error('Something Went Wrong!!')
        })
    };

    return (
            <div className='rounded-lg bg-white'>
                <form onSubmit={handleSubmit(onSubmit)}
                      className='mb-10 p-10 w-full md:w-6/12 lg:w-4/12 centerItemsAbsolute bg-white border border-whiteDark rounded-lg'>
                    <h2 className='text-2xl mb-3'>#DG-Projektportal</h2>
                    <h2 className='text-xl '>Login</h2>
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
                               {...register('password', {required: 'Ihr Passwort ist erforderlich'})}
                               style={{border: errors.password && '1px solid red'}}
                        />
                        {errors.password && touchedFields && <p>{errors.password.message}</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm'>
                        <label className='opacity-0'>Passwort *</label>
                        {
                            loading ?
                                <button className='bg-mainBlue text-white cursor-pointer p-2'>
                                    <BeatLoader size={10} color={'#ffffff'}/>
                                </button>
                                :
                                <input
                                    className={(isValid) ? 'bg-mainBlue text-white cursor-pointer' : 'text-white bg-disableBlue'}
                                    disabled={!isValid} type="submit"
                                    value={'Einloggen'}
                                />
                        }
                    </section>
                    <br/>
                    <Link className='text-sm' to={'/register'}>Sie haben kein Konto?
                        <span className='ml-1 underline text-mainBlue'> Hier registrieren</span>
                    </Link>
                </form>
            </div>
    )
}

export default Login