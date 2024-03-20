import React, {useState} from "react";
import BestantStatus from "../../../components/bestantStatus";
import Api from "../../../Api/api";
import {toast} from "react-toastify";
import {useStateValue} from "../../../states/StateProvider";
import CollapseExpand from "../../../components/collapseExpandSection";
import {BeatLoader, ClipLoader} from "react-spinners";
import {Link} from "react-router-dom";
import Reminders from "./reminders";
import {AES, enc} from "crypto-js";

const Status = ({notes, company, loadingNotes, count, role, companyID, portal}) => {
    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(false)
    const [note, setNote] = useState('')
    const [{secretKey, noteSent, noteRows}, dispatch] = useStateValue();
    const decryptedBytes = localStorage.getItem('user')?AES.decrypt(localStorage.getItem('user'), secretKey):false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const userID = user.ID
    const [{collapse2}] = useStateValue();

    function save() {
        setLoading(true)
        let data = new FormData()
        data.append('note', note)
        data.append('userID', userID)
        data.append('firma', companyID)
        data.append('portal', portal)

        Api().post('/sendNote', data).then(res => {
            setNote('')
            setLoading(false)
            setToggle(!toggle)
            dispatch({type: "SET_NOTE_SENT", item: !noteSent})
            toast.success('Notiz erfolgreich gesendet')
        }).catch(e => {
            toast.error('etwas ist schief gelaufen!!')
            setLoading(false)
            setToggle(!toggle)
        })
    }

    String.prototype.allReplace = function (obj) {
        let retStr = this;
        for (const x in obj) {
            retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
        }
        return retStr;
    };

    return (
        <>
            <Reminders id={companyID} userID={userID} role={role} portal={portal}/>
            <div className='flex justify-between bg-white mt-5'>
                <div className='text-left sm:mt-5 lg:mt-0'>
                    <button
                        className='px-3 py-2 mx-2 mb-2 hover:bg-lightBlue rounded-3xl bg-mainBlue text-white text-sm'
                        onClick={() => setToggle(!toggle)}
                        hidden={(role === 'ManDGG' ||role === 'ManRUV' || role === 'Controller')}
                    >
                        {!toggle ? 'Neue Bemerkung' : 'Abbrechen'}
                    </button>
                    <textarea placeholder='Neue Notiz Bemerkung' hidden={!toggle} rows='3'
                              className='border border-whiteDark w-full rounded-lg p-3'
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                    />
                    <button
                        className={`${!note || !note.replace(/\s/g, '').length || (role === 'ManRUV' || role === 'ManDGG') ? 'bg-whiteDark cursor-no-drop' : 'bg-mainBlue text-white hover:bg-complete hover:text-text'} px-3 py-2 m-2 rounded-3xl text-sm`}
                        onClick={save}
                        hidden={!toggle}
                        disabled={!note || !note.replace(/\s/g, '').length || (role === 'ManRUV' || role === 'ManDGG')}
                    >
                        {!loading ? 'Senden' : 'Senden...'}
                    </button>
                </div>

                <div onClick={()=>dispatch({type: "SET_NOTEROWS", item: 10})}>
                {
                    count > 8 && <CollapseExpand show={collapse2} id={2}/>
                }
                </div>
            </div>
            <div>
                {loadingNotes && <div className='centerItemsRelative'><ClipLoader color={'#757575'}/></div>}

                {
                    notes?.map((n, index) => (
                        <BestantStatus
                            key={index}
                            note={n.NOTES0}
                            by={n.CREATEDBY}
                            at={n.DATECREATE}
                        />
                    ))
                }
                {(loadingNotes && noteRows === 8) && <BeatLoader size={10}/>}
            </div>
            {
                (count > 8 && !loadingNotes && noteRows === 8) &&
                <Link to={`/alle-notizen/${portal}/${companyID}`} target={'_blank'}>
                    <button className='bg-mainBlue text-white rounded-2xl px-3 py-2 mt-2 text-sm'> Alles sehen</button>
                </Link>
            }
        </>
    )
}

export default Status