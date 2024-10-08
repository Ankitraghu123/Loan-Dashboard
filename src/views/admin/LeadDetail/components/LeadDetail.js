import { Box, Flex, Text, useColorModeValue, Button, FormControl, FormLabel, Input, Textarea, Card, Thead, Tr, Th, Tbody, Td,Table, ModalOverlay, ModalContent, ModalCloseButton,useDisclosure,Modal, ModalBody, ModalFooter, ModalHeader, Checkbox } from '@chakra-ui/react';
import { GetAllByLead } from 'features/CallRecords/CallSlice';
import { AddCall } from 'features/CallRecords/CallSlice';
import { GetSingleLead } from 'features/Lead/leadSlice';
import { GetAllMeetingByLead } from 'features/MeetingRecords/MeetingSlice';
import { AddMeeting  } from 'features/MeetingRecords/MeetingSlice';
import React, { useEffect, useState } from 'react';
// import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Timeline from './Timeline';
import { isAssociate } from 'utils/config';
import { isAdmin } from 'utils/config';
import { EditLead } from 'features/Lead/leadSlice';
import { FaLongArrowAltRight } from 'react-icons/fa';
// import {  } from 'react-bootstrap';

const LeadDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [rejectReason, setRejectReason] = useState("");
  // const [isAdmin(),setIsAdmin]= useState(false)

  const callData = useSelector(state => state.callRecords?.callRecords?.data)
  const sortedCallData = Array.isArray(callData) 
    ? [...callData].sort((a, b) => {
        if (a.isImportant === b.isImportant) {
          return 0; // No change if both have the same importance
        }
        return a.isImportant ? -1 : 1; // Place important calls on top
      })
    : [];
  const meetingData = useSelector(state => state.meetingRecords?.meetingByLead?.data)
  const sortedMeetingData = Array.isArray(meetingData) 
    ? [...meetingData].sort((a, b) => {
        if (a.isImportant === b.isImportant) {
          return 0; // No change if both have the same importance
        }
        return a.isImportant ? -1 : 1; // Place important calls on top
      })
    : [];

  const {callAdded} = useSelector(state => state?.callRecords)
  const {meetingAdded} = useSelector(state => state?.meetingRecords)

  const currentLead = useSelector((state) => state.lead?.singleLead?.data);
  const totalDocs = currentLead?.docs?.length;
  const currentPending = currentLead?.docs?.filter(doc => doc.status === 'pending');
  const textColorPrimary = useColorModeValue('secondaryGray.900', 'white');
  const textColorSecondary = 'gray.400';
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const [totalCallCounts,setTotalCallCounts] = useState(callData?.length)
  const [totalMeetCounts,setTotalMeetCounts] = useState(meetingData?.length)
  const {updatedleadfileStage} = useSelector(state => state.fileStages)

  useEffect(()=>{
    dispatch(GetAllByLead(id))
    dispatch(GetAllMeetingByLead(id))
    dispatch(GetSingleLead(id));
  },[dispatch,callAdded,meetingAdded,id,updatedleadfileStage])

  useEffect(() => {
    setTotalCallCounts(callData?.length)
    setTotalMeetCounts(meetingData?.length)
  },[callData,meetingData])

  const [callFormData, setCallFormData] = useState({
    customName: '',
    mobileNumber: '',
    remark: '',
    nextCallDate: '',
    isImportant:false
  });

  const [meetingFormData, setMeetingFormData] = useState({
    customName: '',
    mobileNumber: '',
    remark: '',
    nextMeetingDate: '',
    isImportant:false
  });

  const handleCallChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCallFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox value
    }));
  };

  const handleMeetingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMeetingFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value, // Handle checkbox value
    }));
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
        nextCallDate: '',
        isImportant:false
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
    nextMeetingDate: '',
    isImportant:false
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


const handleRejectSubmit = () => {
  // Dispatch action or API call to update lead status to rejected
  const updatedLead = {
    status: "rejected",
    rejectReason,
  };

  dispatch(EditLead({id,...updatedLead}));

  onClose(); // Close modal after submission
};

// Example usage
const isoDateString = '2024-09-19T02:47:32.603Z';
console.log(dateTimeFormat(isoDateString));
// Output: "September 19, 2024, 2:47:32 AM"

  

  return (
   <>
    <Flex justify="center" align="flex-start" wrap="wrap" gap="20px" style={{marginTop:"80px"}}>
      {/* First Card */}
      <Card 
  style={{ width: isAdmin() ? '400px' : '500px' }} 
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
        <Text color={textColorSecondary}>Lead Given At</Text>
        <Text color={textColorPrimary}>{formatDate(currentLead?.createdAt)}</Text>
      </Flex>
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Mobile:</Text>
        <Text color={textColorPrimary}>{currentLead?.mobileNumber}</Text>
      </Flex>
      {!isAssociate() ? <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Alternate Mobile:</Text>
        <Text color={textColorPrimary}>{currentLead?.alternateMobileNumber || 'N/A'}</Text>
      </Flex> : null}
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Email:</Text>
        <Text color={textColorPrimary}>{currentLead?.email}</Text>
      </Flex>
     {!isAssociate() ?  <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Business Associate:</Text>
        <Text color={textColorPrimary}>{currentLead?.referralName == 'Yes' ? currentLead?.businessAssociate?.name : 'NA'}</Text>
      </Flex> : null}
      {/* <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Referral Name:</Text>
        <Text color={textColorPrimary}>{currentLead?.referralName}</Text>
      </Flex> */}
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

 {!isAssociate() ?  
<>
<Flex w="max-content" mx="auto" mt="26px">
    <Flex mx="auto" me="60px" align="center" direction="column">
      <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
        {totalCallCounts ? totalCallCounts : 0}
      </Text>
      <Text color={textColorSecondary} fontSize="sm" fontWeight="400">
        Total Calls
      </Text>
    </Flex>
    <Flex mx="auto" me="60px" align="center" direction="column">
      <Text color={textColorPrimary} fontSize="2xl" fontWeight="700">
        {totalMeetCounts ? totalMeetCounts : 0}
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
  <Flex className='w-100'><Link to={`/admin/view-docs/${id}`} className='w-100'>
  <button className='submitBtn' type="submit">
            View Dcouments
          </button>
  </Link>
  <button className='submitBtn' onClick={onOpen}>
            Reject Lead
          </button></Flex>
</>
  : null}
</Card>

<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reject Lead</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Textarea
              placeholder="Enter rejection reason"
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
            />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" onClick={handleRejectSubmit}>
              Submit Rejection
            </Button>
            <Button onClick={onClose} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

{isAssociate() ? <Card 
  style={{ width: isAdmin() ? '400px' : '500px' }} 
  align="center"
  p={4} 
//   border="1px solid" 
  borderColor="gray.200" 
  borderRadius="xl"
>
  {/* <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="10px">
    {currentLead?.name}
  </Text>
  <Text color={textColorSecondary} fontSize="sm">
    {currentLead?.loanType?.loanName}
  </Text> */}

  {/* Additional Lead Details */}
  <Box mt="20px" w="full">
    <Text fontWeight="bold" fontSize="lg" color={textColorPrimary}>
      Lead Details
    </Text>
    <Flex direction="column" mt="10px" w="full">
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Current Bank</Text>
        <Text color={textColorPrimary}>SBI</Text>
      </Flex>
      {/* <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Current ROI</Text>
        <Text color={textColorPrimary}>5%</Text>
      </Flex> */}
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Last Status Of File</Text>
        <Text color={textColorPrimary}>PD</Text>
      </Flex>
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>My Estimated Payout</Text>
        <Text color={textColorPrimary}>5000</Text>
      </Flex>
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Total Documents</Text>
        <Text color={textColorPrimary}>{totalDocs}</Text>
      </Flex>
      <Flex justify="space-between" mb="2">
        <Text color={textColorSecondary}>Pending Documents</Text>
        <Text color={textColorPrimary}>{currentPending?.length}</Text>
      </Flex>
    </Flex>
  </Box>

  <Flex w="full" mx="auto" mt="40px">
    
    
    
  <Link to={`/admin/view-docs/${id}`} className='d-flex w-100'>
      <button  className='submitBtn' color={textColorPrimary} fontSize="md" fontWeight="800">
        View Documents
      </button>
      </Link>
  </Flex>
</Card> : null}


     {isAdmin() ?  <Card 
        style={{ width: '300px' }} 
        p={2} 
        border="none"
        borderRadius="2xl"
      >
        <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="15px">
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
          <FormControl id="isImportant" mt={4}>
              <Checkbox
                name="isImportant"
                isChecked={callFormData.isImportant}
                onChange={handleCallChange}
              >
                Is Important
              </Checkbox>
            </FormControl>

         <div className='d-flex mt-4'>
         <button className='submitBtn' type="submit" colorScheme="blue" mt={9}>
            Add Call Record
          </button>
         </div>
        </Box>
      </Card> : null}

      {/* Meeting Form */}
     {isAdmin()?  <Card 
        style={{ width: '300px' }} 
        p={2} 
        border="none"
        borderRadius="2xl"
        // mt="20px"
      >
        <Text color={textColorPrimary} fontWeight="bold" fontSize="xl" mt="15px">
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

          <FormControl id="isImportant" mt={4}>
              <Checkbox
                name="isImportant"
                isChecked={meetingFormData.isImportant}
                onChange={handleMeetingChange}
              >
                Is Important
              </Checkbox>
            </FormControl>

          <div className='d-flex mt-4'>
          <button className='submitBtn' type="submit" colorScheme="blue" mt={9}>
            Add Meeting
          </button>
          </div>
        </Box>
      </Card> : null}

      {isAdmin() ? <Card
      // w="45%"
      px="10px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
         <Flex alignItems='center' justifyContent='space-between' width='full'>
         <Text color={textColor} px="20px" pt="10px" fontSize="22px" fontWeight="700" lineHeight="100%">
          Call Table 
        </Text>
        <Text><Link to={`/admin/all-calls/${id}`}><FaLongArrowAltRight /></Link></Text>
         </Flex>
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
            {sortedCallData?.map((row,idx) => (
             idx < 5 ?  <Tr key={row._id} id={row.isImportant ? 'isImportant' : null}>
             <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }} borderColor="transparent">
               <Text  color={textColor} fontSize="sm" fontWeight="700">
                 {row.customName}
               </Text>
             </Td>
             <Td fontSize={{ sm: '14px' }}>{row.mobileNumber}</Td>
             <Td fontSize={{ sm: '14px' }}>{row.remark}</Td>
             <Td fontSize={{ sm: '14px' }}>{dateTimeFormat(row.nextCallDate)}</Td>
             <Td fontSize={{ sm: '14px' }}>{dateTimeFormat(row.callDate)}</Td>
             
           </Tr> : null
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card> : null}
    {isAdmin() ? <Card
      // w="45%"
      px="10px"
      mb="20px"
      overflowX={{ sm: 'scroll', lg: 'hidden' }}
    >
         <Flex alignItems='center' justifyContent='space-between' width='full'>
         <Text color={textColor} px="20px" pt="10px" fontSize="22px" fontWeight="700" lineHeight="100%">
          Meeting Table
        </Text>
        <Text><Link to={`/admin/all-meetings/${id}`}><FaLongArrowAltRight /></Link></Text>
         </Flex>
        <Box>
        <Table className='table' variant="simple" color="gray.500" mb="24px" mt="12px">
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
            {sortedMeetingData?.map((row,idx) => (
             idx < 5 ?  <Tr key={row._id} id={row.isImportant ? 'isImportant' : null}>
             <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }} borderColor="transparent">
               <Text  color={textColor} fontSize="sm" fontWeight="700">
                 {row.customName}
               </Text>
             </Td>
             <Td fontSize={{ sm: '14px' }}>{row.mobileNumber}</Td>
             <Td fontSize={{ sm: '14px' }}>{row.remark}</Td>
             <Td fontSize={{ sm: '14px' }}>{dateTimeFormat(row.nextMeetingDate)}</Td>
             <Td fontSize={{ sm: '14px' }}>{dateTimeFormat(row.meetingDate)}</Td>
             
           </Tr> : null
            ))}
          </Tbody>
        </Table>
      </Box>
    </Card> : null}
    </Flex>

    
    <Timeline/></>
  );
};

export default LeadDetail;
