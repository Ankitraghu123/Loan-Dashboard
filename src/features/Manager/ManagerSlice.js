import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ManagerService from "./ManagerService";
import { toast } from "react-toastify";


export const addManager = createAsyncThunk('manager/add',async(data,thunkApi)=>{
    try{
        return await ManagerService.AddManager(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const EditManager = createAsyncThunk('manager/edit',async(data,thunkApi)=>{
    try{
        return await ManagerService.EditManager(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const DeleteManager = createAsyncThunk('manager/delete',async(id,thunkApi)=>{
    try{
        return await ManagerService.DeleteManager(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const GetAllManager = createAsyncThunk('manager/all', async (thunkApi) => {
    try {
        return await ManagerService.GetAllManager();
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }
});


const initialState = {
    manager:'',
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const manager = createSlice({
    name:"manager",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addManager.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addManager.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.ManagerAdded = action.payload
            if(state.isSuccess){
                toast.success("Manager added successfully")
            }
        })
        .addCase(addManager.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.ManagerAdded = null
            if(state.isError){
                toast.error(action.payload.response.data.message)
            }

        })
        .addCase(GetAllManager.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(GetAllManager.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.allManager = action.payload
           
        })
        .addCase(GetAllManager.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.allManager = null

        })
        .addCase(EditManager.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(EditManager.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.editedManager = action.payload
           
        })
        .addCase(EditManager.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.editedManager = null

        })
        .addCase(DeleteManager.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(DeleteManager.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.deletedManager = action.payload
           
        })
        .addCase(DeleteManager.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.deletedManager = null

        })
    }
})

export default manager.reducer