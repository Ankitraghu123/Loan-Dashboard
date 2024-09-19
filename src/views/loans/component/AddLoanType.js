import React, { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useDispatch } from 'react-redux';
import { AddLoan } from 'features/LoanType/loanTypeSlice';

const AddLoanType = () => {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    loanName: '',
  });

  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add logic to handle the form submission
    dispatch(AddLoan(formData))
  };

  return (
    <Card
      flexDirection="column"
      w="100%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text color={textColor} fontSize="22px" fontWeight="700">
          Add Loan Type
        </Text>
      </Flex>
      <Box px="25px" mb="8px">
        <form onSubmit={handleSubmit}>
          <FormControl mb="4" isRequired>
            <FormLabel color={textColor}>Loan Name</FormLabel>
            <Input
              name="loanName"
              value={formData.loanName}
              onChange={handleChange}
              placeholder="Enter Loan Type Name"
              size="md"
            />
          </FormControl>
          <Button colorScheme="blue" type="submit">
            Add Loan Type
          </Button>
        </form>
      </Box>
    </Card>
  );
};

export default AddLoanType;
