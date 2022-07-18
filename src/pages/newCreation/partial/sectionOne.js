import React, {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import {useStateValue} from "../../../states/StateProvider";

const SectionOne = () => {

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
        if(isValid){
            document.getElementById("submit").click()
        }
    }, [isValid]);


    return (
        <div className='bg-white'>
            <h2 className='text-left text-xl pt-5 pl-10'>Section One</h2>
            <form onSubmit={handleSubmit(onSubmit)}
                  className='lg:grid lg:grid-cols-3 gap-6 sm:grid-cols-1 gap-6 mb-10 p-10'
            >
                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Project *</label>
                    <input placeholder='Project...'
                           {...register('project', {required: true})}
                           style={{border: errors.project && '1px solid red'}}
                    />
                    {errors.project && touchedFields && <p>Project Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                <label>Condition Advisor *</label>
                    <input placeholder='placeholder...'
                           {...register('condition_advisor', {required: true})}
                           style={{border: errors.condition_advisor && '1px solid red'}}
                    />
                    {errors.condition_advisor && touchedFields && <p>Condition Advisor Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                <label>Bank  *</label>
                    <input placeholder='placeholder ...'
                           {...register('bank', {required: true})}
                           style={{border: errors.bank && '1px solid red'}}
                    />
                    {errors.bank && touchedFields && <p>Bank Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                <label>Sort Code  *</label>
                    <input placeholder='placeholder ...'
                           {...register('sort_code', {required: true})}
                           style={{border: errors.sort_code && '1px solid red'}}
                    />
                    {errors.sort_code && touchedFields && <p>Sort Code  Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                <label>Region  *</label>
                    <input placeholder='placeholder ...'
                           {...register('region', {required: true})}
                           style={{border: errors.region && '1px solid red'}}
                    />
                    {errors.region && touchedFields && <p>Region Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                <label>Kd Advisor Bank  *</label>
                    <input placeholder='placeholder ...'
                           {...register('kd_advisor_bank', {required: true})}
                           style={{border: errors.kd_advisor_bank && '1px solid red'}}
                    />
                    {errors.kd_advisor_bank && touchedFields && <p>Kd Advisor Bank Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                <label>N/B *</label>
                    <input placeholder='placeholder ...'
                           {...register('nb', {required: true})}
                           style={{border: errors.nb && '1px solid red'}}
                    />
                    {errors.nb && touchedFields && <p>N/B  Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                <label>Company Short *</label>
                    <input placeholder='placeholder ...'
                           {...register('company_short', {required: true})}
                           style={{border: errors.company_short && '1px solid red'}}
                    />
                    {errors.company_short && touchedFields && <p>Company Short  Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                <label>Company *</label>
                    <input placeholder='placeholder ...'
                           {...register('company', {required: true})}
                           style={{border: errors.company && '1px solid red'}}
                    />
                    {errors.company && touchedFields && <p>Company Field is required</p>}
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
                <label>MA *</label>
                    <input placeholder='placeholder ...'
                           {...register('ma', {required: true})}
                           style={{border: errors.ma && '1px solid red'}}
                    />
                    {errors.ma && touchedFields && <p>MA Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                <label>Company Ansprp Salutation *</label>
                    <input placeholder='placeholder ...'
                           {...register('company_ansprp_salutation', {required: true})}
                           style={{border: errors.company_ansprp_salutation && '1px solid red'}}
                    />
                    {errors.company_ansprp_salutation && touchedFields && <p>Company Ansprp Salutation Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                <label>Company Claim: Title *</label>
                    <input placeholder='placeholder ...'
                           {...register('company_claim_title', {required: true})}
                           style={{border: errors.company_claim_title && '1px solid red'}}
                    />
                    {errors.company_claim_title && touchedFields && <p>Title Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                <label>Company Claim: First Name *</label>
                    <input placeholder='placeholder ...'
                           {...register('company_claim_first_name', {required: true})}
                           style={{border: errors.company_claim_first_name && '1px solid red'}}
                    />
                    {errors.company_claim_first_name && touchedFields && <p>First Name  Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                <label>Company Claim: SurName *</label>
                    <input placeholder='placeholder ...'
                           {...register('company_claim_surname', {required: true})}
                           style={{border: errors.company_claim_surname && '1px solid red'}}
                    />
                    {errors.company_claim_surname && touchedFields && <p>SurName Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                <label>Company Claim: Position *</label>
                    <input placeholder='placeholder ...'
                           {...register('company_claim_position', {required: true})}
                           style={{border: errors.company_claim_position && '1px solid red'}}
                    />
                    {errors.company_claim_position && touchedFields && <p>Position Field is required</p>}
                </section>
                {/*<h5>* marked fields are mandatory to fill</h5>*/}
                <input
                    id='submit'
                    hidden
                    type="submit"
                />
            </form>
        </div>
    )
}

export default SectionOne