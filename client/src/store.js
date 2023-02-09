import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import { createStore } from "redux";

const rootReducer = (state = {}, action) => {
    switch (action.type) {
        case "SET_OBJ_USER":
            return { ...state, objUser: action.objUser };
        default:
            return state;
    }
};

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(persistedReducer)

const persistor = persistStore(store)

export default { store, persistor }
