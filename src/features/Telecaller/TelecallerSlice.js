import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import TelecallerService from "./TelecallerService";
import { toast } from "react-toastify";


export const addTelecaller = createAsyncThunk('telecaller/add',async(data,thunkApi)=>{
    try{
        return await TelecallerService.AddTelecaller(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const EditTelecaller = createAsyncThunk('telecaller/edit',async(data,thunkApi)=>{
    try{
        return await TelecallerService.EditTelecaller(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const DeleteTelecaller = createAsyncThunk('telecaller/delete',async(id,thunkApi)=>{
    try{
        return await TelecallerService.DeleteTelecaller(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const GetAllTelecaller = createAsyncThunk('telecaller/all', async (thunkApi) => {
    try {
        return await TelecallerService.GetAllTelecaller();
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }
});


const initialState = {
    telecaller:'',
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const telecaller = createSlice({
    name:"telecaller",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addTelecaller.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addTelecaller.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.telecallerAdded = action.payload
            if(state.isSuccess){
                toast.success("Telecaller added successfully")
            }
           
        })
        .addCase(addTelecaller.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.telecallerAdded = null
            if(state.isError){
                toast.error(action.payload.response.data.message)
            }
        })
        .addCase(GetAllTelecaller.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(GetAllTelecaller.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.allTelecaller = action.payload
           
        })
        .addCase(GetAllTelecaller.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.allTelecaller = null

        })
        .addCase(EditTelecaller.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(EditTelecaller.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.editedTelecaller = action.payload
           
        })
        .addCase(EditTelecaller.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.editedTelecaller = null

        })
        .addCase(DeleteTelecaller.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(DeleteTelecaller.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.deletedTelecaller = action.payload
           
        })
        .addCase(DeleteTelecaller.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.deletedTelecaller = null

        })
    }
})

export default telecaller.reducer