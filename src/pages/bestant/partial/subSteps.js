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
    // const [options, setOptions] = useState([])
    const ref = useRef()
    const [{currentMilestone}] = useStateValue();

    const optionss = [
        {
            subStepID: '3',
            optionValues: ['ja', 'nein']
        },
        {
            subStepID: '5',
            optionValues: ['easy', 'peasy']
        },
    ]
    const opt = [
        {
            subStepID: '3',
            optionValues: 'ja',
        },
        {
            subStepID: '3',
            optionValues: 'Nein'
        },
        {
            subStepID: '5',
            optionValues: 'Easy'
        },
        {
            subStepID: '5',
            optionValues: 'Peasy'
        },
    ]

    useEffect(() => {
        setOption([...option, options])
        // if (!next && data.length > 0) {
        //     let Data = new FormData()
        //     Data.append('milestoneID', currentMilestone)
        //     Data.append('subStepID', currentSubStep)
        //     Api().post('/options', Data).then(res => {
        //         setOption(res.data)
        //         console.log('res', res.data)
        //     })
        // }
    }, [data, currentSubStep, options]);

    useEffect(() => {
        console.log('option', option)
    }, [option]);


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
                        console.log('errdate', grid[Number(d.substepID) - 1]?.fieldValue)
                    }
                }
                if (d.fieldType === 'option') {
                    // setValue('Einspruch an FA erforderlich', 'ja')
                    setValue(`${d.stepName}`, `${grid[d.substepID]?.fieldValue}`)
                }
                if (d.fieldType === 'text') {
                    setValue(`${d.stepName}`, `${grid[d.substepID]?.fieldValue}`)
                }
            }
        })
    }, [data, grid, setValue]);


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
                            className={'bg-mainBlue text-white cursor-pointer px-4 text-sm py-2  rounded-3xl'}
                            style={{marginLeft: '83%'}}
                            disabled={!isValid}>
                            Speichern
                        </button>

                        <form onSubmit={handleSubmit(onSubmit)}
                              className='grid lg:grid-cols-3 md:grid-cols-1 gap-1 mt-6 rounded-lg'>
                            {
                                data.map((val, index) => (
                                    val.fieldType === 'option' ?
                                        <section key={index} placeholder='Wähle eine Option'
                                                 className='tooltip sm:flex sm:flex-col'>
                                            <label className='text-xs text-grey label'>{val.stepName}</label>
                                            <select
                                                // disabled={(grid[Number(val.substepID)-1]?.fieldValue)!==null}
                                                {...register(`${val.stepName}`)}
                                                // disabled={next || Number(currentMilestone) !== Number(lastDoneIndex) + 1}
                                                className={`w-full p-3 md:w-full bg-white border border-whiteDark rounded-md subStepSelect
                                                    ${Number(currentMilestone) < Number(lastDoneIndex) + 1 ? 'completed' : Number(currentMilestone) > Number(lastDoneIndex) + 1 || next ? 'disabled' : 'bg-white'}`}
                                            >
                                                {/*{*/}
                                                {/*    currentSubStep.map(op=>{*/}
                                                {/*        optionss[1]?.map((o, i) => (*/}
                                                {/*            <option key={i} value={o.optionValue}>{o.optionValue}</option>*/}
                                                {/*        ))*/}
                                                {/*    })*/}
                                                {/*}*/}
                                                <option defaultValue disabled>Wähle eine Option</option>
                                                {
                                                    // optionss.map((op, i) => (
                                                    //     // currentSubStep.includes(val.substepID) &&
                                                    //     op.subStepID === val.substepID &&
                                                    //     op?.optionValues.map((o, index) => (
                                                    //         <option  key={index} value={o}>{o}</option>
                                                    //     ))
                                                    // ))
                                                    option.map((op, i) => (
                                                        // currentSubStep.includes(val.substepID) &&
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
                                            <p hidden={next || Number(currentMilestone) !== Number(lastDoneIndex) + 1}
                                               className='tooltiptextclose'>{val.mouseoverText}</p>
                                        </section>

                                        : val.fieldType === 'date' ?
                                            <section key={index} className='tooltip'>
                                                <label className='text-xs text-grey label'>{val.stepName}</label>
                                                <Controller
                                                    control={control}
                                                    name={val.stepName}
                                                    render={({field}) => (
                                                        <DatePicker
                                                            locale="de" dateFormat="P" showYearDropdown
                                                            placeholderText={`Datum wählen`}
                                                            onChange={(date) => field.onChange(date)}
                                                            selected={field.value}
                                                            readOnly={next || Number(currentMilestone) !== Number(lastDoneIndex) + 1}
                                                            customInput={<CustomInput next={next} last={lastDoneIndex}
                                                                                      current={currentMilestone}/>}
                                                        />
                                                    )}
                                                />
                                                {/*<DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>*/}
                                                <p hidden={next || Number(currentMilestone) !== Number(lastDoneIndex) + 1}
                                                   className={getValues(val.stepName) ? 'hidden' : 'tooltiptextclose'}>{val.mouseoverText}</p>
                                            </section>
                                            :
                                            <section key={index} className='tooltip'>
                                                <label className='text-xs text-grey label'>{val.stepName}</label>
                                                <input placeholder='Text Input'
                                                       className={`subStepInput w-full p-2 md:w-full
                                                       ${Number(currentMilestone) < Number(lastDoneIndex) + 1 ? 'completed' : Number(currentMilestone) > Number(lastDoneIndex) + 1 || next ? 'disabled' : 'bg-white'}`}
                                                       {...register(`${val.stepName}`)}
                                                       type="text"
                                                       disabled={next || Number(currentMilestone) !== Number(lastDoneIndex) + 1}
                                                       style={{border: errors.email && '1px solid red'}}
                                                />
                                                {errors.email && touchedFields && <p>{errors.email.message}</p>}
                                                <p hidden={next || Number(currentMilestone) !== Number(lastDoneIndex) + 1}
                                                   className='tooltiptextclose'>{val.mouseoverText}</p>
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