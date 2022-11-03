export const initialState = {
    user: {},
    newCreation:{},
    companyInfoModal:false,
    addUsersModal:false,
    currentMilestone:null,
    userValidated:false,
    addUsersDone:false,
    collapse1:true,
    collapse2:true,
    calcOptions:true,
    milestone3HasDate:false,
    sortUserColum:1,
    sortUserMethod:'desc',
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
            case "SET_ADDUSERS_MODAL":
            return {
                ...state,
                addUsersModal: action.item
            }
            case "SET_ADDUSERS_DONE":
            return {
                ...state,
                addUsersDone: action.item
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
            case "SET_COLLAPSE1":
            return {
                ...state,
                collapse1: action.item
            }
            case "SET_COLLAPSE2":
            return {
                ...state,
                collapse2: action.item
            }
            case "SET_CALCOPTIONS":
            return {
                ...state,
                calcOptions: action.item
            }
            case "SET_MILESTONE3_HAS_DATE":
            return {
                ...state,
                milestone3HasDate: action.item
            }
            case "SET_SORTUSERCOLUMN":
            return {
                ...state,
                sortUserColum: action.item
            }
            case "SET_SORTUSERMETHOD":
            return {
                ...state,
                sortUserMethod: action.item
            }
        default:
            return state;
    }
};

export default reducer;
