import React from "react";
import Form from "./partial/form";

const NewCreation = () => {
    const user=JSON.parse(localStorage.user)
    const name=user.fullname

    return (
        <div className='dashboardContainer'>
            <h2 className='text-left text-xl font-bold pt-5 pb-5'>Neues Firmenprojekt</h2>
            <Form name={name}/>
        </div>
    )
}

export default NewCreation