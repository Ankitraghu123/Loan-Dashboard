import React, { useEffect, useState } from 'react'
import {
  Box,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Input,
  FormControl,
  FormLabel,
  Select,
  useDisclosure,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { useDispatch, useSelector } from 'react-redux';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { GetAllLeads, DeleteLead, EditLead } from 'features/Lead/leadSlice';
import { Link } from 'react-router-dom';
import { GetAllLoans } from 'features/LoanType/loanTypeSlice';

const LeadTable= ({tableData,tableName}) => {
    const dispatch = useDispatch()
    const allLoanTypes = useSelector((state) => state?.loanType?.allLoanTypes); // Assuming you have loan types data
    const {editedLead,deletedLead} = useSelector(state => state.lead)
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedLead, setSelectedLead] = useState(null);
    const [formData, setFormData] = useState({
      name: '',
      mobileNumber: '',
      alternateMobileNumber: '',
      email: '',
      loanType: '',
      businessAssociate: '',
      referralName: '',
      lastAppliedBank: '',
      lastRejectionReason: ''
    });
    const [errors, setErrors] = useState({});
    useEffect(() => {
      dispatch(GetAllLoans())
      // Fetch loan types if necessary
    }, [dispatch,editedLead,deletedLead]);
  
    useEffect(() => {
      if (selectedLead) {
        setFormData({
          name: selectedLead.name || '',
          mobileNumber: selectedLead.mobileNumber || '',
          alternateMobileNumber: selectedLead.alternateMobileNumber || '',
          email: selectedLead.email || '',
          loanType: selectedLead.loanType?._id || '',
          businessAssociate: selectedLead.businessAssociate || '',
          referralName: selectedLead.referralName || '',
          lastAppliedBank: selectedLead.lastAppliedBank || '',
          lastRejectionReason: selectedLead.lastRejectionReason || ''
        });
      }
    }, [selectedLead]);
  
    const handleDelete = (id) => {
      dispatch(DeleteLead(id));
    };
  
    const handleEdit = () => {
      // Add validation logic if necessary
      dispatch(EditLead({ id: selectedLead._id, ...formData }));
      onClose();
    };
  
    const changeHandler = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };
  
    return (
      <Card flexDirection="column" w="100%" px="0px" mt="80px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
          {tableName}
        </Text>
        <Menu />
      </Flex>
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
                Email
              </Th>
              <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
                Loan Type
              </Th>
              <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
                Business Associate
              </Th>
              <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
                Last Applied Bank
              </Th>
              <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData?.data?.map((row) => (
              <Tr key={row._id}>
                <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }} borderColor="transparent">
                  <Text color={textColor} fontSize="sm" fontWeight="700">
                    <Link to={`/admin/lead-detail/${row._id}`}>{row.name}</Link>
                  </Text>
                </Td>
                <Td fontSize={{ sm: '14px' }}>{row.mobileNumber}</Td>
                <Td fontSize={{ sm: '14px' }}>{row.email}</Td>
                <Td fontSize={{ sm: '14px' }}>{row.loanType?.loanName}</Td>
                <Td fontSize={{ sm: '14px' }}>{row.businessAssociate.name}</Td>
                <Td fontSize={{ sm: '14px' }}>{row.lastAppliedBank}</Td>
                <Td>
                  <Button onClick={() => { setSelectedLead(row); onOpen(); }}>
                    <EditIcon />
                  </Button>
                  <Button onClick={() => handleDelete(row._id)} colorScheme="red" ml="4">
                    <DeleteIcon />
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
  
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Lead</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl id="leadName" mb="4">
              <FormLabel>Lead Name</FormLabel>
              <Input
                name="name"
                value={formData.name}
                onChange={changeHandler}
                required
                placeholder="Enter Lead Name"
              />
            </FormControl>
            <FormControl id="mobileNumber" mb="4">
              <FormLabel>Mobile Number</FormLabel>
              <Input
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={changeHandler}
                type="tel"
                placeholder="Enter Mobile Number"
                isInvalid={!!errors.mobileNumber}
              />
              {errors.mobileNumber && <Text color="red.500">{errors.mobileNumber}</Text>}
            </FormControl>
            <FormControl id="alternateMobileNumber" mb="4">
              <FormLabel>Alternate Mobile Number</FormLabel>
              <Input
                name="alternateMobileNumber"
                value={formData.alternateMobileNumber}
                onChange={changeHandler}
                type="tel"
                placeholder="Enter Alternate Mobile Number"
              />
            </FormControl>
            <FormControl id="email" mb="4">
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={formData.email}
                onChange={changeHandler}
                type="email"
                placeholder="Enter Email"
              />
            </FormControl>
            <FormControl id="loanType" mb="4">
              <FormLabel>Loan Type</FormLabel>
              <Select
                name="loanType"
                value={formData.loanType}
                onChange={changeHandler}
                required
              >
                <option value="">Select Loan Type</option>
                {allLoanTypes?.map((loan) => (
                  <option key={loan._id} value={loan._id}>
                    {loan.loanName}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl id="businessAssociate" mb="4">
              <FormLabel>Business Associate</FormLabel>
              <Input
                name="businessAssociate"
                value={formData.businessAssociate.name}
              //   onChange={changeHandler}
                placeholder="Enter Business Associate"
              />
            </FormControl>
            <FormControl id="referralName" mb="4">
              <FormLabel>Referral Name</FormLabel>
              <Input
                name="referralName"
                value={formData.referralName}
                onChange={changeHandler}
                placeholder="Enter Referral Name"
                isInvalid={!!errors.referralName}
              />
              {errors.referralName && <Text color="red.500">{errors.referralName}</Text>}
            </FormControl>
            <FormControl id="lastAppliedBank" mb="4">
              <FormLabel>Last Applied Bank</FormLabel>
              <Input
                name="lastAppliedBank"
                value={formData.lastAppliedBank}
                onChange={changeHandler}
                placeholder="Enter Last Applied Bank"
              />
            </FormControl>
            <FormControl id="lastRejectionReason" mb="4">
              <FormLabel>Last Rejection Reason</FormLabel>
              <Input
                name="lastRejectionReason"
                value={formData.lastRejectionReason}
                onChange={changeHandler}
                placeholder="Enter Last Rejection Reason"
              />
            </FormControl>
            <Button colorScheme="blue" onClick={handleEdit}>
              Save Changes
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
    )
  }
  
  export default LeadTable
  