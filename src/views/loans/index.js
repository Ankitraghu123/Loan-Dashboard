import React from 'react';
import { Box, SimpleGrid } from '@chakra-ui/react';
import AddLoanType from './component/AddLoanType';
import LoanTypeList from './component/LoanTypeList';

const Index = () => {
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "100px" }}>
      <SimpleGrid
        columns={{ base: 1, md: 2 }}
        spacing={{ base: "20px", xl: "20px" }}
      >
        <Box>
          <AddLoanType />
        </Box>
        <Box>
          <LoanTypeList />
        </Box>
      </SimpleGrid>
    </Box>
  );
};

export default Index;
