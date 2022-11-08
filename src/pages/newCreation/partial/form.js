import React, {useEffect, useState} from "react"
import {useForm} from "react-hook-form"
import Api from "../../../Api/api";
import {toast} from "react-toastify";

const Form = ({name, dropdown}) => {

    const [loading, setLoading] = useState(false)
    const [bank, setBank] = useState(dropdown[0]?.Bank)

    const {
        register, getValues, setValue, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {
        setLoading(true)
        Api().post('/saveNeu', data).then(res => {
            toast.success('Saved Successfully')
            setLoading(false)
        }).catch(e => {
            toast.error('Something Went Wrong!!')
            setLoading(false)
            // alert(e.response.data.message)
        })
    };

    useEffect(() => {
        setValue('berater', name)
        setValue('blz', dropdown?.filter(d => d.Bank === bank)[0]?.BLZ)
    }, [bank, dropdown, name]);

    useEffect(() => {
        setValue('bank', dropdown[0]?.Bank)
    }, [dropdown]);

    function setBankValue(e) {
        setBank(e)
        setValue('bank', e)
        setValue('blz', dropdown?.filter(d => d.Bank === bank)[0]?.BLZ)
    }

    return (
        <div className='bg-white rounded-lg'>
            <form onSubmit={handleSubmit(onSubmit)} className='mb-10 p-10'>
                {/*// className='lg:grid lg:grid-cols-5 gap-6 sm:grid-cols-1 gap-6 mb-10 p-10'*/}
                <h2 className='text-lg text-mainBlue text-left mb-6'><span className='text-grey'>Berater:</span> {name}
                </h2>

                {/*first 6 section*/}
                {/*<div className='flex 2xl:justify-start lg:justify-start md:justify-items-start gap-3 flex-wrap'>*/}
                <div className='grid 2xl:grid-cols-12 lg:grid-cols-10 md:grid-cols-2 gap-3 2xl:pl-2 lg:pl-0'>
                    <section className='hidden'>
                        <input{...register('berater', {required: false})} value={name}/>
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm mt-2 lg:col-span-2 2xl:-ml-2 lg:-ml-0'>
                        <label>Bank *</label>
                        <select onClick={(e) => setBankValue(e.target.value)}
                                className='p-3 bg-transparent border border-whiteDark rounded-lg'
                                {...register('bank', {required: false})}
                                style={{border: errors.bank && '1px solid red'}}
                        >
                            {
                                dropdown?.map((d, i) => (
                                    <option key={i} value={d.Bank}> {d.Bank}</option>
                                ))
                            }
                        </select>
                        {errors.bank && touchedFields && <p>Bank Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm mt-2 2xl:mr-14 lg:mr-0'>
                        <label>BLZ</label>
                        <input placeholder='BLZ...'
                               value={dropdown?.filter(d => d.Bank === bank)[0]?.BLZ}
                               {...register('blz', {required: false})}
                               style={{border: errors.blz && '1px solid red'}}
                        />
                        {errors.blz && touchedFields && <p>BLZ Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm mt-2 lg:col-span-2 2xl:mr-40 2xl:-ml-14 lg:mr-0 lg:-ml-0'>
                        <label>Region </label>
                        <input placeholder='Region...'
                               {...register('region', {required: false})}
                               style={{border: errors.region && '1px solid red'}}
                        />
                        {errors.region && touchedFields && <p>Region Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm mt-2 lg:col-span-2 2xl:mr-40 2xl:-ml-40 lg:mr-0 lg:-ml-0'>
                        <label>FKB Bank *</label>
                        <input placeholder='FKB Bank...'
                               {...register('fkb_bank', {required: true})}
                               style={{border: errors.fkb_bank && '1px solid red'}}
                        />
                        {errors.fkb_bank && touchedFields && <p>FKB Bank Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm mt-2 lg:col-span-2 2xl:mr-40 2xl:-ml-40 lg:mr-0 lg:-ml-0'>
                        <label>DGAPI KAM *</label>
                        <input placeholder='DGAPI KAM...'
                               {...register('dgapi', {required: true})}
                               style={{border: errors.dgapi && '1px solid red'}}
                        />
                        {errors.dgapi && touchedFields && <p>DGAPI KAM Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm mt-2 2xl:mr-40 2xl:-ml-40 lg:mr-0 lg:-ml-0'>
                        <label>Bestands/Neukunde*</label>
                        <select className='p-3 bg-transparent border border-whiteDark rounded-lg'
                                {...register('bestands', {required: true})}
                                style={{border: errors.bestands && '1px solid red'}}
                        >
                            <option defaultValue value={'Neukunde'}>Neukunde</option>
                            <option value={'Bestandskunde'}> Bestandskunde</option>
                        </select>
                        {errors.bestands && touchedFields && <p>Bestands/Neukunde Feld ist erforderlich</p>}
                    </section>
                </div>
                {/*first 6 section*/}

                {/*second 9 section*/}

                {/*<div className='flex 2xl:justify-start lg:justify-start md:justify-items-start md:gap-3 2xl:gap-4 lg:gap-1 flex-wrap'>*/}
                <div className='grid 2xl:grid-cols-12 lg:grid-cols-10 md:grid-cols-2 gap-3 mt-12'>
                    <section className='flex flex-col text-left text-grey text-sm mt-2 2xl:col-span-4 lg:col-span-5'>
                        <label>Firma *</label>
                        <input placeholder='Firma...'
                               {...register('firma', {required: true})}
                               style={{border: errors.firma && '1px solid red'}}
                        />
                        {errors.firma && touchedFields && <p>Firma Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm mt-2 col-span-2'>
                        <label>Straße *</label>
                        <input placeholder='Straße...'
                               {...register('strabe', {required: true})}
                               style={{border: errors.strabe && '1px solid red'}}
                        />
                        {errors.strabe && touchedFields && <p>Straße Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm mt-2'>
                        <label>PLZ *</label>
                        <input placeholder='PLZ...'
                               {...register('plz', {required: true})}
                               style={{border: errors.plz && '1px solid red'}}
                        />
                        {errors.plz && touchedFields && <p>PLZ Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm mt-2 col-span-2'>
                        <label>Stadt *</label>
                        <input placeholder='Stadt...'
                               {...register('stadt', {required: true})}
                               style={{border: errors.stadt && '1px solid red'}}
                        />
                        {errors.stadt && touchedFields && <p>Stadt Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm col-span-2 2xl:block md:hidden'>
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm mt-2 2xl:col-span-2 lg:col-span-3'>
                        <label>Firma Kruzname *</label>
                        <input placeholder='Firma Kruzname...'
                               {...register('firmaKruz', {required: true})}
                               style={{border: errors.firmaKruz && '1px solid red'}}
                        />
                        {errors.firmaKruz && touchedFields && <p>Firma Kruzname Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm mt-2 col-span-2'>
                        <label>Telefon zentrale*</label>
                        <input placeholder='Telefon zentral...'
                               {...register('telefon', {required: true})}
                               style={{border: errors.telefon && '1px solid red'}}
                        />
                        {errors.telefon && touchedFields && <p>Telefon zentrale Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm mt-2 col-span-2'>
                        <label>Umsatzsteuer ID </label>
                        <input placeholder='Umsatzsteuer ID...'
                               {...register('umsatzsteuer', {required: false})}
                               style={{border: errors.umsatzsteuer && '1px solid red'}}
                        />
                        {errors.umsatzsteuer && touchedFields && <p>Umsatzsteuer ID Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm mt-2 col-span-2'>
                        <label>Internetadresse * </label>
                        <input placeholder='Internetadresse...'
                               {...register('internetadresse', {required: false})}
                               style={{border: errors.internetadresse && '1px solid red'}}
                        />
                        {errors.internetadresse && touchedFields && <p>Internetadresse Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col mb-10 text-left text-grey text-sm mt-2'>
                        <label>MA-Anzahl *</label>
                        <input placeholder='MA-Anzahl...'
                               type="number"
                               {...register('ma', {
                                   required: 'Feld ist erforderlich und muss aus Ziffern bestehen',
                                   pattern: {
                                       value: /^[0-9\/]*$/,
                                       message: 'Wert muss aus Ziffern bestehen',
                                   }
                               })}
                               required
                               style={{border: errors.ma && '1px solid red'}}
                        />
                        {errors.ma && touchedFields && <p>{errors.ma.message}</p>}
                    </section>
                </div>

                {/*second 9 section*/}

                {/*third 10 section*/}

                <div className='grid 2xl:grid-cols-12 lg:grid-cols-10 md:grid-cols-2 gap-3 mt-10'>
                    <section className='flex flex-col text-left text-grey text-sm'>
                        <label> Anrede *</label>
                        <select className='p-3 bg-transparent border border-whiteDark rounded-lg'
                                {...register('anrede', {required: true})}
                                style={{border: errors.bank && '1px solid red'}}
                        >
                            <option defaultValue value={'Frau'}> Frau</option>
                            <option value={'Herr'}> Herr</option>
                        </select>
                        {errors.anrede && touchedFields && <p>Anrede Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm 2xl:col-span-1 lg:col-span-2'>
                        <label> Titel</label>
                        <input placeholder='Titel...'
                               {...register('titel', {required: false})}
                               style={{border: errors.titel && '1px solid red'}}
                        />
                        {errors.titel && touchedFields && <p>Titel Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm'>
                        <label>Vorname *</label>
                        <input placeholder='Vorname...'
                               {...register('vorname', {required: true})}
                               style={{border: errors.vorname && '1px solid red'}}
                        />
                        {errors.vorname && touchedFields && <p>Vorname Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm'>
                        <label>Nachname *</label>
                        <input placeholder='Nachname...'
                               {...register('nachname', {required: true})}
                               style={{border: errors.nachname && '1px solid red'}}
                        />
                        {errors.nachname && touchedFields && <p>Nachname Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm col-span-2'>
                        <label> Position *</label>
                        <input placeholder='Position...'
                               {...register('position', {required: true})}
                               style={{border: errors.position && '1px solid red'}}
                        />
                        {errors.position && touchedFields && <p>Position Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm col-span-3'>
                        <label>E-Mail</label>
                        <input placeholder='E-Mail'
                               {...register('email', {
                                   required: false,
                                   pattern: {
                                       value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                       message: 'Bitte geben Sie eine gültige E-Mail ein',
                                   },
                               })}
                               type="email"
                               style={{border: errors.email && '1px solid red'}}
                        />
                        {errors.email && touchedFields && <p>{errors.email.message}</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm col-span-2 2xl:block md:hidden'>
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm col-span-2'>
                        <label>Durchwahl </label>
                        <input placeholder='Durchwahl...'
                               {...register('durchwahl', {required: false})}
                               style={{border: errors.durchwahl && '1px solid red'}}
                        />
                        {errors.durchwahl && touchedFields && <p>Durchwahl Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm col-span-2'>
                        <label> Mobil </label>
                        <input placeholder='Mobil...'
                               {...register('mobil', {required: false})}
                               style={{border: errors.mobil && '1px solid red'}}
                        />
                        {errors.mobil && touchedFields && <p>Mobil Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm col-span-2'>
                        <label>Fax</label>
                        <input placeholder='Fax...'
                               {...register('fax', {required: false})}
                               style={{border: errors.fax && '1px solid red'}}
                        />
                        {errors.fax && touchedFields && <p>Fax Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm col-span-2'>
                        <label> Privat</label>
                        <input placeholder='Privat...'
                               {...register('privat', {required: false})}
                               style={{border: errors.privat && '1px solid red'}}
                        />
                        {errors.privat && touchedFields && <p>Privat Feld ist erforderlich</p>}
                    </section>
                </div>

                {/*third 10 section*/}

                <p className='text-sm text-grey text-left font-extralight mb-6 mt-5'>* Pflichtfeld</p>
                <input
                    className={(isValid) ? 'pl-5 pr-5 bg-mainBlue rounded-3xl text-white cursor-pointer' : 'disabled'}
                    disabled={!isValid} type="submit"
                    value={(!loading) ? 'Anlegen' : 'sparen...'}
                />
            </form>
        </div>
    )
}

export default Form