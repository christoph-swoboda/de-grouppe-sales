import React, {useState, useEffect} from "react"
import {Controller, useForm} from "react-hook-form"
import {useStateValue} from "../../../states/StateProvider";

const SectionTwo = () => {

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
    };

    useEffect(() => {
        if (isValid) {
            document.getElementById("submit").click()
        }
    }, [isValid]);


    return (
        <div className='bg-white'>
            <h2 className='text-left text-xl pt-5 pl-10'>Section Two</h2>
            <form onSubmit={handleSubmit(onSubmit)}
                  className='lg:grid lg:grid-cols-3 gap-6 sm:grid-cols-1 gap-6 mb-10 p-10'
            >
                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Tax Id *</label>
                    <input placeholder='Project...'
                           {...register('tax_id', {required: true})}
                           style={{border: errors.tax_id && '1px solid red'}}
                    />
                    {errors.tax_id && touchedFields && <p>Tax ID Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Internet Address *</label>
                    <input placeholder='placeholder...'
                           {...register('internet_address', {required: true})}
                           style={{border: errors.internet_address && '1px solid red'}}
                    />
                    {errors.internet_address && touchedFields && <p>Internet Address Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Transfer To R+V *</label>
                    <input placeholder='placeholder ...'
                           {...register('transfer_to_RV', {required: true})}
                           style={{border: errors.transfer_to_RV && '1px solid red'}}
                    />
                    {errors.transfer_to_RV && touchedFields && <p>Transfer To R+V Field is required</p>}
                </section>


                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Sort Code *</label>
                    <input placeholder='placeholder ...'
                           {...register('sort_code', {required: true})}
                           style={{border: errors.sort_code && '1px solid red'}}
                    />
                    {errors.sort_code && touchedFields && <p>Sort Code Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>1.Appointment Analysis *</label>
                    <input placeholder='placeholder ...'
                           {...register('one_appointment_analysis', {required: true})}
                           style={{border: errors.one_appointment_analysis && '1px solid red'}}
                    />
                    {errors.one_appointment_analysis && touchedFields && <p>Appointment Analysis Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>PM DGAPI *</label>
                    <input placeholder='placeholder ...'
                           {...register('pm_dgapi', {required: true})}
                           style={{border: errors.pm_dgapi && '1px solid red'}}
                    />
                    {errors.pm_dgapi && touchedFields && <p>PM DGAPI Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>2. Appointment Ask *</label>
                    <input placeholder='placeholder ...'
                           {...register('appointment_ask', {required: true})}
                           style={{border: errors.appointment_ask && '1px solid red'}}
                    />
                    {errors.appointment_ask && touchedFields && <p>2. Appointment Ask Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Company Short *</label>
                    <input placeholder='placeholder ...'
                           {...register('company_short', {required: true})}
                           style={{border: errors.company_short && '1px solid red'}}
                    />
                    {errors.company_short && touchedFields && <p>Company Short Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>3rd Appointment *</label>
                    <input placeholder='placeholder ...'
                           {...register('third_appointment', {required: true})}
                           style={{border: errors.third_appointment && '1px solid red'}}
                    />
                    {errors.third_appointment && touchedFields && <p>3rd Appointment Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Company Contact Details *</label>
                    <input placeholder='placeholder ...'
                           {...register('company_contact_details', {required: true})}
                           style={{border: errors.company_contact_details && '1px solid red'}}
                    />
                    {errors.company_contact_details && touchedFields && <p>Contact Details Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>iForm to DGAPI *</label>
                    <input placeholder='placeholder ...'
                           {...register('iform_to_dgapi', {required: true})}
                           style={{border: errors.iform_to_dgapi && '1px solid red'}}
                    />
                    {errors.iform_to_dgapi && touchedFields && <p>iForm to DGAPI Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>DL Package Sent *</label>
                    <input placeholder='placeholder ...'
                           {...register('dl_package_sent', {required: true})}
                           style={{border: errors.dl_package_sent && '1px solid red'}}
                    />
                    {errors.dl_package_sent && touchedFields && <p>DL Package Sent Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>DL Package Back *</label>
                    <input placeholder='placeholder ...'
                           {...register('dl_package_back', {required: true})}
                           style={{border: errors.dl_package_back && '1px solid red'}}
                    />
                    {errors.dl_package_back && touchedFields && <p>DL Package Back Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Accompanying Office *</label>
                    <input placeholder='placeholder ...'
                           {...register('accompanying_office', {required: true})}
                           style={{border: errors.accompanying_office && '1px solid red'}}
                    />
                    {errors.accompanying_office && touchedFields && <p>Accompanying Office Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Report Package To Company *</label>
                    <input placeholder='placeholder ...'
                           {...register('report_package_to_company', {required: true})}
                           style={{border: errors.report_package_to_company && '1px solid red'}}
                    />
                    {errors.report_package_to_company && touchedFields &&
                        <p>Report Package To Company Field is required</p>}
                </section>
                <input
                    id='submit'
                    hidden
                    type="submit"
                />
            </form>
        </div>
    )
}

export default SectionTwo