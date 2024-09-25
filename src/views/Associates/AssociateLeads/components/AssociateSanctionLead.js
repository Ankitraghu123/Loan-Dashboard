import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LeadTable from './LeadTable';
import { GetSanctionedLeadByAssociate } from 'features/Lead/leadSlice';

const AssociateSanctionLead = () => {
    const dispatch = useDispatch()
    const currentAssociate = useSelector(state => state.associate?.businessAssociate)
    const tableData = useSelector((state) => state?.lead?.sanctionedLead);
  const {editedLead,deletedLead} = useSelector(state => state.lead)

    useEffect(() => {
        dispatch(GetSanctionedLeadByAssociate(currentAssociate?._id))
        // Fetch loan types if necessary
      }, [dispatch,editedLead,deletedLead]);
  return (
    <LeadTable tableData={tableData}  tableName={"Sanctioned leads"}/>
  )
}

export default AssociateSanctionLead