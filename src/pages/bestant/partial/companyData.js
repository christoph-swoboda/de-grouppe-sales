import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import CollapseExpand from "../../../components/collapseExpandSection";
import {useStateValue} from "../../../states/StateProvider";
import ButtonMailto from "../../../helper/mailToButton";
import {SkewLoader} from "react-spinners";

const CompanyData = ({toggle, company, info}) => {

    const [{collapse1}] = useStateValue()
    const [email, setEmail] = useState('')
    const line1 = info?.Zeile1.replaceAll(/Tel.|\|+|FKB:/gi, match => `<span style="color: #a1a1a1">${match} </span>`);
    const line2 = info?.Zeile2.replaceAll(/BANK:|\|+|FKB-Bank:|Regio:/gi, match => `<span style="color: #a1a1a1">${match} </span>`);
    let line3 = info?.Zeile3.replaceAll(/BANK:|\|+|FKB-Bank:|Regio:/gi, match => `<span style="color: #a1a1a1">${match} </span>`);
    const onlyMail = line2?.replaceAll(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '');
    const withoutMail = onlyMail?.replaceAll(/Anspr.:|\|+| Mob.:| Email:| Tel.:/gi, match => `<span style="color: #a1a1a1">${match} </span>`);
    const Email = email?.replaceAll(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, match => `<span style="color: #3A46A9; text-decoration: underline">${match} </span>`);
    const [{}, dispatch] = useStateValue()

    useEffect(() => {
        if (info?.Zeile2) {
            let mail = extractEmails(info?.Zeile2)
            if (mail) {
                setEmail(mail[0])
            } else {
                setEmail('N/A')
            }
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
                {
                    !info && <div className='h-16'><SkewLoader size={10} color={'#6e6e6e'}/></div>
                }
                <div dangerouslySetInnerHTML={{__html: line1}}/>
                <div dangerouslySetInnerHTML={{__html: line3}}/>
                <span dangerouslySetInnerHTML={{__html: withoutMail}}/>
                <span className='cursor-pointer' onClick={() => dispatch({type: 'SET_SENDMAIL', item: true})}
                      dangerouslySetInnerHTML={{__html: Email}}/>
                <div className='hideDiv'>
                    <ButtonMailto label={`Email: ${email}`} mailto={`mailto:${email}`}/>
                </div>
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
