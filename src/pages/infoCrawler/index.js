import React from "react";

const InfoCrawler = () => {
    return (
        <div className='dashboardContainer'>
            <div className='bg-white rounded-xl text-left p-8'>
                <div className='md:w-2/5'>
                    <div className='grid grid-cols-3 gap-4 items-center'>
                        <p>Einstellungen Fur: </p>
                        <select className='px-6 py-1 bg-white border border-offWhite rounded-sm'>
                            <option>Meilenstein</option>
                        </select>
                        <select className='px-6 py-1 bg-white border border-offWhite rounded-sm'>
                            <option>Schritt</option>
                        </select>
                    </div>
                </div>
                <div className='my-4'>
                    <p>Versand Der Ernsten Erinnerung nach
                        <span className='mx-2'>
                            <input className='w-10 py-1 bg-white border border-offWhite rounded-sm' placeholder='5'/>
                        </span>
                        <span>Tagen</span>
                    </p>
                </div>

                <div className='md:w-3/12 grid grid-cols-2 gap-6 my-2'>
                    <label>
                        <input type='checkbox' className='mr-3'/>
                        An Berater
                    </label>
                    <label>
                        <input type='checkbox' className='mr-3'/>
                        An DGAPI
                    </label>
                </div>
                <div className='md:w-3/12 grid grid-cols-2 gap-6 my-2'>
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
                        <input type='text' placeholder='info@anymail.com' className='py-0 w-full'/>
                </div>
                <div className='flex justify-start gap-4 my-2 mt-8'>
                    <p className='w-2/12 -mr-3'>Betref</p>
                    <input type='text' className='py-0 w-screen'/>
                </div>
                <div className=' gap-4 my-2 mt-8'>
                    <p className='w-2/12 -mr-3'>Mail text: </p>
                    <textarea cols='5' rows='5' className='border border-whiteDark rounded-sm w-full'/>
                </div>

                <div className='my-4 mt-8'>
                    <p>Versand Der zweiten Erinnerung nach
                        <span className='mx-2'>
                            <input className='w-10 py-1 bg-white border border-offWhite rounded-sm' placeholder='5'/>
                        </span>
                        <span>Tagen</span>
                    </p>
                </div>

                <div className='md:w-3/12 grid grid-cols-2 gap-6 my-2'>
                    <label>
                        <input type='checkbox' className='mr-3'/>
                        An Berater
                    </label>
                    <label>
                        <input type='checkbox' className='mr-3'/>
                        An DGAPI
                    </label>
                </div>
                <div className='md:w-3/12 grid grid-cols-2 gap-6 my-2'>
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
                    <input type='text' placeholder='info@anymail.com' className='py-0 w-full'/>
                </div>
                <div className='flex justify-start gap-4 my-2 mt-8'>
                    <p className='w-2/12 -mr-3'>Betref</p>
                    <input type='text' className='py-0 w-screen'/>
                </div>
                <div className=' gap-4 my-2 mt-8'>
                    <p className='w-2/12 -mr-3'>Mail text: </p>
                    <textarea cols='5' rows='5' className='border border-whiteDark rounded-sm w-full'/>
                </div>

                <div className='my-4 mt-8'>
                    <p>Versand Der dritten Erinnerung nach
                        <span className='mx-2'>
                            <input className='w-10 py-1 bg-white border border-offWhite rounded-sm' placeholder='5'/>
                        </span>
                        <span>Tagen</span>
                    </p>
                </div>

                <div className='md:w-3/12 grid grid-cols-2 gap-6 my-2'>
                    <label>
                        <input type='checkbox' className='mr-3'/>
                        An Berater
                    </label>
                    <label>
                        <input type='checkbox' className='mr-3'/>
                        An DGAPI
                    </label>
                </div>
                <div className='md:w-3/12 grid grid-cols-2 gap-6 my-2'>
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
                    <input type='text' placeholder='info@anymail.com' className='py-0 w-full'/>
                </div>
                <div className='flex justify-start gap-4 my-2 mt-8'>
                    <p className='w-2/12 -mr-3'>Betref</p>
                    <input type='text' className='py-0 w-screen'/>
                </div>
                <div className=' gap-4 my-2 mt-8'>
                    <p className='w-2/12 -mr-3'>Mail text: </p>
                    <textarea cols='5' rows='5' className='border border-whiteDark rounded-sm w-full'/>
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
        </div>
    )
}

export default InfoCrawler