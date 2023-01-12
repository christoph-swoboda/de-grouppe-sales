import React, {useEffect, useRef, useState} from "react";
import {useStateValue} from "../states/StateProvider";

const ButtonMailto = ({mailto, label}) => {

    const ref = useRef()
    const [{sendMail}, dispatch] = useStateValue()

    useEffect(() => {
        if (sendMail === true) {
            ref.current.click()
            // dispatch({type:'SET_SENDMAIL', item:true})
        }
    }, [sendMail]);

    function send(e) {
        dispatch({type:'SET_SENDMAIL', item:false})
        window.location.href = mailto;
        e.preventDefault();
    }

    return (
        <button ref={ref}
                className='pl-1.5'
                onClick={send}>
            {label}
        </button>
    );
};

export default ButtonMailto;