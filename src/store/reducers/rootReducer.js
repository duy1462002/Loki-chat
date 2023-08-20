import actionTypes from '../actions/actionTypes';

const initState = {
    isLogin: false,
    currentUser: {},
    combinedId: '',
};

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case actionTypes.SET_IS_LOGIN:
            return {
                ...state,
                isLogin: action.flag,
            };
        case actionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
            };
        case actionTypes.SET_COMBINED_ID:
            return {
                ...state,
                combinedId: action.payload,
            };
        default:
            return state;
    }
};

export default rootReducer;
