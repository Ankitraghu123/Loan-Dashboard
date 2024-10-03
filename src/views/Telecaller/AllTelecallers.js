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
import { GetAllTelecaller, DeleteTelecaller, EditTelecaller } from 'features/Telecaller/TelecallerSlice';

const AllTelecallers = () => {
  const dispatch = useDispatch();
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const tableData = useSelector(state => state.telecaller?.allTelecaller?.data);
  const {editedTelecaller,deletedTelecaller} = useSelector(state => state.telecaller)
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedTelecaller, setSelectedTelecaller] = useState(null);
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
    dispatch(GetAllTelecaller());
  }, [dispatch,editedTelecaller,deletedTelecaller]);

  useEffect(() => {
    if (selectedTelecaller) {
      setFormData({
        name: selectedTelecaller.name || '',
        mobile: selectedTelecaller.mobile || '',
        email: selectedTelecaller.email || '',
        password: selectedTelecaller.password || '',
      });
    }
  }, [selectedTelecaller]);

  const handleDelete = (id) => {
    dispatch(DeleteTelecaller(id));
  };

  const handleEdit = () => {
    dispatch(EditTelecaller({ id: selectedTelecaller._id, ...formData }));
    onClose();
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Pagination Logic
  const filteredData = tableData?.filter(telecaller =>
    telecaller.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    telecaller.mobile.toString().includes(searchTerm) ||
    telecaller.email.toLowerCase().includes(searchTerm.toLowerCase())
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
        <Text color={textColor} fontSize="22px" fontWeight="700">All Telecallers</Text>
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
            {currentItems?.map((telecaller) => (
              <Tr key={telecaller._id}>
                <Td><Text color={textColor}>{telecaller.name}</Text></Td>
                <Td>{telecaller.mobile}</Td>
                <Td>{telecaller.email}</Td>
                <Td>{telecaller.password}</Td>
                <Td>
                  <Button onClick={() => { setSelectedTelecaller(telecaller); onOpen(); }}><EditIcon /></Button>
                  <Button onClick={() => handleDelete(telecaller._id)} ml="4"><DeleteIcon /></Button>
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
          <ModalHeader>Edit Telecaller</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="4">
              <FormLabel>Name</FormLabel>
              <Input name="name" value={formData.name} onChange={changeHandler} placeholder="Enter Telecaller Name" />
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

export default AllTelecallers;
