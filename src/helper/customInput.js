import React, {useEffect} from "react";

import {GoCalendar} from "react-icons/go";

const CustomInput = React.forwardRef((props, ref) => {
    return (
        <div onClick={props.onClick}
             className={`border border-whiteDark rounded-l p-2 cursor-pointer ${Number(props.current) < Number(props.last) + 1 ? 'completed' : 'bg-white'}`}
        >
            <label onClick={props.onClick} ref={ref}>
                {props.value || props.placeholder}
            </label>
            <div className='float-right'>
                {/*<p className='text-grey text-xs opacity-0'>Select Date</p>*/}
                <GoCalendar color={'#3A46A9'}/>
            </div>
        </div>
    );
});

export default CustomInput