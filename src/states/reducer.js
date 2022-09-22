export const initialState = {
    user: {},
    newCreation:{},
    companyInfoModal:false,
    currentMilestone:null,
    userValidated:false,
    page:1,
    pageBestand:1,
    noteSent:1,
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
            case "SET_USER_VALIDATED":
            return {
                ...state,
                userValidated: action.item
            }
            case "SET_PAGE":
            return {
                ...state,
                page: action.item
            }
            case "SET_PAGE_BESTAND":
            return {
                ...state,
                pageBestand: action.item
            }
            case "SET_NOTE_SENT":
            return {
                ...state,
                noteSent: action.item
            }
        default:
            return state;
    }
};

export default reducer;
