import React, { useRef } from "react";
import { GoCalendar } from "react-icons/go";

const CustomInput = React.forwardRef((props, ref) => {
    const inputRef = useRef();

    return (
        <div
            onClick={props.onClick}
            className={`border border-whiteDark rounded-l p-2 cursor-pointer ${Number(props.current) < Number(props.last) + 1 ? 'completed' : 'bg-white'}`}
        >
            <label onClick={props.onClick} ref={ref} className="sr-only">
                {props.placeholder}
            </label>
            <div className='flex justify-between items-center'>
                <input
                    type="text"
                    value={props.value}
                    onChange={(e) => props.onChange(e)}
                    placeholder={props.placeholder}
                    className="outline-none border-none bg-transparent p-0 w-0"
                    autoComplete="off"
                    pattern="[0-9]*"
                />
                <span className={`${props.val && 'mr-5'}`}>
                <GoCalendar color={'#3A46A9'}/>
            </span>
            </div>

        </div>
    );
});

export default CustomInput;
