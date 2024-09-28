import React, { useEffect, useState } from 'react';
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
import { toast } from 'react-toastify';

const AllLeads = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state?.lead?.AllLeads?.data);
  const allLoanTypes = useSelector((state) => state?.loanType?.allLoanTypes); // Assuming you have loan types data
  const {editedLead,deletedLead} = useSelector(state => state.lead)
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLead, setSelectedLead] = useState(null);

  const [searchTerm, setSearchTerm] = useState(''); 

  const [formData, setFormData] = useState({
    name: '',
    mobileNumber: '',
    alternateMobileNumber: '',
    email: '',
    loanType: '',
    loanPersonType:'',
    businessAssociate: '',
    referralName: '',
    lastAppliedBank: '',
    lastRejectionReason: ''
  });

  const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
  const [currentPage, setCurrentPage] = useState(1);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(GetAllLeads());
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
        loanPersonType:selectedLead.loanPersonType || '',
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

  const filteredData = tableData?.filter((row) => 
    row.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.mobileNumber.toString().includes(searchTerm) || // Convert mobile to string
    row.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.loanType?.loanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.businessAssociate?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    row.lastAppliedBank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalItems = filteredData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData?.slice(indexOfFirstItem, indexOfLastItem) || [];

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page
  };

  return (
    <Card flexDirection="column" w="100%" px="10px" mt="80px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px="25px" mb="8px" justifyContent={{base:'center',md:"space-between"}} align="center"  flexDirection={{ base: 'column', md: 'row' }}   gap={{ base: '10px', md: '0' }}>
        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%"   mb={{ base: '10px', md: '0' }}>
          Leads Table
        </Text>
        <Flex mb="4">
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className='w-auto'
        />
      </Flex>
      </Flex>
        {/* Items per page selection */}
        <Flex mb="4" justifyContent="flex-end" px="25px">
        <Select value={itemsPerPage} onChange={handleItemsPerPageChange} width="200px">
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={20}>20 items per page</option>
        </Select>
      </Flex>
      <Box overflowX="auto" maxHeight="400px" mb="24px">
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
                Email
              </Th>
              <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
                Loan Type
              </Th>
              <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
                Loan Person Type
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
            {currentItems?.map((row) => (
              <Tr key={row._id}>
                <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }} borderColor="transparent">
                  <Text color={textColor} fontSize="sm" fontWeight="700">
                    <Link to={`/admin/lead-detail/${row._id}`}>{row.name}</Link>
                  </Text>
                </Td>
                <Td fontSize={{ sm: '14px' }}>{row.mobileNumber}</Td>
                <Td fontSize={{ sm: '14px' }}>{row.email}</Td>
                <Td fontSize={{ sm: '14px' }}>{row.loanType?.loanName}</Td>
                <Td fontSize={{ sm: '14px' }}>{row.loanPersonType}</Td>
                <Td fontSize={{ sm: '14px' }}>{row.businessAssociate?.name}</Td>
                <Td fontSize={{ sm: '14px' }}>{row.lastAppliedBank}</Td>
                <Td>
                 <div className='d-flex'>
                 <Button onClick={() => { setSelectedLead(row); onOpen(); }}>
                    <EditIcon />
                  </Button>
                  <button className='deletebtn' onClick={() => handleDelete(row._id)} colorScheme="red" ml="4">
                    <DeleteIcon />
                  </button>
                 </div>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>

      <Flex justifyContent="space-between" alignItems="center" px="25px" mt="4">
        <Button onClick={handlePreviousPage} isDisabled={currentPage === 1}>
          Previous
        </Button>
        <Text>
          Page {currentPage} of {totalPages}
        </Text>
        <Button onClick={handleNextPage} isDisabled={currentPage === totalPages}>
          Next
        </Button>
      </Flex>

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

            <FormControl id="loanPersonType" mb="4">
              <FormLabel>Loan Person Type</FormLabel>
              <Select
                name="loanPersonType"
                value={formData.loanPersonType}
            onChange={changeHandler}
            // isInvalid={!!errors.loanPersonType}
        >
            <option value="">Select loan Person Type</option>
            <option value="selfEmployed">Self Employeed</option>
            <option value="salaried">Salaried</option>
              </Select>
            </FormControl>
            <FormControl id="businessAssociate" mb="4">
              <FormLabel>Business Associate</FormLabel>
              <Input
                name="businessAssociate"
                value={formData.businessAssociate.name}
                onChange={changeHandler}
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
  );
};

export default AllLeads;
