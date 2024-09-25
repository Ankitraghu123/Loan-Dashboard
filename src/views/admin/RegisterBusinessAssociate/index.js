import React from 'react'
import { Box, SimpleGrid } from '@chakra-ui/react'
import AssociateRegisterForm from './component/AssociateRegisterForm'
import LoanTypeList from 'views/loans/component/LoanTypeList'
const index = () => {
  return (

    <Box pt={{ base: "130px", md: "80px", xl: "100px" }}>
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={{ base: "20px", xl: "20px" }}
    >
      <Box>
        <AssociateRegisterForm/>
      </Box>
      <Box>
        
      </Box>
    </SimpleGrid>
  </Box>
  )
}

export default index