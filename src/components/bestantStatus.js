import React from "react";

const BestantStatus = () => {
    return (
        <div className='box-content border border-silver rounded-lg px-4 py-2 mt-2'>
            <div className='lg:flex justify-between bg-white mt-5'>
                <h2 className='text-sm lg:text-left font-extrabold'>10. AnrAuskunft FA hin (Calling information sent to
                    the tax office)</h2>
                <p className='text-sm'>02.09.2021</p>
            </div>
            <p className='p-2 bg-yellowLight text-xs mt-2 rounded-md'>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
                deserunt mollit anim id est laborum.
            </p>
            <div className='flex justify-between py-2'>
                <p className='text-xs text-grey'> ruv@mustermann.ruv.de</p>
                <p className='text-xs text-grey'> 02/02/2022 16:04</p>
            </div>
        </div>
    )
}

export default BestantStatus