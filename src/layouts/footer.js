import React, {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import Api from "../Api/api";
import {useStateValue} from "../states/StateProvider";
import {CgCopyright} from "react-icons/cg";
import {AiFillCopyrightCircle, AiOutlineCopyrightCircle} from "react-icons/ai";

const Footer = () => {
    const location = useLocation()

    const [errorText, setErrorText] = useState('')
    const [{footerUpdated}] = useStateValue();

    useEffect(() => {
        Api().get('sp_getFooterString').then(res => {
            setErrorText(res.data[0]?.string)
        })
    }, [footerUpdated]);

    return (
        <div className='flex bg-white justify-between px-5 pt-3'
             style={{display: location.pathname.includes('anmeldung') || location.pathname.includes('registrieren') || location.pathname.includes('reset-password') ? 'none' : ''}}>
            <h1>
                <span className='flex justify-start items-center'>
                    <AiOutlineCopyrightCircle size='19px'/>
                    <span className='ml-1'> Helmsauer Gruppe</span>
                </span>
                <p className='text-left text-xs'>FE V3.1.2</p>
            </h1>
            {errorText && <p className='text-red'>{errorText}</p>}
            <div className='flex justify-end text-sm'>
                <a href='https://www.dg-gruppe.eu/public/download/pp/PP2-FP-Anleitung.pdf' target='_blank'
                   className='pr-5 text-grey cursor-pointer text-sm'>Bedienungsanleitung</a>
            </div>
        </div>
    )
}
export default Footer