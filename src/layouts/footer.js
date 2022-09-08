import React from "react";
import {useLocation} from "react-router-dom";

const Footer = () => {
    const location=useLocation()

    return (
        <div className='flex justify-between p-5' style={{display:location.pathname==='/login'|| location.pathname==='/register'?'none':''}}>
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