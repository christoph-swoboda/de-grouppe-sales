import React, {useEffect, useState} from "react"
import {useForm} from "react-hook-form";
import Api from "../../../Api/api";
import {toast} from "react-toastify";

const FormDGG = ({name, dropdown, role}) => {
    const [loading, setLoading] = useState(false)
    const [bank, setBank] = useState(dropdown[0]?.Bank)

    const {
        register, watch, getValues, setValue, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    const onSubmit = async (data) => {
        setLoading(true)
        Api().post('/sp_createNewDGGCustomer', data).then(res => {
            toast.success('Das neue Firmenprojekt wurde angelegt.')
            reset()
            setLoading(false)
        }).catch(e => {
            toast.error('Etwas ist schief gelaufen!')
            setLoading(false)
        })
    };

    useEffect(() => {
        setValue('Ersteller', name)
        setValue('berater', name)
        setValue('vpberater', dropdown?.filter(d => d.Bank === bank)[0]?.BeraterVPN)
    }, [bank, dropdown, name]);

    useEffect(() => {
        setValue('bank', dropdown[0]?.Bank)
    }, [dropdown]);

    function setBankValue(e) {
        setBank(e)
        setValue('bank', e)
        setValue('berater', dropdown?.filter(d => d.Bank === bank)[0]?.Berater)
        setValue('vpberater', dropdown?.filter(d => d.Bank === bank)[0]?.BeraterVPN)
    }

    return (
        <div className='bg-white rounded-lg'>
            <form onSubmit={handleSubmit(onSubmit)} className='mb-8 p-10'>
                {/*// className='lg:grid lg:grid-cols-5 gap-6 sm:grid-cols-1 gap-6 mb-10 p-10'*/}
                <div className='grid 2xl:grid-cols-14 lg:grid-cols-10 md:grid-cols-2 gap-3 2xl:pl-2 lg:pl-0 mb-8'>
                    <section
                        className='flex flex-col text-left text-grey text-sm mt-2 lg:col-span-2 2xl:-ml-2 lg:-ml-0'>
                        <label>Ersteller</label>
                        <input{...register('ersteller', {required: false})}
                              disabled
                              value={name}
                        />
                    </section>
                    <section
                        className='flex flex-col text-left text-grey text-sm mt-2 lg:col-span-3 2xl:-ml-2 lg:-ml-0'>
                        <label>Berater *</label>
                        <input{...register('berater', {required: true})}
                              placeholder='Nachname, Vorname'
                              style={{border: !watch('berater') && '1px solid red'}}
                        />
                        {!watch('berater') && touchedFields && <p>Berater Feld ist erforderlich</p>}
                    </section>
                    <section className='flex flex-col text-left text-grey text-sm mt-2 2xl:mr-14 lg:mr-0'>
                        <label>VP-Nummer *</label>
                        <input placeholder='VP-Nummer..'
                               disabled
                               {...register('vpberater', {required: true})}
                               style={{border: errors.blz && '1px solid red'}}
                        />
                        {errors.blz && touchedFields && <p>VP-Nummer Feld ist erforderlich</p>}
                    </section>
                    <section
                        className='flex flex-col text-left text-grey text-sm mt-2 lg:col-span-3 2xl:-ml-2 lg:-ml-0'>
                        <label>KGS *</label>
                        <input{...register('kgs', {required: true})}
                              placeholder='Nachname, Vorname'
                              style={{border: !watch('berater') && '1px solid red'}}
                        />
                        {errors.kgs && touchedFields && <p>KGS Feld ist erforderlich</p>}
                    </section>
                    <section className='flex flex-col text-left text-grey text-sm mt-2 2xl:mr-14 lg:mr-0'>
                        <label>VP-Nummer *</label>
                        <input placeholder='VP-Nummer..'
                               {...register('vpkgs', {required: true})}
                               style={{border: errors.blz && '1px solid red'}}
                        />
                        {errors.vpkgs && touchedFields && <p>VP-Nummer Feld ist erforderlich</p>}
                    </section>
                    <section className='col-span-6'></section>
                    <section
                        className='flex flex-col text-left text-grey text-sm mt-2 lg:col-span-3 2xl:-ml-2 lg:-ml-0'>
                        <label>ADM </label>
                        <input{...register('adm', {required: false})}
                              placeholder='Nachname, Vorname'
                              style={{border: !watch('berater') && '1px solid red'}}
                        />
                        {errors.adm && touchedFields && <p>KGS Feld ist erforderlich</p>}
                    </section>
                    <section className='flex flex-col text-left text-grey text-sm mt-2 2xl:mr-14 lg:mr-0'>
                        <label>VP-Nummer</label>
                        <input placeholder='VP-Nummer..'
                               {...register('vpadm', {required: false})}
                               style={{border: errors.blz && '1px solid red'}}
                        />
                        {errors.vpadm && touchedFields && <p>VP-Nummer Feld ist erforderlich</p>}
                    </section>
                </div>
                {/*first 6 section*/}
                {/*<div className='flex 2xl:justify-start lg:justify-start md:justify-items-start gap-3 flex-wrap'>*/}
                <div className='grid 2xl:grid-cols-14 lg:grid-cols-10 md:grid-cols-2 gap-3 2xl:pl-2 lg:pl-0'>
                    <section
                        className='flex flex-col text-left text-grey text-sm mt-2 col-span-2 lg:mr-0 lg:-ml-0'>
                        <label>Bestands/Neukunde *</label>
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
                <div className='grid 2xl:grid-cols-14 lg:grid-cols-10 md:grid-cols-2 gap-3 mt-8'>
                    <section
                        className='flex flex-col 2xl:-mr-6 text-left text-grey text-sm mt-2 2xl:col-span-4 lg:col-span-5 md:col-span-2'>
                        <label>Firma *</label>
                        <input placeholder='Firma...'
                               {...register('firma', {required: true})}
                               style={{border: errors.firma && '1px solid red'}}
                        />
                        {errors.firma && touchedFields && <p>Firma Feld ist erforderlich</p>}
                    </section>

                    <section
                        className='flex flex-col 2xl:ml-6 2xl:-mr-6 text-left text-grey text-sm mt-2 lg:col-span-2'>
                        <label>Straße *</label>
                        <input placeholder='Straße...'
                               {...register('strabe', {required: true})}
                               style={{border: errors.strabe && '1px solid red'}}
                        />
                        {errors.strabe && touchedFields && <p>Straße Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left 2xl:ml-6 2xl:-mr-6 text-grey text-sm mt-2'>
                        <label>PLZ *</label>
                        <input placeholder='PLZ...'
                               {...register('plz', {required: true})}
                               style={{border: errors.plz && '1px solid red'}}
                        />
                        {errors.plz && touchedFields && <p>PLZ Feld ist erforderlich</p>}
                    </section>

                    <section
                        className='flex flex-col text-left 2xl:ml-6 2xl:-mr-6 text-grey text-sm mt-2 lg:col-span-2'>
                        <label>Stadt *</label>
                        <input placeholder='Stadt...'
                               {...register('stadt', {required: true})}
                               style={{border: errors.stadt && '1px solid red'}}
                        />
                        {errors.stadt && touchedFields && <p>Stadt Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col text-left text-grey text-sm col-span-2 2xl:hidden md:hidden'>
                    </section>

                    <section
                        className='flex flex-col 2xl:-mr-6 text-left text-grey text-sm mt-2 2xl:col-span-2 lg:col-span-3'>
                        <label>Firma Kurzname *</label>
                        <input placeholder='Firma Kurzname...'
                               {...register('firmaKruz', {required: true})}
                               style={{border: errors.firmaKruz && '1px solid red'}}
                        />
                        {errors.firmaKruz && touchedFields && <p>Firma Kurzname Feld ist erforderlich</p>}
                    </section>

                    <section
                        className='flex flex-col text-left 2xl:ml-6 2xl:-mr-6 text-grey text-sm mt-2 lg:col-span-2'>
                        <label>Telefon Zentrale *</label>
                        <input placeholder='Telefon Zentrale...'
                               {...register('telefon', {required: true})}
                               style={{border: errors.telefon && '1px solid red'}}
                        />
                        {errors.telefon && touchedFields && <p>Telefon Zentrale Feld ist erforderlich</p>}
                    </section>

                    <section
                        className='flex flex-col text-left text-grey 2xl:ml-6 2xl:-mr-6 text-sm mt-2 lg:col-span-2'>
                        <label>Umsatzsteuer ID </label>
                        <input placeholder='Umsatzsteuer ID...'
                               {...register('umsatzsteuer', {required: false})}
                               style={{border: errors.umsatzsteuer && '1px solid red'}}
                        />
                        {errors.umsatzsteuer && touchedFields && <p>Umsatzsteuer ID Feld ist erforderlich</p>}
                    </section>

                    <section
                        className='flex flex-col text-left text-grey 2xl:ml-6 2xl:-mr-6 text-sm mt-2 lg:col-span-2'>
                        <label>Internetadresse * </label>
                        <input placeholder='Internetadresse...'
                               {...register('internetadresse', {required: true})}
                               style={{border: errors.internetadresse && '1px solid red'}}
                        />
                        {errors.internetadresse && touchedFields && <p>Internetadresse Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col mb-10 text-left 2xl:ml-6 2xl:-mr-6 text-grey text-sm mt-2'>
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

                <div className='grid 2xl:grid-cols-14 lg:grid-cols-10 md:grid-cols-2 gap-3 mt-8'>
                    <section className='flex flex-col text-left text-grey text-sm'>
                        <label> Anrede *</label>
                        <select className='p-3 bg-transparent 2xl:-mr-6 border border-whiteDark rounded-lg'
                                {...register('anrede', {required: true})}
                                style={{border: errors.bank && '1px solid red'}}
                        >
                            <option defaultValue value={'Frau'}> Frau</option>
                            <option value={'Herr'}> Herr</option>
                        </select>
                        {errors.anrede && touchedFields && <p>Anrede Feld ist erforderlich</p>}
                    </section>

                    <section
                        className='flex flex-col text-left 2xl:ml-6 2xl:-mr-6 text-grey text-sm 2xl:col-span-1 lg:col-span-2'>
                        <label> Titel</label>
                        <input placeholder='Titel...'
                               {...register('titel', {required: false})}
                               style={{border: errors.titel && '1px solid red'}}
                        />
                        {errors.titel && touchedFields && <p>Titel Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col 2xl:ml-6 2xl:-mr-6 text-left text-grey text-sm'>
                        <label>Vorname *</label>
                        <input placeholder='Vorname...'
                               {...register('vorname', {required: true})}
                               style={{border: errors.vorname && '1px solid red'}}
                        />
                        {errors.vorname && touchedFields && <p>Vorname Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col 2xl:ml-6 2xl:-mr-6 text-left text-grey text-sm'>
                        <label>Nachname *</label>
                        <input placeholder='Nachname...'
                               {...register('nachname', {required: true})}
                               style={{border: errors.nachname && '1px solid red'}}
                        />
                        {errors.nachname && touchedFields && <p>Nachname Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col 2xl:ml-6 2xl:-mr-6 text-left text-grey text-sm lg:col-span-2'>
                        <label> Position *</label>
                        <input placeholder='Position...'
                               {...register('position', {required: true})}
                               style={{border: errors.position && '1px solid red'}}
                        />
                        {errors.position && touchedFields && <p>Position Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col 2xl:ml-6 2xl:-mr-6 text-left text-grey text-sm lg:col-span-3'>
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

                    <section className='flex flex-col text-left text-grey text-sm col-span-2 2xl:hidden md:hidden'>
                    </section>

                    <section className='flex flex-col 2xl:-mr-6 text-left text-grey text-sm lg:col-span-2'>
                        <label>Durchwahl </label>
                        <input placeholder='Durchwahl...'
                               {...register('durchwahl', {required: false})}
                               style={{border: errors.durchwahl && '1px solid red'}}
                        />
                        {errors.durchwahl && touchedFields && <p>Durchwahl Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col 2xl:ml-6 2xl:-mr-6 text-left text-grey text-sm lg:col-span-2'>
                        <label> Mobil </label>
                        <input placeholder='Mobil...'
                               {...register('mobil', {required: false})}
                               style={{border: errors.mobil && '1px solid red'}}
                        />
                        {errors.mobil && touchedFields && <p>Mobil Feld ist erforderlich</p>}
                    </section>

                    <section className='flex flex-col 2xl:ml-6 2xl:-mr-6 text-left text-grey text-sm lg:col-span-2'>
                        <label>Fax</label>
                        <input placeholder='Fax...'
                               {...register('fax', {required: false})}
                               style={{border: errors.fax && '1px solid red'}}
                        />
                        {errors.fax && touchedFields && <p>Fax Feld ist erforderlich</p>}
                    </section>

                    <section
                        className='flex flex-col 2xl:ml-6 2xl:-mr-6 text-left text-grey text-sm lg:col-span-4 2xl:col-span-3'>
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
                {
                    (role === 'ExtRUV' || role === 'ExtDGG') &&
                    <input
                        className={isValid ? 'pl-5 pr-5 bg-mainBlue rounded-3xl text-white cursor-pointer' : 'disabled'}
                        disabled={!isValid}
                        type="submit"
                        value={(!loading) ? 'Anlegen' : 'sparen...'}
                    />
                }
            </form>
        </div>
    )
}

export default FormDGG