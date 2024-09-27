import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/Auth/authSlice';
import BusinessAssociateReducer from 'features/BusinessAssociate/BusinessAssociateSlice';
import CallReducer from 'features/CallRecords/CallSlice';
import FileStagesReducer from 'features/FileStages/FileStagesSlice';
import leadReducer from 'features/Lead/leadSlice';
import loanTypeReducer from 'features/LoanType/loanTypeSlice';
import MeetingReducer from 'features/MeetingRecords/MeetingSlice';



export const store = configureStore({
  reducer: {
   lead:leadReducer,
   loanType:loanTypeReducer,
   callRecords:CallReducer,
   meetingRecords:MeetingReducer,
   auth:authReducer,
   associate:BusinessAssociateReducer,
   fileStages:FileStagesReducer
  }
});
