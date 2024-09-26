import { useDisclosure } from '@chakra-ui/react'
import { GetAllAssociates } from 'features/BusinessAssociate/BusinessAssociateSlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
  import Card from 'components/card/Card';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import Menu from 'components/menu/MainMenu';
import { Link } from 'react-router-dom';
import { DeleteAssociate } from 'features/BusinessAssociate/BusinessAssociateSlice';
import { EditAssociate } from 'features/BusinessAssociate/BusinessAssociateSlice';




const AllAssociates = () => {
    const dispatch = useDispatch()
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
    const tableData = useSelector(state => state.associate?.allAssociate)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedAssociate, setSelectedAssociate] = useState(null);
    const [errors, setErrors] = useState({});
    const {EditedAssociate,deletedAssociate} = useSelector(state => state.associate)

    const [formData, setFormData] = useState({
      name: '',
      mobile: '',
      email: '',
      currentDesignation: '',
      currentBank: '',
      location: '',
    });
    useEffect(() => {
        dispatch(GetAllAssociates())
    },[dispatch,EditedAssociate,deletedAssociate])

    useEffect(() => {
        if (selectedAssociate) {
          setFormData({
            name: selectedAssociate.name || '',
            mobile: selectedAssociate.mobile || '',
            email: selectedAssociate.email || '',
            currentDesignation: selectedAssociate.currentDesignation?._id || '',
            currentBank: selectedAssociate.currentBank || '',
            location: selectedAssociate.location || '',
          });
        }
      }, [selectedAssociate]);


    const handleDelete = (id) => {
        dispatch(DeleteAssociate(id));
      };


      const handleEdit = () => {
        // Add validation logic if necessary
        dispatch(EditAssociate({ id: selectedAssociate._id, ...formData }));
        onClose();
      };
    
      const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };
  return (
    <Card flexDirection="column" w="100%" px="10px" mt="80px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
    <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
      <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
        All Associates
      </Text>
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
               Email
            </Th>
            <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
              Current Designation
            </Th>
            <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
              Current Bank
            </Th>
            <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
              Location
            </Th>
            <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
              Actions
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {tableData?.map((row) => (
            <Tr key={row._id}>
              <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }} borderColor="transparent">
                <Text color={textColor} fontSize="sm" fontWeight="700">
                  <Link to={`/admin/lead-detail/${row._id}`}>{row.name}</Link>
                </Text>
              </Td>
              <Td fontSize={{ sm: '14px' }}>{row.mobile}</Td>
              <Td fontSize={{ sm: '14px' }}>{row.email}</Td>
              <Td fontSize={{ sm: '14px' }}>{row.currentDesignation}</Td>
              <Td fontSize={{ sm: '14px' }}>{row.currentBank}</Td>
              <Td fontSize={{ sm: '14px' }}>{row.location}</Td>
              <Td className='d-flex'>
                <Button onClick={() => { setSelectedAssociate(row); onOpen(); }}>
                  <EditIcon />
                </Button>
                <button onClick={() => handleDelete(row._id)} colorScheme="red" ml="4" className='deletebtn'>
                  <DeleteIcon />
                </button>
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
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={changeHandler}
              required
              placeholder="Enter Associate Name"
            />
          </FormControl>
          <FormControl id="mobile" mb="4">
            <FormLabel>Mobile Number</FormLabel>
            <Input
              name="mobile"
              value={formData.mobile}
              onChange={changeHandler}
              type="tel"
              placeholder="Enter Mobile Number"
              isInvalid={!!errors.mobile}
            />
            {errors.mobile && <Text color="red.500">{errors.mobile}</Text>}
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
          <FormControl id="currentDesignation" mb="4">
            <FormLabel>Current Designation</FormLabel>
            <Input
              name="currentDesignation"
              value={formData.currentDesignation}
            //   onChange={changeHandler}
              placeholder="Enter Current Designation"
            />
          </FormControl>
          <FormControl id="currentBank" mb="4">
            <FormLabel>Current Bank</FormLabel>
            <Input
              name="currentBank"
              value={formData.currentBank}
              onChange={changeHandler}
              placeholder="Enter Current Bank"
            />
          </FormControl>
          <FormControl id="location" mb="4">
            <FormLabel>Last Location</FormLabel>
            <Input
              name="location"
              value={formData.location}
              onChange={changeHandler}
              placeholder="Enter Location"
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

export default AllAssociates