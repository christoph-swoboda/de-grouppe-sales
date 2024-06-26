import React, {useEffect, useState} from "react";
import Api from "../../Api/api";
import {ClipLoader, SkewLoader} from "react-spinners";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";
import {useStateValue} from "../../states/StateProvider";
import {Link} from "react-router-dom";
import {AES, enc} from "crypto-js";
import {useNavigate} from "react-router";

const InfoCrawler = () => {

    const [{ICSaved, secretKey, portal}, dispatch] = useStateValue();
    const [milestones, setMilestones] = useState([])
    const [subStepsLoading, setSubStepsLoading] = useState(false)
    const [triggerSubStepsLoading, setTriggerSubStepsLoading] = useState(false)
    const [subSteps, setSubSteps] = useState([])
    const [triggerSubSteps, setTriggerSubSteps] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingGrid, setLoadingGrid] = useState(false)
    const [deleteClicked, setDeleteClicked] = useState(false)
    const [deleteDone, setDeleteDone] = useState(false)
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

        Api().get(`getMilestoneCrawler/${portal}`).then(res => {
            setMilestones(res.data)
            setLoading(false)
        }).then(r=>{
            GetSubSteps(milestoneSelected)
        }).then(r=>{
            getGrid(milestoneSelected, SubStepSelected, true)
        })
    }, [ICSaved, portal]);

    useEffect(() => {
        const triggerMilestoneID = getValues('triggerMilestoneID');
        if (triggerMilestoneID && triggerMilestoneID !== 'Wählen Sie einen Meilenstein aus') {
            setTriggerSubSteps([]);
            setTriggerSubStepsLoading(true);
            Api().get(`getSubStepsCrawler/${portal}/${triggerMilestoneID}`)
                .then(res => {
                    setTriggerSubSteps(res.data);
                    setTriggerSubStepsLoading(false);
                });
        }
    }, [getValues('triggerMilestoneID')]);

    const milestoneChanged = (e) => {
        reset()
        setSubStepsLoading(true)
        seMilestoneSelected(e.target.value)
        GetSubSteps(e.target.value)
    }

    function GetSubSteps(milestone){
        setSubSteps([])
        Api().get(`getSubStepsCrawler/${portal}/${milestone}`).then(res => {
            setSubSteps(res.data)
            setSubStepSelected(res.data[0]?.substepID)
            setSubStepsLoading(false)
            getGrid(milestone, res.data[0].substepID, true)
        })
    }

    const triggerMilestoneSelected = (e) => {
        setTriggerMilestoneSelected(e.target.value);
        setTriggerSubStepsLoading(true);
        setTriggerSubSteps([]);
        setValue('triggerMilestoneID', e.target.value)
        setValue('triggerSubstepID', '1');
        Api().get(`getSubStepsCrawler/${portal}/${e.target.value}`).then(res => {
            setTriggerSubSteps(res.data);
            setValue('triggerSubstepID', '1');
            setTriggerSubStepsLoading(false);
        });
    };

    const subStepSelected = (e) => {
        reset()
        setSubStepSelected(e.target.value)
        getGrid(milestoneSelected, e.target.value, true)
    }

    const getGrid = (milestone, subStep, isLoading) => {
        setLoadingGrid(isLoading)
        Api().get(`sp_getDataIC/${portal}/${milestone}/${subStep}`).then(res => {
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
                    if (key === 'remind1cc' && r[key]) {
                        setValue('remind1cc', 1)
                        setValue('remind1ccText', r[key])
                    }
                    if (key === 'remind2cc' && r[key]) {
                        setValue('remind2cc', 1)
                        setValue('remind2ccText', r[key])
                    }
                    if (key === 'remind3cc' && r[key]) {
                        setValue('remind3cc', 1)
                        setValue('remind3ccText', r[key])
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
        // console.log(modifiedData)

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
        }).finally(e => {
            reset()
            getGrid(milestoneSelected, SubStepSelected, true)
        })
    };

    const deleteIC = () => {
        Api().post(`sp_deleteIC/${portal}/${milestoneSelected}/${SubStepSelected}`).then(res => {
            if (res.data === 1) {
                toast.success('Erfolgreich gelöscht')
                setDeleteClicked(false)
            } else {
                toast.error('etwas ist schief gelaufen!')
            }
        }).catch(e => {
            toast.error('etwas ist schief gelaufen!')
        })
        setDeleteDone(!deleteDone)
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

    function portalSelect(e) {
        dispatch({type:'SET_PORTAL', item:e.target.value})
        localStorage.setItem('portal', e.target.value)
    }

    return (
        <div className={`dashboardContainer`}>
            <div className='flex justify-start items-center content-center pb-5'>
                <h2 className='text-2xl lg:text-left'> InfoCrawler</h2>
                {
                    <div className='flex justify-start items-center w-fit bg-transparent py-2 px-4 ml-2 rounded-sm'>
                        <p className='w-fit mr-2 text-grey'>Portal:  </p>
                        <select
                            disabled={loading || loadingSave || loadingGrid}
                            className='col-span-2 text-center text-mainBlue mx-auto pr-1 bg-transparent border border-offWhite rounded-sm lg:w-fit'
                            onChange={portalSelect}
                            value={portal}
                        >
                            <option selected value='dgg'>DGG</option>
                            <option value='ruv'>R+V</option>
                        </select>
                    </div>
                }
            </div>
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
                                                    className={m.hasIC === '1' ? 'bg-lightBlue my-2 text-white' : ''}
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
                                                                className={s.hasIC === '1' ? 'bg-lightBlue my-2 text-white' : ''}
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
                                                An DGAPI AMS
                                            </label>
                                        </div>
                                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                                            <label>
                                                <input
                                                    type='checkbox' className='mr-3'
                                                    {...register('remind1BD')}
                                                    style={{border: errors.remind1BD && '1px solid red'}}
                                                />
                                                cc {portal==='dgg'? 'KMS' : 'KBD'}
                                            </label>
                                            <label>
                                                <input type='checkbox' className='mr-3'
                                                       {...register('remind1VBLF')}
                                                       style={{border: errors.remind1VBLF && '1px solid red'}}
                                                />
                                                cc {portal==='dgg'? 'ADM' : 'VBLF'}
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
                                                An DGAPI AMS
                                            </label>
                                        </div>
                                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                                            <label>
                                                <input
                                                    type='checkbox' className='mr-3'
                                                    {...register('remind2BD')}
                                                    style={{border: errors.remind2BD && '1px solid red'}}
                                                />
                                                cc KBD
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
                                                An DGAPI AMS
                                            </label>
                                        </div>
                                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                                            <label>
                                                <input
                                                    type='checkbox' className='mr-3'
                                                    {...register('remind3BD')}
                                                    style={{border: errors.remind1BD && '1px solid red'}}
                                                />
                                                cc KBD
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
                                            (getValues('triggerMilestoneID') && getValues('triggerMilestoneID') !== 'Wählen Sie einen Meilenstein aus') ?
                                                <input
                                                    // className={`${isValid && TriggerMilestoneSelected && TriggerSubStepSelected ? 'bg-mainBlue cursor-pointer' : 'bg-grey cursor-no-drop '} w-44 float-right mt-4 text-white hover:bg-offWhite hover:text-mainBlue text-center px-3 py-2 rounded-md`}
                                                    className={`${(getValues('triggerMilestoneID') || getValues('triggerMilestoneID') !== 'Wählen Sie einen Meilenstein aus') ? 'bg-mainBlue cursor-pointer' : 'bg-grey cursor-no-drop '} w-44 float-right mt-4 text-white hover:bg-offWhite hover:text-mainBlue text-center px-3 py-2 rounded-md`}
                                                    type="submit"
                                                    onChange={() => console.log('saving')}
                                                    value={`${loadingSave ? 'speichere...' : 'Speichern'}`}
                                                /> :
                                                <input
                                                    className={`bg-grey cursor-no-drop w-44 float-right mt-4 text-white hover:bg-offWhite hover:text-mainBlue text-center px-3 py-2 rounded-md`}
                                                    disabled
                                                    onChange={() => console.log('saving')}
                                                    value={`${loadingSave ? 'speichere...' : 'Speichern'}`}
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
                                            <select
                                                {...register('triggerMilestoneID')}
                                                onChange={triggerMilestoneSelected}
                                                className='pl-3 pr-1 py-2 bg-white border border-offWhite rounded-sm lg:w-fit mx-3'>
                                                <option hidden={milestones.length > 0} value={null}>
                                                    Wählen Sie einen Meilenstein aus
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
                                                    <select
                                                        {...register('triggerSubstepID')}
                                                        className='pl-3 pr-1 py-2 bg-white border border-offWhite rounded-sm lg:w-fit'>
                                                        {
                                                            (!getValues('triggerMilestoneID') || getValues('triggerMilestoneID') === 'Wählen Sie einen Meilenstein aus') && !subStepsLoading ?
                                                                <option value={null}>
                                                                    Bitte wählen Sie erst einen Meilenstein aus
                                                                </option> :
                                                                triggerSubSteps.map((s, i) => (
                                                                    Number(getValues('triggerMilestoneID')) === Number(milestoneSelected) ? Number(s.substepID) < Number(SubStepSelected) &&
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