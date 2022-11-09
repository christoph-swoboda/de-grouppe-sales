import React, {useEffect, useState} from "react";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import BestantStatus from "../../../components/bestantStatus";
import Api from "../../../Api/api";
import {toast} from "react-toastify";
import {useStateValue} from "../../../states/StateProvider";
import CollapseExpand from "../../../components/collapseExpandSection";

const Status = ({notes, company}) => {
    const [toggle, setToggle] = useState(false)
    const [loading, setLoading] = useState(false)
    const [note, setNote] = useState('')
    const user = JSON.parse(localStorage.getItem('user'))
    const userID = user.ID
    const [{noteSent}, dispatch] = useStateValue();
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

                <CollapseExpand show={collapse2} id={2}/>
            </div>
            <div className={`${!collapse2 && 'hidden'}`}>
                {
                    notes.map((note, index) => (
                        <BestantStatus
                            key={index}
                            note={note.NOTES0}
                            by={note.CREATEDBY}
                            at={note.DATECREATE}
                        />
                    ))
                }
            </div>
        </>
    )
}

export default Status