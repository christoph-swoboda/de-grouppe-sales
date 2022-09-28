import React, {useState, useEffect} from "react";

const Options = ({val, next, currentMilestone, lastDoneIndex, grid, getValues, option, register}) => {

    return (
        <section className='tooltip sm:flex sm:flex-col'>
            <label className='text-sm text-grey label'>{val.stepName}</label>
            <select {...register(`${val.stepName}`)}
                    disabled={(next || Number(currentMilestone) !== Number(lastDoneIndex) + 1 || grid[Number(val.substepID) - 1]?.fieldValue !== null)}
                    className={`w-full p-3 md:w-full bg-white border border-whiteDark rounded-md subStepSelect
                                                    ${Number(currentMilestone) < Number(lastDoneIndex) + 1 ? 'completed' : Number(currentMilestone) > Number(lastDoneIndex) + 1 || next ? 'disabled' : 'bg-white'}`}
            >
                <option value={getValues(val.stepName) === 'autoFill'} hidden>
                    Wähle eine Option
                </option>
                {
                    option?.map((op, i) => (
                        op.substepID === val.substepID ?
                            <option key={i} value={op?.optionValue}>
                                {op?.optionValue}
                            </option>
                            :
                            <option key={i} hidden>

                            </option>
                    ))
                }
            </select>
            <p className='tooltiptextclose'>{val.mouseoverText}</p>
        </section>
    )
}

export default Options