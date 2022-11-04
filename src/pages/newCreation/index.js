import React, {useEffect, useState} from "react";
import Form from "./partial/form";

const NewCreation = () => {
    const [name, setName] = useState('')
    useEffect(() => {
        try {
            const ls = localStorage.user
            setName(JSON.parse(ls).fullname)
        } catch (e) {window.location.reload()}
    }, []);

    return (
        <div className='dashboardContainer'>
            <h2 className='text-left text-xl font-bold pt-5 pb-5'>Neues Firmenprojekt</h2>
            <Form name={name}/>
        </div>
    )
}

export default NewCreation