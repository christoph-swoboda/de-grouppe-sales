import React, {useEffect, useState} from "react";

const Options = ({val, role, currentMilestone, lastDoneIndex, grid, getValues, option, register}) => {

    const [value,setValue]=useState()

    useEffect(() => {
        setValue(getValues(val.stepName))
    }, [getValues]);


    return (
        <>
            <label className='text-sm text-grey label'>{val.stepName}</label>
            <select {...register(`${val.stepName}`)}
                    disabled={role==='Supervisor'}
                    className={`w-full p-3 md:w-full bg-white border border-whiteDark rounded-md subStepSelect
                    ${Number(currentMilestone) < Number(lastDoneIndex) + 1 ? 'completed' : 'bg-white'}`}
            >
                <option hidden={value || value!=='zurücksetzen'} selected={!value || value==='zurücksetzen'} value=''>
                    {/*{getValues(val.stepName)===null?'Wähle eine Option':'Nothing Selected'}*/}
                    Bitte wählen Sie eine Option
                </option>
                <option value=''>
                    zurücksetzen
                </option>
                {
                    option?.map(o => (
                        o.map((op, i) => (
                            op.substepID === val.substepID ?
                                <option key={i} value={op?.optionValue}>
                                    {op?.optionValue}
                                </option>
                                :
                                <option key={i} hidden/>
                        ))
                    ))
                }
            </select>
            <p className={`${val.mouseoverText && 'tooltiptextclose'} `}>{val.mouseoverText}</p>
        </>
    )
}

export default Options