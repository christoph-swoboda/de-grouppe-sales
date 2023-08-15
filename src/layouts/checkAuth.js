import {useEffect, useState} from "react"

const AuthCheck = ({children, info}) => {

    useEffect(() => {
        if(!localStorage.user){
            window.location.reload()
        }
    }, []);

    return (
        <>
            {children}
        </>
    )
}

export default AuthCheck



