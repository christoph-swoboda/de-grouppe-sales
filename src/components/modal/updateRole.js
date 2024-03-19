import React, {useEffect, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {useForm} from "react-hook-form";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {useStateValue} from "../../states/StateProvider";
import {AES, enc} from "crypto-js";

const UpdateRole = ({userID, role, subRoles}) => {
    const [showModal, setShowModal] = useState(false);
    const [roleShort, setRoleShort]=useState('')
    const [loading, setLoading] = useState(false);
    const [{userValidated, secretKey}, dispatch] = useStateValue();

    const {
        register, handleSubmit, watch, setValue, getValues, formState, formState: {errors, touchedFields},
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    useEffect(() => {
        if(role==='ExtDGG'){
            setRoleShort('ed')
        }else if(role==='ExtRUV'){
            setRoleShort('er')
        }else if(role==='ManDGG'){
            setRoleShort('md')
        }else if(role==='ManRUV'){
            setRoleShort('mr')
        }else if(role==='Controlling'){
            setRoleShort('c')
        }else if(role==='Internal'){
            setRoleShort('i')
        }

        setValue('role', roleShort)
        setValue('isSAdmin', subRoles.isSAdmin === '1')
        setValue('isIMAdmin', subRoles.isIMAdmin === '1')
        setValue('isICAdmin', subRoles.isICAdmin === '1')
        setValue('isUserAdmin', subRoles.isUserAdmin === '1')
    }, [role, userID, subRoles]);

    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))

    useEffect(() => {
        setValue('isSAdmin', subRoles.isSAdmin === '1')
        setValue('isIMAdmin', subRoles.isIMAdmin === '1')
        setValue('isICAdmin', subRoles.isICAdmin === '1')
        setValue('isUserAdmin', subRoles.isUserAdmin === '1')
    }, [watch('role')]);


    const onSubmit = async (data) => {
        setLoading(true)
        data.userID = userID;
        Api().post('/changeRole', data).then(res => {
            if (res.data[0].success) {
                toast.success(res.data[0].success)
                setShowModal(false)
                dispatch({type: "SET_USER_VALIDATED", item: !userValidated})
            }
            if (res.data[0].error) {
                toast.error(res.data[0].error)
            }
            setLoading(false)
        }).catch(e => {
            setLoading(false)
            toast.error('Etwas ist schief gelaufen!!')
        })
    };

    return (
        <>
            <button
                className='border mr-4 border-lightBlueDark bg-lightBlueDark rounded-3xl px-3 pt-1 pb-1 text-white text-center font-extrabold uppercase cursor-pointer'
                type="button"
                onClick={() => setShowModal(true)}
            >
                Rolle ändern
            </button>
            {showModal ? (
                <div
                    className="flex overlay text-text justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-white outline-none focus:outline-none">
                    <div className="relative lg:w-2/5 md:w-screen my-6 mx-auto">
                        <div
                            className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <div
                                className="flex items-start justify-between p-5 border-b border-solid border-offWhite rounded-t ">
                                <h3 className="text-xl opacity-0">Rolle ändern</h3>
                                <button
                                    className="bg-transparent border-0 text-black float-right"
                                    onClick={() => setShowModal(false)}
                                >
                                <span
                                    className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                                     <AiOutlineClose/>
                                </span>
                                </button>
                            </div>
                            <div className="relative p-6 flex-auto">
                                <form onSubmit={handleSubmit(onSubmit)}
                                      className='px-8 pt-2 pb-10 bg-white rounded-lg'
                                >
                                    <h2 className='text-2xl mb-3'>Rolle ändern</h2>
                                    <input value={userID} {...register('userID')} hidden/>
                                    <input value={roleShort} {...register('oldRole')} hidden/>
                                    <section className='flex flex-col text-left text-grey text-sm'>
                                        <label className='py-2'>Rolle auswählen *</label>
                                        <select {...register('role', {
                                            required: 'Ihr Rolle ist erforderlich',
                                        })}
                                                required
                                                style={{border: errors.role && '1px solid red'}}
                                                className='px-4 py-2 rounded-md bg-offWhite cursor-pointer mb-7'
                                        >
                                            <option value='i'>Innendienst</option>
                                            <option value='er'>FKB</option>
                                            <option value='ed'>VP</option>
                                            <option value='mr'>Management</option>
                                            <option value='md'>Struktur </option>
                                            <option value='c'>Controlling</option>
                                        </select>
                                        {errors.role && touchedFields &&
                                            <p>{errors.role.message}</p>}
                                    </section>
                                    {
                                        watch('role') === 'i' && user.isUserAdmin === '1' &&
                                        <div className='mb-10 grid grid-cols-4'>
                                            {
                                                user.isSAdmin==='1' &&
                                                <label htmlFor="field-role">
                                                    <input
                                                        {...register("isSAdmin")}
                                                        type="checkbox"
                                                        id="field-role"
                                                    />
                                                    <span className='mr-4'> Super Admin </span>
                                                </label>
                                            }

                                            <label htmlFor="field-role">
                                                <input
                                                    {...register("isUserAdmin")}
                                                    type="checkbox"
                                                    id="field-role"
                                                />
                                                <span className='mr-6'> Admin </span>
                                            </label>

                                            <label htmlFor="field-role">
                                                <input
                                                    {...register("isICAdmin")}
                                                    type="checkbox"
                                                    id="field-role"
                                                />
                                                <span className='mr-2'> InfoCrawler </span>
                                            </label>

                                            <label htmlFor="field-role">
                                                <input
                                                    {...register("isIMAdmin")}
                                                    type="checkbox"
                                                    id="field-role"
                                                />
                                                <span> InfoMail </span>
                                            </label>
                                        </div>
                                    }

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
            ) : null}
        </>
    );
};

export default UpdateRole;