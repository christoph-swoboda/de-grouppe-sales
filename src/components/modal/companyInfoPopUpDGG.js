import React, {useEffect, useState} from "react"
import {useStateValue} from "../../states/StateProvider"
import {GrClose} from "react-icons/gr";
import PropTypes from "prop-types";
import {IoIosArrowUp} from "react-icons/io";
import Api from "../../Api/api";
import {Link} from "react-router-dom";
import ButtonMailto from "../../helper/mailToButton";
import {BeatLoader, HashLoader, ScaleLoader} from "react-spinners";
import CompanyData from "../../pages/milestones/partial/companyData";

const CompanyInfoPopUp = ({company, Info, portal}) => {
    const [{companyInfoModal,sendMail}, dispatch] = useStateValue()
    const [stepsLoading, setStepsLoading] = useState(true)
    const [info, setInfo] = useState(null)
    const [email, setEmail] = useState('')

    const line1=info?.Zeile1?.replaceAll(/Firma:/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line2=info?.Zeile2?.replaceAll(/Anschrift:/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line3=info?.Zeile3?.replaceAll(/Kurz:/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line4=info?.Zeile4?.replaceAll(/US-Id:/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line5=info?.Zeile5?.replaceAll(/Tel. Zentrale:/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line7=info?.Zeile7
    const line8=info?.Zeile8
    const line9=info?.Zeile9?.replaceAll(/KGS: |/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line10=info?.Zeile10?.replaceAll(/ADM: |/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line11=info?.Zeile11?.replaceAll(/KVD: |/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line12=info?.Zeile12
    const line13=info?.Zeile13?.replaceAll(/Name:/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line14=info?.Zeile14?.replaceAll(/Brief-Anrede:/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line15=info?.Zeile15?.replaceAll(/Tel. Direkt:/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line16=info?.Zeile16?.replaceAll(/Mobil:/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line17=info?.Zeile17?.replaceAll(/Privat:/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line18=info?.Zeile18?.replaceAll(/Fax:/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line19=info?.Zeile19?.replaceAll(/E-Mail:/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line20=info?.Zeile20?.replaceAll(/Privat:/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const line21=info?.Zeile21?.replaceAll(/Fax:/gi, match => `<span style="color: #a1a1a1">${match} </span>`)
    const Email = email?.replaceAll(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi, match => `<span style="color: #3A46A9; text-decoration: underline">${match} </span>`);
    const Web = info?.Zeile6?.replace('Web:', '');

    useEffect(() => {
        dispatch({type:'SET_SENDMAIL', item:false})
        setStepsLoading(true)
        Api().get(`/customerDetailsAll/${portal}/${company}`).then(res => {
            setInfo(res.data[0])
            setStepsLoading(false)
        })
    }, []);


    useEffect(() => {
        if (info?.Zeile19) {
            let mail = extractEmails(info?.Zeile19)
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
        <div className='px-2 rounded-lg text-sm'>
            {
                stepsLoading ?
                    <div className='centerItemsAbsolute'>
                        <ScaleLoader/>
                    </div>

                    :
                    <div className='px-5'>
                        <GrClose className='cursor-pointer float-right -mt-10 mr-4'
                                 onClick={() => dispatch({type: "SET_COMPANYINFO_MODAL", item: !companyInfoModal})} size='24px'/>
                        <div className='mt-24'>
                            {/*<CompanyData info={Info}/>*/}
                            {/*<p style={{color:'#a1a1a1'}}>{line1}</p>*/}
                            <p style={{color:'#000000'}} className='font-bold my-2 w-fi py-1'>Firmenprojekt</p>
                            <div dangerouslySetInnerHTML={{__html: line1}}/>
                            <div dangerouslySetInnerHTML={{__html: line2}}/>
                            <div dangerouslySetInnerHTML={{__html: line3}}/>
                            <div dangerouslySetInnerHTML={{__html: line4}}/>
                            <div dangerouslySetInnerHTML={{__html: line5}}/>
                            <div className='flex justify-start'>
                                <p style={{color:'#a1a1a1'}} className='mr-1'>Web: </p>
                                <p onClick={()=>window.open(Web, '_blank')} style={{color:'#3A46A9'}}
                                   className='underline cursor-pointer'
                                >
                                    {Web}
                                </p>
                            </div>
                            {/*<p style={{color:'#a1a1a1'}} className='mt-4'>{line7}</p>*/}
                            <p style={{color:'#000000'}} className='my-2 font-bold w-fit py-1'>{line8}</p>
                            <div dangerouslySetInnerHTML={{__html: line9}}/>
                            <div dangerouslySetInnerHTML={{__html: line10}}/>
                            <div dangerouslySetInnerHTML={{__html: line11}}/>
                            <p style={{color:'#000000'}} className='my-2 font-bold w-fit py-1'>{line12}</p>
                            <div dangerouslySetInnerHTML={{__html: line13}}/>
                            <div dangerouslySetInnerHTML={{__html: line14}}/>
                            <div dangerouslySetInnerHTML={{__html: line15}}/>
                            <div dangerouslySetInnerHTML={{__html: line16}}/>
                            <div dangerouslySetInnerHTML={{__html: line17}}/>
                            <div dangerouslySetInnerHTML={{__html: line18}}/>
                            {/*<div dangerouslySetInnerHTML={{__html: line19}}/>*/}
                            {/*<div dangerouslySetInnerHTML={{__html: line20}}/>*/}
                            {/*<div dangerouslySetInnerHTML={{__html: line21}}/>*/}
                            <div className='flex justify-start'>
                                <p style={{color:'#a1a1a1'}} className='mr-1'>Email: </p>
                                <div className='cursor-pointer' onClick={()=>dispatch({type:'SET_SENDMAIL', item:true})} dangerouslySetInnerHTML={{__html: Email}}/>
                                <div className='opacity-0'>
                                    <ButtonMailto label={`Email: ${email}`} mailto={`mailto:${email}`} />
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    )
}

export default CompanyInfoPopUp

CompanyInfoPopUp.propTypes = {
    data: PropTypes.object,
}
