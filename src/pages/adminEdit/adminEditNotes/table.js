import React, {useState} from "react";
import Api from "../../../Api/api";
import {toast} from "react-toastify";

const AdminEditNotesTable = ({title, id, portal, index}) => {

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
        <tr className={index % 2 === 1 ? 'bg-white' : 'bg-offWhite'}>
            <td ></td>
            <td style={{textTransform: 'none',color:rmTitle?'#1c1c1c': '#a6a6a6'}} onClick={() => setStepNameEdit(true)}>
                {
                    !stepNameEdit && rmTitle? rmTitle :!stepNameEdit && 'Hier ist noch eine leere Option'
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
                    {loading ? 'speichere...' : 'Speichern'}
                </button>
            </td>
        </tr>
        </tbody>
    )
}

export default AdminEditNotesTable