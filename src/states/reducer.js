export const initialState = {
    user: {},
    newCreation:{},
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
        default:
            return state;
    }
};

export default reducer;
