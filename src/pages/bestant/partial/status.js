import React, {useEffect, useState} from "react";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import BestantStatus from "../../../components/bestantStatus";
import Api from "../../../Api/api";
import {toast} from "react-toastify";
import {useStateValue} from "../../../states/StateProvider";
import CollapseExpand from "../../../components/collapseExpandSection";
import {BeatLoader} from "react-spinners";
import {Link} from "react-router-dom";

const Status = ({notes, company, loadingNotes, count}) => {
    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(false)
    const [note, setNote] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))
    const userID = user.ID
    const [{noteSent, noteRows}, dispatch] = useStateValue();
    const [{collapse2}] = useStateValue();

    function save() {
        setLoading(true)
        let data = new FormData()
        data.append('note', note)
        data.append('userID', userID)
        data.append('firma', company)

        Api().post('/sendNote', data).then(res => {
            setNote('')
            setLoading(false)
            setToggle(!toggle)
            dispatch({type: "SET_NOTE_SENT", item: noteSent + 1})
            toast.success('Notiz erfolgreich gesendet')
        }).catch(e => {
            toast.error('etwas ist schief gelaufen!!')
            setLoading(false)
            setToggle(!toggle)
        })
    }

    String.prototype.allReplace = function(obj) {
        let retStr = this;
        for (const x in obj) {
            retStr = retStr.replace(new RegExp(x, 'g'), obj[x]);
        }
        return retStr;
    };

    return (
        <>
            <div className='flex justify-between bg-white mt-5'>
                <div className='bg-white text-left md:mt-5 xl:mt-0'>
                    <button className='px-3 py-2 mx-2 mb-2 rounded-3xl bg-mainBlue text-white text-sm'
                            onClick={() => setToggle(!toggle)}
                    >
                        {!toggle ? 'Neue Bemerkung' : 'Abbrechen'}
                    </button>
                    <textarea placeholder='Neue Notiz Bemerkung' hidden={!toggle} rows='3'
                              className='border border-whiteDark w-full rounded-lg p-3'
                              value={note}
                              onChange={(e) => setNote(e.target.value)}
                    />
                    <button
                        className={`${!note || !note.replace(/\s/g, '').length ? 'bg-whiteDark cursor-no-drop' : 'bg-mainBlue text-white'} px-3 py-2 m-2 rounded-3xl text-sm`}
                        onClick={save}
                        hidden={!toggle}
                        disabled={!note || !note.replace(/\s/g, '').length}
                    >
                        {!loading ? 'Senden' : 'Senden...'}
                    </button>
                </div>

                {/*<div onClick={()=>dispatch({type: "SET_NOTEROWS", item: 10})}>*/}
                <CollapseExpand show={collapse2} id={2}/>
                {/*</div>*/}
            </div>
            <div>
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
                {(loadingNotes && noteRows === 10) && <BeatLoader size={10}/>}
            </div>
            {
                (count > 10 && !loadingNotes && noteRows === 10) &&
                <Link to={`/alle-notizen/${company.allReplace({'/': '%2F', ' ': '_'})}`} target={'_blank'}>
                    <button className='bg-mainBlue text-white rounded-2xl px-3 py-2 mt-2 text-sm'> Alles sehen</button>
                </Link>
            }
        </>
    )
}

export default Status