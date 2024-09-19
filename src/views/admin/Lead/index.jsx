import React from 'react'
import { Box } from '@chakra-ui/react'
import { AddLeadForm } from './components/addLeadForm'
const index = () => {
  return (

         <Box pt={{ base: "130px", md: "80px", xl: "600px" }}>
      <AddLeadForm />
        </Box>
  )
}

export default index