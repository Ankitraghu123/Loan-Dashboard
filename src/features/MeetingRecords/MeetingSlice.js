import {createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import MeetingService from "./MeetingService";


export const AddMeeting = createAsyncThunk('meeting/add',async(data,thunkApi)=>{
    try{
        return await MeetingService.AddMeeting(data)
    }catch(err){
        return thunkApi.rejectWithValue(err)
    }
})

export const GetAllMeetingByLead = createAsyncThunk('meeting/all-lead', async (id, thunkApi) => {
    try {
        return await MeetingService.GetAllByLead(id);
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }
});


const initialState = {
    meetingRecords:'',
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}

export const resetState=createAction('Reset_all')

export const meetingRecords = createSlice({
    name:"meetingRecords",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(AddMeeting.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(AddMeeting.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.meetingAdded = action.payload
           
        })
        .addCase(AddMeeting.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.meetingAdded = null

        })
        .addCase(GetAllMeetingByLead.pending,(state)=>{
            state.isLoading = true
        })
        .addCase(GetAllMeetingByLead.fulfilled,(state,action)=>{
            state.isLoading = false
            state.isSuccess = true
            state.meetingByLead = action.payload
           
        })
        .addCase(GetAllMeetingByLead.rejected,(state,action)=>{
            state.isLoading = false
            state.isError=true
            state.isSuccess = false
            state.meetingByLead = null

        })
    }
})

export default meetingRecords.reducer