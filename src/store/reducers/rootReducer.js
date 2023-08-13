import actionTypes from "../actions/actionTypes";

const initState = {
    isLogin: false,
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_IS_LOGIN:
            return {
                ...state,
                isLogin: action.flag
            }
        default:
            return state;
    }
}

export default rootReducer;