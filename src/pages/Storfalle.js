import React, {useState, useEffect} from "react";

const Storfalle = () => {
    try {
        let user = localStorage.user
    } catch (e) {
        window.location.replace('/anmeldung')
    }

    return (
        <div className='dashboardContainer'>
            <h2 className='text-2xl lg:text-left'>Störfälle</h2>
        </div>
    )
}

export default Storfalle