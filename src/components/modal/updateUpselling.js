import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {useStateValue} from "../../states/StateProvider";
import {AES, enc} from "crypto-js";
import {FaWindowClose} from "react-icons/fa";
import {formatDate} from "../../helper/formatDate";

const UpdateUpselling = ({data, toggle, options, FPID, dataFull}) => {
    const [showModal, setShowModal] = useState(false);
    const [roleShort, setRoleShort] = useState('')
    const [loading, setLoading] = useState(false);
    const [{upsellingSaved, secretKey}, dispatch] = useStateValue();

    const {
        register, handleSubmit, watch, setValue, getValues, formState, formState: {errors, touchedFields},
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    useEffect(() => {
        setValue('status', data)
    }, [data]);

    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const userID = user?.id

    const onSubmit = async (data) => {

        let OptionID
        options?.map(op => {
            if (op.title === data.status) {
                OptionID = op.ID
            }
        })

        setLoading(true)
        data.UID = userID;
        data.portal = 'dgg';
        data.ID = OptionID;
        data.FP_ID = FPID;

        Api().post('/sp_setUpselling', data).then(res => {
            toast.success('Daten erfolgreich aktualisiert')
            setLoading(false)
            dispatch({type: "SET_UPSELLING_SAVED", item: !upsellingSaved})
            toggle()
        }).catch(e => {
            setLoading(false)
            toast.error('Etwas ist schief gelaufen!!')
        })
    };

    return (
        <>
            <div className='float-right cursor-pointer -mt-20'>
                <FaWindowClose size='30px' color={'#212121'} onClick={toggle}/>
            </div>
            <div className='flex justify-between items-center mt-20 w-8/12 mx-auto text-text'>
                <h3 className='text-sm'>{dataFull[0]}</h3>
                <div className='flex justify-between items-center border border-offWhite p-2'>
                    {
                        dataFull[1].split(',')[0] !== 'Keine Information' &&
                        <img
                            style={{width:'25px'}}
                            src={`${window.location.origin}/icons/${dataFull[1].split(',')[0].replace(/\s/g, "")}.png`}
                            alt=''
                        />

                    }
                    <div className='flex text-sm justify-between w-56 ml-1'>
                        <h3>{dataFull[1].split(',')[0]}</h3>
                        <h3>{formatDate(dataFull[1].split(',')[1]?.split(':')[1])}</h3>
                    </div>

                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}
                  className='bg-white rounded-lg centerItemsAbsolute w-8/12'
            >
                <section className='flex flex-col text-left text-grey text-sm'>
                    <label className='py-2'> neuer status *</label>
                    <select {...register('status', {
                        required: 'Ihr Rolle ist erforderlich',
                    })}
                            required
                            style={{border: errors.role && '1px solid red'}}
                            className='px-4 py-2 rounded-md bg-offWhite cursor-pointer mb-7'
                    >
                        {
                            watch('status') === 'Keine Information' &&
                            <option value=''>Wähle eine Option</option>
                        }
                        {
                            options?.map(op => (
                                <option key={op.ID} value={op.title}>
                                    <img src={`${window.location.origin}/icons/${op.icon}`}/>
                                    <span className='ml-2'>{op.title}</span>
                                </option>
                            ))
                        }
                    </select>
                    {errors.role && touchedFields &&
                        <p>{errors.role.message}</p>}
                </section>
                <div className='flex justify-between gap-2'>
                    <input
                        className={(isValid) ? 'bg-mainBlue w-full text-white cursor-pointer rounded-md' : 'rounded-md bg-disableBlue w-full text-white'}
                        disabled={!isValid} type="submit"
                        value={(!loading) ? 'speichern' : 'speichere...'}
                    />
                    <button
                        className="text-red-500background-transparent w-full font-bold px-6 hover:bg-text hover:text-white bg-whiteDark rounded-md text-sm outline-none focus:outline-none"
                        type="button"
                        onClick={toggle}
                    >
                        abbrechen
                    </button>
                </div>
            </form>
        </>
    );
};

export default UpdateUpselling;