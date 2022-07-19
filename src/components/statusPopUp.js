import React from "react"
import {useStateValue} from "../states/StateProvider"
import {GrClose} from "react-icons/gr";
import {Link} from "react-router-dom";

const StatusPopUp = () => {
    const [{statusModal}, dispatch] = useStateValue()

    return (
        <div className='p-3 rounded-lg'>
            <div className='lg:flex justify-between mt-10 sm:block'>
                <h2 className='text-lg lg:text-left font-extrabold'>Dispatch Title Here</h2>
                <GrClose onClick={()=> dispatch({type: "SET_STATUS_MODAL", item: !statusModal})} size='20px'/>
            </div>
        </div>
    )
}

export default StatusPopUp