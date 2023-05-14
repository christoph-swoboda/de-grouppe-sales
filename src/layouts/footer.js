import React from "react";
import {useLocation} from "react-router-dom";

const Footer = () => {
    const location=useLocation()

    return (
        <div className='flex bg-white justify-between p-5' style={{display:location.pathname.includes('anmeldung')|| location.pathname.includes('registrieren')|| location.pathname.includes('reset-password')?'none':''}}>
            <p>@{new Date().getFullYear()} DG-Gruppe AG</p>
            <div className='flex justify-end text-sm'>
                <a href='https://www.dg-gruppe.eu/public/download/pp/PP2-FP-Anleitung.pdf' className='pr-5 text-grey cursor-pointer text-sm'>Bedienungsanleitung</a>
            </div>
        </div>
    )
}

export default Footer