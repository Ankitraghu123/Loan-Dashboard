import React from 'react'
import LeadTable from './LeadTable'
import { useSelector } from 'react-redux'

const AssociateDisbarsement = () => {
  const {editedLead,deletedLead} = useSelector(state => state.lead)
  return (
    <LeadTable tableName={"Disbursement Leads"}/>
  )
}

export default AssociateDisbarsement