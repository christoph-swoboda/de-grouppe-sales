import React, {useState, useEffect, useRef} from "react";
import {RiseLoader} from "react-spinners";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {useForm, Controller} from "react-hook-form";
import Api from "../../../Api/api";
import {toast} from "react-toastify";
import {useStateValue} from "../../../states/StateProvider";

const SubSteps = ({data, loading, next, lastDoneIndex}) => {

    const [Loading, setLoading] = useState(false)
    const ref = useRef()
    const [{currentMilestone}] = useStateValue();

    const {
        register, getValues, setValue, watch, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (Data) => {
        setLoading(true)
        console.log('clicked', Data)
        // Api().post('/test', Data).then(res => {
        //     console.log('res', res.data)
        // }).catch(e => {
        //     setLoading(false)
        //     toast.error('Something Went Wrong!!')
        // })
    };

    useEffect(() => {
        console.log('cur', currentMilestone, 'done', lastDoneIndex)
    }, [currentMilestone]);


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
                            style={{marginLeft: '90%'}}
                            disabled={!isValid}>
                            Save
                        </button>

                        <form onSubmit={handleSubmit(onSubmit)}
                              className='grid lg:grid-cols-3 md:grid-cols-1 gap-3.5 mt-6 rounded-lg'>
                            {
                                data.map(val => (
                                    val.fieldType === 'option' ?
                                        <section className='tooltip sm:flex sm:flex-col'>
                                            <label className='text-xs text-grey label'>{val.stepName}</label>
                                            <select {...register(`${val.stepName}`)}
                                                    disabled={next || Number(currentMilestone) !== Number(lastDoneIndex) + 1}
                                                    className={`w-full p-3 md:w-full bg-white border border-whiteDark rounded-md subStepSelect
                                                    ${Number(currentMilestone) < Number(lastDoneIndex) + 1 ? 'completed':Number(currentMilestone) > Number(lastDoneIndex) + 1 || next ?'disabled':'bg-white'}`}
                                            >
                                                <option value="1">Option 1</option>
                                                <option value="2">Option 2</option>
                                            </select>
                                            <p hidden={next || Number(currentMilestone) !== Number(lastDoneIndex) + 1}
                                               className='tooltiptextclose'>{val.mouseoverText}</p>
                                        </section>

                                        : val.fieldType === 'date' ?
                                            <section className='tooltip'>
                                                <label className='text-xs text-grey label'>{val.stepName}</label>
                                                <Controller
                                                    control={control}
                                                    name={val.stepName}
                                                    render={({field}) => (
                                                        <DatePicker
                                                            placeholderText='Select date'
                                                            onChange={(date) => field.onChange(date)}
                                                            selected={field.value}
                                                            className={Number(currentMilestone) < Number(lastDoneIndex) + 1 ? 'completed':Number(currentMilestone) > Number(lastDoneIndex) + 1 || next ?'disabled':'bg-white'}
                                                            readOnly={next || Number(currentMilestone) !== Number(lastDoneIndex) + 1}
                                                        />
                                                    )}
                                                />
                                                {/*<DatePicker selected={startDate} onChange={(date) => setStartDate(date)}/>*/}
                                                <p hidden={next || Number(currentMilestone) !== Number(lastDoneIndex) + 1}
                                                   className='tooltiptextclose'>{val.mouseoverText}</p>
                                            </section>
                                            :
                                            <section className='tooltip'>
                                                <label className='text-xs text-grey label'>{val.stepName}</label>
                                                <input placeholder='Text Input'
                                                       className={`subStepInput w-full p-3 md:w-full
                                                       ${Number(currentMilestone) < Number(lastDoneIndex) + 1 ? 'completed':Number(currentMilestone) > Number(lastDoneIndex) + 1 || next ?'disabled':'bg-white'}`}
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