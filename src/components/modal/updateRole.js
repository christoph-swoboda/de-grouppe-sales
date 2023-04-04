import React, {useEffect, useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {useForm} from "react-hook-form";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {useStateValue} from "../../states/StateProvider";

const UpdateRole = ({userID, role}) => {
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [{userValidated}, dispatch] = useStateValue();
    const {
        register, handleSubmit, watch, setValue, formState, formState: {errors, touchedFields},
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    useEffect(() => {
        setValue('role', role[0].toLowerCase())
    }, [role, userID]);

    const onSubmit = async (data) => {
        setLoading(true)
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
                <>
                    <div
                        className="flex overlay text-text justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 bg-white outline-none focus:outline-none">
                        <div className="relative lg:w-1/3 md:w-screen mx-2 my-6 mx-auto">
                            <div
                                className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div
                                    className="flex items-start justify-between p-5 border-b border-solid border-offWhite rounded-t ">
                                    <h3 className="text-xl opacity-0">Rolle ändern</h3>
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
                                        <h2 className='text-2xl mb-3'>Rolle ändern</h2>
                                        <input value={userID} {...register('userID')} hidden/>
                                        <input value={role[0].toLowerCase()} {...register('oldRole')} hidden/>
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
                                                <option value='s'>FKB</option>
                                                <option value='e'>Vorstand</option>
                                                <option value='c'>Controlling</option>
                                            </select>
                                            {errors.role && touchedFields &&
                                                <p>{errors.role.message}</p>}
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

export default UpdateRole;