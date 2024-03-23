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
    const [{secretKey, portal}, dispatch] = useStateValue();
    const navigate = useNavigate()

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
        if ((user.role === 'ExtDGG' || user.role === 'ManDGG')) {
            dispatch({type:'SET_PORTAL', item:'dgg'})
            localStorage.setItem('portal', 'dgg')
        } else if ((user.role === 'ExtRUV' || user.role === 'ManRUV')) {
            dispatch({type:'SET_PORTAL', item:'ruv'})
            localStorage.setItem('portal', 'ruv')
        } else {
            if(localStorage.getItem('portal')){
                dispatch({type:'SET_PORTAL', item:localStorage.getItem('portal')})
            }else{
                dispatch({type:'SET_PORTAL', item:'dgg'})
            }
        }
    }, []);

    function portalSelect(e) {
        dispatch({type:'SET_PORTAL', item:e.target.value})
        localStorage.setItem('portal', e.target.value)
    }


    return (
        <div className='dashboardContainer'>
            <div className='flex justify-start items-center content-center pb-5'>
                <h2 className='text-2xl lg:text-left'> Neues Firmenprojekt</h2>
                {
                    (superAdmin === '1' || user.role === 'Internal' || user.role === 'Controller') &&
                    <div className='flex justify-start items-center w-fit bg-transparent py-2 px-4 ml-2 rounded-sm'>
                        <p className='w-fit mr-2 text-grey'>Portal:  </p>
                        <select
                            className='col-span-2 text-center text-mainBlue mx-auto pr-1 bg-transparent border border-offWhite rounded-sm lg:w-fit'
                            onChange={portalSelect}
                            value={portal}
                        >
                            <option selected value='dgg'>DGG</option>
                            <option value='ruv'>R+V</option>
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