import React, {useEffect, useState} from "react";
import Form from "./partial/form";
import Api from "../../Api/api";
import {BeatLoader} from "react-spinners";
import {toast} from "react-toastify";
import {useStateValue} from "../../states/StateProvider";
import {AES, enc} from "crypto-js";
import {useNavigate} from "react-router";

const NewCreation = () => {
    const [name, setName] = useState('')
    const [user, setUser] = useState('')
    const [loading, setLoading] = useState(true)
    const [dropdownData, setDropdownData] = useState([])
    const [{secretKey}, dispatch] = useStateValue();
    const navigate = useNavigate()

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
            const decryptedBytes = localStorage.getItem('user')?AES.decrypt(localStorage.getItem('user'), secretKey):false;
            const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
            if ((user && user.role !== 'ExtDGG' && user.role !== 'ExtRUV') && (user.role!=='Internal' && user.isSAdmin!=='1')) {
                navigate('/');
            }
            setUser(user)
            setName(user.fullname)
        } catch (e) {
            window.location.replace('/anmeldung')
        }
    }, []);



    return (
        <div className='dashboardContainer'>
            <h2 className='text-2xl lg:text-left pb-5'>Neues Firmenprojekt</h2>
            {
                !loading && <Form name={name} role={user?.role} dropdown={dropdownData}/>
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