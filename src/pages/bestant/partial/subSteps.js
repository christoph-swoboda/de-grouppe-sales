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

registerLocale("de", de);

const SubSteps = ({data, loading, next, lastDoneIndex, grid, currentSubStep, options}) => {

    const [Loading, setLoading] = useState(false)
    const [option, setOption] = useState([])
    const ref = useRef()
    const [{currentMilestone, calcOptions}, dispatch] = useStateValue();
    const {
        register, getValues, setValue, watch, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const op = [
        {substepID: "2", optionValue: "Ja"},
        {substepID: "2", optionValue: "Nein"},
        {substepID: "8", optionValue: "Ja"},
        {substepID: "8", optionValue: "Nein"},
        {substepID: "9", optionValue: "Ja"},
        {substepID: "9", optionValue: "Nein"},
        {substepID: "10", optionValue: "Ja"},
        {substepID: "10", optionValue: "Nein"},
        {substepID: "15", optionValue: "Ja"},
        {substepID: "15", optionValue: "Nein"},
        {substepID: "16", optionValue: "Ja"},
        {substepID: "16", optionValue: "Nein"},
    ]
    const memoizedCallback = useCallback(
        async () => {
            let arr = [...new Set(option), ...new Set(options)]
            setOption([...new Set(arr)])
        },
        [data, options],
    );
    useEffect(() => {
        memoizedCallback().then(r => r)
    }, [memoizedCallback]);

    useEffect(() => {
        setOption([])
    }, [currentMilestone]);

    // useEffect(() => {
    //     if (option.length > 0) {
    //         console.log('op', option)
    //     }
    // }, [option]);

    useEffect(() => {
        if (data.length > 0) {
            data?.map(async (d, index) => {
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
                        if (grid[Number(d.substepID) - 1]?.fieldValue !== null) {
                            await setValue(`${d.stepName}`, option[grid[Number(d.substepID) - 1]?.fieldValue]?.optionValue)
                        } else {
                            await setValue(`${d.stepName}`, `autoFill`)
                        }
                    }
                    if (d.fieldType === 'text') {
                        setValue(`${d.stepName}`, `${grid[Number(d.substepID) - 1]?.fieldValue}`)
                    }
                }
            })
        }

    }, [data, grid, setValue, next, options, option]);

    const onSubmit = async (Data) => {
        setLoading(true)
        // if (Number(currentMilestone) === Number(lastDoneIndex) + 1) {
        // }
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

    return (
        <div>
            {
                loading ?
                    <div hidden={next} style={{height: '2vh'}} className='mt-24'>
                        <h2 style={{width: '42vw'}}>
                            <span className='mx-2'><RiseLoader size='8px' color='grey'/></span>
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
                                        <Options
                                            key={index}
                                            grid={grid}
                                            getValues={getValues}
                                            register={register}
                                            currentMilestone={currentMilestone}
                                            lastDoneIndex={lastDoneIndex}
                                            val={val}
                                            option={option}
                                            next={next}
                                        />

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