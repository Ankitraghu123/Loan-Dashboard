import { Box, Flex, Text, useColorModeValue, Button, FormControl, FormLabel, Input, Textarea, Card, Thead, Tr, Th, Tbody, Td,Table } from '@chakra-ui/react';
import { GetAllByLead } from 'features/CallRecords/CallSlice';
import { AddCall } from 'features/CallRecords/CallSlice';
import { GetSingleLead } from 'features/Lead/leadSlice';
import { GetAllMeetingByLead } from 'features/MeetingRecords/MeetingSlice';
import { AddMeeting  } from 'features/MeetingRecords/MeetingSlice';
import React, { useEffect, useState } from 'react';
// import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

const LeadDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const callData = useSelector(state => state.callRecords?.callRecords?.data)
  const meetingData = useSelector(state => state.meetingRecords?.meetingByLead?.data)

  const {callAdded} = useSelector(state => state?.callRecords)
  const {meetingAdded} = useSelector(state => state?.meetingRecords)

  const currentLead = useSelector((state) => state.lead?.singleLead?.data);
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const [totalCallCounts,setTotalCallCounts] = useState(callData?.length)
  const [totalMeetCounts,setTotalMeetCounts] = useState(meetingData?.length)

  useEffect(()=>{
    dispatch(GetAllByLead(id))
    dispatch(GetAllMeetingByLead(id))
    dispatch(GetSingleLead(id));
  },[dispatch,callAdded,meetingAdded,id])

  useEffect(() => {
    setTotalCallCounts(callData?.length)
    setTotalMeetCounts(meetingData?.length)
  },[callData,meetingData])

  const [callFormData, setCallFormData] = useState({
    customName: '',
    mobileNumber: '',
    remark: '',
    nextCallDate: ''
  });

  const [meetingFormData, setMeetingFormData] = useState({
    customName: '',
    mobileNumber: '',
    remark: '',
    nextMeetingDate: ''
  });

  const handleCallChange = (e) => {
    setCallFormData({ ...callFormData, [e.target.name]: e.target.value });
  };

  const handleMeetingChange = (e) => {
    setMeetingFormData({ ...meetingFormData, [e.target.name]: e.target.value });
  };

  const handleCallSubmit = (e) => {
    e.preventDefault();
    const callRecordData = {
      ...callFormData,
      lead: id,
    };
    dispatch(AddCall(callRecordData));
    setCallFormData({
        customName: '',
        mobileNumber: '',
        remark: '',
        nextCallDate: ''
    })
  };

  const handleMeetingSubmit = (e) => {
    e.preventDefault();
    const meetingData = {
      ...meetingFormData,
      lead: id,
    };
    dispatch(AddMeeting(meetingData)); // Dispatch the action to add a meeting
    setMeetingFormData({
        customName: '',
    mobileNumber: '',
    remark: '',
    nextMeetingDate: ''
    })
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US'); // e.g., "September 19, 2024"
  };

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

// Example usage
const isoDateString = '2024-09-19T02:47:32.603Z';
console.log(dateTimeFormat(isoDateString));
// Output: "September 19, 2024, 2:47:32 AM"

  

  return (
    <Flex justify="center" align="flex-start" wrap="wrap" gap="20px" mt="20px">
      {/* First Card */}
      <Card 
  style={{ width: '400px' }} 
  align="center"
  p={4} 
//   border="1px solid" 
  borderColor="gray.200" 
  borderRadius="xl"
>
  <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
    {currentLead?.name}
  </Text>
  <Text color={textColorSecondary} fontSize="sm">
    {currentLead?.loanType?.loanName}
  </Text>

  {/* Additional Lead Details */}
  <Box mt="20px" w="full">
    <Text fontWeight="bold" fontSize="lg" color={textColorPrimary}>
      Lead Details
    </Text>
    <Flex direction="column" mt="10px" w="full">
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Name:</Text>
        <Text color={textColorPrimary}>{currentLead?.name}</Text>
      </Flex>
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Created At</Text>
        <Text color={textColorPrimary}>{formatDate(currentLead?.createdAt)}</Text>
      </Flex>
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Mobile:</Text>
        <Text color={textColorPrimary}>{currentLead?.mobileNumber}</Text>
      </Flex>
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Alternate Mobile:</Text>
        <Text color={textColorPrimary}>{currentLead?.alternateMobileNumber || 'N/A'}</Text>
      </Flex>
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Email:</Text>
        <Text color={textColorPrimary}>{currentLead?.email}</Text>
      </Flex>
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Business Associate:</Text>
        <Text color={textColorPrimary}>{currentLead?.businessAssociate}</Text>
      </Flex>
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Referral Name:</Text>
        <Text color={textColorPrimary}>{currentLead?.referralName}</Text>
      </Flex>
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Last Applied Bank:</Text>
        <Text color={textColorPrimary}>{currentLead?.lastAppliedBank}</Text>
      </Flex>
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Last Rejection Reason:</Text>
        <Text color={textColorPrimary}>{currentLead?.lastRejectionReason}</Text>
      </Flex>
    </Flex>
  </Box>

  <Flex w="max-content" mx="auto" mt="26px">
    <Flex mx="auto" me="60px" align="center" direction="column">
      <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
        {totalCallCounts}
      </Text>
      <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
        Total Calls
      </Text>
    </Flex>
    <Flex mx="auto" me="60px" align="center" direction="column">
      <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
        {totalMeetCounts}
      </Text>
      <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
        Total Meetings
      </Text>
    </Flex>
    <Flex mx="auto" align="center" direction="column">
      <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
        9
      </Text>
      <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
        Status
      </Text>
    </Flex>
  </Flex>
</Card>

      <Card 
        style={{ width: '300px' }} 
        p={2} 
        border="none"
        borderRadius="2xl"
      >
        <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
          Schedule Call
        </Text>
        <Box as="form" onSubmit={handleCallSubmit} p={4}>
          <FormControl id="customName" isRequired>
            <FormLabel>Custom Name</FormLabel>
            <Input 
              type="text" 
              name="customName" 
              value={callFormData.customName} 
              onChange={handleCallChange} 
              placeholder="Enter custom name" 
              w="full"
            />
          </FormControl>

          <FormControl id="mobileNumber" isRequired mt={4}>
            <FormLabel>Mobile Number</FormLabel>
            <Input 
              type="number" 
              name="mobileNumber" 
              value={callFormData.mobileNumber} 
              onChange={handleCallChange} 
              placeholder="Enter mobile number" 
              w="full"
            />
          </FormControl>

          <FormControl id="remark" mt={4}>
            <FormLabel>Remark</FormLabel>
            <Textarea 
              name="remark" 
              value={callFormData.remark} 
              onChange={handleCallChange} 
              placeholder="Enter any remark" 
              w="full"
            />
          </FormControl>

          <FormControl id="nextCallDate" mt={4}>
            <FormLabel>Next Call Date & Time</FormLabel>
            <Input 
              type="datetime-local" 
              name="nextCallDate" 
              value={callFormData.nextCallDate} 
              onChange={handleCallChange} 
              w="full"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" mt={4}>
            Add Call Record
          </Button>
        </Box>
      </Card>

      {/* Meeting Form */}
      <Card 
        style={{ width: '300px' }} 
        p={2} 
        border="none"
        borderRadius="2xl"
        // mt="20px"
      >
        <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
          Schedule Meeting
        </Text>
        <Box as="form" onSubmit={handleMeetingSubmit} p={4}>
          <FormControl id="customName" isRequired>
            <FormLabel>Custom Name</FormLabel>
            <Input 
              type="text" 
              name="customName" 
              value={meetingFormData.customName} 
              onChange={handleMeetingChange} 
              placeholder="Enter custom name" 
              w="full"
            />
          </FormControl>

          <FormControl id="mobileNumber" isRequired mt={4}>
            <FormLabel>Mobile Number</FormLabel>
            <Input 
              type="number" 
              name="mobileNumber" 
              value={meetingFormData.mobileNumber} 
              onChange={handleMeetingChange} 
              placeholder="Enter mobile number" 
              w="full"
            />
          </FormControl>

          <FormControl id="remark" mt={4}>
            <FormLabel>Remark</FormLabel>
            <Textarea 
              name="remark" 
              value={meetingFormData.remark} 
              onChange={handleMeetingChange} 
              placeholder="Enter any remark" 
              w="full"
            />
          </FormControl>

          <FormControl id="nextMeetingDate" mt={4}>
            <FormLabel>Next Meeting Date & Time</FormLabel>
            <Input 
              type="datetime-local" 
              name="nextMeetingDate" 
              value={meetingFormData.nextMeetingDate} 
              onChange={handleMeetingChange} 
              w="full"
            />
          </FormControl>

          <Button type="submit" colorScheme="blue" mt={4}>
            Add Meeting
          </Button>
        </Box>
      </Card>

      <Card
      w="45%"
      px="0px"
      overflowX={{ sm: 'scroll', lg: 'scroll' }}
    >
         <Text color={textColor} px="20px" pt="10px" fontSize="22px" fontWeight="700" lineHeight="100%">
          Call Table
        </Text>
        <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
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
            {callData?.map((row) => (
              <Tr key={row._id}>
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
    <Card
      w="45%"
      overflowX={{ sm: 'scroll', lg: 'scroll' }}
    >
         <Text color={textColor} px="20px" pt="10px" fontSize="22px" fontWeight="700" lineHeight="100%">
          Meeting Table
        </Text>
        <Box>
        <Table variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
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
                Next Meeting Date
              </Th>
              <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
                Meeting Date
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {meetingData?.map((row) => (
              <Tr key={row._id}>
                <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }} borderColor="transparent">
                  <Text  color={textColor} fontSize="sm" fontWeight="700">
                    {row.customName}
                  </Text>
                </Td>
                <Td fontSize={{ sm: '14px' }}>{row.mobileNumber}</Td>
                <Td fontSize={{ sm: '14px' }}>{row.remark}</Td>
                <Td fontSize={{ sm: '14px' }}>{dateTimeFormat(row.nextMeetingDate)}</Td>
                <Td fontSize={{ sm: '14px' }}>{dateTimeFormat(row.meetingDate)}</Td>
                
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card>
    </Flex>
  );
};

export default LeadDetail;
