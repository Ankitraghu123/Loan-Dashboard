import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import SalesExecutiveService from "./SalesExecutiveService";
import { toast } from "react-toastify";


export const addSalesExecutive = createAsyncThunk('salesExecutive/add',async(data,thunkApi)=>{
    try{
        return await SalesExecutiveService.AddSalesExecutive(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const EditSalesExecutive = createAsyncThunk('salesExecutive/edit',async(data,thunkApi)=>{
    try{
        return await SalesExecutiveService.EditSalesExecutive(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const DeleteSalesExecutive = createAsyncThunk('salesExecutive/delete',async(id,thunkApi)=>{
    try{
        return await SalesExecutiveService.DeleteSalesExecutive(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const GetAllSalesExecutive = createAsyncThunk('salesExecutive/all', async (thunkApi) => {
    try {
        return await SalesExecutiveService.GetAllSalesExecutive();
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }
});


const initialState = {
    salesExecutive:'',
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const salesExecutive = createSlice({
    name:"salesExecutive",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addSalesExecutive.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addSalesExecutive.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.SalesExecutiveAdded = action.payload
            if(state.isSuccess){
                toast.success("Sales Executive added successfully")
            }  
        })
        .addCase(addSalesExecutive.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.SalesExecutiveAdded = null
            if(state.isError){
                toast.error(action.payload.response.data.message)
            }
        })
        .addCase(GetAllSalesExecutive.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(GetAllSalesExecutive.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.allSalesExecutive = action.payload
           
        })
        .addCase(GetAllSalesExecutive.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.allSalesExecutive = null

        })
        .addCase(EditSalesExecutive.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(EditSalesExecutive.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.editedSalesExecutive = action.payload
           
        })
        .addCase(EditSalesExecutive.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.editedSalesExecutive = null

        })
        .addCase(DeleteSalesExecutive.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(DeleteSalesExecutive.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.deletedSalesExecutive = action.payload
           
        })
        .addCase(DeleteSalesExecutive.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.deletedSalesExecutive = null

        })
    }
})

export default salesExecutive.reducer