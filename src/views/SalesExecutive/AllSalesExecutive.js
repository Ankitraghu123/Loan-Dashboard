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
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useDisclosure } from '@chakra-ui/react';
import { GetAllSalesExecutive, DeleteSalesExecutive, EditSalesExecutive } from 'features/SalesExecutive/SalesExecutiveSlice';

const AllSalesExecutive = () => {
  const dispatch = useDispatch();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const tableData = useSelector(state => state.salesExecutive?.allSalesExecutive?.data);
  const {editedSalesExecutive,deletedSalesExecutive} = useSelector(state => state.salesExecutive)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSalesExecutive, setSelectedSalesExecutive] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    password: '',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    dispatch(GetAllSalesExecutive());
  }, [dispatch,editedSalesExecutive,deletedSalesExecutive]);

  useEffect(() => {
    if (selectedSalesExecutive) {
      setFormData({
        name: selectedSalesExecutive.name || '',
        mobile: selectedSalesExecutive.mobile || '',
        email: selectedSalesExecutive.email || '',
        password: selectedSalesExecutive.password || '',
      });
    }
  }, [selectedSalesExecutive]);

  const handleDelete = (id) => {
    dispatch(DeleteSalesExecutive(id));
  };

  const handleEdit = () => {
    dispatch(EditSalesExecutive({ id: selectedSalesExecutive._id, ...formData }));
    onClose();
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Pagination Logic
  const filteredData = tableData?.filter(salesExecutive =>
    salesExecutive.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    salesExecutive.mobile.toString().includes(searchTerm) ||
    salesExecutive.email.toLowerCase().includes(searchTerm.toLowerCase())
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
    <Box w="100%" px="10px" mt="80px">
      <Flex px="25px" mb="8px" justifyContent="space-between" alignItems="center">
        <Text color={textColor} fontSize="22px" fontWeight="700">All SalesExecutives</Text>
        <Input
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          width="300px"
          borderColor="gray.300"
        />
      </Flex>

      <Flex mb="4" justifyContent="flex-end" px="25px">
        <Select value={itemsPerPage} onChange={handleItemsPerPageChange} width={{ base: '100%', md: '200px' }}>
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={20}>20 items per page</option>
        </Select>
      </Flex>

      <Box overflowX="auto" mb="24px">
        <Table className='table' variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            <Tr>
              <Th color="gray.400">Name</Th>
              <Th color="gray.400">Mobile</Th>
              <Th color="gray.400">Email</Th>
              <Th color="gray.400">Password</Th>
              <Th color="gray.400">Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {currentItems?.map((salesExecutive) => (
              <Tr key={salesExecutive._id}>
                <Td><Text color={textColor}>{salesExecutive.name}</Text></Td>
                <Td>{salesExecutive.mobile}</Td>
                <Td>{salesExecutive.email}</Td>
                <Td>{salesExecutive.password}</Td>
                <Td>
                  <Button onClick={() => { setSelectedSalesExecutive(salesExecutive); onOpen(); }}><EditIcon /></Button>
                  <Button onClick={() => handleDelete(salesExecutive._id)} ml="4"><DeleteIcon /></Button>
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
          <ModalHeader>Edit SalesExecutive</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="4">
              <FormLabel>Name</FormLabel>
              <Input name="name" value={formData.name} onChange={changeHandler} placeholder="Enter SalesExecutive Name" />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Mobile</FormLabel>
              <Input name="mobile" value={formData.mobile} onChange={changeHandler} placeholder="Enter Mobile Number" />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Email</FormLabel>
              <Input name="email" value={formData.email} onChange={changeHandler} placeholder="Enter Email" />
            </FormControl>
            <FormControl mb="4">
              <FormLabel>Password</FormLabel>
              <Input name="password" value={formData.password} onChange={changeHandler} placeholder="Enter Password" />
            </FormControl>
            <Button colorScheme="blue" onClick={handleEdit}>Save Changes</Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default AllSalesExecutive;
