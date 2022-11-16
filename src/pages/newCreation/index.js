import React, {useEffect, useState} from "react";
import Form from "./partial/form";
import Api from "../../Api/api";
import {BeatLoader} from "react-spinners";
import {toast} from "react-toastify";

const NewCreation = () => {
    const [name, setName] = useState('')
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)
    const [dropdownData, setDropdownData] = useState([])

    useEffect(() => {
        if(user){
            Api().get(`/getFormDropdown/${user.ID}`).then(res=>{
                setDropdownData(res.data)
                setLoading(false)
            }).catch(e=>{
                toast.error('Bankinformationen konnten nicht geladen werden!')
            })
        }
    }, [user]);

    useEffect(() => {
        try {
            setUser(JSON.parse(localStorage.user))
        } catch (e) {
            window.location.replace('/anmeldung')
        }
    }, []);



    return (
        <div className='dashboardContainer'>
            <h2 className='text-left text-xl font-bold pt-5 pb-5'>Neues Firmenprojekt</h2>
            {
                !loading && <Form name={name} dropdown={dropdownData}/>
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

export default NewCreation