import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LeadService from "./leadService";


export const AddLead = createAsyncThunk('lead/add',async(data,thunkApi)=>{
    try{
        return await LeadService.AddLead(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const GetAllLeads = createAsyncThunk('lead/all',async(thunkApi)=>{
    try{
        return await LeadService.GetAllLeads()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const GetSingleLead = createAsyncThunk('lead/single',async(id,thunkApi)=>{
    try{
        return await LeadService.GetSingleLead(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const DeleteLead = createAsyncThunk('lead/delete',async(id,thunkApi)=>{
    try{
        return await LeadService.DeleteLead(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const EditLead = createAsyncThunk('lead/edit',async(data,thunkApi)=>{
    try{
        console.log(data)
        return await LeadService.EditLead(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

const initialState = {
    lead:'',
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const LeadSlice = createSlice({
    name:"lead",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(AddLead.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(AddLead.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.leadAdded = action.payload
           
        })
        .addCase(AddLead.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.leadAdded = null

        })
        .addCase(GetAllLeads.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(GetAllLeads.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.AllLeads = action.payload
           
        })
        .addCase(GetAllLeads.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.AllLeads = null

        })
        .addCase(GetSingleLead.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(GetSingleLead.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.singleLead = action.payload
           
        })
        .addCase(GetSingleLead.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.singleLead = null

        })
        .addCase(DeleteLead.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(DeleteLead.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.deletedLead = action.payload
           
        })
        .addCase(DeleteLead.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.deletedLead = null

        })
        .addCase(EditLead.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(EditLead.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.editedLead = action.payload
           
        })
        .addCase(EditLead.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.editedLead = null

        })
    }
})

export default LeadSlice.reducer