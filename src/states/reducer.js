export const initialState = {
    user: {},
    newCreation:{},
    statusModal:false,
};
const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.item
            }
            case "SET_NEW_CREATION":
            return {
                ...state,
                newCreation: action.item
            }
            case "SET_STATUS_MODAL":
            return {
                ...state,
                statusModal: action.item
            }
        default:
            return state;
    }
};

export default reducer;
