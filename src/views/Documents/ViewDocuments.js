import { Box, Button, SimpleGrid, useDisclosure, FormControl, FormLabel, Select, Input, Text, Image, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MiniStatistics from "components/card/MiniStatistics";
import { useDispatch, useSelector } from 'react-redux';
import { GetSingleLead, uploadDoc } from 'features/Lead/leadSlice';
import { isAdmin } from 'utils/config';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { deleteDoc } from 'features/Lead/leadSlice';
import { isAssociate } from 'utils/config';

const ViewDocuments = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const currentLead = useSelector(state => state.lead?.singleLead?.data);
  const { uploadeddoc, deletedDocfile } = useSelector(state => state?.lead);
  const [pendingDocs, setPendingDocs] = useState([]);
  const [completedDocs, setCompletedDocs] = useState([]);

  const totalDocs = currentLead?.docs?.length;

  useEffect(() => {
    const currentPending = currentLead?.docs?.filter(doc => doc.status === 'pending');
    const currentCompleted = currentLead?.docs?.filter(doc => doc.status === 'submitted');
    setPendingDocs(currentPending);
    setCompletedDocs(currentCompleted);
  }, [currentLead, uploadeddoc, deletedDocfile]);

  const [selectedDoc, setSelectedDoc] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const { isOpen: isEditModalOpen, onOpen: openEditModal, onClose: closeEditModal } = useDisclosure();
  const [currentEditDocId, setCurrentEditDocId] = useState(null);

  useEffect(() => {
    dispatch(GetSingleLead(id));
  }, [dispatch, id, uploadeddoc, deletedDocfile]);

  const handleDocSelection = (e) => {
    setSelectedDoc(e.target.value);
  };

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = () => {
    if (selectedDoc && selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('docId', selectedDoc);
      formData.append('leadId', id);
      dispatch(uploadDoc(formData));
    } else {
      console.error("Please select a document and a file to upload.");
    }
  };

  const deleteHandler = (docId) => {
    const formData = {
      leadId: id,
      docId: docId
    };
    dispatch(deleteDoc(formData));
  };

  const editHandler = (docId) => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('docId', docId);
      formData.append('leadId', id);
      dispatch(uploadDoc(formData));
      closeEditModal()
    } else {
      console.error("Please select a file to upload.");
    }
  };

  const handleEditClick = (docId) => {
    setCurrentEditDocId(docId);
    openEditModal(); // Use the open function from useDisclosure
  };

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }} gap='20px' mb='20px'>
        <MiniStatistics name='Total Documents' value={totalDocs} />
        <MiniStatistics name='Pending Documents' value={pendingDocs?.length} />
      </SimpleGrid>

      {isAdmin() ? 
        <FormControl mt={5}>
          <FormLabel>Select Pending Document to Upload</FormLabel>
          <Select placeholder="Select document" onChange={handleDocSelection}>
            {pendingDocs?.map((doc, index) => (
              <option key={index} value={doc._id}>
                {doc.name}
              </option>
            ))}
          </Select>
        </FormControl> : null 
      }

{
  isAssociate() ? 
  <FormControl mt={5}>
  <FormLabel>See Pending Documents</FormLabel>
      <Select placeholder="See document">
        {pendingDocs?.map((doc, index) => (
          <option key={index} value={doc._id}>
            {doc.name}
          </option>
        ))}
      </Select>
  </FormControl> : null
}

      {selectedDoc && (
        <FormControl mt={5}>
          <FormLabel>Upload Document</FormLabel>
          <Input type="file" onChange={handleFileChange} />
        </FormControl>
      )}

      {selectedDoc && selectedFile && (
        <Button mt={5} colorScheme="blue" onClick={handleSubmit}>
          Upload Document
        </Button>
      )}

      <Box mt={10}>
        <FormLabel>Completed Documents</FormLabel>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
          {completedDocs?.length > 0 ? (
            completedDocs.map((doc, index) => (
              <Box key={index} borderWidth='1px' borderRadius='lg' p={4}>
                <Flex>
                  <Box>
                    <Text fontWeight="bold">{doc.name}</Text>
                    <Text color="gray.500">Status: {doc.status}</Text>
                  </Box>
                  {
                    isAdmin() ?
                      <>
                        <DeleteIcon onClick={() => deleteHandler(doc._id)} />
                        <EditIcon ml={2} colorScheme="yellow" onClick={() => handleEditClick(doc._id)}/> 
                      </>
                    : null
                  }
                    
                  
                </Flex>
                {doc.file && (
                  <>
                    {doc.file.endsWith('.jpg') || doc.file.endsWith('.jpeg') || doc.file.endsWith('.png') ? (
                      <Image src={doc.file} alt={doc.name} boxSize="100px" objectFit="cover" />
                    ) : (
                      <Text color="blue.500">
                        <a href={doc.file} target="_blank" rel="noopener noreferrer">View Uploaded File</a>
                      </Text>
                    )}
                  </>
                )}
              </Box>
            ))
          ) : (
            <Text>No completed documents available.</Text>
          )}
        </SimpleGrid>
      </Box>

      <Modal isOpen={isEditModalOpen} onClose={closeEditModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Document</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Select New Document</FormLabel>
              <Input type="file" onChange={handleFileChange} />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => editHandler(currentEditDocId)}>
              Submit
            </Button>
            <Button onClick={closeEditModal} ml={3}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

    </Box>
  );
};

export default ViewDocuments;
