import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import businessAssociateService from "./BusinessAssociateService";

const associateState = localStorage.getItem('associateData');
const associateData = associateState ? JSON.parse(associateState) : null;


export const RegisterAssociate = createAsyncThunk('associate/register',async(data,thunkApi)=>{
    try{
        return await businessAssociateService.RegisterAssociate(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const LoginAssociate = createAsyncThunk('associate/login',async(data,thunkApi)=>{
    try{
        return await businessAssociateService.LoginAssociate(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})


export const GetAllAssociates = createAsyncThunk('associate/all',async(thunkApi)=>{
    try{
        return await businessAssociateService.GetAllAssociates()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})


const initialState = {
    businessAssociate:associateData,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const businessAssociateSlice = createSlice({
    name:"businessassociate",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(RegisterAssociate.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(RegisterAssociate.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.associateData = action.payload
           
        })
        .addCase(RegisterAssociate.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.associateData = null

        })
        .addCase(LoginAssociate.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(LoginAssociate.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.associateData = action.payload
           
        })
        .addCase(LoginAssociate.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.associateData = null

        })
        .addCase(GetAllAssociates.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(GetAllAssociates.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.allAssociate = action.payload
           
        })
        .addCase(GetAllAssociates.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.allAssociate = null

        })
       
    }
})

export default businessAssociateSlice.reducer