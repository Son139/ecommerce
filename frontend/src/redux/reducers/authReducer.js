import { REGISTER_FAIL, REGISTER_SUCCESS } from "../constant";

const initState = {
    isLoggedIn: false,
    token: null,
};

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                token: action.data,
                msg: "",
            };
        case REGISTER_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                token: null,
                msg: action.data,
            };
        default:
            return state;
    }
};

export default authReducer;
