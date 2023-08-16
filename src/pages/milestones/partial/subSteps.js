import React, {useEffect, useRef, useState} from "react"
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

registerLocale("de", de);

const SubSteps = ({data, loading, next, lastDoneIndex, grid, options, firma, title, lastIndex}) => {

    const [Loading, setLoading] = useState(false)
    const initialState = [];
    const [update, setUpdated] = useState(initialState)
    const ref = useRef()
    const datePickerRef = useRef(null);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    const [{currentMilestone, subStepSaved}, dispatch] = useStateValue();
    const {
        register, reset, getValues, setValue, handleSubmit, formState, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;
    const user = JSON.parse(localStorage.user)
    const role = user.role

    useEffect(() => {
        reset()
    }, [currentMilestone]);

    useEffect(() => {
        const handleDocumentClick = (event) => {
            if (datePickerRef.current && !datePickerRef.current.contains(event.target)) {
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
                        console.log('d.substepID', d.substepID, 'grid[Number(d.substepID) - 1]?.fieldValue', grid[Number(d.substepID) - 1])
                        setValue(`${d.substepID}`, `${grid[Number(d.substepID) - 1]?.fieldValue}`)
                    }
                }
            })
        }

    }, [data, grid, setValue, next, options]);

    const addObjectToArray = obj => {
        setUpdated(current => [...current, obj]);
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
        const unique = [...new Map(update.map(item => [item[key], item])).values()]
        if (unique.length > 0) {
            console.log('saving', unique)
            setLoading(true)
            Api().post('/saveSteps', unique).then(res => {
                toast.success('Daten erfolgreich gespeichert')
                dispatch({type: "SET_SUBSTEPSAVED", item: !subStepSaved})
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
                                onClick={() => ref.current.click()}
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
                                            key={index} className='tooltip flex'
                                            onChange={() =>
                                                getValues(val.stepName) ?
                                                    addObjectToArray({
                                                        firma: firma,
                                                        id: val.substepID,
                                                        milestone: currentMilestone,
                                                        value: getValues(val.stepName),
                                                    }) :
                                                    addObjectToArray({
                                                        firma: firma,
                                                        id: val.substepID,
                                                        milestone: currentMilestone,
                                                        value: null,
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
                                                key={index} className='tooltip flex'>
                                                <label
                                                    className={` text-grey text-sm ${Number(val.substepID) === data?.length && 'text-red2'} label`}>{val.stepName}</label>
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
                                                                        getValues(val.stepName)?
                                                                            addObjectToArray({
                                                                                firma: firma,
                                                                                id: val.substepID,
                                                                                milestone: currentMilestone,
                                                                                value: getValues(val.stepName),
                                                                            }) :
                                                                            addObjectToArray({
                                                                                firma: firma,
                                                                                id: val.substepID,
                                                                                milestone: currentMilestone,
                                                                                value: null,
                                                                            })
                                                                    }}
                                                                    selected={field.value}
                                                                    isClearable
                                                                    className={'border-none'}
                                                                    open={isDatePickerOpen}
                                                                    readOnly={role === 'Supervisor'}
                                                                />
                                                                <div className="mx-1.5 cursor-pointer">
                                                                    <GoCalendar color={'#3A46A9'} size={'22px'}
                                                                                onClick={() => setIsDatePickerOpen(!isDatePickerOpen)}/>
                                                                </div>
                                                            </div>
                                                            <div
                                                                className={`${Number(currentMilestone) === lastIndex && !getValues(val.stepName) ? 'cursor-pointer' : 'hideDiv'}`}>
                                                                <h3
                                                                    onClick={() => {
                                                                        console.log(getValues(val.stepName))
                                                                        setValue(val.stepName, new Date('1900-01-01'))
                                                                        addObjectToArray({
                                                                            firma: firma,
                                                                            id: val.substepID,
                                                                            milestone: currentMilestone,
                                                                            value: '1900-01-01',
                                                                        })
                                                                        // const saveButton = document.getElementById('button');
                                                                        // if (saveButton) {
                                                                        //     saveButton.click();
                                                                        // }
                                                                    }}
                                                                    className='w-full text-center bg-yellowLight rounded-full text-text border border-1 border-whiteDark px-4 py-2 my-5'
                                                                >
                                                                    Skip the milestone
                                                                </h3>
                                                                {/*<button id='button' type={'submit'} hidden>save</button>*/}
                                                            </div>
                                                        </div>
                                                    )}
                                                />
                                                <p className={`${val.mouseoverText && 'tooltiptextclose'} `}>{val.mouseoverText}</p>
                                            </section>
                                            : val.fieldType === 'header' ?
                                                // <p>{val.stepName}</p>
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
                                                                value: getValues(val.substepID),
                                                            }) :
                                                            addObjectToArray({
                                                                firma: firma,
                                                                id: val.substepID,
                                                                milestone: currentMilestone,
                                                                value: null,
                                                            })
                                                    }
                                                    key={index} className='tooltip flex'
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