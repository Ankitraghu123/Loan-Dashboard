import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "./authService";
import { toast } from "react-toastify";

const authdata = localStorage.getItem('authData')
const associatedata = localStorage.getItem('associateData')

const initialAuth = authdata ? JSON.parse(authdata) : associatedata ? JSON.parse(associatedata) : '';


export const LoginAdmin = createAsyncThunk('admin/login',async(data,thunkApi)=>{
    try{
        return await AuthService.LoginAdmin(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

const initialState = {
    auth:initialAuth,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(LoginAdmin.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(LoginAdmin.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.authData = action.payload
           if(state.isSuccess){
            toast.success('Login Successfully')
           }
        })
        .addCase(LoginAdmin.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.authData = null
            if(state.isError){
                toast.error(action.payload.response.data.error)
               }
        })
       
    }
})

export default authSlice.reducer