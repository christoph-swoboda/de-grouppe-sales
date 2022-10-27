import React from "react";
import {useLocation} from "react-router-dom";

const Footer = () => {
    const location=useLocation()

    return (
        <div className='flex bg-white justify-between p-5' style={{display:location.pathname.includes('anmeldung')|| location.pathname.includes('registrieren')?'none':''}}>
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