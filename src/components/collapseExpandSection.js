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
            if(!show){
                dispatch({type: "SET_NOTEROWS", item: 10})
            }
            else{
                dispatch({type: "SET_NOTEROWS", item: 3})
            }
        }
    }

    return (
        <div className='px-5 pb-5 cursor-pointer md:mt-5 xl:mt-0'
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
                        <span className='tooltiptextInstant'>Einklappen</span>
                    </div>
            }
        </div>
    )
}

export default CollapseExpand