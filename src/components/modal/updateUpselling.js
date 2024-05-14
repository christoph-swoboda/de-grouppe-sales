import React, {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {useStateValue} from "../../states/StateProvider";
import {AES, enc} from "crypto-js";
import {FaWindowClose} from "react-icons/fa";

const UpdateUpselling = ({data, toggle, options, FPID}) => {
    const [showModal, setShowModal] = useState(false);
    const [roleShort, setRoleShort] = useState('')
    const [loading, setLoading] = useState(false);
    const [{upsellingSaved, secretKey}, dispatch] = useStateValue();

    const {
        register, handleSubmit, watch, setValue, getValues, formState, formState: {errors, touchedFields},
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    useEffect(() => {
        console.log('data', data)
        setValue('status', data)
    }, [data]);

    useEffect(() => {
        console.log('status', getValues('status'))
    }, [watch('status')]);


    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const userID = user?.id

    const onSubmit = async (data) => {

        let OptionID
        options?.map(op=>{
            if(op.title===data.status){
                OptionID=op.ID
            }
        })

        setLoading(true)
        data.UID = userID;
        data.portal = 'dgg';
        data.ID = OptionID;
        data.FP_ID = FPID;

        Api().post('/sp_setUpselling', data).then(res => {
            toast.success('Saved Successfully')
            setLoading(false)
            dispatch({type: "SET_UPSELLING_SAVED", item: !upsellingSaved})
        }).catch(e => {
            setLoading(false)
            toast.error('Etwas ist schief gelaufen!!')
        })
    };

    return (
        <>
            <div className='float-right cursor-pointer'>
                <FaWindowClose size='30px' color={'#212121'} onClick={toggle}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}
                  className='bg-white rounded-lg centerItemsAbsolute'
            >
                <section className='flex flex-col text-left text-grey text-sm'>
                    <label className='py-2'>Rolle auswählen *</label>
                    <select {...register('status', {
                        required: 'Ihr Rolle ist erforderlich',
                    })}
                            required
                            style={{border: errors.role && '1px solid red'}}
                            className='px-4 py-2 rounded-md bg-offWhite cursor-pointer mb-7'
                    >
                        {
                            watch('status')==='Keine Information' &&
                            <option value=''>Wähle eine Option</option>
                        }
                        {
                            options?.map(op => (
                                <option key={op.ID} value={op.title}>{op.title}</option>
                            ))
                        }
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
                    onClick={toggle}
                >
                    Abbrechen
                </button>
            </form>
        </>
    );
};

export default UpdateUpselling;