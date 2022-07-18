import React from "react";
import SectionOne from "./partial/sectionOne";
import SectionTwo from "./partial/sectionTwo";
import SectionThree from "./partial/sectionThree";

const NewCreation = () => {
    return (
        <div className='dashboardContainer'>
            <h2 className='text-left text-xl pt-5 pb-5'>New Creation</h2>
            <SectionOne/>
            <SectionTwo/>
            <SectionThree/>
        </div>
    )
}

export default NewCreation