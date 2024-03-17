import React, {useEffect, useState} from "react";
import FormRUV from "./partial/formRUV";
import Api from "../../Api/api";
import {BeatLoader} from "react-spinners";
import {toast} from "react-toastify";
import {useStateValue} from "../../states/StateProvider";
import {AES, enc} from "crypto-js";
import {useNavigate} from "react-router";
import FormDGG from "./partial/formDGG";
import RoleCheck from "./partial/roleChek";

const NewCreation = () => {
    const [name, setName] = useState('')
    const [user, setUser] = useState('')
    const [superAdmin, setSuperAdmin] = useState('')
    const [role, setRole] = useState('')
    const [loading, setLoading] = useState(true)
    const [dropdownData, setDropdownData] = useState([])
    const [{secretKey}, dispatch] = useStateValue();
    const navigate = useNavigate()
    const [portal, setPortal] = useState('dgg')

    useEffect(() => {
        try {
            const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
            const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
            if ((user && user.role !== 'ExtDGG' && user.role !== 'ExtRUV') && (user.role !== 'Internal' && user.isSAdmin !== '1')) {
                navigate('/');
            }
            setUser(user)
            setName(user.fullname)
        } catch (e) {
            window.location.replace('/anmeldung')
        }
    }, []);

    useEffect(() => {
        if (user) {
            setLoading(true)
            Api().get(`/sp_getDataNewCustomer/${portal}/${user.ID}`).then(res => {
                setDropdownData(res.data)
                setLoading(false)
            }).catch(e => {
                toast.error('Bankinformationen konnten nicht geladen werden!')
                setLoading(false)
            })
        }
    }, [user, portal]);

    useEffect(() => {
        setSuperAdmin(user.isSAdmin)
        setRole(user.role)
        if(user.role==='ExtDGG'){
            setPortal('dgg')
        }else if(user.role==='ExtRUV'){
            setPortal('r+v')
        }
    }, [user]);


    function portalSelect(e) {
        setPortal(e.target.value)
    }


    return (
        <div className='dashboardContainer'>
            <div className='flex justify-between'>
                <h2 className='text-2xl lg:text-left pb-5'>Neues Firmenprojekt</h2>
                {
                    superAdmin === '1' &&
                        <div className='flex justify-start items-center w-fit'>
                            <p className='w-fit mr-6'>Portal </p>
                            <select
                                className='pl-3 col-span-2 text-center mx-auto pr-1 py-2 bg-white border border-offWhite rounded-sm lg:w-fit px-12'
                                onChange={portalSelect}
                                value={portal}
                            >
                                <option selected value='dgg'>DGG</option>
                                <option value='r+v'>R+V</option>
                            </select>
                        </div>
                }
            </div>
            <RoleCheck
                name={name}
                role={role}
                dropdown={dropdownData}
                loading={loading}
                isSAdmin={superAdmin}
                portal={portal}
            />
        </div>
    )
}

export default NewCreation