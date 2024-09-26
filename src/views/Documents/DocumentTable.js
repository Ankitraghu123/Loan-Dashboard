import { GetAllDocuments } from 'features/LoanType/loanTypeSlice';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Card, Flex, Text, Table, Thead, Tbody, Tr, Th, Td, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'; // Adjust imports as necessary
import { EditDocuments } from 'features/LoanType/loanTypeSlice';
import { deleteDocuments } from 'features/LoanType/loanTypeSlice';

const DocumentTable = () => {
    const dispatch = useDispatch();
    const tableData = useSelector((state) => state?.loanType?.allDocs); // Ensure you are selecting the right slice
    const allLoanTypes = useSelector((state) => state?.loanType?.allLoanTypes); // Ensure you fetch all loan types
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {deletedDocs,editedDocs,addedDocs} = useSelector(state => state.loanType)
    
    const [selectedDoc, setSelectedDoc] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        loanType: '',
        loanPersonType: '',
    });

    const [loanTypeSearch, setLoanTypeSearch] = useState('');
    const [loanPersonTypeSearch, setLoanPersonTypeSearch] = useState('');

    useEffect(() => {
        dispatch(GetAllDocuments());
    }, [dispatch,deletedDocs,editedDocs,addedDocs]);

    // Function to handle form changes
    const changeHandler = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Function to handle editing a document
    const handleEdit = () => {
        if (selectedDoc) {
            dispatch(EditDocuments({ id: selectedDoc._id, ...formData })); // Assuming you have an EditDocument action
            onClose();
        }
    };

    const handleDelete = (id) => {
        dispatch(deleteDocuments(id)); // Implement DeleteDocument action
    };

    const filteredTableData = tableData?.filter((doc) => {
        const matchesLoanType = loanTypeSearch ? doc.loanType.toLowerCase().includes(loanTypeSearch.toLowerCase()) : true;
        const matchesLoanPersonType = loanPersonTypeSearch ? doc.loanPersonType?.toLowerCase().includes(loanPersonTypeSearch.toLowerCase()) : true;
        return matchesLoanType && matchesLoanPersonType;
    });

    return (
        <Card flexDirection="column" w="100%" px="0px" mt="80px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
                <Text fontSize="22px" fontWeight="700" lineHeight="100%">
                    All Documents List
                </Text>
                </Flex>
                <Flex px="25px" mb="8px" gap="10px">
                <FormControl>
                    <FormLabel>Search by Loan Type</FormLabel>
                    <Input
                        placeholder="Enter loan type"
                        value={loanTypeSearch}
                        onChange={(e) => setLoanTypeSearch(e.target.value)}
                    />
                </FormControl>
                <FormControl>
                    <FormLabel>Search by Loan Person Type</FormLabel>
                    <Input
                        placeholder="Enter loan person type"
                        value={loanPersonTypeSearch}
                        onChange={(e) => setLoanPersonTypeSearch(e.target.value)}
                    />
                </FormControl>
            </Flex>
                {/* Add your Menu here if needed */}
            
            <Table variant="simple" color="gray.500" mb="24px" mt="12px">
                <Thead>
                    <Tr>
                        <Th>Name</Th>
                        <Th>Loan Type</Th>
                        <Th>Loan Person Type</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {filteredTableData?.map((row) => (
                        <Tr key={row._id}>
                            <Td>
                                <Text fontWeight="700">{row.name}</Text>
                            </Td>
                            <Td>{row.loanType}</Td>
                            <Td>{row.loanPersonType}</Td>
                            <Td>
                                <Button onClick={() => { 
                                    setSelectedDoc(row); 
                                    setFormData({ name: row.name, loanType: row.loanType._id, loanPersonType: row.loanPersonType }); // Fill the form
                                    onOpen(); 
                                }}>
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

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit Document</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <FormControl id="docName" mb="4">
                            <FormLabel>Name</FormLabel>
                            <Input
                                name="name"
                                value={formData.name}
                                onChange={changeHandler}
                                required
                                placeholder="Enter Document Name"
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
                            <Input
                                name="loanPersonType"
                                value={formData.loanPersonType}
                                onChange={changeHandler}
                                placeholder="Enter Loan Person Type"
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

export default DocumentTable;
