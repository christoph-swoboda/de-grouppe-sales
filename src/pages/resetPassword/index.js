import React, {useState, useEffect} from "react";
import {BeatLoader} from "react-spinners";
import {useForm} from "react-hook-form";
import Api from "../../Api/api";
import {toast} from "react-toastify";

const ResetPassword = () => {
    const [loading, setLoading] = useState(false)
    const {register, handleSubmit, formState, formState: {errors, touchedFields}} = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {
        setLoading(true)
        Api().post('/resetPassword', data).then(res => {
            setLoading(false)
            toast.success('Wir haben Ihnen eine E-Mail mit dem Link zum Zurücksetzen gesendet')
        }).catch(e => {
            if(e.response.status===520){
                toast.error('Benutzer nicht gefunden!!')
            }
            else{
                toast.error('Etwas ist schief gelaufen!!')
            }
            setLoading(false)
        })
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}
                  className='mb-10 p-10 w-full md:w-6/12 lg:w-4/12 centerItemsAbsolute bg-white border border-whiteDark rounded-lg'>
                <h2 className='text-2xl mb-3'>DG ProjektPortal</h2>
                <h2 className='text-xl '> Passwort zurücksetzen </h2>
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

                {/*<section className='flex flex-col text-left text-grey text-sm'>*/}
                {/*    <label className='py-2'>VP-Nummer *</label>*/}
                {/*    <input placeholder='VP-Nummer'*/}
                {/*           type='text'*/}
                {/*           {...register('vp', {required: 'Ihr Passwort ist erforderlich'})}*/}
                {/*           style={{border: errors.vp && '1px solid red'}}*/}
                {/*    />*/}
                {/*    {errors.vp && touchedFields && <p>{errors.vp.message}</p>}*/}
                {/*</section>*/}

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
                                value={'E-Mail jetzt senden'}
                            />
                    }
                </section>
            </form>
        </div>
    )
}

export default ResetPassword