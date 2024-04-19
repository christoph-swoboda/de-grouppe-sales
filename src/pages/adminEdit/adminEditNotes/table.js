import React, {useState} from "react";
import Api from "../../../Api/api";
import {toast} from "react-toastify";

const AdminEditNotesTable = ({title, id, portal}) => {

    const [loading, setLoading] = useState(false)
    const [stepNameEdit, setStepNameEdit] = useState(false)
    const [rmTitle, setRmTitle] = useState(title)

    function save() {
        setLoading(true)
        let data = new FormData
        data.append('id', id)
        data.append('title', rmTitle)
        data.append('portal', portal)

        Api().post(`/set_reminderOptions`, data).then(res => {
                toast.success('Update erfolgreich')
                setStepNameEdit(false)
                setLoading(false)
            }
        ).catch(e => {
            toast.error('Update konnte nicht durchgeführt werden!')
            setLoading(false)
        })
    }

    return (
        <tbody>
        <tr>
            {/*<td style={{textTransform: 'none'}}>{id}</td>*/}
            <td style={{textTransform: 'none'}} onClick={() => setStepNameEdit(true)}>
                {
                    !stepNameEdit && rmTitle
                }
                {
                    stepNameEdit &&
                    <input value={rmTitle}
                              style={{width: '100%', backgroundColor: 'whitesmoke', padding: '10px 5px'}}
                              onChange={(e) => setRmTitle(e.target.value)}
                              placeholder='Step Name'/>
                }
            </td>
            <td onClick={save}>
                <button className='px-3 py-1 bg-mainBlue text-white rounded rounded-md'>
                    {loading ? 'sparen...' : 'Speichern'}
                </button>
            </td>
        </tr>
        </tbody>
    )
}

export default AdminEditNotesTable