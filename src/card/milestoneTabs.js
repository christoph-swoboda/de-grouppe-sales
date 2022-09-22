import React, {useEffect} from "react";
import {IoIosArrowForward} from "react-icons/io";
import {useStateValue} from "../states/StateProvider";

const MilestoneTabs = ({label, done, lastIndex,lastDoneIndex, id,loading}) => {

    const [{currentMilestone}, dispatch] = useStateValue();

    function setMilestone(){
        if(!loading){
            dispatch({type: "SET_CURRENTMILESTONE", item: id})
        }
    }
    return (
        <div onClick={setMilestone}>
            <p className={`${done === '1'?'bg-complete border-lightgrey':currentMilestone.toString()===id?'border-mainBlue text-mainBlue': 'bg-pending border-lightgrey'}
                ${lastIndex.toString() === id && 'bg-cancel'} 
                m-2 text-sm border-2 pl-2 pr-1 py-1 cursor-pointer text-left`}
            >
                {label}
                <span className='float-right'><IoIosArrowForward/></span>
            </p>
        </div>
    )
}

export default MilestoneTabs