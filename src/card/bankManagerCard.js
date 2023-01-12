import React, {useState, useEffect} from "react";
import Api from "../Api/api";

const BankManagerCard = ({email, prtnrNo, valid, userID, name}) => {
    const [edit, setEdit] = useState(false)
    const [loading, setLoading] = useState(false)
    const [partnerNr, setPartnerNo] = useState(prtnrNo)

    function save() {
        setLoading(true)
        let data = new FormData()
        data.append('userID', Number(userID))
    }

    return (
            <tr>
                <td></td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    {prtnrNo}
                </td>
                {/*<td>*/}
                {/*    <input hidden={!edit}*/}
                {/*           className="text-sm text-gray-900 font-light px-3 mt-5 py-2 whitespace-nowrap"*/}
                {/*           type='text'*/}
                {/*           value={partnerNr}*/}
                {/*           onChange={(e) => setPartnerNo(e.target.value)}*/}
                {/*    />*/}
                {/*</td>*/}
                <td>{name}</td>
                <td></td>
                <td hidden={!edit}
                    className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                    <h2 onClick={()=>setEdit(false)}
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
    )
}

export default BankManagerCard