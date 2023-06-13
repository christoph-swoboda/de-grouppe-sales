import React, {useEffect, useState} from "react";
import Api from "../../Api/api";
import {ClipLoader, SkewLoader} from "react-spinners";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {useStateValue} from "../../states/StateProvider";

const InfoCrawler = () => {

    const [{ICSaved}, dispatch] = useStateValue();
    const [milestones, setMilestones] = useState([])
    const [subStepsLoading, setSubStepsLoading] = useState(false)
    const [triggerSubStepsLoading, setTriggerSubStepsLoading] = useState(false)
    const [subSteps, setSubSteps] = useState([])
    const [triggerSubSteps, setTriggerSubSteps] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingGrid, setLoadingGrid] = useState(false)
    const [deleteClicked, setDeleteClicked] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [loadingSave, setLoadingSave] = useState(false)
    const [milestoneSelected, seMilestoneSelected] = useState()
    const [TriggerMilestoneSelected, setTriggerMilestoneSelected] = useState()
    const [TriggerSubStepSelected, setTriggerSubStepSelected] = useState()
    const [SubStepSelected, setSubStepSelected] = useState()
    const UserInfo = localStorage.user
    let user = JSON.parse(UserInfo ? UserInfo : false)
    const [isICAdmin, setIsICAdmin] = useState()
    const {
        register, getValues, setValue, watch, handleSubmit, formState, reset, formState: {errors, touchedFields},
    } = useForm({mode: "onChange"});
    const {isValid} = formState;

    useEffect(() => {
        Api().get('getMilestoneCrawler').then(res => {
            setMilestones(res.data)
            setLoading(false)
        })
        Api().get(`/icAdminCheck/${user.ID}`).then(res => {
            setIsICAdmin(res.data)
        })
    }, [ICSaved]);


    const milestoneChanged = (e) => {
        reset()
        setSubStepsLoading(true)
        seMilestoneSelected(e.target.value)
        setSubSteps([])
        Api().get(`getSubStepsCrawler/${e.target.value}`).then(res => {
            setSubSteps(res.data)
            setSubStepSelected(res.data[0]?.substepID)
            setSubStepsLoading(false)
            getGrid(e.target.value, res.data[0].substepID, true)
        })
    }

    const triggerMilestoneSelected = (e) => {
        setTriggerMilestoneSelected(e.target.value)
        setTriggerSubStepsLoading(true)
        setTriggerSubSteps([])
        Api().get(`getSubStepsCrawler/${e.target.value}`).then(res => {
            setTriggerSubSteps(res.data)
            setTriggerSubStepSelected(res.data[0]?.substepID)
            setTriggerSubStepsLoading(false)
            // getGrid(e.target.value, res.data[0].substepID, false)
        })
    }

    const subStepSelected = (e) => {
        reset()
        setSubStepSelected(e.target.value)
        getGrid(milestoneSelected, e.target.value, true)
    }

    const triggerSubStepSelected = (e) => {
        setTriggerSubStepSelected(e.target.value)
    }

    const getGrid = (milestone, subStep, isLoading) => {
        setLoadingGrid(isLoading)
        Api().get(`sp_getDataIC/${milestone}/${subStep}`).then(res => {
            res.data.map(r => {
                Object.keys(r).forEach((key) => {
                    if (key.includes('FKB') || key.includes('DGAPI') || key.includes('BD') || key.includes('VBLF') || key.includes('cc')) {
                        if (r[key] === '0') {
                            r[key] = false
                        } else if (r[key] === '1') {
                            r[key] = true
                        }
                    }
                    setValue(key, r[key]);
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
            trMilestoneID: TriggerMilestoneSelected,
            trSubStepID: TriggerSubStepSelected,
        };

        Api().post('/sp_putIC1', modifiedData).then(res => {
            if (res.status === 201) {
                toast.success('Abschnitt 1 Daten gespeichert')
            }
            setLoadingSave(false)
        }).catch(e => {
            setLoadingSave(false)
            toast.error('Beim Speichern von Abschnitt 1 ist ein Fehler aufgetreten!')
        })

        Api().post('/sp_putIC2', modifiedData).then(res => {
            if (res.status === 201) {
                toast.success('Abschnitt 2 Daten gespeichert')
            }
            setLoadingSave(false)
        }).catch(e => {
            setLoadingSave(false)
            toast.error('Beim Speichern von Abschnitt 2 ist ein Fehler aufgetreten!')
        })

        Api().post('/sp_putIC3', modifiedData).then(res => {
            if (res.status === 201) {
                toast.success('Abschnitt 3 Daten gespeichert')
            }
            dispatch({type: "SET_ICSAVED", item: !ICSaved})
            setLoadingSave(false)
        }).catch(e => {
            setLoadingSave(false)
            toast.error('Beim Speichern von Abschnitt 3 ist ein Fehler aufgetreten!')
        })

        getGrid(milestoneSelected, SubStepSelected, true)
    };

    const deleteIC = () => {
        Api().post(`sp_deleteIC/${milestoneSelected}/${SubStepSelected}`).then(res => {
            if(res.data===1){
                toast.success('Erfolgreich gelöscht')
                setDeleteClicked(false)
            }
            else{
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

    return (
        <div className={`dashboardContainer`}>
            {
                loading ?
                    <SkewLoader size='10px'/>
                    : isICAdmin === 1 &&
                    <div className={`bg-white rounded-xl text-left px-14 py-8 `}>
                        <div
                            className={`${(!deleteClicked) && 'hideDiv'} shadow shadow-xl md:w-96 w-11/12 shadow-text text-lg px-6 py-6  flex flex-col rounded-lg z-10 absolute bg-offWhite centerItemsAbsolute`}>
                            <p>Bist du sicher mit dem Löschen?</p>
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
                        <div className='lg:w-fit'>
                            <div className='lg:flex justify-start flex-wrap items-center my-2'>
                                <p className='w-fit'>Einstellungen für: </p>
                                <select onChange={milestoneChanged}
                                        className='pl-3 pr-1 py-2 bg-white border border-offWhite rounded-sm lg:w-fit mx-3'>
                                    <option hidden={milestones.length > 0} value={null}>Wählen Sie einen Meilenstein
                                        aus
                                    </option>
                                    {
                                        milestones.map((m, i) => (
                                            <option className={m.hasIC === '1' ? 'bg-lightBlue my-2 text-white' : ''}
                                                    value={m.milestoneID} key={i}>{m.milestoneLabel}</option>
                                        ))
                                    }
                                </select>
                                {
                                    subStepsLoading ? <SkewLoader size='10px' color={'#3A46A9'}/>
                                        :
                                        <select onChange={subStepSelected}
                                                className='pl-3 pr-1 py-2 bg-white border border-offWhite rounded-sm lg:w-fit'>
                                            {
                                                subSteps.length === 0 && !subStepsLoading ?
                                                    <option value={null}>Bitte wählen Sie erst einen
                                                        Meilenstein aus
                                                    </option> :
                                                    subSteps.map((s, i) => (
                                                        <option className={s.hasIC === '1' ? 'bg-lightBlue my-2 text-white' : ''}
                                                                value={s.substepID} key={i}>{s.stepName}</option>
                                                    ))
                                            }
                                        </select>
                                }
                            </div>
                        </div>

                        {
                            loadingGrid ?
                                <div className={'flex h-screen w-full centerItemsRelative bg-white'}>
                                    <div className='-mt-32'><ClipLoader color={'#3A46A9'} size='70px'/></div>
                                </div>
                                :
                                <div>
                                    <form onSubmit={handleSubmit(onSubmit)} className='mt-6 rounded-lg'>
                                        <div className='my-4'>
                                            <h5 className='text-text'>Versand der ersten Erinnerung nach
                                                <span className='mx-2'>
                                            <input
                                                className='w-10 py-2 bg-white border border-offWhite rounded-sm text-mainBlue'
                                                placeholder='5'
                                                {...register('remind1days')}
                                                style={{border: errors.remind1days && '1px solid red'}}
                                            />
                                            </span>
                                                <span>Tagen</span>
                                            </h5>
                                        </div>

                                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                                            <label>
                                                <input type='checkbox'
                                                       className='mr-3'
                                                       {...register('remind1FKB')}
                                                       style={{border: errors.remind1FKB && '1px solid red'}}
                                                />
                                                An Berater
                                            </label>
                                            <label>
                                                <input
                                                    type='checkbox' className='mr-3'
                                                    {...register('remind1DGAPI')}
                                                    style={{border: errors.remind1DGAPI && '1px solid red'}}
                                                />
                                                An DGAPI
                                            </label>
                                        </div>
                                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                                            <label>
                                                <input
                                                    type='checkbox' className='mr-3'
                                                    {...register('remind1BD')}
                                                    style={{border: errors.remind1BD && '1px solid red'}}
                                                />
                                                cc BD
                                            </label>
                                            <label>
                                                <input type='checkbox' className='mr-3'
                                                       {...register('remind1VBLF')}
                                                       style={{border: errors.remind1VBLF && '1px solid red'}}
                                                />
                                                cc VBLF
                                            </label>
                                        </div>
                                        <div className='flex justify-start my-2'>
                                            <label className='w-2/12 -mr-3' style={{lineBreak: 'strict'}}>
                                                <input type='checkbox' className='mr-3'
                                                       {...register('remind1cc')}
                                                       style={{border: errors.remind1cc && '1px solid red'}}
                                                />
                                                cc ebenfalls an
                                            </label>
                                            <input type='text' placeholder='info@anymail.com'
                                                   {...register('remind1ccText')}
                                                   style={{border: errors.remind1ccText && '1px solid red'}}
                                                   className='py-2 w-full text-grey'/>
                                        </div>
                                        <div className='flex justify-start gap-4 my-2 mt-8'>
                                            <h5 className='w-2/12 -mr-3'>Betreff: </h5>
                                            <input type='text' className='py-2 w-screen text-grey'
                                                   {...register('remind1subject')}
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
                                                      {...register('remind1mail')}
                                                      style={{
                                                          border: errors.remind1mail && '1px solid red',
                                                          padding: '15px 40px'
                                                      }}
                                            />
                                        </div>

                                        <div className='my-4'>
                                            <h5 className='text-text'>Versand der ersten Erinnerung nach
                                                <span className='mx-2'>
                                                <input
                                                    className='w-10 py-2 bg-white border border-offWhite rounded-sm text-mainBlue'
                                                    placeholder='5'
                                                    {...register('remind2days')}
                                                    style={{border: errors.remind2days && '1px solid red'}}
                                                />
                                            </span>
                                                <span>Tagen</span>
                                            </h5>
                                        </div>

                                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                                            <label>
                                                <input type='checkbox'
                                                       className='mr-3'
                                                       {...register('remind2FKB')}
                                                       style={{border: errors.remind2FKB && '1px solid red'}}
                                                />
                                                An Berater
                                            </label>
                                            <label>
                                                <input
                                                    type='checkbox' className='mr-3'
                                                    {...register('remind2DGAPI')}
                                                    style={{border: errors.remind2DGAPI && '1px solid red'}}
                                                />
                                                An DGAPI
                                            </label>
                                        </div>
                                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                                            <label>
                                                <input
                                                    type='checkbox' className='mr-3'
                                                    {...register('remind2BD')}
                                                    style={{border: errors.remind2BD && '1px solid red'}}
                                                />
                                                cc BD
                                            </label>
                                            <label>
                                                <input type='checkbox' className='mr-3'
                                                       {...register('remind2VBLF')}
                                                       style={{border: errors.remind2VBLF && '1px solid red'}}
                                                />
                                                cc VBLF
                                            </label>
                                        </div>
                                        <div className='flex justify-start my-2'>
                                            <label className='w-2/12 -mr-3' style={{lineBreak: 'strict'}}>
                                                <input type='checkbox' className='mr-3'
                                                       {...register('remind2cc')}
                                                       style={{border: errors.remind2cc && '1px solid red'}}
                                                />
                                                cc ebenfalls an
                                            </label>
                                            <input type='text' placeholder='info@anymail.com'
                                                   {...register('remind2ccText')}
                                                   style={{border: errors.remind2ccText && '1px solid red'}}
                                                   className='py-2 w-full text-grey'/>
                                        </div>
                                        <div className='flex justify-start gap-4 my-2 mt-8'>
                                            <h5 className='w-2/12 -mr-3'>Betreff: </h5>
                                            <input type='text' className='py-2 w-screen text-grey'
                                                   {...register('remind2subject')}
                                                   style={{border: errors.remind2subject && '1px solid red'}}
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
                                                      {...register('remind2mail')}
                                                      style={{
                                                          border: errors.remind2mail && '1px solid red',
                                                          padding: '15px 40px'
                                                      }}
                                            />
                                        </div>

                                        <div className='my-4'>
                                            <h5 className='text-text'>Versand der ersten Erinnerung nach
                                                <span className='mx-2'>
                                                <input
                                                    className='w-10 py-2 bg-white border border-offWhite rounded-sm text-mainBlue'
                                                    placeholder='5'
                                                    {...register('remind3days')}
                                                    style={{border: errors.remind3ays && '1px solid red'}}
                                                />
                                            </span>
                                                <span>Tagen</span>
                                            </h5>
                                        </div>

                                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                                            <label>
                                                <input type='checkbox'
                                                       className='mr-3'
                                                       {...register('remind3FKB')}
                                                       style={{border: errors.remind3FKB && '1px solid red'}}
                                                />
                                                An Berater
                                            </label>
                                            <label>
                                                <input
                                                    type='checkbox' className='mr-3'
                                                    {...register('remind3DGAPI')}
                                                    style={{border: errors.remind3DGAPI && '1px solid red'}}
                                                />
                                                An DGAPI
                                            </label>
                                        </div>
                                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                                            <label>
                                                <input
                                                    type='checkbox' className='mr-3'
                                                    {...register('remind3BD')}
                                                    style={{border: errors.remind1BD && '1px solid red'}}
                                                />
                                                cc BD
                                            </label>
                                            <label>
                                                <input type='checkbox' className='mr-3'
                                                       {...register('remind3VBLF')}
                                                       style={{border: errors.remind1VBLF && '1px solid red'}}
                                                />
                                                cc VBLF
                                            </label>
                                        </div>
                                        <div className='flex justify-start my-2'>
                                            <label className='w-2/12 -mr-3' style={{lineBreak: 'strict'}}>
                                                <input type='checkbox' className='mr-3'
                                                       {...register('remind3cc')}
                                                       style={{border: errors.remind3cc && '1px solid red'}}
                                                />
                                                cc ebenfalls an
                                            </label>
                                            <input type='text' placeholder='info@anymail.com'
                                                   {...register('remind3ccText')}
                                                   style={{border: errors.remind3ccText && '1px solid red'}}
                                                   className='py-2 w-full text-grey'/>
                                        </div>
                                        <div className='flex justify-start gap-4 my-2 mt-8'>
                                            <h5 className='w-2/12 -mr-3'>Betreff: </h5>
                                            <input type='text' className='py-2 w-screen text-grey'
                                                   {...register('remind3subject')}
                                                   style={{border: errors.remind3subject && '1px solid red'}}
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
                                                      {...register('remind3mail')}
                                                      style={{
                                                          border: errors.remind3mail && '1px solid red',
                                                          padding: '15px 40px', marginBottom: '5vh'
                                                      }}
                                            />
                                        </div>
                                        {
                                            isValid && TriggerMilestoneSelected && TriggerSubStepSelected ?
                                                <input
                                                    className={`${isValid && TriggerMilestoneSelected && TriggerSubStepSelected ? 'bg-mainBlue cursor-pointer' : 'bg-grey cursor-no-drop '} w-44 float-right mt-4 text-white hover:bg-offWhite hover:text-mainBlue text-center px-3 py-2 rounded-md`}
                                                    type="submit"
                                                    onChange={() => console.log('saving')}
                                                    value={`${loadingSave ? 'Sparen...' : 'Speichern'}`}
                                                /> :
                                                <input
                                                    className={`${isValid && TriggerMilestoneSelected && TriggerSubStepSelected ? 'bg-mainBlue cursor-pointer' : 'bg-grey cursor-no-drop '} w-44 float-right mt-4 text-white hover:bg-offWhite hover:text-mainBlue text-center px-3 py-2 rounded-md`}
                                                    disabled
                                                    onChange={() => console.log('saving')}
                                                    value={`${loadingSave ? 'Sparen...' : 'Speichern'}`}
                                                />
                                        }
                                    </form>
                                    <input
                                        className={`${milestoneSelected && SubStepSelected ? 'bg-cancel cursor-pointer' : 'bg-grey cursor-no-drop '} float-right mt-4 text-white w-44 hover:bg-offWhite hover:text-mainBlue text-center px-3 py-2 rounded-md mr-1`}
                                        onClick={() => setDeleteClicked(true)}
                                        onChange={() => console.log('deleting')}
                                        value='Löschen'
                                    />

                                    <div className='lg:w-fit my-14 w-screen' style={{marginTop: '-5vh'}}>
                                        <div className='lg:flex justify-start flex-wrap items-center my-2'>
                                            <p className='w-fit'>Basierend auf vorherigem Termin:</p>
                                            <select onChange={triggerMilestoneSelected}
                                                    className='pl-3 pr-1 py-2 bg-white border border-offWhite rounded-sm lg:w-fit mx-3'>
                                                <option hidden={milestones.length > 0} value={null}>Wählen Sie einen
                                                    Meilenstein aus
                                                </option>
                                                {
                                                    milestones.map((m, i) => (
                                                        <option value={m.milestoneID}
                                                                key={i}>{m.milestoneLabel}</option>
                                                    ))
                                                }
                                            </select>
                                            {
                                                triggerSubStepsLoading ? <SkewLoader size='10px' color={'#3A46A9'}/>
                                                    :
                                                    <select onChange={triggerSubStepSelected}
                                                            className='pl-3 pr-1 py-2 bg-white border border-offWhite rounded-sm lg:w-fit'>
                                                        {
                                                            triggerSubSteps.length === 0 && !subStepsLoading ?
                                                                <option value={null}>Bitte wählen Sie erst einen
                                                                    Meilenstein aus
                                                                </option> :
                                                                triggerSubSteps.map((s, i) => (
                                                                    Number(TriggerMilestoneSelected) === Number(milestoneSelected) ? Number(s.substepID) < Number(SubStepSelected) &&
                                                                        <option value={s.substepID}
                                                                                key={i}>{s.stepName}</option> :
                                                                        <option value={s.substepID}
                                                                                key={i}>{s.stepName}</option>
                                                                ))
                                                        }
                                                    </select>
                                            }
                                        </div>
                                        {/*<p className='text-xs text-cancel'>  Pflichtfeld</p>*/}
                                    </div>
                                </div>
                        }
                    </div>
            }
        </div>
    )
}

export default InfoCrawler