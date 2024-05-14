import React, {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import Api from "../../Api/api";
import {toast} from "react-toastify";
import {useStateValue} from "../../states/StateProvider";
import {AES, enc} from "crypto-js";
import {FaWindowClose} from "react-icons/fa";
import {formatDate} from "../../helper/formatDate";

const UpdateUpselling = ({data, toggle, options, FPID, dataFull}) => {

    const [loading, setLoading] = useState(false);
    const [{upsellingSaved, secretKey}, dispatch] = useStateValue();

    const [showOptions, setShowOptions] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const optionsRef = useRef(null);

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        setShowOptions(false);
        setValue('status', option.title);
    };

    const {
        register, handleSubmit, watch, setValue, getValues, formState, formState: {errors, touchedFields},
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    useEffect(() => {
        setValue('status', data)
    }, [data]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (optionsRef.current && !optionsRef.current.contains(event.target)) {
                setShowOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

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
                            style={{width: '25px'}}
                            src={`${window.location.origin}/icons/${dataFull[1].split(',')[0].replace(/\s/g, "")}.png`}
                            alt=''
                        />

                    }
                    <div className='flex text-sm justify-between w-60 ml-1'>
                        <h3>{dataFull[1].split(',')[0]}</h3>
                        <h3>{formatDate(dataFull[1].split(',')[1]?.split(':')[1])}</h3>
                    </div>

                </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}
                  className='bg-white rounded-lg centerItemsAbsolute w-8/12'
            >
                <section className='flex flex-col text-left text-grey text-sm'>
                    <div className="relative my-3 -mt-16 w-full">
                        <h3 className='py-1'>neuer status *</h3>
                        <div
                            className='px-4 py-2 w-full rounded-md bg-white cursor-pointer text-left border border-whiteDark'
                            onClick={() => setShowOptions(!showOptions)}>
                            {selectedOption ?    <div>
                                <div className='flex justify-start items-center gap-2'>
                                    <img src={`${window.location.origin}/icons/${selectedOption.icon}`} alt={ selectedOption.title}/>
                                    <span>{ selectedOption.title}</span>
                                    <div className='ml-auto'>
                                        {
                                            !showOptions?
                                                <i className="dropdown-icon float-right">▼</i>
                                                :
                                                <i className="dropdown-icon float-right">▲</i>
                                        }
                                    </div>
                                </div>
                            </div>: 'Status wählen'}

                        </div>
                        {showOptions && (
                            <div ref={optionsRef}
                                 className="absolute w-full top-full left-0 mt-1 bg-white shadow-md z-10 border border-whiteDark rounded-md">
                                {options?.map((op) => (
                                    <div
                                        key={op.ID}
                                        className='flex justify-start gap-2 items-center cursor-pointer px-4 py-1'
                                        onClick={() => handleOptionClick(op)}>
                                        <img src={`${window.location.origin}/icons/${op.icon}`} alt={op.title}/>
                                        <span className='ml-2'>{op.title}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                </section>
                <br/>
                <div className='flex justify-between gap-2 -mt-4'>
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