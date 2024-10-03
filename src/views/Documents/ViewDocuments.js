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

  const handleSubmit = (e) => {
    if (selectedDoc && selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('docId', selectedDoc);
      formData.append('leadId', id);
      dispatch(uploadDoc(formData));

      setSelectedDoc('');
    setSelectedFile(null);
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
      <SimpleGrid columns={{ base: 2, md: 2, lg: 3, "2xl": 6 }} gap='20px' mb='20px'>
        <MiniStatistics name='Total Documents' value={totalDocs} />
        <MiniStatistics name='Pending Documents' value={pendingDocs?.length} />
      </SimpleGrid>

      
        <FormControl mt={5}>
          <FormLabel>Select Pending Document to Upload</FormLabel>
          <Select value={selectedDoc} onChange={handleDocSelection}>
            <option value=''>Select Document</option>
            {pendingDocs?.map((doc, index) => (
              <option key={index} value={doc._id}>
                {doc.name}
              </option>
            ))}
          </Select>
        </FormControl> 

{/* {
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
} */}

      {selectedDoc && (
        <FormControl mt={5}>
          <FormLabel>Upload Document</FormLabel>
          <Input type="file" onChange={handleFileChange} />
        </FormControl>
      )}

      {selectedDoc && selectedFile && (
        <button className='submitBtn w-100 mt-4' mt={5} colorScheme="blue" onClick={handleSubmit}>
          Upload Document
        </button>
      )}

      {
        isAdmin() ? 
        <Box mt={10}>
        <FormLabel>Completed Documents</FormLabel>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={4}>
          {completedDocs?.length > 0 ? (
            completedDocs.map((doc, index) => (
              <Box key={index} borderWidth='1px' borderRadius='lg' p={4} className=' d-flex justify-content-center align-items-center '>
                <div className='w-100'>
               <div className='d-flex flex-column justify-content-center align-items-center'>
               <Flex >
                  <Box className='d-flex flex-column align-items-center'>
                    <Text fontWeight="bold">{doc.name}</Text>
                    <Text color="gray.500">Status: {doc.status}</Text>
                  </Box>
                 
                    
                  
                </Flex>
                
                  <>
                    {doc.file.endsWith('.jpg') || doc.file.endsWith('.jpeg') || doc.file.endsWith('.png') ? (
                      <>
                      <Image src={doc.file} alt={doc.name} boxSize="120px" objectFit="cover" />
                     
                    </>
                    ) : (
                      null
                    )}
                     <Text color="blue.500">
                        <a href={doc.file} target="_blank" rel="noopener noreferrer">View Uploaded File</a>
                      </Text>
                  </>
                
               </div>
               <div className='d-flex justify-content-between my-2'>
<Text>
      {new Date(doc.date).toLocaleDateString('en-CA')} 
    </Text>
    <Text>
      {new Date(doc.date).toLocaleTimeString('en-GB')} 
    </Text>
</div>


                    
                      <div className='d-flex justify-content-between'>
                        <DeleteIcon className='text-danger' onClick={() => deleteHandler(doc._id)} />
                        <EditIcon ml={2} colorScheme="yellow" onClick={() => handleEditClick(doc._id)}/> 
                      </div>
                    
                  
                </div>
              </Box>
            ))
          ) : (
            <Text>No completed documents available.</Text>
          )}
        </SimpleGrid>
      </Box> : null
      }

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
