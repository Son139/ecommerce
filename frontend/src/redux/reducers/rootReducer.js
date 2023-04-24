import { combineReducers } from "redux";

import sidebarReducer from "./sidebarReducer";
import userReducer from "./userReducer";
import authReducer from "./authReducer";

// dùng persist để lưu các giá trị của reducer, nếu khi reload trang sẽ trở lại gtri mặc định band dầu =>
// giữ giá trị khi login là true , luuw dưới local thì dùng persist.

import storage from "redux-persist/lib/storage";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { persistReducer } from "redux-persist";

const commonConfig = {
    storage,
    stateReconciler: autoMergeLevel2,
};

const authConfig = {
    ...commonConfig,
    key: "auth",
    // whitelist để chọn ra những state nào của reducer được lưu ở localstorage, blacklist thì chọn ra state nào của reducer không luuw
    // ở localstorage. Nếu trong config không để whitelisst or blacklist
    // thì mặc định nó sẽ lưu hết state của reducer đó dưới
    // localstorage luôn
    whitelist: ["isLoggedIn", "token"],
};

const rootReducer = combineReducers({
    auth: persistReducer(authConfig, authReducer),
    sidebar: sidebarReducer,
    user: userReducer,
});

export default rootReducer;
