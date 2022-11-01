import React from "react";

const BestantStatus = ({note, by, at}) => {
    return (
        <div className='box-content border border-silver rounded-lg px-4 py-2 mt-2'>
            <div className='lg:flex justify-between bg-white mt-5'>
                <h2 className='ml-1'>
                    <span className='text-sm text-grey'>
                        {(new Date(at).toLocaleString()).replaceAll('/','.')},
                        <span className='text-sm lg:text-left text-text font-extrabold ml-1'>{by?by:'No User'}</span>
                    </span>
                </h2>
                {/*<p className='text-sm'>{at}</p>*/}
            </div>
            <p className='p-2 bg-yellowLight  text-left text-xs mt-2 rounded-md'>{note}</p>
            <div className='flex justify-between py-2'>
                {/*<p className='text-xs text-grey'> {by}</p>*/}
                {/*<p className='text-xs text-grey'> {(new Date(at).toLocaleString()).replaceAll('/','.')}</p>*/}
            </div>
        </div>
    )
}

export default BestantStatus