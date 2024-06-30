import React, {useEffect, useState} from "react";
import PropTypes from "prop-types";
import CollapseExpand from "../../../components/collapseExpandSection";
import {useStateValue} from "../../../states/StateProvider";
import ButtonMailto from "../../../helper/mailToButton";
import {SkewLoader} from "react-spinners";
import {Link} from "react-router-dom";

const CompanyData = ({toggle, company, info, loading}) => {

    const [{collapse1}] = useStateValue()
    const [email, setEmail] = useState('')
    const line1 = info?.Zeile1?.replaceAll(/Tel.|\|+|Ref-Kd.|\|+|DGAPI-KAM:|\|+|FKB:/gi, match => `<span style="color: #a1a1a1">${match} </span>`);
    const line2 = info?.Zeile2?.replaceAll(/BANK:|\|+|FKB-Bank:|Regio:/gi, match => `<span style="color: #a1a1a1">${match} </span>`);
    let line3 = info?.Zeile3?.replaceAll(/BANK:|\|+|FKB-Bank:|Regio:/gi, match => `<span style="color: #a1a1a1">${match} </span>`);
    // let line4 = info?.Zeile4.replaceAll(/Link B4Y-Portal|\|+|FKB-Bank:|Regio:/gi, match => `<span style="color: #a1a1a1">${match} </span>`);
    const onlyMail = line2?.replaceAll(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, '');
    const withoutMail = onlyMail?.replaceAll(/Anspr.:|\|+| Mob.:| Email:| Tel.:/gi, match => `<span style="color: #a1a1a1">${match} </span>`);
    const Email = email?.replaceAll(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, match => `<span style="color: #3A46A9; text-decoration: underline">${match} </span>`);
    const [{}, dispatch] = useStateValue()
    const Web = info?.Zeile4?.replace('Link B4Y-Portal:', '');

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
                <div className='flex justify-start'>
                    {/*<p style={{color:'#a1a1a1'}} className='mr-1'>B4Y-Portal: </p>*/}
                    <p onClick={()=>window.open(Web, '_blank')} style={{color:'#3A46A9'}}
                       className='underline cursor-pointer'
                    >
                        {Web}
                    </p>
                </div>
            </div>
            <div className='flex justify-between'>
                <button onClick={toggle} className='py-2 text-mainBlue mt-2 px-5 underline text-xs'>Firmendetails
                </button>
                <Link to={'/dokumente'}>
                <h2 className='py-2 text-mainBlue mt-2 px-5 underline text-xs'>Dokumente</h2>
                </Link>
            </div>
        </div>
    )
}

export default CompanyData

CompanyData.propTypes = {
    data: PropTypes.object,
    toggle: PropTypes.func
}
