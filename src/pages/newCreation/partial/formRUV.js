import React from "react"
import Form from "./form";
import FormDGG from "./formDGG";
import {BeatLoader} from "react-spinners";

const FormRUV = ({name, dropdown, role, isSAdmin, loading, portal}) => {

    return (
        <div className='bg-white rounded-lg'>
            <h2>RUV VIEW</h2>
            <Form name={name} role={role} dropdown={dropdown}/>
        </div>
    )
}

export default FormRUV