import { Box, SimpleGrid } from '@chakra-ui/react'
import React from 'react'
import MiniStatistics from "components/card/MiniStatistics";


const AdminDashboard = () => {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
    <SimpleGrid
      columns={{ base: 2, md: 2, lg: 3, "2xl": 6 }}
      gap='20px'
      mb='20px'>
      <MiniStatistics
        name='Total Leads'
        value=''
      />
       <MiniStatistics
        name='Pending Leads'
        value=''
      />
     <MiniStatistics
        name='Rejected Leads'
        value=''
      />
     <MiniStatistics
        name='loan sanctioned'
        value=''
      />
     <MiniStatistics name='loan dispersed' value='0' />
      <MiniStatistics name='Total Earning' value='0' />
      <MiniStatistics name='Todays Call' value='0' />

    </SimpleGrid>


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
  )
}

export default AdminDashboard