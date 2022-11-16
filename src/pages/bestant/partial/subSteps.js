import React, {useCallback, useEffect, useRef, useState} from "react"
import {RiseLoader} from "react-spinners";
import {Controller, useForm} from "react-hook-form"
import {useStateValue} from "../../../states/StateProvider"
import moment from 'moment';
import CustomInput from '../../../helper/customInput'
import DatePicker, {registerLocale} from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import de from "date-fns/locale/de";
import Api from "../../../Api/api";
import Options from "./fields/options";
import {toast} from "react-toastify";

registerLocale("de", de);

const SubSteps = ({data, loading, next, lastDoneIndex, grid, options, firma}) => {

    const [Loading, setLoading] = useState(false)
    const initialState = [];
    const [update, setUpdated] = useState(initialState)
    const ref = useRef()
    const [{currentMilestone, milestone3HasDate, subStepSaved}, dispatch] = useStateValue();
    const {
        register, getValues, setValue, watch, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;
    const user = JSON.parse(localStorage.user)
    const role = user.role

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
                                    await setValue(`${d.stepName}`, filteredOption[grid[Number(d.substepID) - 1]?.fieldValue]?.optionValue)
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
            setLoading(true)
            Api().post('/saveSteps', unique).then(res => {
                toast.success('Data saved Successfully')
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
                        <button
                            onClick={() => ref.current.click()}
                            className={`${role === 'Supervisor' && 'opacity-0'} bg-mainBlue text-white cursor-pointer px-4 text-sm py-2 saveMS rounded-3xl`}
                            disabled={!isValid}>
                            {Loading ? 'Sparen...' : 'Speichern'}
                        </button>

                        <form onSubmit={handleSubmit(onSubmit)}
                              className='grid grid-cols-1 gap-1 mt-6 rounded-lg'>
                            {
                                data.map((val, index) => (
                                    val.fieldType === 'option' ?
                                        <section
                                            key={index} className='tooltip flex'
                                            onChange={() =>
                                                getValues(val.stepName) &&
                                                addObjectToArray({
                                                    firma: firma,
                                                    id: val.substepID,
                                                    milestone: currentMilestone,
                                                    value: getValues(val.stepName),
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
                                                onClick={() =>
                                                    getValues(val.stepName) &&
                                                    addObjectToArray({
                                                        firma: firma,
                                                        id: val.substepID,
                                                        milestone: currentMilestone,
                                                        value: getValues(val.stepName),
                                                    })
                                                }
                                                key={index} className='tooltip flex'>
                                                <label className='text-sm text-grey label'>{val.stepName}</label>
                                                <Controller
                                                    control={control}
                                                    name={val.stepName}
                                                    render={({field}) => (
                                                        <DatePicker
                                                            closeOnScroll={true}
                                                            locale="de" dateFormat="P" showYearDropdown
                                                            placeholderText={`Datum wählen`}
                                                            onChange={(date) => field.onChange(convertLocalToUTCDate(date))}
                                                            selected={field.value}
                                                            cssClass={'datePicker'}
                                                            readOnly={role === 'Supervisor'}
                                                            customInput={<CustomInput next={next} last={lastDoneIndex}
                                                                                      current={currentMilestone}/>}
                                                        />
                                                    )}
                                                />
                                                {/*<DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>*/}
                                                {/*<p className={getValues(val.stepName) ? 'hidden' : 'tooltiptextclose'}>{val.mouseoverText}</p>*/}
                                                <p className='tooltiptextclose'>{val.mouseoverText}</p>
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
                                                        getValues(val.substepID) &&
                                                        addObjectToArray({
                                                            firma: firma,
                                                            id: val.substepID,
                                                            milestone: currentMilestone,
                                                            value: getValues(val.substepID),
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
                                                    <p className='tooltiptextclose'>{val.mouseoverText}</p>
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