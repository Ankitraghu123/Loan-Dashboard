
// Chakra imports
import {
    Avatar,
    Box,
    Flex,
    FormLabel,
    Icon,
    Select,
    SimpleGrid,
    useColorModeValue,
  } from "@chakra-ui/react";
  // Assets
  import Usa from "assets/img/dashboards/usa.png";
  // Custom components
  import MiniCalendar from "components/calendar/MiniCalendar";
  import MiniStatistics from "components/card/MiniStatistics";
  import IconBox from "components/icons/IconBox";
import { GetAllLeadsByAssociate } from "features/BusinessAssociate/BusinessAssociateSlice";
import { GetSanctionedLeadByAssociate } from "features/Lead/leadSlice";
import { GetRejectedLeadByAssociate } from "features/Lead/leadSlice";
import { GetPendingLeadByAssociate } from "features/Lead/leadSlice";
  import React, { useEffect } from "react";
  import {
    MdAddTask,
    MdAttachMoney,
    MdBarChart,
    MdFileCopy,
  } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import TotalSpent from "views/admin/default/components/TotalSpent";
import WeeklyRevenue from "views/admin/default/components/WeeklyRevenue";
import AssociatePendingLeads from "./AssociatePendingLeads";

const AssociateDashboard = () => {
    const brandColor = useColorModeValue("brand.500", "white");
    const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
    const dispatch = useDispatch()
    const currentAssociate = useSelector(state => state.associate?.businessAssociate)
    const totalLeads = useSelector(state => state.associate?.allLeadsByAssociate)
    const pendingLeads = useSelector(state => state.lead?.pendingLead)
    const rejectedLeads = useSelector(state => state.lead?.rejectedLead)
    const sanctionedLeads = useSelector(state => state.lead?.sanctionedLead)


    useEffect(() =>{
        dispatch(GetAllLeadsByAssociate(currentAssociate._id))
        dispatch(GetPendingLeadByAssociate(currentAssociate._id))
        dispatch(GetRejectedLeadByAssociate(currentAssociate._id))
        dispatch(GetSanctionedLeadByAssociate(currentAssociate._id))
    },[dispatch])
    return (
      <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
          gap='20px'
          mb='20px'>
          <Link to='/admin/associate-all-lead'>
          <MiniStatistics
            name='Total Leads Given'
            value={totalLeads ? totalLeads?.data?.length : 0}
          />
          </Link>
           <Link to='/admin/associate-pending-lead'>
           <MiniStatistics
            name='Pending Lead'
            value={pendingLeads ? pendingLeads?.data?.length : 0}
          />
           </Link>
         <Link to="/admin/associate-rejected-lead">
         <MiniStatistics
            name='Rejected Lead'
            value={rejectedLeads ? rejectedLeads?.data?.length : 0}
          />
            </Link>
         <Link to="/admin/associate-sanction-lead">
         <MiniStatistics
            name='loan sanctioned'
            startContent={
                <IconBox
                  w='56px'
                  h='56px'
                  bg={boxBg}
                  icon={
                    <Icon w='32px' h='32px' as={MdAttachMoney} color={brandColor} />
                  }
                />
              }
            value={sanctionedLeads ? sanctionedLeads?.data?.length : 0}
          />
         </Link>
         <Link to="/admin/associate-disbarsed-lead">
         <MiniStatistics name='loan dispersed' value='0' />
         </Link>
          <MiniStatistics name='Total Earning' value='10000' />

        </SimpleGrid>
  
  
              <AssociatePendingLeads/>
        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px' mb='20px'>
          {/* <TotalSpent /> */}
          {/* <WeeklyRevenue /> */}
        </SimpleGrid>
        {/* <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'> */}
          {/* <CheckTable columnsData={columnsDataCheck} tableData={tableDataCheck} /> */}
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
            {/* <DailyTraffic /> */}
            {/* <PieCard /> */}
          </SimpleGrid>
        {/* </SimpleGrid> */}
        <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
          {/* <ComplexTable
            columnsData={columnsDataComplex}
            tableData={tableDataComplex}
          /> */}
          <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
            {/* <Tasks /> */}
            {/* <MiniCalendar h='100%' minW='100%' selectRange={false} /> */}
          </SimpleGrid>
        </SimpleGrid>
      </Box>
    );
}

export default AssociateDashboard