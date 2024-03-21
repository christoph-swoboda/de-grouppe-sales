import React, {useState} from "react";
import Api from "../../../Api/api";
import {toast} from "react-toastify";

const AdminEditTable = ({substepID, stepName, mouseoverText, fieldType, addressesField, milestoneID}) => {

    const [loading, setLoading] = useState(false)
    const [mouseOverEdit, setMouseOverEdit] = useState(false)
    const [stepNameEdit, setStepNameEdit] = useState(false)
    const [MouseOverText, setMouseOverText] = useState(mouseoverText)
    const [StepName, setStepName] = useState(stepName)

    function save() {
        setLoading(true)
        let data = new FormData
        data.append('milestoneID', milestoneID)
        data.append('substepID', substepID)
        data.append('stepName', StepName)
        data.append('mouseOverText', MouseOverText)

        Api().post(`/putAdminMSSubstep`, data).then(res => {
                toast.success('Update erfolgreich')
                setMouseOverEdit(false)
                setStepNameEdit(false)
                setLoading(false)
            }
        ).catch(e => {
            toast.error('Update konnte nicht durchgeführt werden!')
            setLoading(false)
        })
    }

    return (
        <>
            <tbody>
            <tr>
                <td style={{textTransform: 'none'}}>{substepID}</td>
                <td style={{textTransform: 'none'}} onClick={() => setStepNameEdit(true)}>
                    {
                        !stepNameEdit && StepName
                    }
                    {
                        stepNameEdit &&
                        <textarea value={StepName}
                                  style={{width: '100%', backgroundColor: 'whitesmoke', padding: '10px 5px'}}
                                  onChange={(e) => setStepName(e.target.value)}
                                  placeholder='Step Name'/>
                    }
                </td>
                <td style={{textTransform: 'none'}} onClick={() => setMouseOverEdit(true)}>
                    {
                        !mouseOverEdit && MouseOverText
                    }
                    {
                        mouseOverEdit &&
                        <textarea value={MouseOverText}
                                  style={{width: '100%', backgroundColor: 'whitesmoke', padding: '10px 5px'}}
                                  onChange={(e) => setMouseOverText(e.target.value)}
                                  placeholder='new mouseover text'/>
                    }
                </td>
                <td style={{textTransform: 'none'}}>{fieldType}</td>
                <td style={{textTransform: 'none'}}>{addressesField}</td>
                <td onClick={save}>
                    <button className='px-3 py-1 bg-mainBlue text-white rounded rounded-md'>
                        {loading ? 'sparen...' : 'Speichern'}
                    </button>
                </td>
            </tr>
            </tbody>

        </>
    )
}

export default AdminEditTable