import React, {useEffect} from "react"
import Form from "./form";
import FormDGG from "./formDGG";
import {BeatLoader} from "react-spinners";
import FormRUV from "./formRUV";

const RoleCheck = ({name, dropdown, role, isSAdmin, loading, portal}) => {

    useEffect(() => {
        console.log(role,portal )
    }, []);

    return (
        <div className='bg-white rounded-lg'>
            { !loading &&
                (role === 'ExtDGG' || portal==='dgg') ?
                    <FormDGG name={name} role={role} isSAdmin={isSAdmin} dropdown={dropdown}/>
                    :
                    <FormRUV name={name} role={role} isSAdmin={isSAdmin} dropdown={dropdown}/>
            }
            {
                loading &&
                <div className='h-full bg-white'>
                    <div className='centerItemsAbsolute'>
                        <BeatLoader size={10} color={'black'}/>
                    </div>
                </div>
            }
        </div>
    )
}

export default RoleCheck