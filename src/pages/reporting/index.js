import React, {useEffect, useState} from "react";
import Modal from "../../hooks/modal";
import useModal from "../../hooks/useModal";
import {useStateValue} from "../../states/StateProvider";
import CompanyInfoPopUp from "../../components/modal/companyInfoPopUp";
import CompanyData from "./partial/companyData";
import Status from "./partial/status";
import Api from "../../Api/api";
import MilestoneTabs from "../../card/milestoneTabs";
import {ClipLoader} from "react-spinners";
import SubSteps from "./partial/subSteps";
import {useParams} from "react-router";
import {toast} from "react-toastify";
import {AES, enc} from "crypto-js";
import {useLocation} from "react-router-dom";
import CompanyInfoPopUpDGG from "../../components/modal/companyInfoPopUpDGG";

const Reporting = () => {
    const [{
        companyInfoModal,
        currentMilestone,
        noteSent,
        noteRows,
        remindersSaved,
        subStepSaved,
        secretKey
    }, dispatch] = useStateValue();
    const {toggleCompanyInfoModal} = useModal();
    const [loading, setLoading] = useState(true)
    const [loadingNotes, setLoadingNotes] = useState(false)
    const [stepsLoading, setStepsLoading] = useState(true)
    const [info, setInfo] = useState(null)
    const [infoLoading, setInfoLoading] = useState(false)
    const [notes, setNotes] = useState([])
    const [subSteps, setSubSteps] = useState([])
    const [filtered, setFiltered] = useState([])
    const [companyName, setCompanyName] = useState('')
    const [grid, setGrid] = useState([])
    const [milestoneTabs, setMilestoneTabs] = useState([])
    const [lastIndex, setLastIndex] = useState(null)
    const [lastDoneIndex, setLastDoneIndex] = useState(0)
    const [notesCount, setNotesCount] = useState(20)
    const [subString, setSubString] = useState(2)
    const [currentSubStep, setCurrentSubStep] = useState([])
    const param = useParams()
    const [options, setOptions] = useState([])
    const decryptedBytes = localStorage.getItem('user') ? AES.decrypt(localStorage.getItem('user'), secretKey) : false;
    const user = JSON.parse(decryptedBytes.toString(enc.Utf8))
    const role = user.role

    useEffect(() => {
        setSubSteps([])
        setOptions([])
    }, [currentMilestone]);

    useEffect(() => {
        // let index = (Object.keys(milestoneTabs).length) - 1
        // let index = (Object.keys(milestoneTabs).length)
        setLastIndex(99)
    }, [milestoneTabs]);

    useEffect(() => {
        Api().get(`/milestones/${param.portal}/${param.id}`).then(res => {
            setMilestoneTabs(res.data.tabs)
            setLastDoneIndex(res.data.done)
            setCompanyName(res.data.companyName)
            if (Number(res.data.done) !== (Object.keys(res.data.tabs).length) - 1) {
                dispatch({type: "SET_CURRENTMILESTONE", item: Number(res.data.done) + 1})
            } else {
                dispatch({type: "SET_CURRENTMILESTONE", item: Number(res.data.done)})
            }
            setLoading(false)
        }).catch(e => {
            setLoading(false)
            toast.error('Meilensteinschritte konnten nicht geladen werden!')
        })
    }, [dispatch, param.id, subStepSaved]);

    useEffect(() => {
        setStepsLoading(true)
        setInfoLoading(true)
        Api().get(`/customerDetails/${param.portal}/${param.id}`).then(res => {
            setInfo(res.data[0])
        }).catch(e => {
            toast.error('Firmendetails konnten nicht geladen werden!')
        })
        setInfoLoading(false)
    }, []);

    useEffect(() => {
        setStepsLoading(true)
        if (lastDoneIndex >= 0 && currentMilestone) {
            Api().get(`/sub-steps/${param.portal}/${currentMilestone}/${param.id}`).then(res => {
                setSubSteps(res.data.subSteps)
                let filter = res.data.subSteps.filter(d => d.fieldType === 'option')
                setFiltered(filter)
                if (filter.length === 0) {
                    setStepsLoading(false)
                }

                const unsaved = localStorage.data ? JSON.parse(localStorage.data) : []
                if (unsaved?.length > 0) {
                    res.data.grid.map(r => {
                        unsaved?.map(u => {
                            if (currentMilestone === u.milestone && r.stepID === u.id && Number(param.id) === Number(u.firma) && user.ID === u.user) {
                                const formatted = formatDate(u.value);
                                if (u.type === 'date' && u.value !== null) {
                                    r.fieldValue = formatted
                                } else {
                                    if (u.value !== null) {
                                        r.fieldValue = u.value
                                    }
                                }
                            }
                        })
                    })
                }
                setGrid(res.data.grid)
                // setNextStep(res.data.next)
            }).catch(e => {
                setStepsLoading(false)
                toast.error('Unterschritte konnten nicht geladen werden!')
            })
        }
    }, [lastDoneIndex, currentMilestone, param.id, subStepSaved]);

    useEffect(() => {
        if (filtered.length > 0) {
            let data = new FormData()
            data.append('portal', param.portal)
            data.append('milestoneID', currentMilestone)
            data.append('subSteps', JSON.stringify(filtered))
            Api().post('/options', data).then(res => {
                setOptions(res.data)
                setStepsLoading(false)
            }).catch(e => {
                toast.error('Einige gespeicherte Werte konnten nicht geladen werden!')
                setStepsLoading(false)
            })
        }
    }, [currentMilestone, filtered]);

    useEffect(() => {
        setLoadingNotes(true)
        Api().get(`/getNotes/${param.portal}/${param.id}/${noteRows}`).then(res => {
            setNotes(res.data)
            setNotesCount(res.data[0]?.total)
            setLoadingNotes(false)
        }).catch(e => {
            setLoadingNotes(false)
            toast.error('Notizen konnten nicht geladen werden!')
        })
    }, [noteRows, noteSent, remindersSaved]);

    useEffect(() => {
        let arr = []
        if (filtered?.length > 0) {
            filtered.map(async (f, i) => {
                arr.push(f.substepID)
                setCurrentSubStep(arr)
            })
        }
    }, [currentMilestone, filtered]);

    useEffect(() => {
        if (Number(currentMilestone) === lastIndex) {
            setSubString(0)
        } else {
            setSubString(2)
        }
    }, [currentMilestone, lastIndex, subString]);

    const formatDate = (input) => {
        const dt = new Date(input);
        if (!isNaN(dt)) {
            // Format the date as "yyyy-MM-dd"
            const year = dt.getFullYear();
            const month = String(dt.getMonth() + 1).padStart(2, '0');
            const day = String(dt.getDate()).padStart(2, '0');
            const formatted = `${year}-${month}-${day}`;
            return formatted;
        } else {
            return false;
        }
    };

    return (
        <div className='dashboardContainer'>
            <CompanyData info={info}
                         company={companyName}
                         companyID={param.id}
                         loading={infoLoading}
                         toggle={toggleCompanyInfoModal}
            />

            <div className='lg:flex justify-between my-3 rounded-lg sm:block'>

            </div>

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