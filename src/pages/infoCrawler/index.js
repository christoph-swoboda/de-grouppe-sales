import React, {useEffect, useState} from "react";
import Api from "../../Api/api";
import {ClipLoader, SkewLoader} from "react-spinners";
import {useLocation} from "react-router-dom";
import {useForm} from "react-hook-form";
import {toast} from "react-toastify";

const InfoCrawler = () => {

    const [milestones, setMilestones] = useState([])
    const [subStepsLoading, setSubStepsLoading] = useState(false)
    const [subSteps, setSubSteps] = useState([])
    const [loading, setLoading] = useState(true)
    const [loadingGrid, setLoadingGrid] = useState(false)
    const [milestoneSelected, seMilestoneSelected] = useState()
    const UserInfo = localStorage.user
    let user = JSON.parse(UserInfo ? UserInfo : false)
    const [isICAdmin, setIsICAdmin] = useState()
    const {
        register, getValues, setValue, watch, handleSubmit, formState, reset, formState: {errors, touchedFields},
        control
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
    }, []);


    const milestoneChanged = (e) => {
        reset()
        setSubStepsLoading(true)
        seMilestoneSelected(e.target.value)
        setSubSteps([])
        Api().get(`getSubStepsCrawler/${e.target.value}`).then(res => {
            setSubSteps(res.data)
            setSubStepsLoading(false)
            getGrid(e.target.value, res.data[0].substepID)
        })
    }

    const subStepSelected = (e) => {
        reset()
        getGrid(milestoneSelected, e.target.value)
    }

    const getGrid = (milestone, subStep) => {
        setLoadingGrid(true)
        Api().get(`sp_getDataIC/${milestone}/${subStep}`).then(res => {
            res.data.map(r => {
                Object.keys(r).forEach((key) => {
                    setValue(key, r[key]);
                });
            })
            setLoadingGrid(false)
        }).catch(e => {
            setLoadingGrid(false)
        })
    }

    const onSubmit = async (data) => {
        console.log(data)
    };

    return (
        <div className='dashboardContainer'>
            {
                loading ?
                    <SkewLoader size='10px'/>
                    : isICAdmin === 1 &&
                    <div className='bg-white rounded-xl text-left px-14 py-8'>
                        <div className='lg:w-fit'>
                            <div className='lg:flex justify-start flex-wrap items-center my-2'>
                                <p className='w-fit'>Einstellungen Fur: </p>
                                <select onChange={milestoneChanged}
                                        className='pl-3 pr-1 py-2 bg-white border border-offWhite rounded-sm lg:w-fit mx-3'>
                                    <option hidden={milestones.length > 0} value={null}>Wählen Sie einen Meilenstein
                                        aus
                                    </option>
                                    {
                                        milestones.map((m, i) => (
                                            <option value={m.milestoneID} key={i}>{m.milestoneLabel}</option>
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
                                                        <option value={s.substepID} key={i}>{s.stepName}</option>
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
                                            <h5 className='text-text'>Versand Der Ernsten Erinnerung nach
                                                <span className='mx-2'>
                                            <input
                                                className='w-10 py-2 bg-white border border-offWhite rounded-sm text-mainBlue'
                                                placeholder='5'
                                                {...register('remind1days')}
                                                required
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
                                                   className='py-2 w-full text-grey'/>
                                        </div>
                                        <div className='flex justify-start gap-4 my-2 mt-8'>
                                            <h5 className='w-2/12 -mr-3'>Betref</h5>
                                            <input type='text' className='py-2 w-screen text-grey'
                                                   {...register('remind1subject')}
                                                   style={{border: errors.remind1subject && '1px solid red'}}
                                            />
                                        </div>
                                        <div className=' gap-4 my-2 mt-8'>
                                            <h5 className='w-2/12 -mr-3'>Mail text: </h5>
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
                                            <h5 className='text-text'>Versand Der Ernsten Erinnerung nach
                                                <span className='mx-2'>
                                                <input
                                                    className='w-10 py-2 bg-white border border-offWhite rounded-sm text-mainBlue'
                                                    placeholder='5'
                                                    {...register('remind2days')}
                                                    required
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
                                                   className='py-2 w-full text-grey'/>
                                        </div>
                                        <div className='flex justify-start gap-4 my-2 mt-8'>
                                            <h5 className='w-2/12 -mr-3'>Betref</h5>
                                            <input type='text' className='py-2 w-screen text-grey'
                                                   {...register('remind2subject')}
                                                   style={{border: errors.remind2subject && '1px solid red'}}
                                            />
                                        </div>
                                        <div className=' gap-4 my-2 mt-8'>
                                            <h5 className='w-2/12 -mr-3'>Mail text: </h5>
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
                                            <h5 className='text-text'>Versand Der Ernsten Erinnerung nach
                                                <span className='mx-2'>
                                                <input
                                                    className='w-10 py-2 bg-white border border-offWhite rounded-sm text-mainBlue'
                                                    placeholder='5'
                                                    {...register('remind3days')}
                                                    required
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
                                                   className='py-2 w-full text-grey'/>
                                        </div>
                                        <div className='flex justify-start gap-4 my-2 mt-8'>
                                            <h5 className='w-2/12 -mr-3'>Betref</h5>
                                            <input type='text' className='py-2 w-screen text-grey'
                                                   {...register('remind3subject')}
                                                   style={{border: errors.remind3subject && '1px solid red'}}
                                            />
                                        </div>
                                        <div className=' gap-4 my-2 mt-8'>
                                            <h5 className='w-2/12 -mr-3'>Mail text: </h5>
                                            <textarea rows='8'
                                                      className='border border-whiteDark rounded-sm w-full text-grey'
                                                      {...register('remind3mail')}
                                                      style={{
                                                          border: errors.remind3mail && '1px solid red',
                                                          padding: '15px 40px'
                                                      }}
                                            />
                                        </div>
                                        <input
                                            className={`float-right mt-24 text-white text-center ${!isValid ? 'bg-grey cursor-no-drop' : 'bg-mainBlue cursor-pointer'}  px-6 py-2 rounded-md`}
                                            type="submit"
                                            disabled={!isValid}
                                            value='speichern'
                                        />
                                    </form>
                                    <div className='md:w-3/5 my-8 mb-28'>
                                        <div className='grid grid-cols-3 gap-4 items-center'>
                                            <h5>Der nachfolgende schritt ist: </h5>
                                            <select className='px-6 py-1 bg-white border border-offWhite rounded-sm'>
                                                <option>Meilenstein</option>
                                            </select>
                                            <select className='px-6 py-1 bg-white border border-offWhite rounded-sm'>
                                                <option>Schritt</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                        }
                    </div>
            }
        </div>
    )
}

export default InfoCrawler