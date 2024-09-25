import { GetAllLeadsByAssociate } from 'features/BusinessAssociate/BusinessAssociateSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import LeadTable from './LeadTable';

const AssocitaeAllLeads = () => {
    const dispatch = useDispatch()
    const currentAssociate = useSelector(state => state.associate?.businessAssociate)
    const tableData = useSelector((state) => state?.associate?.allLeadsByAssociate);
  const {editedLead,deletedLead} = useSelector(state => state.lead)

    useEffect(() => {
        dispatch(GetAllLeadsByAssociate(currentAssociate?._id))
        // Fetch loan types if necessary
      }, [dispatch,editedLead,deletedLead]);
  return (
    <LeadTable tableData={tableData}  tableName={"All leads"}/>

  )
}

export default AssocitaeAllLeads