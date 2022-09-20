import React from "react";
import {IoIosArrowUp} from "react-icons/io";
import BestantStatus from "../../../components/bestantStatus";

const Status = ({notes}) => {
    return (
        <>
            <div className='flex justify-between bg-white mt-5'>
                <h2 className='text-lg lg:text-left font-extrabold'>Status</h2>
                <p><IoIosArrowUp size='25px'/></p>
            </div>
            {
                notes.map((note, index)=>(
                    <BestantStatus
                        key={index}
                        note={note.NOTES0}
                        by={note.CREATEDBY}
                        at={note.DATECREATE}
                    />
                ))
            }
        </>
    )
}

export default Status