import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import CollapseExpand from "../../../components/collapseExpandSection";
import {useStateValue} from "../../../states/StateProvider";

const CompanyData = ({data, toggle, company, info}) => {

    const [{collapse1}] = useStateValue()
    const [email, setEmail] = useState('')
    const line1 = info?.Zeile1.replaceAll(/Tel.|\|+|FKB:/gi, match => `<span style="color: #a1a1a1">${match} </span>`);
    const line2 = info?.Zeile2.replaceAll(/BANK:|\|+|FKB-Bank:|Regio:/gi, match => `<span style="color: #a1a1a1">${match} </span>`);
    let line3 = info?.Zeile3.replaceAll(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '');
    const withoutMail = line3?.replaceAll(/Anspr.:|\|+| Mob.:| Email:| Tel.:/gi, match => `<span style="color: #a1a1a1">${match} </span>`);
    const Email = email?.replaceAll(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, match => `<span style="color: #3A46A9; text-decoration: underline">${match} </span>`);

    useEffect(() => {
        if (info?.Zeile3) {
            setEmail(extractEmails(info?.Zeile3)[0])
        }
    }, [info]);

    function extractEmails(text) {
        return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi);
    }

    return (
        <div className='bg-white text-left text-text'>
            <div className='flex justify-between'>
                <h2 className='lg:text-left text-xl p-5' style={{color: '#a1a1a1'}}>
                    Firmenprojekt <span className='font-extrabold text-text'>{company}</span>
                </h2>
                <CollapseExpand show={collapse1} id={1}/>
            </div>
            <div className={`${!collapse1 && 'hidden'} px-5`}>
                <div dangerouslySetInnerHTML={{__html: line1}}/>
                <div dangerouslySetInnerHTML={{__html: line2}}/>
                <span dangerouslySetInnerHTML={{__html: withoutMail}}/>
                <span dangerouslySetInnerHTML={{__html: Email}}/>
            </div>
            <button onClick={toggle} className='py-2 text-mainBlue mt-2 px-5 underline text-xs'>Firmendetails</button>
        </div>
    )
}

export default CompanyData

CompanyData.propTypes = {
    data: PropTypes.object,
    toggle: PropTypes.func
}
