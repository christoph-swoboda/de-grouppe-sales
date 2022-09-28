import React, {useEffect} from "react";
import {IoIosArrowForward} from "react-icons/io";
import {useStateValue} from "../states/StateProvider";

const MilestoneTabs = ({label, done, lastIndex,lastDoneIndex, id,loading}) => {

    const [{currentMilestone,calcOptions}, dispatch] = useStateValue();

    function setMilestone(){
        if(!loading){
            // setTimeout(() => {
                dispatch({type: "SET_CURRENTMILESTONE", item: id})
            // }, 1000);
        }
    }

    return (
        <div onClick={setMilestone}>
            <p className={`${done === '1'?'bg-complete border-lightgrey':currentMilestone.toString()===id?'border-mainBlue text-mainBlue': 'bg-pending border-lightgrey'}
                ${lastIndex.toString() === id && 'bg-cancel'} 
                m-2 text-sm border-2 px-2 py-1 cursor-pointer text-left`}
            >
                {label}
                <span className='float-right ml-1'><IoIosArrowForward/></span>
            </p>
        </div>
    )
}

export default MilestoneTabs