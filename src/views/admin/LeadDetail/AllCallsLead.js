import { Box, Text, Card, Thead, Tr, Th, Tbody, Td,Table, useColorModeValue } from '@chakra-ui/react';
import { GetAllByLead } from 'features/CallRecords/CallSlice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const AllCallsLead = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const callData = useSelector(state => state.callRecords?.callRecords?.data)
    const sortedCallData = Array.isArray(callData) 
    ? [...callData].sort((a, b) => {
        if (a.isImportant === b.isImportant) {
          return 0; // No change if both have the same importance
        }
        return a.isImportant ? -1 : 1; // Place important calls on top
      })
    : [];
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const textColor = useColorModeValue('secondaryGray.900', 'white');


    useEffect(()=>{
        dispatch(GetAllByLead(id))
      },[dispatch])

    
      const dateTimeFormat = (dateString) => {
        const date = new Date(dateString); // Create Date object from ISO string
    
        // Extract date and time components
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so add 1
        const day = String(date.getDate()).padStart(2, '0');
        const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
    
        // Format as MM/DD/YY HH:MM
        const formattedDateTime = `${month}/${day}/${year} ${hours}:${minutes}`;
    
        return formattedDateTime;
    };
  return (
    <Card
        // w="45%"
        px="10px"
        overflowX={{ sm: 'scroll', lg: 'hidden' }}
        style={{marginTop:"80px"}}
      >
           <Text color={textColor} px="20px" pt="10px" fontSize="22px" fontWeight="700" lineHeight="100%">
            Call Table
          </Text>
          <Box>
          <Table className='table' variant="simple" color="gray.500" mb="24px" mt="12px">
            <Thead >
              <Tr>
                <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
                  Name
                </Th>
                <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
                  Mobile
                </Th>
                <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
                  Remark
                </Th>
                <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
                  Next Call Date
                </Th>
                <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
                  Call Date
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {sortedCallData?.map((row) => (
                <Tr key={row._id}  id={row.isImportant ? 'isImportant' : null}>
                  <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }} borderColor="transparent">
                    <Text  color={textColor} fontSize="sm" fontWeight="700">
                      {row.customName}
                    </Text>
                  </Td>
                  <Td fontSize={{ sm: '14px' }}>{row.mobileNumber}</Td>
                  <Td fontSize={{ sm: '14px' }}>{row.remark}</Td>
                  <Td fontSize={{ sm: '14px' }}>{dateTimeFormat(row.nextCallDate)}</Td>
                  <Td fontSize={{ sm: '14px' }}>{dateTimeFormat(row.callDate)}</Td>
                  
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      </Card>
  )
}

export default AllCallsLead