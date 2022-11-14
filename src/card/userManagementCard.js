import React, {useState, useEffect} from "react";
import {GrCheckbox} from "react-icons/gr";
import {FaToggleOn} from "react-icons/fa";
import Api from "../Api/api";
import {useStateValue} from "../states/StateProvider";
import {toast} from "react-toastify";

const UserManagementCard = ({email, prtnrNo, valid, userID, name, lastLogin, created}) => {
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingName, setLoadingName] = useState(false)
    const [partnerNr, setPartnerNo] = useState(prtnrNo)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [verified, setVerified] = useState(valid)
    const [{userValidated}, dispatch] = useStateValue();
    const user=JSON.parse(localStorage.user)
    const admin=user.isUserAdmin

    function save() {
        setLoading(true)
        let data = new FormData()
        data.append('userID', Number(userID))
        data.append('partnerNo', partnerNr)
        data.append('vorname', firstName)
        data.append('nachname', lastName)
        data.append('verified', verified)

        Api().post('/updateUser', data).then(res => {
            setPartnerNo(res.data[0]?.partnernr)
            setLoading(false)
            setEdit(false)
            dispatch({type: "SET_USER_VALIDATED", item:!userValidated})
            toast.success('Benutzer erfolgreich validiert!')
        }).catch(e=>{
            setEdit(false)
            setLoading(false)
            toast.error('Etwas ist schief gelaufen!!')
        })
    }

    function cancel(){
        dispatch({type: "SET_USER_VALIDATED", item: !userValidated})
        setEdit(false)
    }
    function setEditStates(id){
        setEdit(true)
        let data = new FormData()
        data.append('userID', Number(id))
        setLoadingName(true)
        Api().post('/getName', data).then(res=>{
            console.log('name',res.data[0]?.firstname)
            setFirstName(res.data[0]?.firstname)
            setLastName(res.data[0]?.lastname)
            setLoadingName(false)
        })
    }

    return (
        <tbody>
        <tr className={`${edit && 'bg-yellowLight'} border-y border-silver border-x-0`}>
            <td hidden={edit} className={`px-6 py-2 whitespace-nowrap text-sm text-gray-900`}>{name?name:'N/A'}</td>
            <td hidden={!edit}>
                <input className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap mt-1"
                       type='text'
                       placeholder='Nachname'
                       value={lastName}
                       onChange={(e) => setLastName(e.target.value)}
                />
                <input className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap"
                       type='text'
                       placeholder='Vorname'
                       value={firstName}
                       onChange={(e) => setFirstName(e.target.value)}
                />
            </td>
            <td hidden={edit} className="text-sm text-gray-900 normal-case font-light px-6 py-1 whitespace-nowrap">
                {email}
            </td>
            <td hidden={!edit} className="text-sm text-gray-900 normal-case font-light px-6 py-1 whitespace-nowrap">

            </td>
            <td hidden={edit}
                className="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                {prtnrNo}
            </td>
            <td hidden={!edit}>
                <input className="text-sm text-gray-900 font-light px-3 py-1 whitespace-nowrap"
                       type='text'
                       value={partnerNr}
                       onChange={(e) => setPartnerNo(e.target.value)}
                />
            </td>

            <td>
                <button disabled={!edit}
                        onClick={() => setVerified('1')}
                        className="text-sm text-gray-900 font-light px-6 py-0 whitespace-nowrap">
                    {
                        verified==='1' ?
                            <FaToggleOn color={'#3A46A9'} style={{cursor: edit ? 'pointer' : 'default'}} size='30px'/>
                            : verified==='0' &&
                            <GrCheckbox style={{cursor: edit ? 'pointer' : 'default', height:'30px'}}/>
                    }
                </button>
            </td>
            <td hidden={edit} className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">{created}</td>
            <td hidden={!edit} className="px-6 py-2 whitespace-nowrap text-sm text-gray-900"></td>
            <td hidden={edit} className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">{lastLogin}</td>
            {/*<td hidden={!edit} className="px-6 py-2 whitespace-nowrap text-sm text-gray-900"></td>*/}

            <td hidden={!edit}
                className="text-sm text-gray-900 font-light text-right whitespace-nowrap">
                <button onClick={cancel}
                    className='border border-mainBlue rounded-3xl px-3 pt-1 pb-1 text-mainBlue text-center font-extrabold uppercase cursor-pointer'
                >
                    Abbrechen
                </button>
            </td>
            <td hidden={edit || admin!=='1'}
                className="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                <button onClick={()=>setEditStates(userID)}
                    className='border border-mainBlue rounded-3xl px-3 pt-1 pb-1 text-mainBlue font-extrabold text-center uppercase cursor-pointer'
                >
                    Bearbeiten
                </button>
            </td>
            <td hidden={!edit}
                className="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                <button onClick={save}
                        disabled={loadingName}
                        className={`border border-mainBlue rounded-3xl px-3 py-1 bg-mainBlue ${loadingName && 'bg-grey'} text-white font-extrabold uppercase cursor-pointer`}
                >
                    {loading?'Das Sparen...':'Speichern'}
                </button>
            </td>
        </tr>

        </tbody>
    )
}

export default UserManagementCard