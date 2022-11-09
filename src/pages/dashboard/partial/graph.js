import React, {useState} from 'react';
import IstSection from "./istSection";
import SummerySection from "./summerySection";

export const Graph = ({header, IST}) => {

    const [project, setProject] = useState(true)
    const [user, setUser] = useState(false)

    function projectClicked() {
        setProject(true)
        setUser(false)
    }

    function userClicked() {
        setProject(false)
        setUser(true)
    }

    return (
        <div>
            <h2 className='text-xl font-bold'>{header}</h2>
            <div className='bg-offWhite my-3 text-sm font-bold border border-offWhite w-fit h-10 rounded-3xl'>
                <button
                    className={`uppercase h-10 rounded-3xl py-2 px-3 ${project ? 'bg-mainBlue text-white' : 'bg-transparent'}`}
                    onClick={projectClicked}
                >
                    firmenprojekte
                </button>
                <button
                    className={`h-10 uppercase rounded-3xl py-2 px-3 ${user ? 'bg-mainBlue text-white' : 'bg-transparent'}`}
                    onClick={userClicked}
                >
                    mitarbeiter
                </button>
            </div>
            {
                IST ?
                    <IstSection project={project}/>
                    :
                    <SummerySection project={project}/>
            }
        </div>
    )
}
