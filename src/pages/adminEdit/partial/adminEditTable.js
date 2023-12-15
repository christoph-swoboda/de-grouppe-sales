import React, {useState, useEffect} from "react";
import Api from "../../../Api/api";
import {toast} from "react-toastify";

const AdminEditTable = ({substepID, stepName, mouseoverText, fieldType, addressesField, milestoneID}) => {

    const [loading, setLoading] = useState(false)
    const [mouseOverEdit, setMouseOverEdit] = useState(false)
    const [stepNameEdit, setStepNameEdit] = useState(false)
    const [MouseOverText, setMouseOverText] = useState(mouseoverText)
    const [StepName, setStepName] = useState(stepName)

    function save(){
        setLoading(true)
        let data=new FormData
        data.append('milestoneID', milestoneID)
        data.append('substepID', substepID)
        data.append('stepName', StepName)
        data.append('mouseOverText', MouseOverText)

        Api().post(`/putAdminMSSubstep`, data).then(res => {
                console.log(res.data)
                setLoading(false)
            }
        ).catch(e => {
            toast.error('Etwas ist schief gelaufen!!')
            setLoading(false)
        })
    }

    return (
        <>
            <tbody>
            <tr>
                <td>{substepID}</td>
                <td onClick={() => setStepNameEdit(true)}>
                    {
                        !stepNameEdit && StepName
                    }
                    {
                        stepNameEdit &&
                        <textarea value={StepName}
                                  style={{width:'100%', backgroundColor:'whitesmoke', padding:'10px 5px'}}
                                  onChange={(e) => setStepName(e.target.value)}
                                  placeholder='Step Name'/>
                    }
                </td>
                <td onClick={() => setMouseOverEdit(true)}>
                    {
                        !mouseOverEdit && MouseOverText
                    }
                    {
                        mouseOverEdit &&
                        <textarea value={MouseOverText}
                               style={{width:'100%', backgroundColor:'whitesmoke', padding:'10px 5px'}}
                               onChange={(e) => setMouseOverText(e.target.value)}
                               placeholder='new mouseover text'/>
                    }
                </td>
                <td>{fieldType}</td>
                <td>{addressesField}</td>
                <td onClick={save}>
                    <button className='px-3 py-1 bg-mainBlue text-white rounded rounded-md'>
                        Save
                    </button>
                </td>
            </tr>
            </tbody>

        </>
    )
}

export default AdminEditTable