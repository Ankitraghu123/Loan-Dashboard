import React, { useState } from 'react';
import { Box, Flex, Text, VStack, Icon, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, FormControl, FormLabel, Input, Select } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateLeadFileStage } from 'features/FileStages/FileStagesSlice';
import { EditIcon } from '@chakra-ui/icons';
import { isAdmin } from 'utils/config';

const Timeline = () => {
  const dispatch = useDispatch();
  const allStages = useSelector(state => state.lead?.singleLead?.data?.fileStages);
  const currentLead = useSelector(state => state.lead?.singleLead?.data)
  const completedSteps = allStages?.filter(step => step.status === 'completed').length;

  // Modal state
  const [isOpen, setIsOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null); // Store the stage being edited
  const [status, setStatus] = useState('');
  const [remark, setRemark] = useState('');

  const openModal = (stage) => {
    setSelectedStage(stage);
    setStatus(stage.status);
    setRemark(stage.remark);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setSelectedStage(null);
  };

  const handleSave = () => {
    if (selectedStage) {
      dispatch(UpdateLeadFileStage({
        leadId: currentLead?._id,
        fileStageId: selectedStage._id,
        status,
        remark
      }));
    }
    closeModal();
  };

  return (
    <VStack spacing={10} align="flex-start" w="full" p={5} position="relative">
      {/* Vertical Line */}
      <Box
        position="absolute"
        left="25px"
        top="0"
        w="4px"
        h="full"
        bgGradient={`linear(to-b, teal.400 ${completedSteps * (100 / allStages?.length)}%, gray.300 0%)`}
        borderRadius="2px"
        zIndex={-1}
      />
      {allStages?.map((step, index) => (
        <Flex key={step.id} align="center" position="relative" w="full">
          {/* Step Indicator - Dynamic Circle */}
          <Box
            w="50px"
            h="50px"
            borderRadius="full"
            bg={step.status === 'completed' ? 'teal.400' : 'gray.300'}
            color="white"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="lg"
            as={motion.div}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            {step.status === 'completed' ? <Icon as={FaCheckCircle} w={6} h={6} /> : step.sequence}
          </Box>

          {/* Step Description */}
          <Box
            ml={8}
            p={6}
            bg="white"
            borderRadius="md"
            boxShadow="lg"
            w="full"
            position="relative"
            as={motion.div}
            whileHover={{ scale: 1.02, boxShadow: 'xl' }}
            transition="0.3s ease"
          >
            <Text fontSize="xl" fontWeight="bold" color="gray.700">
              {step.name}
            </Text>
            <Text mt={2} fontSize="md" color="gray.500">
              {step.remark}
            </Text>
           <Flex className='align-items-center mt-2'>
           <Text fontSize="md" color="gray.500">
            {step.date ? new Date(step.date).toLocaleDateString() : ''}
            </Text>
            <Text className='ms-2'>
            {step.date ? new Date(step.date).toLocaleTimeString() : ''}
            </Text>
           </Flex>
            {isAdmin() ? <Button position="absolute" top={0} right={0}  mt={4} size="sm" onClick={() => openModal(step)}>
              <EditIcon/>
            </Button> : ''}
          </Box>
        </Flex>
      ))}

      {/* Modal for editing the step */}
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit File Stage</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Status</FormLabel>
              <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </Select>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Remark</FormLabel>
              <Input
                placeholder="Enter remark"
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Timeline;
