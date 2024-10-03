import { GetAllRejectedLead } from 'features/Lead/leadSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AllLeadTable from './AllLeadTable';

const AllRejectedLead = () => {
    const dispatch = useDispatch();
    const tableData = useSelector((state) => state?.lead?.allRejectedLead?.data);
    const {editedLead,deletedLead} = useSelector(state => state.lead)
  
  
  
  
    useEffect(() => {
      dispatch(GetAllRejectedLead());
    }, [dispatch,editedLead,deletedLead]);
  return (
   <AllLeadTable tableData={tableData} tableName={'Rejected Leads'} rejected={true}/>
  )
}

export default AllRejectedLead