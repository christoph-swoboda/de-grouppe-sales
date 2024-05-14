import {useStateValue} from "../states/StateProvider";

const useModal = () => {
    const [{companyInfoModal,addUsersModal, remindersModal, upsellingModal}, dispatch] = useStateValue();

    function toggleCompanyInfoModal() {
        dispatch({type: "SET_COMPANYINFO_MODAL", item: !companyInfoModal})
    }
    function toggleAddUsersModal() {
        dispatch({type: "SET_ADDUSERS_MODAL", item: !addUsersModal})
    }
    function toggleUpsellingModal() {
        dispatch({type: "SET_UPSELLING_MODAL", item: !upsellingModal})
    }
    function toggleRemindersModal() {
        dispatch({type: "SET_REMINDERS_MODAL", item: !remindersModal})
    }

    return {toggleCompanyInfoModal,toggleAddUsersModal, toggleRemindersModal, toggleUpsellingModal}
};

export default useModal;
