export const initialState = {
    user: {},
    secretKey: 'yourSecretKey',
    newCreation: {},
    companyInfoModal: false,
    upsellingModal: false,
    remindersModal: false,
    remindersSaved: false,
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
    upsellingSaved: false,
    sortUserColum: 5,
    sortUpsellingColum: 1,
    noteRows: 3,
    sortUserMethod: 'desc',
    portal: localStorage.getItem('portal'),
    dggFilter: localStorage.getItem('dggFilter') ?? true,
    hmFilter: localStorage.getItem('hmFilter') ?? true,
    page: 1,
    pageBestand: 1,
    pageWvHistory: 1,
    pageStorfalle: 1,
    noteSent: true,
    footerUpdated: false,
    sortColumn: 7,
    sortColumnStorfalle: 7,
    sortMethod: 'asc',
    sortMethodStorfalle: 'asc',
    sortMethodUpselling: 'asc',
    ICSaved: false,
    dateFilter: {id: null, value: null},
    filterID: {a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: null, i: null, j: null},
    filter: {a: null, b: null, c: null, d: null, e: null, f: null, g: null, h: 1, i: 0, j: 0},
    filterIDStorfalle: {a: null, b: null, c: null, d: null, e: null, f: null, g: null,},
    filterStorfalle: {a: null, b: null, c: null, d: null, e: null, f: null, g: null,},
    filterIDUM: {a: null, c: null},
    filterUM: {a: null, c: null},
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
        case "SET_UPSELLING_MODAL":
            return {
                ...state,
                upsellingModal: action.item
            }
        case "SET_REMINDERS_MODAL":
            return {
                ...state,
                remindersModal: action.item
            }
        case "SET_REMINDERS_SAVED":
            return {
                ...state,
                remindersSaved: action.item
            }
        case "SET_UPSELLING_SAVED":
            return {
                ...state,
                upsellingSaved: action.item
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
        case "SET_PAGE_WVHISTORY":
            return {
                ...state,
                pageWvHistory: action.item
            }
        case "SET_PAGE_STORFALLE":
            return {
                ...state,
                pageStorfalle: action.item
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
        case "SET_SORT_COLUMN_STORFALLE":
            return {
                ...state,
                sortColumnStorfalle: action.item
            }
        case "SET_SORT_STORFALLE_METHOD":
            return {
                ...state,
                sortMethodStorfalle: action.item
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
        case "SET_SORTSTORFALLEFILTER":
            return {
                ...state,
                filterStorfalle: action.item
            }
        case "SET_SORTSTORFALLEFILTERID":
            return {
                ...state,
                filterIDStorfalle: action.item
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
        case "SET_PORTAL":
            return {
                ...state,
                portal: action.item
            }
        case "SET_DGG_FILTER":
            return {
                ...state,
                dggFilter: action.item
            }
        case "SET_HM_FILTER":
            return {
                ...state,
                hmFilter: action.item
            }
        case "SET_FOOTER_UPDATED":
            return {
                ...state,
                footerUpdated: action.item
            }
        default:
            return state;
    }
};

export default reducer;
