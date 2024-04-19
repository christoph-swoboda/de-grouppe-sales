import React, {useState} from "react";
import Api from "../../../Api/api";
import {toast} from "react-toastify";

const AdminEditNotesTable = ({label, id, portal, name}) => {

    const [loading, setLoading] = useState(false)
    const [stepNameEdit, setStepNameEdit] = useState(false)
    const [stepLabelEdit, setStepLabelEdit] = useState(false)
    const [mLabel, setMLabel] = useState(label)
    const [mName, setMName] = useState(name)

    function save() {
        setLoading(true)
        let data = new FormData
        data.append('id', id)
        data.append('label', mLabel)
        data.append('name', mName)
        data.append('portal', portal)

        Api().post(`/sp_setMilestoneData`, data).then(res => {
                toast.success('Update erfolgreich')
                setStepNameEdit(false)
                setStepLabelEdit(false)
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
            <td style={{textTransform: 'none'}}>{id}</td>
            <td style={{textTransform: 'none'}} onClick={() => setStepLabelEdit(true)}>
                {
                    !stepLabelEdit && mLabel
                }
                {
                    stepLabelEdit &&
                    <input value={mLabel}
                           style={{width: '100%', backgroundColor: 'whitesmoke', padding: '10px 5px'}}
                           onChange={(e) => setMLabel(e.target.value)}
                           placeholder='Milestone Label'/>
                }
            </td>
            <td style={{textTransform: 'none'}} onClick={() => setStepNameEdit(true)}>
                {
                    !stepNameEdit && mName
                }
                {
                    stepNameEdit &&
                    <input value={mName}
                           style={{width: '100%', backgroundColor: 'whitesmoke', padding: '10px 5px'}}
                           onChange={(e) => setMName(e.target.value)}
                           placeholder='Milestone Name'/>
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