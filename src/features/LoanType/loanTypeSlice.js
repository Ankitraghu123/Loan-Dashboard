import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import LoanTypeService from "./loanTypeService";


export const AddLoan = createAsyncThunk('loanType/add',async(data,thunkApi)=>{
    try{
        return await LoanTypeService.AddLoanType(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const EditLoan = createAsyncThunk('loanType/edit',async(data,thunkApi)=>{
    console.log(data)
    try{
        return await LoanTypeService.EditLoanType(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const DeleteLoan = createAsyncThunk('loanType/delete',async(id,thunkApi)=>{
    try{
        return await LoanTypeService.deleteLoan(id)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const GetAllLoans = createAsyncThunk('loanType/all',async(thunkApi)=>{
    try{
        return await LoanTypeService.GetAllLoans()
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})


const initialState = {
    loanType:'',
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const LeadSlice = createSlice({
    name:"loanType",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(AddLoan.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(AddLoan.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.addLoan = action.payload
           
        })
        .addCase(AddLoan.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.addLoan = null

        })
        .addCase(GetAllLoans.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(GetAllLoans.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.allLoanTypes = action.payload
           
        })
        .addCase(GetAllLoans.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.allLoanTypes = null

        })
        .addCase(EditLoan.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(EditLoan.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.EditedLoan = action.payload
           
        })
        .addCase(EditLoan.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.EditedLoan = null

        })
        .addCase(DeleteLoan.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(DeleteLoan.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.deletedLoan = action.payload
           
        })
        .addCase(DeleteLoan.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.deletedLoan = null

        })
    }
})

export default LeadSlice.reducer