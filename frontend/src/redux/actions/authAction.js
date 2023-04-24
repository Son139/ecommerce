import { apiRegister } from "../../services/auth/auth";
import { REGISTER_FAIL, REGISTER_SUCCESS } from "../constant";

export const register = (payload) => async (dispatch) => {
    try {
        const response = await apiRegister(payload);
        console.log(response);

        if (response?.data.err === 0) {
            dispatch({
                type: REGISTER_SUCCESS,
                data: response.data.token,
            });
        } else {
            dispatch({
                type: REGISTER_FAIL,
                data: response.data.msg,
            });
        }
    } catch (error) {
        dispatch({
            type: REGISTER_FAIL,
            data: null,
        });
    }
};
