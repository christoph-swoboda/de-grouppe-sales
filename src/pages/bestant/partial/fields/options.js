import React from "react";

const Options = ({val, role, currentMilestone, lastDoneIndex, grid, getValues, option, register}) => {

    return (
        <>
            <label className='text-sm text-grey label'>{val.stepName}</label>
            <select {...register(`${val.stepName}`)}
                    disabled={role==='Supervisor'}
                    className={`w-full p-3 md:w-full bg-white border border-whiteDark rounded-md subStepSelect
                    ${Number(currentMilestone) < Number(lastDoneIndex) + 1 ? 'completed' : 'bg-white'}`}
            >
                <option value={getValues(val.stepName) === 'autoFill'} hidden>
                    Wähle eine Option
                </option>
                {
                    option?.map(o => (
                        o.map((op, i) => (
                            op.substepID === val.substepID ?
                                <option key={i} value={op?.optionValue}>
                                    {op?.optionValue}
                                </option>
                                :
                                <option key={i} hidden>

                                </option>
                        ))
                    ))
                }
            </select>
            <p className='tooltiptextclose'>{val.mouseoverText}</p>
        </>
    )
}

export default Options