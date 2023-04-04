import { SIDE_BAR_CLOSE, SIDE_BAR_OPEN } from "../constant";

export const sidebarOpen = () => {
    return {
        type: SIDE_BAR_OPEN,
    };
};

export const sidebarClose = () => {
    return {
        type: SIDE_BAR_CLOSE,
    };
};
