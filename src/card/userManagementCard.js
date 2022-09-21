import React, {useState, useEffect} from "react";
import {GrCheckbox} from "react-icons/gr";
import {FaToggleOn} from "react-icons/fa";
import Api from "../Api/api";
import {useStateValue} from "../states/StateProvider";

const UserManagementCard = ({email, prtnrNo, valid, userID}) => {
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [partnerNr, setPartnerNo] = useState(prtnrNo)
    const [verified, setVerified] = useState(valid)
    const [{userValidated}, dispatch] = useStateValue();

    function save() {
        setLoading(true)
        let data = new FormData()
        data.append('userID', Number(userID))
        data.append('partnerNo', partnerNr)
        Api().post('/validateNewUser', data).then(res => {
            setPartnerNo(res.data[0]?.partnernr)
            setLoading(false)
            setEdit(false)
            dispatch({type: "SET_USER_VALIDATED", item:!userValidated})
        }).catch(e=>{
            setEdit(false)
            setLoading(false)
        })
    }

    function cancel(){
        dispatch({type: "SET_USER_VALIDATED", item: !userValidated})
        setEdit(false)
    }

    return (
        <tbody>
        <tr className=" border-y border-silver border-x-0">
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{userID}</td>
            <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {email}
            </td>
            <td hidden={edit}
                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {prtnrNo}
            </td>
            <td>
                <input hidden={!edit}
                       className="text-sm text-gray-900 font-light px-3 mt-5 py-2 whitespace-nowrap"
                       type='text'
                       value={partnerNr}
                       onChange={(e) => setPartnerNo(e.target.value)}
                />
            </td>

            <td>
                <button disabled={!edit}
                        onClick={() => setVerified('1')}
                        className="text-sm text-gray-900 float-left font-light px-6 py-4 whitespace-nowrap">
                    {
                        verified==='1' ?
                            <FaToggleOn color={'#3A46A9'} style={{cursor: edit ? 'pointer' : 'default'}} size='30px'/>
                            : verified==='0' &&
                            <GrCheckbox style={{cursor: edit ? 'pointer' : 'default', height:'30px'}}/>
                    }
                </button>
            </td>

            <td hidden={!edit}
                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <h2 onClick={cancel}
                    className='border border-mainBlue rounded-3xl pl-3 pr-3 pt-1 pb-1 text-mainBlue font-extrabold uppercase cursor-pointer'
                >
                    Cancel
                </h2>
            </td>
            <td hidden={edit}
                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <h2 onClick={() => setEdit(true)}
                    className='border border-mainBlue rounded-3xl pl-3 pr-3 pt-1 pb-1 text-mainBlue font-extrabold uppercase cursor-pointer'
                >
                    Edit
                </h2>
            </td>
            <td hidden={!edit}
                className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                <button onClick={save}
                        className='border border-mainBlue rounded-3xl pl-3 pr-3 pt-1 pb-1 bg-mainBlue text-white font-extrabold uppercase cursor-pointer'
                >
                    {loading?'Saving...':'Save'}
                </button>
            </td>
        </tr>

        </tbody>
    )
}

export default UserManagementCard