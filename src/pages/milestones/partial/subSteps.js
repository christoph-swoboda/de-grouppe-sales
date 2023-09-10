import React, {useCallback, useEffect, useRef, useState} from "react"
import {RiseLoader} from "react-spinners";
import {Controller, useForm} from "react-hook-form"
import {useStateValue} from "../../../states/StateProvider"
import moment from 'moment';
import DatePicker, {registerLocale} from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import de from "date-fns/locale/de";
import Api from "../../../Api/api";
import Options from "./fields/options";
import {toast} from "react-toastify";
import {GoCalendar} from "react-icons/go";
import {AES, enc} from "crypto-js";

registerLocale("de", de);

const SubSteps = ({data, loading, next, lastDoneIndex, grid, options, firma, title, lastIndex}) => {

    const [Loading, setLoading] = useState(false)
    const initialState = [];
    const ref = useRef()
    const datePickerRef = useRef(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState({});
    const [{currentMilestone, subStepSaved, secretKey}, dispatch] = useStateValue();
    const {
        register, reset, getValues, setValue, handleSubmit, formState, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;
    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const role = user.role
    const [update, setUpdated] = useState((localStorage.data && user.ID===JSON.parse(localStorage.data)[0].user )? JSON.parse(localStorage.data): [])


    useEffect(() => {
        let key = 'id';
        const unique = [...new Map(update?.map(item => [item[key], item])).values()];
        const handleBeforeUnload = (event) => {
            const confirmationMessage = 'Sind Sie sicher, dass Sie diese Seite verlassen möchten?';
            event.preventDefault();
            event.returnValue = confirmationMessage;
            // if (unique.length > 0) {
                localStorage.setItem('data', JSON.stringify(unique));
            // }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [update, currentMilestone]);

    // useEffect(() => {
    //     reset()
    // }, [currentMilestone]);

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (datePickerRef.current && !datePickerRef.current?.contains(event.target)) {
                setIsDatePickerOpen(false);
            }
        };
        const handleScroll = () => {
            setIsDatePickerOpen(false); // Close date picker when scrolling starts
        };
        document.addEventListener('click', handleDocumentClick);
        window.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('click', handleDocumentClick);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        if (data.length > 0) {
            data?.map(async (d, index) => {
                if (grid[Number(d.substepID) - 1]?.fieldValue) {
                    if (d.fieldType === 'date') {
                        let newDate = moment(grid[Number(d.substepID) - 1]?.fieldValue).toDate()
                        const dateFormat = 'DD-MM-YYYY';
                        const toDateFormat = moment(new Date(newDate)).format(dateFormat);
                        let valid = moment(toDateFormat, dateFormat, true).isValid()
                        if (valid) {
                            setValue(`${d.stepName}`, newDate)
                        } else {
                            setValue(`${d.stepName}`, moment(new Date()).toDate())
                        }
                    }
                    if (d.fieldType === 'option') {
                        if (grid[Number(d.substepID) - 1]?.fieldValue !== null) {
                            let filter = options.map(o => o.filter(oo => Number(oo.substepID) === Number(d.substepID)))
                            let filteredOption = filter.filter(f => f.length > 0)[0]
                            if (filteredOption) {
                                if ((grid[Number(d.substepID) - 1]?.fieldValue).length > 1) {
                                    await setValue(`${d.stepName}`, grid[Number(d.substepID) - 1]?.fieldValue)
                                } else {
                                    if (grid[Number(d.substepID) - 1]?.fieldValue === '0') {
                                        await setValue(`${d.stepName}`, 'Nein')
                                    } else if (grid[Number(d.substepID) - 1]?.fieldValue === '1') {
                                        await setValue(`${d.stepName}`, 'Ja')
                                    } else {
                                        await setValue(`${d.stepName}`, null)
                                    }
                                }
                            }
                        } else {
                            await setValue(`${d.stepName}`, null)
                        }
                    }
                    if (d.fieldType === 'text') {
                        setValue(`${d.substepID}`, `${grid[Number(d.substepID) - 1]?.fieldValue}`)
                    }
                }
            })
        }

    }, [data, grid, setValue, next, options]);

    const addObjectToArray = obj => {
        setUpdated(current => current && [...current, obj])
    };

    function convertLocalToUTCDate(date) {
        if (!date) {
            return date
        }
        date = new Date(date)
        date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
        return date
    }

    const onSubmit = async (Data) => {
        const key = 'id';
        const unique = [...new Map(update?.map(item => [item[key], item])).values()]

        if (unique?.length >0) {
            setLoading(true)
            Api().post('/saveSteps', unique).then(res => {
                localStorage.removeItem('data')
                dispatch({type: "SET_SUBSTEPSAVED", item: !subStepSaved})
                toast.success('Daten erfolgreich gespeichert')
                setLoading(false)
            }).catch(e => {
                setLoading(false)
                toast.error('Etwas ist schief gelaufen!')
            })
        } else {
            toast.warning('Sie haben nichts eingegeben')
        }
    };

    return (
        <div>
            {
                loading ?
                    <div hidden={next} style={{height: '32vh'}} className='mt-24'>
                        <h2 className='text-center text-sm'>
                            Wenn Sie das hier lesen, haben Sie zu wenig zu tun oder wir müssen die
                            Ladezeiten optimieren
                        </h2>
                        <span className='centerItemsRelative mt-2'><RiseLoader size='8px' color='grey'/></span>
                    </div>
                    :
                    <div hidden={loading}>
                        <div className='flex justify-between flex-wrap'>
                            <h2 className='text-xl mb-2 text-center font-bold'>{title}</h2>
                            <button
                                onClick={() => ref.current?.click()}
                                className={`${role === 'Supervisor' || role === 'Controller' && 'hidden'} hover:bg-lightBlue ml-auto  bg-mainBlue text-white cursor-pointer px-4 text-sm py-2  rounded-3xl`}
                                disabled={!isValid}>
                                {Loading ? 'Sparen...' : 'Speichern'}
                            </button>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}
                              className='grid grid-cols-1 gap-1 mt-6 rounded-lg'>
                            {
                                data.map((val, index) => (
                                    val.fieldType === 'option' ?
                                        <section
                                            key={index} className='tooltip grid grid-cols-2 gap-1 mt-0 rounded-lg'
                                            onChange={() =>
                                                getValues(val.stepName) ?
                                                    addObjectToArray({
                                                        firma: firma,
                                                        id: val.substepID,
                                                        milestone: currentMilestone,
                                                        type: 'option',
                                                        value: getValues(val.stepName),
                                                        user: user.ID,
                                                    }) :
                                                    addObjectToArray({
                                                        firma: firma,
                                                        id: val.substepID,
                                                        milestone: currentMilestone,
                                                        type: 'option',
                                                        value: null,
                                                        user: user.ID,
                                                    })
                                            }>
                                            <Options
                                                role={role}
                                                key={index}
                                                grid={grid}
                                                getValues={getValues}
                                                register={register}
                                                currentMilestone={currentMilestone}
                                                lastDoneIndex={lastDoneIndex}
                                                val={val}
                                                option={options}
                                            />
                                        </section>
                                        : val.fieldType === 'date' ?
                                            <section
                                                key={index} className='tooltip grid grid-cols-2 gap-1 mt-0 rounded-lg'>
                                                <label
                                                    className={`text-grey text-sm ${Number(val.substepID) === data?.length && 'text-red2'} label`}>{val.stepName}</label>
                                                <Controller
                                                    control={control}
                                                    name={val.stepName}
                                                    render={({field}) => (
                                                        <div>
                                                            <div ref={datePickerRef}
                                                                 className="flex justify-between items-center border border-1 border-whiteDark">
                                                                <DatePicker
                                                                    closeOnScroll={true}
                                                                    locale="de"
                                                                    dateFormat="P"
                                                                    showYearDropdown
                                                                    placeholderText={`Datum eingeben`}
                                                                    onBlur={() => setIsDatePickerOpen(false)}
                                                                    onChange={(date) => {
                                                                        field.onChange(convertLocalToUTCDate(date))
                                                                        getValues(val.stepName) ?
                                                                            addObjectToArray({
                                                                                firma: firma,
                                                                                id: val.substepID,
                                                                                milestone: currentMilestone,
                                                                                type: 'date',
                                                                                value: getValues(val.stepName),
                                                                                user: user.ID,
                                                                            }) :
                                                                            addObjectToArray({
                                                                                firma: firma,
                                                                                id: val.substepID,
                                                                                milestone: currentMilestone,
                                                                                type: 'date',
                                                                                value: null,
                                                                                user: user.ID,
                                                                            })
                                                                    }}
                                                                    selected={field.value}
                                                                    isClearable
                                                                    className={'border-none'}
                                                                    open={isDatePickerOpen[index]}
                                                                    readOnly={role === 'Supervisor'}
                                                                />
                                                                <div
                                                                    className={`absolute ${getValues(val.stepName) && 'mr-6'} right-1.5`}
                                                                    style={{pointerEvents: 'none'}}>
                                                                    <GoCalendar color={'#4d57a8'} size={'18px'}
                                                                                onClick={() =>
                                                                                    setIsDatePickerOpen((prevState) => ({
                                                                                        ...prevState,
                                                                                        [index]: !prevState[index],
                                                                                    }))
                                                                                }
                                                                    />
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`${Number(currentMilestone) === lastIndex && !getValues(val.stepName) ? 'cursor-pointer' : 'hideDiv'}`}>
                                                                <h3
                                                                    onClick={() => {
                                                                        setValue(val.stepName, new Date('1900-01-01'))
                                                                        addObjectToArray({
                                                                            firma: firma,
                                                                            id: val.substepID,
                                                                            milestone: currentMilestone,
                                                                            type: 'date',
                                                                            value: '1900-01-01',
                                                                            user: user.ID,
                                                                        })
                                                                    }}
                                                                    className='w-full text-sm text-center bg-yellowLight rounded-full text-text border border-1 border-whiteDark px-4 py-2 my-5'
                                                                >
                                                                    Überspringen Sie den Meilenstein
                                                                </h3>
                                                                {/*<button id='button' type={'submit'} hidden>save</button>*/}
                                                            </div>
                                                        </div>
                                                    )}
                                                />
                                                <p className={`${val.mouseoverText && 'tooltiptextclose'} `}>{val.mouseoverText}</p>
                                            </section>
                                            : val.fieldType === 'header' ?
                                                <section key={index} className='tooltip flex'>
                                                    <label style={{fontSize: '.9rem'}}
                                                           className={`py-2 text-text w-full font-bold text-left`}>
                                                        {val.stepName}
                                                    </label>
                                                </section>
                                                :
                                                <section
                                                    onChange={() =>
                                                        getValues(val.substepID) ?
                                                            addObjectToArray({
                                                                firma: firma,
                                                                id: val.substepID,
                                                                milestone: currentMilestone,
                                                                type: 'text',
                                                                value: getValues(val.substepID),
                                                                user: user.ID,
                                                            }) :
                                                            addObjectToArray({
                                                                firma: firma,
                                                                id: val.substepID,
                                                                milestone: currentMilestone,
                                                                type: 'text',
                                                                value: null,
                                                                user: user.ID,
                                                            })
                                                    }
                                                    key={index} className='tooltip flex grid grid-cols-2 gap-1 mt-0 rounded-lg'
                                                >
                                                    <label className='text-sm text-grey label'>{val.stepName}</label>
                                                    <input placeholder='Text Input'
                                                           disabled={role === 'Supervisor'}
                                                           className={`subStepInput w-full p-2 md:w-full
                                                       ${Number(currentMilestone) < Number(lastDoneIndex) + 1 ? 'completed' : 'bg-white'}`}
                                                           {...register(`${val.substepID}`)}
                                                           type="text"
                                                           style={{border: errors.email && '1px solid red'}}
                                                    />
                                                    {errors.email && touchedFields && <p>{errors.email.message}</p>}
                                                    <p className={`${val.mouseoverText && 'tooltiptextclose'} `}>{val.mouseoverText}</p>
                                                </section>
                                ))
                            }
                            <input ref={ref} hidden type="submit"/>
                        </form>
                    </div>
            }
        </div>
    )
}
export default SubSteps