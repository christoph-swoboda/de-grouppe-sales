import {useStateValue} from "../states/StateProvider";

const useModal = () => {
    const [{companyInfoModal}, dispatch] = useStateValue();

    function toggleCompanyInfoModal() {
        dispatch({type: "SET_COMPANYINFO_MODAL", item: !companyInfoModal})
    }
    return {toggleCompanyInfoModal}
};

export default useModal;
