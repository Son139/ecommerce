import { applyMiddleware, createStore } from "redux";
import rootReducer from "./reducers/rootReducer";
import { persistStore } from "redux-persist";
import thunk from "redux-thunk";

const reduxStore = () => {
    // TẠO STORE
    const store = createStore(rootReducer, applyMiddleware(thunk));
    const persistor = persistStore(store);

    return { store, persistor };
};

export default reduxStore;
