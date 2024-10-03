import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LeadService from "./leadService";
import { toast } from "react-toastify";


export const AddLead = createAsyncThunk('lead/add',async(data,thunkApi)=>{
    try{
        return await LeadService.AddLead(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const uploadDoc = createAsyncThunk('lead/uplaoddoc',async(data,thunkApi)=>{
    try{
        return await LeadService.uploadDoc(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})


export const deleteDoc = createAsyncThunk('lead/deletedoc',async(data,thunkApi)=>{
    try{
        console.log(data)
        return await LeadService.deleteDoc(data)
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


export const GetPendingLeadByAssociate = createAsyncThunk('lead/pending/associate',async(id,thunkApi)=>{
    try{
        return await LeadService.GetPendingLeadByAssociate(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const GetSanctionedLeadByAssociate = createAsyncThunk('lead/dispersed/associate',async(id,thunkApi)=>{
    try{
        return await LeadService.GetSanctionedLeadByAssociate(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const GetRejectedLeadByAssociate = createAsyncThunk('lead/rejected/associate',async(id,thunkApi)=>{
    try{
        return await LeadService.GetRejectedLeadByAssociate(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})


export const GetAllRejectedLead = createAsyncThunk('lead/all/rejected',async(thunkApi)=>{
    try{
        return await LeadService.GetAllRejectedLead()
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
            if(state.isSuccess){
                console.log(action.payload.message)
                toast.success(action.payload.message)
            }
           
        })
        .addCase(AddLead.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.leadAdded = null
            if(state.isError){
                console.log(action.payload)
                toast.error(action.payload.response.data.message)
            }

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
        .addCase(GetPendingLeadByAssociate.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(GetPendingLeadByAssociate.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.pendingLead = action.payload
           
        })
        .addCase(GetPendingLeadByAssociate.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.pendingLead = null

        })
        .addCase(GetSanctionedLeadByAssociate.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(GetSanctionedLeadByAssociate.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.sanctionedLead = action.payload
           
        })
        .addCase(GetSanctionedLeadByAssociate.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.sanctionedLead = null

        })
        .addCase(GetRejectedLeadByAssociate.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(GetRejectedLeadByAssociate.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.rejectedLead = action.payload
           
        })
        .addCase(GetRejectedLeadByAssociate.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.rejectedLead = null

        })
        .addCase(uploadDoc.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(uploadDoc.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.uploadeddoc = action.payload
           
        })
        .addCase(uploadDoc.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.uploadeddoc = null

        })
        .addCase(deleteDoc.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteDoc.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.deletedDocfile = action.payload
           
        })
        .addCase(deleteDoc.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.deletedDocfile = null

        })
        .addCase(GetAllRejectedLead.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(GetAllRejectedLead.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.allRejectedLead = action.payload
           
        })
        .addCase(GetAllRejectedLead.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.allRejectedLead = null

        })
    }
})

export default LeadSlice.reducer