import React, {useEffect} from "react";
import {IoIosArrowForward} from "react-icons/io";
import {useStateValue} from "../states/StateProvider";

const MilestoneTabs = ({label, done, lastIndex, lastDoneIndex, id, loading}) => {

    const [{currentMilestone,milestone3HasDate}, dispatch] = useStateValue();

    function setMilestone() {
        if (!loading) {
            dispatch({type: "SET_CURRENTMILESTONE", item: id})
        }
    }
    //
    // useEffect(() => {
    //     console.log('milestone3HasDate',milestone3HasDate)
    // }, [milestone3HasDate, currentMilestone]);

    return (
        <div onClick={setMilestone} className={`${!milestone3HasDate && 'bg-pending !important'}`}>
            <p className={`${done === '1' ? 'bg-complete border-lightgrey' : currentMilestone.toString() === id ? 'border-mainBlue text-mainBlue' : 'bg-pending border-lightgrey'}
                ${lastIndex.toString() === id && 'bg-whiteDark'} 
                m-2 text-sm border-2 px-2 py-1 cursor-pointer text-left`
            }
            >
                {label}
                <span className='float-right ml-1'><IoIosArrowForward/></span>
            </p>
        </div>
    )
}

export default MilestoneTabs