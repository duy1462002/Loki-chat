import actionTypes from "./actionTypes";

export const setIsLogin = (flag) => ({
    type: actionTypes.SET_IS_LOGIN,
    flag
})

export const setCurrentUser = (user) => ({
    type: actionTypes.SET_CURRENT_USER,
    payload: user
})

