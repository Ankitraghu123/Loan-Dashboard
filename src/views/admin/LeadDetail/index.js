import React from 'react'
import LeadDetail from './components/LeadDetail'
import { Box } from '@chakra-ui/react'
import Sidebar from 'components/sidebar/Sidebar'
import Timeline from './components/Timeline'
const Index = () => {
  return (

         <Box pt={{ base: "130px", md: "80px", xl: "600px" }}>
          <Sidebar/>
            <LeadDetail/>
        </Box>
  )
}

export default Index