import { GetAllDocuments } from 'features/LoanType/loanTypeSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Flex, Text, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select, Box } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'; // Adjust imports as necessary
import { Col, Row } from 'react-bootstrap';
import { GetAllFileStages } from 'features/FileStages/FileStagesSlice';
import { EditFileStages } from 'features/FileStages/FileStagesSlice';
import { deleteFileStages } from 'features/FileStages/FileStagesSlice';

const FileStageTable = () => {
    const dispatch = useDispatch();
    const tableData = useSelector((state) => state?.fileStages?.allFileStage); // Ensure you are selecting the right slice
    const allLoanTypes = useSelector((state) => state?.loanType?.allLoanTypes); // Ensure you fetch all loan types
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {deletedFileStage,addedFileStage,editedFileStage} = useSelector(state => state.fileStages)
    
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        sequence:'',
        loanType: '',
        loanPersonType: '',
    });

    const [loanTypeSearch, setLoanTypeSearch] = useState('');
    const [loanPersonTypeSearch, setLoanPersonTypeSearch] = useState('');

    const [itemsPerPage, setItemsPerPage] = useState(5); // Default items per page
    const [currentPage, setCurrentPage] = useState(1);
    useEffect(() => {
        dispatch(GetAllFileStages());
    }, [dispatch,deletedFileStage,addedFileStage,editedFileStage]);

    // Function to handle form changes
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle editing a document
    const handleEdit = () => {
        if (selectedDoc) {
            dispatch(EditFileStages({ id: selectedDoc._id, ...formData })); // Assuming you have an EditDocument action
            onClose();
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteFileStages(id)); // Implement DeleteDocument action
    };

    const filteredTableData = tableData?.filter((doc) => {
        const matchesLoanType = loanTypeSearch ? doc.loanType.toLowerCase().includes(loanTypeSearch.toLowerCase()) : true;
        const matchesLoanPersonType = loanPersonTypeSearch ? doc.loanPersonType?.toLowerCase().includes(loanPersonTypeSearch.toLowerCase()) : true;
        return matchesLoanType && matchesLoanPersonType;
    });

    const totalItems = filteredTableData?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTableData?.slice(indexOfFirstItem, indexOfLastItem) || [];

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
        <Card flexDirection="column" w="100%" mt="80px" px="10px" py="10px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            <Flex px="5px" mb="8px" justifyContent="space-between" align="center">
                <Text fontSize="22px" fontWeight="700" lineHeight="100%">
                    All File Stage List
                </Text>
                </Flex>
                {/* <Flex px="25px" mb="8px" gap="10px"> */}
             <Row md={12} className='px-2'>
             <Col md={6}>
               {/* <FormControl> */}
                    <FormLabel>Loan Type</FormLabel>
                    <Input
                        placeholder="Search loan type"
                        value={loanTypeSearch}
                        onChange={(e) => setLoanTypeSearch(e.target.value)}
                    />
                {/* </FormControl> */}
               </Col>
                <Col md={6}>
                {/* <FormControl> */}
                    <FormLabel>Profile Type</FormLabel>
                    <Input
                        placeholder="Search profile type"
                        value={loanPersonTypeSearch}
                        onChange={(e) => setLoanPersonTypeSearch(e.target.value)}
                    />
                {/* </FormControl> */}
                </Col>
             </Row>
            {/* </Flex> */}
            <Flex mt="4" justifyContent="flex-end" className='px-2'>
        <Select value={itemsPerPage} onChange={handleItemsPerPageChange} width={{ base: '100%', md: '200px' }}>
          <option value={5}>5 items per page</option>
          <option value={10}>10 items per page</option>
          <option value={20}>20 items per page</option>
        </Select>
      </Flex>
                {/* Add your Menu here if needed */}
            
            <Box overflowX="auto" maxHeight="400px" mb="24px">
            <Table className='table' variant="simple" color="gray.500" mb="24px" mt="12px">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Loan Type</Th>
                        <Th>Profile Type</Th>
                        <Th>Sequence</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {currentItems?.map((row) => (
                        <Tr key={row._id}>
                            <Td>
                                <Text fontWeight="700">{row.name}</Text>
                            </Td>
                            <Td>{row.loanType}</Td>
                            <Td>{row.loanPersonType}</Td>
                            <Td>{row.sequence}</Td>
                            <Td>
                               <div className='d-flex'>
                               <Button onClick={() => { 
                                    setSelectedDoc(row); 
                                    setFormData({ name: row.name, loanType: row.loanType._id, loanPersonType: row.loanPersonType,sequence:row.sequence }); // Fill the form
                                    onOpen(); 
                                }}>
                                    <EditIcon />
                                </Button>
                                <button onClick={() => handleDelete(row._id)} colorScheme="red" ml="4" className='deletebtn'>
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
                    <ModalHeader>Edit FileStage</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="filestageName" mb="4">
                            <FormLabel>Name</FormLabel>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={changeHandler}
                                required
                                placeholder="Enter FileStage Name"
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
                            <FormLabel>Profile Type</FormLabel>
                            <Select
                                name="loanPersonType"
                                value={formData.loanPersonType}
                                onChange={changeHandler}
                                // isInvalid={!!errors.loanPersonType}
                            >
                                <option value="">Select Profile Type</option>
                                <option value="selfEmployed">Self Employeed</option>
                                <option value="salaried">Salaried</option></Select>
                        </FormControl>
                        <FormControl id="sequence" mb="4">
                            <FormLabel>Sequence</FormLabel>
                            <Input
                            type='number'
                                name="sequence"
                                value={formData.sequence}
                                onChange={changeHandler}
                                required
                                placeholder="Enter Sequence"
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
}

export default FileStageTable;
