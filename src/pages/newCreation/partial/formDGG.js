import React from "react"
import Form from "./form";
import FormRUV from "./formRUV";
import {BeatLoader} from "react-spinners";

const FormDGG = ({name, dropdown, role, isSAdmin, loading, portal}) => {

    return (
        <div className='bg-white rounded-lg'>
            <h2>DGG VIEW</h2>
            <Form name={name} role={role} dropdown={dropdown}/>
        </div>
    )
}

export default FormDGG