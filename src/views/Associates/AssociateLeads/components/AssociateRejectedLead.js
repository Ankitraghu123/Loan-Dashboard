import React, { useEffect, useState } from 'react'
import LeadTable from './LeadTable';
import { useDispatch, useSelector } from 'react-redux';
import { GetRejectedLeadByAssociate } from 'features/Lead/leadSlice';

const AssociateRejectedLead= () => {
  const dispatch = useDispatch()
  const currentAssociate = useSelector(state => state.associate?.businessAssociate)
  const tableData = useSelector((state) => state?.lead?.rejectedLead);
  const {editedLead,deletedLead} = useSelector(state => state.lead)

  useEffect(() => {
    dispatch(GetRejectedLeadByAssociate(currentAssociate?._id))
    // Fetch loan types if necessary
  }, [dispatch,editedLead,deletedLead]);

  return (
   <LeadTable tableData={tableData} tableName={"Rejected leads"}/>
  )
}

export default AssociateRejectedLead
