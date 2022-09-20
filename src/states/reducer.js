export const initialState = {
    user: {},
    newCreation:{},
    companyInfoModal:false,
    currentMilestone:null,
};
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.item
            }
            case "SET_COMPANYINFO_MODAL":
            return {
                ...state,
                companyInfoModal: action.item
            }
            case "SET_CURRENTMILESTONE":
            return {
                ...state,
                currentMilestone: action.item
            }
        default:
            return state;
    }
};

export default reducer;
