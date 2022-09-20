import React from "react";

const BestantStatus = ({note, by, at}) => {
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};

    return (
        <div className='box-content border border-silver rounded-lg px-4 py-2 mt-2'>
            <div className='lg:flex justify-between bg-white mt-5'>
                <h2 className='text-sm lg:text-left font-extrabold'>{by}</h2>
                {/*<p className='text-sm'>{at}</p>*/}
            </div>
            <p className='p-2 bg-yellowLight text-xs mt-2 rounded-md'>{note}</p>
            <div className='flex justify-between py-2'>
                {/*<p className='text-xs text-grey'> {by}</p>*/}
                <p className='text-xs text-grey'> {new Date(at).toLocaleString()}</p>
            </div>
        </div>
    )
}

export default BestantStatus