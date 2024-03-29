import React, {useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {useForm} from "react-hook-form";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {AES, enc} from "crypto-js";
import {useStateValue} from "../../states/StateProvider";

const ChangePass = () => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [{secretKey}, dispatch] = useStateValue();
    const decryptedBytes = localStorage.getItem('user')?AES.decrypt(localStorage.getItem('user'), secretKey):false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))

    const {
        register, handleSubmit, watch, formState, formState: {errors, touchedFields},
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {
        setLoading(true)
        Api().post('/changePass', data).then(res => {
            if (res.data[0].error) {
                toast.error(res.data[0].error)
                setLoading(false)
            } else {
                toast.success(res.data[0].success)
                setLoading(false)
                setShowModal(false)
                window.alert('Bitte melden Sie sich erneut an')
                localStorage.removeItem('user')
                window.location.replace('/anmeldung')
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
        <>
            <button
                className="active:bg-blue-500 outline-none focus:outline-none"
                type="button"
                onClick={() => setShowModal(true)}
            >
                Passwort ändern
            </button>
            {showModal ? (
                <>
                    <div
                        className="flex overlay text-text justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-white outline-none focus:outline-none">
                        <div className="relative lg:w-1/3 md:w-screen mx-2 my-6 mx-auto">
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-offWhite rounded-t ">
                                    <h3 className="text-xl opacity-0">Passwort ändern</h3>
                                    <button
                                        className="bg-transparent border-0 text-black float-right"
                                        onClick={() => setShowModal(false)}
                                    >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                     <AiOutlineClose/>
                    </span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={handleSubmit(onSubmit)}
                                          className='px-8 pt-2 pb-10 bg-white rounded-lg'
                                    >
                                        <h2 className='text-2xl mb-3'>Passwort ändern</h2>
                                        <input value={user?.ID} {...register('userID')} hidden/>
                                        <input value={user?.email} {...register('email')} hidden/>
                                        <section className='flex flex-col text-left text-grey text-sm'>
                                            <label className='py-2'>Altes Passwort *</label>
                                            <input placeholder='Altes Passwort'
                                                   type='password'
                                                   {...register('old_password', {
                                                       required: 'Ihr Passwort ist erforderlich',
                                                   })}
                                                   required
                                                   style={{border: errors.old_password && '1px solid red'}}
                                            />
                                            {errors.old_password && touchedFields &&
                                                <p>{errors.old_password.message}</p>}
                                        </section>

                                        <section className='flex flex-col text-left text-grey text-sm'>
                                            <label className='py-2'>Neues Passwort *</label>
                                            <input placeholder='Neues Passwort'
                                                   type='password'
                                                   {...register('password', {
                                                       required: 'Ihr Passwort ist erforderlich',
                                                       pattern: {
                                                           value: /^(?=.*[a-zA-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                                                           message: 'Mindestens acht Zeichen, mindestens ein Großbuchstabe, ein Kleinbuchstabe und eine Zahl',
                                                       },
                                                   })}
                                                   required
                                                   style={{border: errors.password && '1px solid red'}}
                                            />
                                            {errors.password && touchedFields && <p>{errors.password.message}</p>}
                                        </section>

                                        <section className='flex flex-col text-left text-grey text-sm mb-6'>
                                            <label className='py-2'> Neues Passwort bestätigen*</label>
                                            <input placeholder='Neues Passwort bestätigen'
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
                                            {errors.confirm_password && touchedFields &&
                                                <p>{errors.confirm_password.message}</p>}
                                        </section>
                                        <input
                                            className={(isValid) ? 'bg-mainBlue text-white cursor-pointer rounded-md' : 'rounded-md bg-disableBlue text-white'}
                                            disabled={!isValid} type="submit"
                                            value={(!loading) ? 'Speichern' : 'Überprüfen Sie...'}
                                        />
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 hover:bg-text hover:text-white py-3 bg-whiteDark ml-2 rounded-md text-sm outline-none focus:outline-none mr-1 mb-1"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Abbrechen
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default ChangePass;