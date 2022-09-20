import React, {useState} from "react"
import {useForm} from "react-hook-form"
import Api from "../../../Api/api";

const Form = () => {

    const [loading, setLoading] = useState(false)

    const {
        register, getValues, setValue, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {
        Api().post('/test', data).then(res => {
            console.log('res', res.data)
        })
        console.log('data', data)
    };


    return (
        <div className='bg-white rounded-lg'>
            <form onSubmit={handleSubmit(onSubmit)}
                  className='lg:grid lg:grid-cols-5 gap-6 sm:grid-cols-1 gap-6 mb-10 p-10'
            >
                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Accountant *</label>
                    <input placeholder='Project...'
                           {...register('FP_FBK', {required: true})}
                           style={{border: errors.FP_FBK && '1px solid red'}}
                    />
                    {errors.FP_FBK && touchedFields && <p>zust. Berater is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Bank *</label>
                    <input placeholder='placeholder ...'
                           {...register('FP_Bank', {required: true})}
                           style={{border: errors.FP_Bank && '1px solid red'}}
                    />
                    {errors.FP_Bank && touchedFields &&
                        <p>Bank Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>BLZ(German No) *</label>
                    <input placeholder='placeholder ...'
                           {...register('Bank_BLZ', {required: true})}
                           style={{border: errors.Bank_BLZ && '1px solid red'}}
                    />
                    {errors.Bank_BLZ && touchedFields &&
                        <p>BLZ Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Region *</label>
                    <input placeholder='placeholder ...'
                           {...register('FP_Regio_Bereich', {required: true})}
                           style={{border: errors.FP_Regio_Bereich && '1px solid red'}}
                    />
                    {errors.FP_Regio_Bereich && touchedFields && <p>Regio-Bereich Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>FKB Bank *</label>
                    <input placeholder='placeholder ...'
                           {...register('FP_FKB_Bank', {required: true})}
                           style={{border: errors.FP_FKB_Bank && '1px solid red'}}
                    />
                    {errors.FP_FKB_Bank && touchedFields && <p>FKB Bank Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>blank *</label>
                    <input placeholder='placeholder ...'
                           {...register('blank', {required: true})}
                           style={{border: errors.blank && '1px solid red'}}
                    />
                    {errors.blank && touchedFields && <p>blank Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Company short *</label>
                    <input placeholder='placeholder ...'
                           {...register('Firma_Kurz', {required: true})}
                           style={{border: errors.Firma_Kurz && '1px solid red'}}
                    />
                    {errors.Firma_Kurz && touchedFields && <p>Firma Kurzname Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Firma Company*</label>
                    <input placeholder='placeholder ...'
                           {...register('Firma1', {required: true})}
                           style={{border: errors.Firma1 && '1px solid red'}}
                    />
                    {errors.Firma1 && touchedFields && <p>Firma Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Street *</label>
                    <input placeholder='placeholder ...'
                           {...register('Strasse', {required: true})}
                           style={{border: errors.Strasse && '1px solid red'}}
                    />
                    {errors.Strasse && touchedFields &&
                        <p>Straße Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Citycode *</label>
                    <input placeholder='placeholder ...'
                           {...register('PLZ', {required: true})}
                           style={{border: errors.PLZ && '1px solid red'}}
                    />
                    {errors.PLZ && touchedFields && <p>PLZ Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>City *</label>
                    <input placeholder='placeholder ...'
                           {...register('ORT', {required: true})}
                           style={{border: errors.ORT && '1px solid red'}}
                    />
                    {errors.ORT && touchedFields && <p>ORT Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Telefon *</label>
                    <input placeholder='placeholder ...'
                           {...register('Telefon', {required: true})}
                           style={{border: errors.Telefon && '1px solid red'}}
                    />
                    {errors.Telefon && touchedFields && <p>Telefon Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Tax-ID *</label>
                    <input placeholder='placeholder ...'
                           {...register('USt_Id', {required: true})}
                           style={{border: errors.USt_Id && '1px solid red'}}
                    />
                    {errors.USt_Id && touchedFields && <p>Umsatzsteuer-ID Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Website *</label>
                    <input placeholder='placeholder ...'
                           {...register('Internetadresse', {required: true})}
                           style={{border: errors.Internetadresse && '1px solid red'}}
                    />
                    {errors.Internetadresse && touchedFields && <p>Internetadresse Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>No. of Employees *</label>
                    <input placeholder='placeholder ...'
                           {...register('MItarbeiter1', {required: true})}
                           style={{border: errors.MItarbeiter1 && '1px solid red'}}
                    />
                    {errors.MItarbeiter1 && touchedFields && <p>MA-Anzahl Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label> Contact *</label>
                    <input placeholder='placeholder ...'
                           {...register('Ansprechpartner', {required: true})}
                           style={{border: errors.Ansprechpartner && '1px solid red'}}
                    />
                    {errors.Ansprechpartner && touchedFields && <p>Ansprechpartner Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label> Salutation *</label>
                    <input placeholder='placeholder ...'
                           {...register('AnPerson', {required: true})}
                           style={{border: errors.AnPerson && '1px solid red'}}
                    />
                    {errors.AnPerson && touchedFields && <p>AnPerson Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Title *</label>
                    <input placeholder='placeholder ...'
                           {...register('Titel', {required: true})}
                           style={{border: errors.Titel && '1px solid red'}}
                    />
                    {errors.Titel && touchedFields && <p>Titel Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Firstname *</label>
                    <input placeholder='placeholder ...'
                           {...register('Vorname', {required: true})}
                           style={{border: errors.Vorname && '1px solid red'}}
                    />
                    {errors.Vorname && touchedFields && <p>Vorname Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label> Surname *</label>
                    <input placeholder='placeholder ...'
                           {...register('Name', {required: true})}
                           style={{border: errors.Name && '1px solid red'}}
                    />
                    {errors.Name && touchedFields && <p>Name Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label> Position *</label>
                    <input placeholder='placeholder ...'
                           {...register('Position', {required: true})}
                           style={{border: errors.Position && '1px solid red'}}
                    />
                    {errors.Position && touchedFields && <p>Position Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Follow up date *</label>
                    <input placeholder='placeholder ...'
                           {...register('WieVor_Datum', {required: true})}
                           style={{border: errors.WieVor_Datum && '1px solid red'}}
                    />
                    {errors.WieVor_Datum && touchedFields && <p>Wiedervorlage Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Follow up note *</label>
                    <input placeholder='placeholder ...'
                           {...register('WieVor_Text', {required: true})}
                           style={{border: errors.WieVor_Text && '1px solid red'}}
                    />
                    {errors.WieVor_Text && touchedFields && <p>Wiedervor_Info Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Direkt *</label>
                    <input placeholder='placeholder ...'
                           {...register('Direkt', {required: true})}
                           style={{border: errors.Direkt && '1px solid red'}}
                    />
                    {errors.Direkt && touchedFields && <p>Direkt Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label> Mobil *</label>
                    <input placeholder='placeholder ...'
                           {...register('Mobil', {required: true})}
                           style={{border: errors.Mobil && '1px solid red'}}
                    />
                    {errors.Mobil && touchedFields && <p>Mobil Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label> Privat  *</label>
                    <input placeholder='placeholder ...'
                           {...register('Privat', {required: true})}
                           style={{border: errors.Privat  && '1px solid red'}}
                    />
                    {errors.Privat  && touchedFields && <p>Privat  Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>E-Mail *</label>
                    <input placeholder='placeholder ...'
                           {...register('E-Mail', {required: true})}
                           style={{border: errors.EMail  && '1px solid red'}}
                    />
                    {errors.EMail && touchedFields && <p>E-Mail Field is required</p>}
                </section>

                <section className='flex flex-col text-left text-grey text-sm'>
                    <label>Fax *</label>
                    <input placeholder='placeholder ...'
                           {...register('Fax', {required: true})}
                           style={{border: errors.Fax && '1px solid red'}}
                    />
                    {errors.Fax && touchedFields && <p>Fax Field is required</p>}
                </section>

                <input
                    className={(isValid) ? 'pl-5 pr-5 bg-mainBlue rounded-3xl text-white cursor-pointer' : 'disabled'}
                    disabled={!isValid} type="submit"
                    value={(!loading) ? 'Save On Computer' : 'saving...'}
                />
            </form>
        </div>
    )
}

export default Form