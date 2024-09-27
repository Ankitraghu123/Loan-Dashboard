import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import FileStagesService from "./FileStagesService";
import { toast } from "react-toastify";


export const addFileStages = createAsyncThunk('loanType/add-doc',async(data,thunkApi)=>{
    try{
        return await FileStagesService.AddFileStages(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const EditFileStages = createAsyncThunk('loanType/edit-doc',async(data,thunkApi)=>{
    console.log(data)
    try{
        return await FileStagesService.EditFileStages(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const deleteFileStages = createAsyncThunk('loanType/delete-do',async(id,thunkApi)=>{
    try{
        return await FileStagesService.deleteFileStages(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const GetAllFileStages = createAsyncThunk('loanType/all/docs',async(thunkApi)=>{
    try{
        return await FileStagesService.GetAllFileStages()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const UpdateLeadFileStage = createAsyncThunk('loanType/all/updatefileStage',async(data,thunkApi)=>{
    try{
        return await FileStagesService.UpdateLeadFileStage(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

const initialState = {
    fileStages:'',
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const FileStages = createSlice({
    name:"FileStages",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(addFileStages.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(addFileStages.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.addedFileStage = action.payload
            if(state.isSuccess){
                toast.success("file stage added")
            }
           
        })
        .addCase(addFileStages.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.addedFileStage = null

        })
        .addCase(EditFileStages.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(EditFileStages.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.editedFileStage = action.payload
            // if(state.isSuccess){
            //     toast.success("file Stage edited")
            // }
           
        })
        .addCase(EditFileStages.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.editedFileStage = null

        })
        .addCase(deleteFileStages.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(deleteFileStages.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.deletedFileStage = action.payload
           
        })
        .addCase(deleteFileStages.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.deletedFileStage = null

        })
        .addCase(GetAllFileStages.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(GetAllFileStages.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.allFileStage = action.payload
           
        })
        .addCase(GetAllFileStages.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.allFileStage = null

        })
        .addCase(UpdateLeadFileStage.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(UpdateLeadFileStage.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.updatedleadfileStage = action.payload
           
        })
        .addCase(UpdateLeadFileStage.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.updatedleadfileStage = null

        })
    }
})

export default FileStages.reducer