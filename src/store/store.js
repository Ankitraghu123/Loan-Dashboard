import { configureStore } from '@reduxjs/toolkit';
import authReducer from 'features/Auth/authSlice';
import BusinessAssociateReducer from 'features/BusinessAssociate/BusinessAssociateSlice';
import CallReducer from 'features/CallRecords/CallSlice';
import FileStagesReducer from 'features/FileStages/FileStagesSlice';
import leadReducer from 'features/Lead/leadSlice';
import loanTypeReducer from 'features/LoanType/loanTypeSlice';
import ManagerReducer from 'features/Manager/ManagerSlice';
import MeetingReducer from 'features/MeetingRecords/MeetingSlice';
import SalesExecutiveReducer from 'features/SalesExecutive/SalesExecutiveSlice';
import TelecallerReducer from 'features/Telecaller/TelecallerSlice';



export const store = configureStore({
  reducer: {
   lead:leadReducer,
   loanType:loanTypeReducer,
   callRecords:CallReducer,
   meetingRecords:MeetingReducer,
   auth:authReducer,
   associate:BusinessAssociateReducer,
   fileStages:FileStagesReducer,
   telecaller:TelecallerReducer,
   salesExecutive:SalesExecutiveReducer,
   manager:ManagerReducer
  }
});
