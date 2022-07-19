import {useStateValue} from "../states/StateProvider";

const useModal = () => {
    const [{statusModal}, dispatch] = useStateValue();

    function toggleStatusModal() {
        dispatch({type: "SET_STATUS_MODAL", item: !statusModal})
    }
    return {toggleStatusModal}
};

export default useModal;
