import React, {useEffect, useState} from "react";
import BestantStatus from "./bestantStatus";
import Api from "../Api/api";
import {BeatLoader} from "react-spinners";
import {toast} from "react-toastify";
import {MdKeyboardBackspace} from "react-icons/md";
import {useNavigate} from "react-router-dom";
import {useParams} from "react-router";

const AllNotes = () => {

    const [notes, setNotes] = useState([])
    const [loadingNotes, setLoadingNotes] = useState(true)
    const navigate = useNavigate();
    const param = useParams()

    useEffect(() => {
        let data = new FormData()
        data.append('firma', param.company.replaceAll('_', ' '))
        Api().post('/getAllNotes', data).then(res => {
                setNotes(res.data)
                setLoadingNotes(false)
            }
        ).catch(e => {
            toast.error('Etwas ist schief gelaufen!!')
        })
    }, []);


    return (
        <div className='bg-white min-h-screen mx-2 '>
            <div className='xl:px-72 md:px-20 py-24'>
                <div className='flex justify-between px-2 mb-8'>
                    <h2 className='text-xl text-text '>Alle notizen für:
                        <span className='font-bold ml-1 text-disableBlue'>{param.company.replaceAll('_', ' ')}</span>
                    </h2>
                    {/*<div className='cursor-pointer' onClick={() => navigate(-1)}>*/}
                    {/*    <MdKeyboardBackspace size={'30px'}/>*/}
                    {/*</div>*/}
                </div>
                {
                    loadingNotes ?
                        <BeatLoader size={10}/>
                        :
                        notes?.map((n, index) => (
                            <BestantStatus
                                key={index}
                                note={n.NOTES0}
                                by={n.CREATEDBY}
                                at={n.DATECREATE}
                            />
                        ))
                }
            </div>
        </div>
    )
}

export default AllNotes