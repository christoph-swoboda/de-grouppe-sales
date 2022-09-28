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

registerLocale("de", de);

const SubSteps = ({data, loading, next, lastDoneIndex, grid, currentSubStep, options}) => {

    const [Loading, setLoading] = useState(false)
    const [option, setOption] = useState([options])
    const ref = useRef()
    const [{currentMilestone}] = useStateValue();

    useEffect(() => {
        setOption([])
    }, [currentMilestone]);

    useEffect(() => {
        setOption([])
        if (options.length > 0) {
            let arr = [...new Set(option), ...new Set(options)]
            setOption([...new Set(arr)])
        }
    }, [data, currentSubStep, options, currentMilestone]);

    const {
        register, getValues, setValue, watch, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (Data) => {
        setLoading(true)
        if (Number(currentMilestone) === Number(lastDoneIndex) + 1) {
        }
        console.log('clicked', Data)
        console.log('grid', grid, (grid[(Number(1)) + 1]?.fieldValue))
        console.log('ssteps', data)

        // Api().post('/test', Data).then(res => {
        //     console.log('res', res.data)
        // }).catch(e => {
        //     setLoading(false)
        //     toast.error('Something Went Wrong!!')
        // })
    };

    useEffect(() => {
        data?.map((d, index) => {
            if (grid[Number(d.substepID) - 1]?.fieldValue && !next) {
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
                    // setValue(`${d.stepName}`, `autoFill`)
                    if (grid[Number(d.substepID) - 1]?.fieldValue !== null) {
                        setValue(`${d.stepName}`, option[grid[Number(d.substepID) - 1]?.fieldValue]?.optionValue)
                    } else {
                        setValue(`${d.stepName}`, `autoFill`)
                    }
                }
                if (d.fieldType === 'text') {
                    setValue(`${d.stepName}`, `${grid[Number(d.substepID) - 1]?.fieldValue}`)
                }
            }
        })
    }, [data, grid, setValue, next, options, option]);


    return (
        <div>
            {
                loading ?
                    <div hidden={next} style={{height: '2vh'}} className='mt-24'>
                        <h2 style={{width: '42vw'}}>
                            <span className='mx-2'><RiseLoader size='8' color='grey'/></span>
                            Holen sie sich die aktuellen meilensteindaten!
                        </h2>
                    </div>
                    :
                    <div hidden={next && loading}>
                        <button
                            hidden={next}
                            onClick={() => ref.current.click()}
                            className={'bg-mainBlue text-white cursor-pointer px-4 text-sm py-2 saveMS rounded-3xl'}
                            disabled={!isValid}>
                            Speichern
                        </button>

                        <form onSubmit={handleSubmit(onSubmit)}
                              className='grid 2xl:grid-cols-3 xl:grid-cols-2 md:grid-cols-1 gap-1 mt-6 rounded-lg'>
                            {
                                data.map((val, index) => (
                                    val.fieldType === 'option' ?
                                        <section key={index} className='tooltip sm:flex sm:flex-col'>
                                            <label className='text-sm text-grey label'>{val.stepName}</label>
                                            <select {...register(`${val.stepName}`)}
                                                    disabled={(next || Number(currentMilestone) !== Number(lastDoneIndex) + 1 || grid[Number(val.substepID) - 1]?.fieldValue !== null)}
                                                    className={`w-full p-3 md:w-full bg-white border border-whiteDark rounded-md subStepSelect
                                                    ${Number(currentMilestone) < Number(lastDoneIndex) + 1 ? 'completed' : Number(currentMilestone) > Number(lastDoneIndex) + 1 || next ? 'disabled' : 'bg-white'}`}
                                            >
                                                <option selected={getValues(val.stepName) === 'autoFill'} hidden>
                                                    Wähle eine Option
                                                </option>
                                                {
                                                    option.map((op, i) => (
                                                        op.substepID === val.substepID ?
                                                            <option key={i} value={op?.optionValue}>
                                                                {op?.optionValue}
                                                            </option>
                                                            :
                                                            <option key={i} hidden>

                                                            </option>
                                                    ))
                                                }
                                            </select>
                                            <p className='tooltiptextclose'>{val.mouseoverText}</p>
                                        </section>

                                        : val.fieldType === 'date' ?
                                            <section key={index} className='tooltip'>
                                                <label
                                                    className='text-sm min-w-screen text-grey label'>{val.stepName}</label>
                                                <Controller
                                                    control={control}
                                                    name={val.stepName}
                                                    render={({field}) => (
                                                        <DatePicker
                                                            locale="de" dateFormat="P" showYearDropdown
                                                            placeholderText={`Datum wählen`}
                                                            onChange={(date) => field.onChange(date)}
                                                            selected={field.value}
                                                            cssClass={'datePicker'}
                                                            readOnly={next || Number(currentMilestone) !== Number(lastDoneIndex) + 1}
                                                            customInput={<CustomInput next={next} last={lastDoneIndex}
                                                                                      current={currentMilestone}/>}
                                                        />
                                                    )}
                                                />
                                                {/*<DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>*/}
                                                {/*<p className={getValues(val.stepName) ? 'hidden' : 'tooltiptextclose'}>{val.mouseoverText}</p>*/}
                                                <p className='tooltiptextclose'>{val.mouseoverText}</p>
                                            </section>
                                            :
                                            <section key={index} className='tooltip'>
                                                <label className='text-sm text-grey label'>{val.stepName}</label>
                                                <input placeholder='Text Input'
                                                       className={`subStepInput w-full p-2 md:w-full
                                                       ${Number(currentMilestone) < Number(lastDoneIndex) + 1 ? 'completed' : Number(currentMilestone) > Number(lastDoneIndex) + 1 || next ? 'disabled' : 'bg-white'}`}
                                                       {...register(`${val.stepName}`)}
                                                       type="text"
                                                       disabled={next || Number(currentMilestone) !== Number(lastDoneIndex) + 1}
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