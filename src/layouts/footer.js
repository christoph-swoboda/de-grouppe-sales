import React from "react";
import {useLocation} from "react-router-dom";

const Footer = () => {
    const location=useLocation()

    return (
        <div className='flex bg-white justify-between p-5' style={{display:location.pathname.includes('anmeldung')|| location.pathname.includes('registrieren')|| location.pathname.includes('reset-password')?'none':''}}>
            <h1>@{new Date().getFullYear()} DG-Gruppe AG
                <p className='text-left text-xs'>FE V2.0.5</p>
            </h1>
            <div className='flex justify-end text-sm'>
                <a href='https://www.dg-gruppe.eu/public/download/pp/PP2-FP-Anleitung.pdf' target='_blank' className='pr-5 text-grey cursor-pointer text-sm'>Bedienungsanleitung</a>
            </div>
        </div>
    )
}

export default Footer