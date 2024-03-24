import React, {useState, useEffect} from "react";
import {useForm} from "react-hook-form";
import Api from "../../Api/api";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import {BeatLoader} from "react-spinners";
import { AES, enc } from 'crypto-js';
import {useStateValue} from "../../states/StateProvider";

const Login = () => {

    const [loading, setLoading] = useState(false)
    const {register, handleSubmit, formState, formState: {errors, touchedFields}} = useForm({mode: "onChange"});
    const {isValid} = formState;
    const [{secretKey}, dispatch] = useStateValue();

    const onSubmit = async (data) => {
        setLoading(true)
        Api().post('/login', data).then(res => {
            if (res.status === 200) {
                localStorage.setItem('user', AES.encrypt(JSON.stringify(res.data[0]), secretKey).toString());
                localStorage.setItem('portal', '')
                window.location.replace(`/firmenprojekte-liste`)
                setLoading(false)
            }
        }).catch(e => {
            if(e.response.status===520){
                toast.error(e.response.data)
            }
            else{
                toast.error('Etwas ist schief gelaufen!!')
            }
            setLoading(false)
        })
    };

    return (
            <div className='rounded-lg bg-white'>
                <form onSubmit={handleSubmit(onSubmit)}
                      className='mb-10 p-10 w-full md:w-6/12 lg:w-4/12 centerItemsAbsolute bg-white border border-whiteDark rounded-lg'>
                    <h2 className='text-2xl mb-3'> DG ProjektPortal</h2>
                    <h2 className='text-xl '>Anmeldung</h2>
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
                    <Link className='text-sm' to={'/reset-password'}>Haben Sie Ihr
                        <span className='ml-1 underline text-mainBlue'> Passwort vergessen ?</span>
                    </Link>
                </form>
            </div>
    )
}

export default Login