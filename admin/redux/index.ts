import { configureStore } from "@reduxjs/toolkit";
import stores from '../src/api/index';

function createReducer() {
    const reducers = {};
    for (let index = 0; index < stores.length; index++) {
        const store = stores[index];
        Object.assign(reducers, { [store.name]: store });
    }
    return reducers;
}
const store = configureStore({
    reducer: createReducer()
});
export default store;