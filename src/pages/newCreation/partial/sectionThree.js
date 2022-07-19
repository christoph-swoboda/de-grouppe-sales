import React, {useState, useEffect} from "react"
import {Controller, useForm} from "react-hook-form"
import {useStateValue} from "../../../states/StateProvider";

const SectionThree = () => {

    const [loading, setLoading] = useState(false)
    const [{newCreation}, dispatch] = useStateValue();
    const {
        register, getValues, setValue, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {
        // console.log('data', data)
        dispatch({type: "SET_NEW_CREATION", item: {newCreation, ...data},})
        console.log('data', newCreation)
    };


    return (
        <div className='bg-white rounded-lg'>
            <h2 className='text-left text-xl pt-5 pl-10'>Section Three</h2>
            <form onSubmit={handleSubmit(onSubmit)}
                  className='lg:grid lg:grid-cols-3 gap-6 sm:grid-cols-1 gap-6 mb-10 p-10'
            >
                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Arrival Information FA  *</label>
                    <input placeholder='Project...'
                           {...register('arrival_information_fa', {required: true})}
                           style={{border: errors.arrival_information_fa && '1px solid red'}}
                    />
                    {errors.arrival_information_fa && touchedFields && <p>Arrival Information FA Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>AnrAuskunft FA Back *</label>
                    <input placeholder='placeholder...'
                           {...register('anrauskunft_fa_back', {required: true})}
                           style={{border: errors.anrauskunft_fa_back && '1px solid red'}}
                    />
                    {errors.anrauskunft_fa_back && touchedFields && <p>AnrAuskunft FA Back Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Project Start Implementation *</label>
                    <input placeholder='placeholder ...'
                           {...register('project_start_implementation', {required: true})}
                           style={{border: errors.project_start_implementation && '1px solid red'}}
                    />
                    {errors.project_start_implementation && touchedFields && <p>Project Start Implementation Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Completion Of Implementation *</label>
                    <input placeholder='placeholder ...'
                           {...register('completion_of_implementation', {required: true})}
                           style={{border: errors.completion_of_implementation && '1px solid red'}}
                    />
                    {errors.completion_of_implementation && touchedFields && <p>Completion Of Implementation Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>1.Appointment Analysis *</label>
                    <input placeholder='placeholder ...'
                           {...register('one_appointment_analysis', {required: true})}
                           style={{border: errors.region && '1px solid red'}}
                    />
                    {errors.one_appointment_analysis && touchedFields && <p>Appointment Analysis Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Turnover BBS bAV *</label>
                    <input placeholder='placeholder ...'
                           {...register('turnover_bbs_bav', {required: true})}
                           style={{border: errors.turnover_bbs_bav && '1px solid red'}}
                    />
                    {errors.turnover_bbs_bav && touchedFields && <p>Turnover BBS bAV Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Number Of EO Modules *</label>
                    <input placeholder='placeholder ...'
                           {...register('number_of_eo_modules', {required: true})}
                           style={{border: errors.number_of_eo_modules && '1px solid red'}}
                    />
                    {errors.number_of_eo_modules && touchedFields && <p>Number Of EO Modules Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>MA no. Degrees *</label>
                    <input placeholder='placeholder ...'
                           {...register('ma_no_degrees', {required: true})}
                           style={{border: errors.ma_no_degrees && '1px solid red'}}
                    />
                    {errors.ma_no_degrees && touchedFields && <p>MA no. Degrees Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Company Pension Provider *</label>
                    <input placeholder='placeholder ...'
                           {...register('company_pension_provider', {required: true})}
                           style={{border: errors.company_pension_provider && '1px solid red'}}
                    />
                    {errors.company_pension_provider && touchedFields && <p>Company Pension Provider Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>EO bAV Start *</label>
                    <input placeholder='placeholder ...'
                           {...register('eo_bav_start', {required: true})}
                           style={{border: errors.eo_bav_start && '1px solid red'}}
                    />
                    {errors.eo_bav_start && touchedFields && <p>EO bAV Start Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Project Cancellation *</label>
                    <input placeholder='placeholder ...'
                           {...register('project_cancellation', {required: true})}
                           style={{border: errors.project_cancellation && '1px solid red'}}
                    />
                    {errors.project_cancellation && touchedFields && <p>Project Cancellation Field is required</p>}
                </section>
                <input
                    className={(!isValid) ? 'pl-5 pr-5 bg-mainBlue rounded-3xl text-white cursor-pointer' : 'disabled'}
                    disabled={!isValid} type="submit"
                    value={(!loading) ?'Save On Computer' : 'saving...'}
                />
            </form>
        </div>
    )
}

export default SectionThree