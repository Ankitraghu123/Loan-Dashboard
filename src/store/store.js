import { configureStore } from '@reduxjs/toolkit';
import CallReducer from 'features/CallRecords/CallSlice';
import leadReducer from 'features/Lead/leadSlice';
import loanTypeReducer from 'features/LoanType/loanTypeSlice';
import MeetingReducer from 'features/MeetingRecords/MeetingSlice';



export const store = configureStore({
  reducer: {
   lead:leadReducer,
   loanType:loanTypeReducer,
   callRecords:CallReducer,
   meetingRecords:MeetingReducer
  }
});
