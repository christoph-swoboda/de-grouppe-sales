import React, {useEffect, useState} from "react";
import Form from "./partial/form";
import Api from "../../Api/api";
import {BeatLoader} from "react-spinners";

const NewCreation = () => {
    const [name, setName] = useState('')
    const [loading, setLoading] = useState(true)
    const [dropdownData, setDropdownData] = useState([])
    const user=JSON.parse(localStorage.user)
    const id=user.ID

    useEffect(() => {
        let data=new FormData
        data.append('userID',id)
        Api().post('/getFormDropdown',data).then(res=>{
            setDropdownData(res.data)
            setLoading(false)
        })
    }, []);

    useEffect(() => {
        try {
            const ls = localStorage.user
            setName(JSON.parse(ls).fullname)
        } catch (e) {window.location.reload()}
    }, []);



    return (
        <div className='dashboardContainer'>
            <h2 className='text-left text-xl font-bold pt-5 pb-5'>Neues Firmenprojekt</h2>
            {
                !loading && <Form name={name} dropdown={dropdownData}/>
            }
            {
                loading &&
                <div className='h-96 bg-white'>
                    <div className='centerItemsAbsolute'>
                        <BeatLoader size={10} color={'black'}/>
                    </div>
                </div>
            }
        </div>
    )
}

export default NewCreation