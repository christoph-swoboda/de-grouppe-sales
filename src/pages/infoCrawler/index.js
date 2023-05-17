import React, {useEffect, useState} from "react";
import Api from "../../Api/api";
import {SkewLoader} from "react-spinners";

const InfoCrawler = () => {

    const [milestones, setMilestones] = useState([])
    const [subStepsLoading, setSubStepsLoading] = useState(false)
    const [subSteps, setSubSteps] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        Api().get('getMilestoneCrawler').then(res => {
            setMilestones(res.data)
            setLoading(false)
        })
    }, []);

    const milestoneChanged = (e) => {
        setSubStepsLoading(true)
        setSubSteps([])
        Api().get(`getSubStepsCrawler/${e.target.value}`).then(res => {
            setSubSteps(res.data)
            setSubStepsLoading(false)
        })
    }

    return (
        <div className='dashboardContainer'>
            {
                loading ?
                    <SkewLoader size='10px'/>
                    :
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
                                        <select className='pl-3 pr-1 py-2 bg-white border border-offWhite rounded-sm lg:w-fit'>

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
                        <div className='my-4'>
                            <p>Versand Der Ernsten Erinnerung nach
                                <span className='mx-2'>
                            <input className='w-10 py-2 bg-white border border-offWhite rounded-sm text-mainBlue' placeholder='5'/>
                        </span>
                                <span>Tagen</span>
                            </p>
                        </div>

                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                            <label>
                                <input type='checkbox' className='mr-3'/>
                                An Berater
                            </label>
                            <label>
                                <input type='checkbox' className='mr-3'/>
                                An DGAPI
                            </label>
                        </div>
                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                            <label>
                                <input type='checkbox' className='mr-3'/>
                                cc BD
                            </label>
                            <label>
                                <input type='checkbox' className='mr-3'/>
                                cc VBLF
                            </label>
                        </div>
                        <div className='flex justify-start my-2'>
                            <label className='w-2/12 -mr-3' style={{lineBreak:'strict'}}>
                                <input type='checkbox' className='mr-3'/>
                                cc ebenfalls an
                            </label>
                            <input type='text' placeholder='info@anymail.com' className='py-2 w-full text-grey'/>
                        </div>
                        <div className='flex justify-start gap-4 my-2 mt-8'>
                            <p className='w-2/12 -mr-3'>Betref</p>
                            <input type='text' className='py-2 w-screen text-grey'/>
                        </div>
                        <div className=' gap-4 my-2 mt-8'>
                            <p className='w-2/12 -mr-3'>Mail text: </p>
                            <textarea cols='5' rows='5' className='border border-whiteDark rounded-sm w-full text-grey'/>
                        </div>

                        <div className='my-4 mt-8'>
                            <p>Versand Der zweiten Erinnerung nach
                                <span className='mx-2'>
                                    <input className='w-10 py-1 bg-white border border-offWhite rounded-sm text-mainBlue'
                                           placeholder='5'/>
                                </span>
                                <span>Tagen</span>
                            </p>
                        </div>

                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                            <label>
                                <input type='checkbox' className='mr-3'/>
                                An Berater
                            </label>
                            <label>
                                <input type='checkbox' className='mr-3'/>
                                An DGAPI
                            </label>
                        </div>
                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                            <label>
                                <input type='checkbox' className='mr-3'/>
                                cc BD
                            </label>
                            <label>
                                <input type='checkbox' className='mr-3'/>
                                cc VBLF
                            </label>
                        </div>
                        <div className='flex justify-start my-2'>
                            <label className='w-2/12 -mr-3'>
                                <input type='checkbox' className='mr-3'/>
                                cc ebenfalls an
                            </label>
                            <input type='text' placeholder='info@anymail.com' className='py-2 w-full text-grey'/>
                        </div>
                        <div className='flex justify-start gap-4 my-2 mt-8'>
                            <p className='w-2/12 -mr-3'>Betref</p>
                            <input type='text' className='py-2 w-screen text-grey'/>
                        </div>
                        <div className=' gap-4 my-2 mt-8'>
                            <p className='w-2/12 -mr-3'>Mail text: </p>
                            <textarea cols='5' rows='5' className='border border-whiteDark rounded-sm w-full text-grey'/>
                        </div>

                        <div className='my-4 mt-8'>
                            <p>Versand Der dritten Erinnerung nach
                                <span className='mx-2'>
                            <input className='w-10 py-1 bg-white border border-offWhite rounded-sm text-mainBlue' placeholder='5'/>
                        </span>
                                <span>Tagen</span>
                            </p>
                        </div>

                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                            <label>
                                <input type='checkbox' className='mr-3'/>
                                An Berater
                            </label>
                            <label>
                                <input type='checkbox' className='mr-3'/>
                                An DGAPI
                            </label>
                        </div>
                        <div className='lg:w-3/12 grid grid-cols-2 gap-6 my-2'>
                            <label>
                                <input type='checkbox' className='mr-3'/>
                                cc BD
                            </label>
                            <label>
                                <input type='checkbox' className='mr-3'/>
                                cc VBLF
                            </label>
                        </div>
                        <div className='flex justify-start my-2'>
                            <label className='w-2/12 -mr-3'>
                                <input type='checkbox' className='mr-3'/>
                                cc ebenfalls an
                            </label>
                            <input type='text' placeholder='info@anymail.com' className='py-2 w-full text-grey'/>
                        </div>
                        <div className='flex justify-start gap-4 my-2 mt-8'>
                            <p className='w-2/12 -mr-3'>Betref</p>
                            <input type='text' className='py-2 w-screen text-grey'/>
                        </div>
                        <div className=' gap-4 my-2 mt-8'>
                            <p className='w-2/12 -mr-3'>Mail text: </p>
                            <textarea cols='5' rows='5' className='border border-whiteDark rounded-sm w-full text-grey'/>
                        </div>

                        <div className='md:w-3/5 my-8 mb-28'>
                            <div className='grid grid-cols-3 gap-4 items-center'>
                                <p>Der nachfolgende schritt ist: </p>
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
    )
}

export default InfoCrawler