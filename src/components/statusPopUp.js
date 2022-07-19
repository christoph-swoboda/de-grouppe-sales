import React from "react"
import {useStateValue} from "../states/StateProvider"

const StatusPopUp = () => {
    const [{statusModal}, dispatch] = useStateValue()

    return (
        <div>
            <h2 onClick={()=> dispatch({type: "SET_STATUS_MODAL", item: !statusModal})}>Close</h2>
        </div>
    )
}

export default StatusPopUp