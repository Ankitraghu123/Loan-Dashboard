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
  useDisclosure,
} from '@chakra-ui/react';
import Card from 'components/card/Card';
import Menu from 'components/menu/MainMenu';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllLoans, EditLoan } from 'features/LoanType/loanTypeSlice';
import { DeleteLoan } from 'features/LoanType/loanTypeSlice';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const LoanTypeList = () => {
  const dispatch = useDispatch();
  const tableData = useSelector((state) => state?.loanType?.allLoanTypes);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [newName, setNewName] = useState('');
  const {addLoan,EditedLoan,deletedLoan} = useSelector((state) => state?.loanType)

  useEffect(() => {
    dispatch(GetAllLoans());
  }, [dispatch,addLoan,EditedLoan,deletedLoan]);

  const handleDelete = (id) => {
    dispatch(DeleteLoan(id)); // You should also implement DeleteLoan action
  };

  const handleEdit = () => {
    if (selectedLoan) {
      dispatch(EditLoan({ id: selectedLoan._id, loanName:newName }));
      onClose();
    }
  };

  return (
    <Card flexDirection="column" w="100%" px="10px" overflowX={{ sm: 'scroll', lg: 'hidden' }}>
      <Flex px="25px" mb="8px" justifyContent="space-between" align="center">
        <Text color={textColor} fontSize="22px" fontWeight="700" lineHeight="100%">
          Loan Type Table
        </Text>
        {/* <Menu /> */}
      </Flex>
      <Box>
        <Table className='table' variant="simple" color="gray.500" mb="24px" mt="12px">
          <Thead>
            <Tr>
              <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
                Name
              </Th>
              <Th color="gray.400" fontSize={{ sm: '10px', lg: '12px' }} borderColor={borderColor}>
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {tableData?.map((row) => (
              <Tr key={row.id}>
                <Td fontSize={{ sm: '14px' }} minW={{ sm: '150px', md: '200px', lg: 'auto' }} borderColor="transparent">
                  <Text color={textColor} fontSize="sm" fontWeight="700">
                    {row.loanName}
                  </Text>
                </Td>
                <Td>
                  <Button onClick={() => { setSelectedLoan(row); setNewName(row.loanName); onOpen(); }}><EditIcon/></Button>
                  <button className='deletebtn' onClick={() => handleDelete(row._id)} colorScheme="red" ml="4">
                    <DeleteIcon/>
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
          <ModalHeader>Edit Loan Type</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="New loan type name"
              mb="4"
            />
            <Button colorScheme="blue" onClick={handleEdit}>
              Save Changes
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Card>
  );
};

export default LoanTypeList;
