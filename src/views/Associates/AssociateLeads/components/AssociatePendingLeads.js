import React, { useEffect, useState } from 'react'
import { GetPendingLeadByAssociate } from 'features/Lead/leadSlice';
import LeadTable from './LeadTable';
import { useDispatch, useSelector } from 'react-redux';

const AssociatePendingLeads= () => {
  const dispatch = useDispatch()
  const currentAssociate = useSelector(state => state.associate?.businessAssociate)
  const tableData = useSelector((state) => state?.lead?.pendingLead);
  const {editedLead,deletedLead} = useSelector(state => state.lead)
  

  useEffect(() => {
    dispatch(GetPendingLeadByAssociate(currentAssociate?._id))
    // Fetch loan types if necessary
  }, [dispatch,editedLead,deletedLead]);

  return (
   <LeadTable tableData={tableData} tableName={"Pending leads"}/>
  )
}

export default AssociatePendingLeads
