import React, {useState} from "react";
import Api from "../../../Api/api";
import {toast} from "react-toastify";
import {useStateValue} from "../../../states/StateProvider";

const AdminEditFooterTable = ({id, portal, string, index}) => {

    const [loading, setLoading] = useState(false)
    const [stepNameEdit, setFooterStringEdit] = useState(false)
    const [footerString, setFooterString] = useState(string)
    const [{footerUpdated}, dispatch] = useStateValue();

    function save() {
        setLoading(true)
        let data = new FormData
        data.append('id', id)
        data.append('string', footerString)
        data.append('portal', portal)

        Api().post(`/sp_setFooterString`, data).then(res => {
                toast.success('Update erfolgreich')
                setFooterStringEdit(false)
                setLoading(false)
                dispatch({type: "SET_FOOTER_UPDATED", item: !footerUpdated})
            }
        ).catch(e => {
            toast.error('Update konnte nicht durchgeführt werden!')
            setLoading(false)
        })
    }

    return (
        <tbody>
        <tr className={index % 2 === 1 ? 'bg-white' : 'bg-offWhite'}>
            <td style={{textTransform: 'none',color:footerString?'#1c1c1c': '#a6a6a6'}} onClick={() => setFooterStringEdit(true)}>
                {
                    !stepNameEdit && footerString ? footerString : !stepNameEdit && 'Die Fußzeilenzeichenfolge ist leer'
                }

                {
                    stepNameEdit &&
                    <input value={footerString}
                           style={{width: '100%', backgroundColor: 'whitesmoke', padding: '10px 5px'}}
                           onChange={(e) => setFooterString(e.target.value)}
                           placeholder='Footer String'/>
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

export default AdminEditFooterTable