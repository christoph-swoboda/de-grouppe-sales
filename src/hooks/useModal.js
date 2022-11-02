import {useStateValue} from "../states/StateProvider";

const useModal = () => {
    const [{companyInfoModal,addUsersModal}, dispatch] = useStateValue();

    function toggleCompanyInfoModal() {
        dispatch({type: "SET_COMPANYINFO_MODAL", item: !companyInfoModal})
    }
    function toggleAddUsersModal() {
        dispatch({type: "SET_ADDUSERS_MODAL", item: !addUsersModal})
    }
    return {toggleCompanyInfoModal,toggleAddUsersModal}
};

export default useModal;
