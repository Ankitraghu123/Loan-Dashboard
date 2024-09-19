import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CallService from "./CallService";

// Thunks
export const AddCall = createAsyncThunk('call/add', async (data, thunkApi) => {
    try {
        return await CallService.AddCall(data);
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }
});

export const GetAllByLead = createAsyncThunk('call/all-lead', async (id, thunkApi) => {
    try {
        return await CallService.GetAllByLead(id);
    } catch (err) {
        return thunkApi.rejectWithValue(err);
    }
});

// Initial State
const initialState = {
    callRecords: [], // Initialize as an array if you expect multiple records
    callAdded: null, // Initialize to null if you expect a single record
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

// Actions
export const resetState = createAction('Reset_all');

// Slice
export const callRecordsSlice = createSlice({
    name: "callRecord",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(AddCall.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(AddCall.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.callAdded = action.payload;
            })
            .addCase(AddCall.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.callAdded = null;
                state.message = action.payload; // Optionally store the error message
            })
            .addCase(GetAllByLead.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(GetAllByLead.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.callRecords = action.payload;
            })
            .addCase(GetAllByLead.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.callRecords = []; // Optionally clear or handle the state
                state.message = action.payload; // Optionally store the error message
            })
            .addCase(resetState, () => initialState); // Reset state when action is dispatched
    }
});

export default callRecordsSlice.reducer;
