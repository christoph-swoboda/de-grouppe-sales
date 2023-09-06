import React, {useEffect, useState} from "react";
import {GrCheckbox, GrUserAdmin} from "react-icons/gr";
import {FaToggleOn, FaUser, FaUserCog, FaUserSecret} from "react-icons/fa";
import Api from "../Api/api";
import {useStateValue} from "../states/StateProvider";
import {toast} from "react-toastify";
import {ClipLoader} from "react-spinners";
import {MdSupervisorAccount} from "react-icons/md";
import UpdateRole from "../components/modal/updateRole";
import {AES, enc} from "crypto-js";

const UserManagementCard = ({email, prtnrNo, valid, userID, name, lastLogin, created, role, users}) => {
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [loadingName, setLoadingName] = useState(false)
    const [deleteClicked, setDeleteClicked] = useState(false)
    const [deleting, setDeleting] = useState(false)
    const [partnerNr, setPartnerNo] = useState(prtnrNo)
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [verified, setVerified] = useState(valid)
    const [{userValidated, secretKey}, dispatch] = useStateValue();
    const decryptedBytes = localStorage.getItem('user')?AES.decrypt(localStorage.getItem('user'), secretKey):false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const admin = user.isUserAdmin

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
            dispatch({type: "SET_USER_VALIDATED", item: !userValidated})
            toast.success('Benutzer erfolgreich validiert')
        }).catch(e => {
            setEdit(false)
            setLoading(false)
            toast.error('Etwas ist schief gelaufen!')
        })
    }

    function cancel() {
        setVerified(valid)
        setEdit(false)
    }

    function removeUser(id) {
        setDeleting(true)
        Api().get(`/deleteUser/${id}`).then(res => {
            setEdit(false)
            setDeleting(false)
            toast.success('Benutzer erfolgreich gelöscht')
            dispatch({type: "SET_USER_VALIDATED", item: !userValidated})
        }).catch(e => {
            toast.error('Etwas ist schief gelaufen!')
        })
    }

    function setEditStates(id) {
        setEdit(true)
        let data = new FormData()
        data.append('userID', Number(id))
        setLoadingName(true)
        Api().post('/getName', data).then(res => {
            setFirstName(res.data[0]?.firstname)
            setLastName(res.data[0]?.lastname)
            setLoadingName(false)
        })
    }

    return (
        <>
            <tbody>
            <tr className={`${(deleteClicked) && 'overlay'}`}/>
            <tr
                className={`${(!edit || !deleteClicked) && 'hideDiv'} shadow shadow-xl md:w-96 w-11/12 shadow-text text-lg px-6 py-6  flex flex-col rounded-lg z-10 absolute bg-offWhite centerItemsAbsolute`}>
                <td>Wollen Sie den Benutzer ({firstName + ' ' + lastName}) wirklich löschen?</td>
                <td className={`${deleting && 'hideDiv'} flex justify-start px-24 pt-5 text-sm text-md font-bold`}>
                    <button onClick={() => removeUser(userID)}
                            className='bg-green mr-3 text-white px-5 hover:bg-white hover:text-green py-2 rounded-xl'>Ja
                    </button>
                    <button onClick={() => setDeleteClicked(false)}
                            className='bg-cancel hover:bg-white hover:text-cancel text-white px-5 py-2 rounded-xl'>Nein
                    </button>
                </td>
                <td className='mx-auto'>
                    {deleting && <ClipLoader size={10} color='#3A46A9'/>}
                </td>
            </tr>
            <tr className={`${edit && 'bg-yellowLight'} border-y border-silver border-x-0`}>
                <td hidden={edit} className={`px-6 py-2 whitespace-nowrap text-sm text-gray-900`}>
                    <span className='flex justify-start'>
                             {
                                 role === 'Internal' ?
                                     <GrUserAdmin size={'20px'} color={'#565c8c'}/>
                                     : role === 'Supervisor' ?
                                         <FaUser size={'20px'} color={'#3A46A9'}/>
                                         : role === 'External' ?
                                             <MdSupervisorAccount size={'20px'} color={'#565c8c'}/>
                                             : role && <FaUserSecret size={'20px'} color={'#565c8c'}/>
                             }
                        <span className='ml-2'>{name ? name : 'N/A'}</span>
                    </span>
                </td>
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
                <td className="text-sm text-gray-900 normal-case font-light px-6 py-1 whitespace-nowrap">
                    {email}
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
                            verified === '1' ?
                                <FaToggleOn color={'#3A46A9'} style={{cursor: edit ? 'pointer' : 'default'}}
                                            size='30px'/>
                                : verified === '0' &&
                                <GrCheckbox style={{cursor: edit ? 'pointer' : 'default', height: '30px'}}/>
                        }
                    </button>
                </td>
                <td hidden={edit} className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">{created}</td>
                {/*<td hidden={!edit} className="px-6 py-2 whitespace-nowrap text-sm text-gray-900"/>*/}
                <td hidden={edit} className="px-6 py-2 whitespace-nowrap text-sm text-gray-900">{lastLogin}</td>
                {/*<td hidden={!edit} className="px-6 py-2 whitespace-nowrap text-sm text-gray-900"></td>*/}
                <td hidden={!edit} className="text-sm text-gray-900 font-light text-right whitespace-nowrap">
                    <UpdateRole userID={userID} role={role}/>
                </td>
                <td hidden={!edit}
                    className="text-sm text-gray-900 font-light text-right whitespace-nowrap">
                    <button onClick={() => setDeleteClicked(true)}
                            className='border mr-4 border-cancel bg-cancel rounded-3xl px-3 pt-1 pb-1 text-white text-center font-extrabold uppercase cursor-pointer'
                    >
                        LÖSCHEN
                    </button>
                    <button onClick={cancel}
                            className='border border-mainBlue rounded-3xl px-3 pt-1 pb-1 text-mainBlue text-center font-extrabold uppercase cursor-pointer'
                    >
                        Abbrechen
                    </button>
                </td>
                    <td hidden={edit || admin !== '1' || user.role === 'Controller'}
                        className="text-sm text-gray-900 font-light px-6 py-1 whitespace-nowrap">
                        <button onClick={() => setEditStates(userID)}
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
                        {loading ? 'Das Sparen...' : 'Speichern'}
                    </button>
                </td>
            </tr>
            </tbody>
        </>
    )
}

export default UserManagementCard