import { SIDE_BAR_OPEN, SIDE_BAR_CLOSE } from "../constant";

const initial = false;
const sidebarReducer = (state = initial, action) => {
    switch (action.type) {
        case SIDE_BAR_OPEN:
            return true;
        case SIDE_BAR_CLOSE:
            return false;
        default:
            return state;
    }
};

export default sidebarReducer;
