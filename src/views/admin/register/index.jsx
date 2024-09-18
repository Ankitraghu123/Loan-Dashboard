import React from 'react'
import { EmployeeForm } from './components/EmployeeForm'
import { Box } from '@chakra-ui/react'
const index = () => {
  return (

         <Box pt={{ base: "130px", md: "80px", xl: "100px" }}>
        <EmployeeForm/>
        </Box>
  )
}

export default index