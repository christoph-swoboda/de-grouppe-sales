export const initialState = {
    user: {},
    secretKey: 'yourSecretKey',
    newCreation: {},
    companyInfoModal: false,
    remindersModal: false,
    addUsersModal: false,
    currentMilestone: null,
    userValidated: false,
    addUsersDone: false,
    collapse1: true,
    collapse2: false,
    calcOptions: true,
    milestone3HasDate: false,
    sendMail: false,
    subStepSaved: false,
    sortUserColum: 1,
    noteRows: 3,
    sortUserMethod: 'desc',
    page: 1,
    pageBestand: 1,
    noteSent: true,
    sortColumn: 7,
    sortMethod: 'asc',
    ICSaved: false,
    dateFilter: {id:null, value:null},
    filterID: {a: null, b: null, c: null, d: null, e: null, f: null, g: null, h:null, i:null, j:null},
    filter: {a: null, b: null, c: null, d: null, e: null, f: null, g: null, h:1, i:0, j:0},
    filterIDUM: {a: null, b: null, c: null},
    filterUM: {a: null, b: null, c: null},
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
        case "SET_REMINDERS_MODAL":
            return {
                ...state,
                remindersModal: action.item
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
        case "SET_NOTEROWS":
            return {
                ...state,
                noteRows: action.item
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
        case "SET_SORTBESTANDCOLUMN":
            return {
                ...state,
                sortColumn: action.item
            }
        case "SET_SORTBESTANDMETHOD":
            return {
                ...state,
                sortMethod: action.item
            }
        case "SET_SORTBESTANDFILTER":
            return {
                ...state,
                filter: action.item
            }
        case "SET_SORTBESTANDFILTERID":
            return {
                ...state,
                filterID: action.item
            }
            case "SET_SORTBESTANDFILTERUM":
            return {
                ...state,
                filterUM: action.item
            }
        case "SET_SORTBESTANDFILTERIDUM":
            return {
                ...state,
                filterIDUM: action.item
            }
            case "SET_DATEFILTER":
            return {
                ...state,
                dateFilter: action.item
            }
        case "SET_SENDMAIL":
            return {
                ...state,
                sendMail: action.item
            }
        case "SET_ICSAVED":
            return {
                ...state,
                ICSaved: action.item
            }
        case "SET_SUBSTEPSAVED":
            return {
                ...state,
                subStepSaved: action.item
            }
        default:
            return state;
    }
};

export default reducer;
