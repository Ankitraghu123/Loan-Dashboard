import React from 'react';
import { Box, Flex, Text, VStack, Icon } from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Timeline = () => {
  const steps = [
    { id: 1, title: 'File Login', description: 'Complete registration', isComplete: true },
    { id: 2, title: 'FI', description: 'Verify email', isComplete: true },
    { id: 3, title: 'PD', description: 'Submit documents', isComplete: true },
    { id: 4, title: 'Legal', description: 'Admin approval', isComplete: false },
    { id: 5, title: 'Technical', description: 'Make payment', isComplete: false },
    { id: 6, title: 'Loan Sanction', description: 'Receive confirmation', isComplete: false },
    { id: 7, title: 'Loan Disbarsment', description: 'Start your journey', isComplete: false },
  ];

  const completedSteps = steps.filter(step => step.isComplete).length;

  return (
    <VStack spacing={10} align="flex-start" w="full" p={5} position="relative">
      {/* Vertical Line */}
      <Box
        position="absolute"
        left="25px"
        top="0"
        w="4px"
        h="full"
        bgGradient={`linear(to-b, teal.400 ${completedSteps * (100 / steps.length)}%, gray.300 0%)`}
        borderRadius="2px"
        zIndex={-1}
      />
      {steps.map((step, index) => (
        <Flex key={step.id} align="center" position="relative" w="full">
          {/* Step Indicator - Dynamic Circle */}
          <Box
            w="50px"
            h="50px"
            borderRadius="full"
            bg={step.isComplete ? 'teal.400' : 'gray.300'}
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
            {step.isComplete ? <Icon as={FaCheckCircle} w={6} h={6} /> : step.id}
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
              {step.title}
            </Text>
            <Text mt={2} fontSize="md" color="gray.500">
              {step.description}
            </Text>
          </Box>
        </Flex>
      ))}
    </VStack>
  );
};

export default Timeline;