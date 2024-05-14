import React, {useEffect, useState} from "react";
import Modal from "../../hooks/modal";
import useModal from "../../hooks/useModal";
import {useStateValue} from "../../states/StateProvider";
import CompanyInfoPopUp from "../../components/modal/companyInfoPopUp";
import CompanyData from "./partial/companyData";
import Api from "../../Api/api";
import {useParams} from "react-router";
import {toast} from "react-toastify";
import {AES, enc} from "crypto-js";
import CompanyInfoPopUpDGG from "../../components/modal/companyInfoPopUpDGG";
import {ClipLoader} from "react-spinners";
import {formatDate} from "../../helper/formatDate";
import UpdateUpselling from "../../components/modal/updateUpselling";

const Reporting = () => {
    const [{
        companyInfoModal,
        upsellingModal,
        secretKey,
        upsellingSaved
    }, dispatch] = useStateValue();
    const {toggleCompanyInfoModal, toggleUpsellingModal} = useModal();
    const [stepsLoading, setStepsLoading] = useState(true)
    const [info, setInfo] = useState(null)
    const [edit, setEdit] = useState(false)
    const [editInfo, setEditInfo] = useState('')
    const [editInfoFull, setEditInfoFull] = useState('')
    const [data, setData] = useState([])
    const [options, setOptions] = useState([])
    const [infoLoading, setInfoLoading] = useState(false)
    const [companyName, setCompanyName] = useState('')
    const param = useParams()
    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))

    useEffect(() => {
        setStepsLoading(true)
        setInfoLoading(true)
        Api().get(`/customerDetails/${param.portal}/${param.id}`).then(res => {

            setInfo(res.data[0])
        }).catch(e => {
            toast.error('Firmendetails konnten nicht geladen werden!')
        })

        setInfoLoading(false)

        Api().get(`sp_getUpsellingOptions/${'dgg'}`)
            .then(res => {
                setOptions(res.data)
            })

    }, []);

    useEffect(() => {
        setStepsLoading(true)
        setInfoLoading(true)
        Api().get(`/sp_getDataCustUpselling/${param.portal}/${param.id}`).then(res => {
            setCompanyName(res.data.companyName)
            const sortedOptions = res.data.data.sort((a, b) => {
                return a.FP_ID - b.FP_ID;
            });
            setData(sortedOptions[0])
            setStepsLoading(false)
        }).catch(e => {
            toast.error('Firmendetails konnten nicht geladen werden!')
            setStepsLoading(false)
        })
        setInfoLoading(false)

    }, [upsellingSaved]);

    function setEditStates(u) {
        setEditInfo(u[1].split(',')[0])
        setEditInfoFull(u)
        setEdit(true)
        toggleUpsellingModal()
    }

    return (
        <div className='dashboardContainer'>
            <CompanyData info={info}
                         company={companyName}
                         companyID={param.id}
                         loading={infoLoading}
                         toggle={toggleCompanyInfoModal}
            />
            {
                stepsLoading &&
                <tr className='centerItemsAbsolute'>
                    <td><ClipLoader size={50} color={'#b4b4b4'}/></td>
                </tr>
            }
            {
                !stepsLoading &&
                <div className='my-3 rounded-lg sm:block w-6/12 bg-white'>
                    <div className="p-3 text-left font-bold">Upselling Bousteine</div>
                    <table className='text-left bg-white'>
                        <thead
                            className="whitespace-nowrap bg-white sticky top-0">
                        <tr>
                            <th scope="col" className="text-sm text-grey pl-1.5 tooltip">

                            </th>
                            <th scope="col" className="text-sm text-grey pl-1.5 tooltip">

                            </th>
                            <th scope="col" className="text-sm text-grey pl-1.5 tooltip">

                            </th>
                        </tr>
                        </thead>
                        <tbody className='gap-4'>
                        {
                            Object.entries(data)?.slice(1)?.map((u) => (
                                <tr key={u[0]} className="text-sm">
                                    <td>{u[0]}</td>
                                    <td className='flex gap-4 border border-offWhite p-2 mt-2'>
                                        {/*<FaUserInjured size='20px' color={'#171c3d'}/>*/}
                                        {
                                            u[1].split(',')[0] !== 'Keine Information' &&
                                            <img
                                                src={`${window.location.origin}/icons/${u[1].split(',')[0].replace(/\s/g, "")}.png`}/>

                                        }
                                        <div className='flex justify-between w-60'>
                                            <span>{u[1].split(',')[0]}</span>
                                            <span>{formatDate(u[1].split(',')[1]?.split(':')[1])}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <button className='rounded-lg bg-mainBlue py-2 px-4 text-offWhite text-center'
                                                onClick={() => setEditStates(u)}
                                        >
                                            bearbeiten
                                        </button>
                                    </td>
                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            }

            <Modal toggle={toggleUpsellingModal}
                   visible={upsellingModal}
                   small
                   component={<UpdateUpselling FPID={param.id} options={options} dataFull={editInfoFull} data={editInfo}
                                               toggle={toggleUpsellingModal}/>}
            />

            <Modal toggle={toggleCompanyInfoModal}
                   visible={companyInfoModal}
                   component={param.portal === 'dgg' ?
                       <CompanyInfoPopUpDGG portal={param.portal} Info={info} company={param.id}/>
                       :
                       <CompanyInfoPopUp portal={param.portal} Info={info} company={param.id}/>
                   }
            />
        </div>
    )
}

export default Reporting