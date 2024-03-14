import React, {useEffect, useState} from "react";
import Api from "../../Api/api";
import {ClipLoader, SkewLoader} from "react-spinners";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {useStateValue} from "../../states/StateProvider";
import {Link} from "react-router-dom";
import {AES, enc} from "crypto-js";
import {useNavigate} from "react-router";

const InfoMail = () => {

    const [{ICSaved, secretKey}, dispatch] = useStateValue();
    const [portal, setPortal] = useState('dgg')
    const [milestones, setMilestones] = useState([])
    const [subStepsLoading, setSubStepsLoading] = useState(false)
    const [triggerSubStepsLoading, setTriggerSubStepsLoading] = useState(false)
    const [subSteps, setSubSteps] = useState([])
    const [triggerSubSteps, setTriggerSubSteps] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingGrid, setLoadingGrid] = useState(false)
    const [deleteClicked, setDeleteClicked] = useState(false)
    const [loadingSave, setLoadingSave] = useState(false)
    const [milestoneSelected, seMilestoneSelected] = useState()
    const [TriggerMilestoneSelected, setTriggerMilestoneSelected] = useState()
    const [SubStepSelected, setSubStepSelected] = useState()
    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const navigate = useNavigate()
    const {
        register, getValues, setValue, watch, handleSubmit, formState, reset, formState: {errors, touchedFields},
    } = useForm({mode: "onChange"});

    useEffect(() => {
        if (user.isICAdmin === '0') {
            navigate('/')
        }

        reset()

        Api().get(`sp_getDataIMddMS/${portal}`).then(res => {
            setMilestones(res.data)
            setLoading(false)
        }).then(r=>{
            getGrid(milestoneSelected, SubStepSelected, true)
        })

    }, [ICSaved, portal]);


    const milestoneChanged = (e) => {
        reset()
        setSubStepsLoading(true)
        seMilestoneSelected(e.target.value)
        setSubSteps([])
        Api().get(`sp_getDataIMddSS/${portal}/${e.target.value}`).then(res => {
            setSubSteps(res.data)
            setSubStepSelected(res.data[0]?.substepID)
            setSubStepsLoading(false)
            getGrid(e.target.value, res.data[0].substepID, true)
        })
    }


    const subStepSelected = (e) => {
        reset()
        setSubStepSelected(e.target.value)
        getGrid(milestoneSelected, e.target.value, true)
    }

    const getGrid = (milestone, subStep, isLoading) => {
        setLoadingGrid(isLoading)
        Api().get(`sp_getDataIM/${portal}/${milestone}/${subStep}`).then(res => {
            res.data.map(r => {
                Object.keys(r).forEach((key) => {
                    if (key.includes('informFKB') || key.includes('informVA') || key.includes('informMail') || key.includes('informDGAPIAMS') || key.includes('informDGAPIKAM') || key.includes('informKBD') || key.includes('informVBLF') || key.includes('informCCText')) {
                        if (r[key] === '0') {
                            r[key] = false
                        } else if (r[key] === '1') {
                            r[key] = true
                        }
                    }
                    setValue(key, r[key]);
                    if (key === 'informCC' && r[key]) {
                        setValue('informCC', r[key])
                        setValue('hasInformCC', 1)
                    }
                });
            })
            setLoadingGrid(false)
        }).catch(e => {
            setLoadingGrid(false)
        })
    }

    const onSubmit = async (data) => {
        setLoadingSave(true)
        const modifiedData = {
            ...data,
            milestoneID: milestoneSelected,
            subStepID: SubStepSelected,
            portal: portal,
        };

        Api().post('/sp_putIM', modifiedData).then(res => {
            if (res.status === 200) {
                if (res.data === 2) {
                    toast.success('Der Datensatz wurde erfolgreich geändert.')
                } else if (res.data === 1) {
                    toast.success('Der Datensatz wurde erfolgreich gespeichert.')
                }
            }
            setLoadingSave(false)
        }).catch(e => {
            setLoadingSave(false)
            toast.error('Beim Speichern von Abschnitt 1 ist ein Fehler aufgetreten!')
        }).finally(e => {
            reset()
            getGrid(milestoneSelected, SubStepSelected, true)
        })
    };

    const deleteIC = () => {
        Api().post(`sp_deleteIC/${milestoneSelected}/${SubStepSelected}`).then(res => {
            if (res.data === 1) {
                toast.success('Erfolgreich gelöscht')
                setDeleteClicked(false)
            } else {
                toast.error('etwas ist schief gelaufen!')
            }
        }).catch(e => {
            toast.error('etwas ist schief gelaufen!')
        })
        getGrid(milestoneSelected, SubStepSelected, true)
        handleReset()
    }

    const handleReset = () => {
        const values = getValues();
        const updatedValues = {};
        Object.keys(values).forEach((key) => {
            updatedValues[key] = null;
        });

        reset(updatedValues);
    };

    function ccChanged(e) {
        if (e.target.value === '') {
            setValue('hasInformCC', 0)
        } else {
            setValue('hasInformCC', 1)
        }
    }

    function hasCcChanged(e) {
        if (!e.target.checked) {
            setValue('informCC', '')
        }
    }

    function portalSelect(e) {
        setPortal(e.target.value)
    }

    return (
        <div className={`dashboardContainer`}>
            {
                loading ?
                    <SkewLoader size='10px'/>
                    : user.isICAdmin === '1' &&
                    <div className={`bg-white rounded-xl text-left px-14 py-8`}>
                        <div
                            className={`${(!deleteClicked) && 'hideDiv'} shadow shadow-xl md:w-96 w-11/12 shadow-text text-lg px-6 py-6  flex flex-col rounded-lg z-10 absolute bg-offWhite centerItemsAbsolute`}>
                            <p>Wollen Sie den Datensatz wirklich löschen?</p>
                            <p className={`${loadingGrid && 'hideDiv'} flex justify-start px-24 pt-5 text-sm text-md font-bold`}>
                                <button onClick={deleteIC}
                                        className='bg-green mr-3 text-white px-5 hover:bg-white hover:text-green py-2 rounded-xl'>Ja
                                </button>
                                <button onClick={() => setDeleteClicked(false)}
                                        className='bg-cancel hover:bg-white hover:text-cancel text-white px-5 py-2 rounded-xl'>Nein
                                </button>
                            </p>
                            <p className='mx-auto'>
                                {loadingGrid && <ClipLoader size={10} color='#3A46A9'/>}
                            </p>
                        </div>
                        <div className='centerItemsRelative flex-wrap'>
                            <div className='lg:w-fit'>
                                <div className='flex justify-start items-center w-fit'>
                                    <p className='w-fit mr-6'>Portal </p>
                                    <select
                                        className='pl-3 col-span-2 text-center mx-auto pr-1 py-2 bg-white border border-offWhite rounded-sm lg:w-fit'
                                        onChange={portalSelect}
                                        value={portal}
                                    >
                                        <option selected value='dgg'>DGG</option>
                                        <option value='r+v'>R+V</option>
                                    </select>
                                </div>
                                <div className='lg:grid grid-cols-7 items-center my-2'>
                                    <p className='w-fit col-span-1'>Einstellungen für: </p>
                                    <select onChange={milestoneChanged}
                                            className='pl-3 col-span-2 pr-1 py-2 bg-white border border-offWhite rounded-sm lg:w-fit mx-3'>
                                        <option hidden={milestones.length > 0} value={null}>Wählen Sie einen Meilenstein
                                            aus
                                        </option>
                                        {
                                            milestones.map((m, i) => (
                                                <option
                                                    className={m.hasIM === '1' ? 'bg-lightBlue my-2 text-white' : ''}
                                                    value={m.milestoneID} key={i}>{m.milestoneLabel}</option>
                                            ))
                                        }
                                    </select>
                                    {
                                        subStepsLoading ? <SkewLoader size='10px' color={'#3A46A9'}/>
                                            :
                                            <select onChange={subStepSelected}
                                                    className='col-span-2 pl-3 pr-1 py-2 bg-white border border-offWhite rounded-sm lg:w-fit mx-3'>
                                                {
                                                    subSteps.length === 0 && !subStepsLoading ?
                                                        <option value={null}>Bitte wählen Sie erst einen
                                                            Meilenstein aus
                                                        </option> :
                                                        subSteps.map((s, i) => (
                                                            <option
                                                                className={s.hasIM === '1' ? 'bg-lightBlue my-2 text-white' : ''}
                                                                value={s.substepID} key={i}>{s.stepName}</option>
                                                        ))
                                                }
                                            </select>
                                    }
                                </div>
                            </div>
                        </div>
                        <Link to={'/mail-verlauf'}
                              className='px-6 w-fit h-fit float-right py-2 bg-mainBlue hover:bg-offWhite text-white hover:text-text rounded-md '>
                            Mail Verlauf
                        </Link>


                        {
                            loadingGrid ?
                                <div className={'flex h-screen w-full centerItemsRelative bg-white'}>
                                    <div className='-mt-32'><ClipLoader color={'#3A46A9'} size='70px'/></div>
                                </div>
                                :
                                <div>
                                    <form onSubmit={handleSubmit(onSubmit)} className='mt-6 mb-14 rounded-lg'>

                                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                                            <label>
                                                <input type='checkbox'
                                                       className='mr-3'
                                                       {...register('informFKB')}
                                                       style={{border: errors.remind1FKB && '1px solid red'}}
                                                />
                                                An Berater
                                            </label>
                                            <label>
                                                <input
                                                    type='checkbox' className='mr-3'
                                                    {...register('informDGAPIAMS')}
                                                    style={{border: errors.remind1DGAPI && '1px solid red'}}
                                                />
                                                An DGAPI AMS
                                            </label>
                                        </div>
                                        <div className='lg:w-6/12 grid grid-cols-4 gap-6 my-2'>
                                            <label>
                                                <input
                                                    type='checkbox' className='mr-3'
                                                    {...register('informKBD')}
                                                    style={{border: errors.remind1BD && '1px solid red'}}
                                                />
                                                cc KBD
                                            </label>
                                            <label>
                                                <input type='checkbox' className='mr-3 ml-1.5'
                                                       {...register('informVBLF')}
                                                       style={{border: errors.remind1VBLF && '1px solid red'}}
                                                />
                                                cc VBLF
                                            </label>
                                            <label>
                                                <input
                                                    type='checkbox' className='mr-3'
                                                    {...register('informDGAPIKAM')}
                                                    style={{border: errors.remind1BD && '1px solid red'}}
                                                />
                                                cc DGAPI KAM
                                            </label>
                                            <label>
                                                <input type='checkbox' className='mr-3'
                                                       {...register('informVA')}
                                                       style={{border: errors.remind1VBLF && '1px solid red'}}
                                                />
                                                cc VA
                                            </label>
                                        </div>
                                        <div className='flex justify-start my-2'>
                                            <label className='w-2/12 -mr-3' style={{lineBreak: 'strict'}}>
                                                <input type='checkbox' className='mr-3'
                                                       {...register('hasInformCC')}
                                                       onChange={hasCcChanged}
                                                       style={{border: errors.remind1cc && '1px solid red'}}
                                                />
                                                cc ebenfalls an
                                            </label>
                                            <input type='text' placeholder='info@anymail.com'
                                                   {...register('informCC')}
                                                   onChange={ccChanged}
                                                   style={{border: errors.remind1ccText && '1px solid red'}}
                                                   className='py-2 w-full text-grey'/>
                                        </div>
                                        <div className='flex justify-start gap-4 my-2 mt-8'>
                                            <h5 className='w-2/12 -mr-3'>Betreff: </h5>
                                            <input type='text' className='py-2 w-screen text-grey'
                                                   {...register('informSubject')}
                                                   style={{border: errors.remind1subject && '1px solid red'}}
                                            />
                                        </div>
                                        <div className=' gap-4 my-2 mt-8'>
                                            <div className='flex flex-wrap gap-10'>
                                                <h5 className='w-2/12 -mr-3'>Mail-Text: </h5>
                                                <span>
                                                Platzhalter:
                                                   <span className='px-2'>{'{'}Meilenstein{'}'}</span>
                                                   <span className='px-2'>{'{'}Schritt{'}'}</span>
                                                   <span className='px-2'>{'{'}Tage{'}'}</span>
                                                   <span className='px-2'>{'{'}Firmenprojekt{'}'}</span>
                                            </span>
                                            </div>
                                            <textarea rows='8'
                                                      className='border border-whiteDark rounded-sm w-full text-grey'
                                                      {...register('informMail')}
                                                      style={{
                                                          border: errors.remind1mail && '1px solid red',
                                                          padding: '15px 40px'
                                                      }}
                                            />
                                        </div>
                                        {
                                            milestoneSelected ?
                                                <input
                                                    className={`${(milestoneSelected) ? 'bg-mainBlue cursor-pointer' : 'bg-grey cursor-no-drop '} w-44 float-right mt-4 text-white hover:bg-offWhite hover:text-mainBlue text-center px-3 py-2 rounded-md`}
                                                    type="submit"
                                                    value={`${loadingSave ? 'Sparen...' : 'Speichern'}`}
                                                /> :
                                                <input
                                                    className={`bg-grey cursor-no-drop w-44 float-right mt-4 text-white hover:bg-offWhite hover:text-mainBlue text-center px-3 py-2 rounded-md`}
                                                    type="submit"
                                                    disabled
                                                    value={`${loadingSave ? 'Sparen...' : 'Speichern'}`}
                                                />
                                        }
                                        {/*<input*/}
                                        {/*    className={`${milestoneSelected && SubStepSelected ? 'bg-cancel cursor-pointer' : 'bg-grey cursor-no-drop '} float-right mt-4 text-white w-44 hover:bg-offWhite hover:text-mainBlue text-center px-3 py-2 rounded-md mr-1`}*/}
                                        {/*    disabled={!milestoneSelected && !SubStepSelected}*/}
                                        {/*    onClick={() => setDeleteClicked(true)}*/}
                                        {/*    onChange={() => console.log('deleting')}*/}
                                        {/*    value='Löschen'*/}
                                        {/*/>*/}
                                    </form>
                                </div>
                        }
                    </div>
            }
        </div>
    )
}

export default InfoMail