import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { GetAllLeads } from 'features/Lead/leadSlice';
import AllLeadTable from './AllLeadTable';

const AllLeads = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state?.lead?.AllLeads?.data);
  const {editedLead,deletedLead} = useSelector(state => state.lead)




  useEffect(() => {
    dispatch(GetAllLeads());
  }, [dispatch,editedLead,deletedLead]);

 

  
  

  return (
   <AllLeadTable tableData={tableData} tableName={"All Leads"}/>
  );
};

export default AllLeads;
