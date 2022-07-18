import React from "react";

const Footer = () => {
    return (
        <div className='flex justify-between p-5'>
            <p>@ {new Date().getFullYear()} DG-Gruppe AG</p>
            <div className='flex justify-end text-sm'>
                <p className='pr-5 text-grey text-sm'>Privacy Policy</p>
                <p className='pr-5 text-grey text-sm'>Terms & Conditions</p>
                <p className='pr-5 text-grey text-sm'>User Documentation</p>
            </div>
        </div>
    )
}

export default Footer