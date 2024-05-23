import { createSlice } from "@reduxjs/toolkit";
import { ELoginStatus } from "../../utils/Enum";
export enum ELogin {
    KEY = 'NLogin',
    LOGIN = 'LOGIN',
    GETUSERINFO = 'GETUSERINFO',
}

export default createSlice({
    name: ELogin.KEY,
    initialState: {
        loginStatus: ELoginStatus.Loading
    },
    reducers: {
        [ELogin.LOGIN]: (state, { payload }) => {
            // state.loginStatus 
        },
        [ELogin.GETUSERINFO]: () => {

        }
    }
})