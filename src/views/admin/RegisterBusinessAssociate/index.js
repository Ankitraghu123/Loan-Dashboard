import React from 'react'
import { EmployeeForm } from './components/EmployeeForm'
import { Box } from '@chakra-ui/react'
import AssociateRegisterForm from './component/AssociateRegisterForm'
const index = () => {
  return (

         <Box pt={{ base: "130px", md: "80px", xl: "100px" }}>
        <AssociateRegisterForm/>
        </Box>
  )
}

export default index