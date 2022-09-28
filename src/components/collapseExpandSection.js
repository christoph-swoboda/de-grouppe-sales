import React, {useState, useEffect} from "react";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useStateValue} from "../states/StateProvider";

const CollapseExpand = ({show, id}) => {

    const [{}, dispatch] = useStateValue();

    function toggle(){
        if(id===1){
            dispatch({type: "SET_COLLAPSE1", item: !show})
        }
        else{
            dispatch({type: "SET_COLLAPSE2", item: !show})
        }
    }

    return (
        <p className='p-5 cursor-pointer'
           onClick={toggle}
        >
            {
                !show ?
                    <div className='tooltip'>
                        <IoIosArrowDown size='25px'/>
                        <span className='tooltiptextInstant'>Erweitern</span>
                    </div>
                    :
                    <div className='tooltip'>
                        <IoIosArrowUp size='25px'/>
                        <span className='tooltiptextInstant'>Zusammenbruch</span>
                    </div>
            }
        </p>
    )
}

export default CollapseExpand