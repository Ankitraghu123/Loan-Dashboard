import { Box, Flex, Stack, Collapse, Text, useDisclosure, useBreakpointValue } from "@chakra-ui/react";
import Brand from "components/sidebar/components/Brand";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Icon } from '@chakra-ui/react';
import {
  MdHome,
  MdArrowDropDown,
  MdArrowRight,
  MdPersonAdd,
  MdOutlineAnalytics,
  MdDashboard
} from 'react-icons/md';

// SidebarContent Component
function SidebarContent(props) {
  const { routes, onClose } = props; // Receive onClose from props

  // Custom hooks for handling collapsible sections
  const { isOpen: isLeadsOpen, onToggle: toggleLeads } = useDisclosure();
  const { isOpen: isReportsOpen, onToggle: toggleReports } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false }); // Detect mobile view

  // State to manage active link
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  // Set active link based on current URL
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  // Function to close sidebar if on mobile or when onClose is passed
  const handleLinkClick = () => {
    if (isMobile || onClose) {
      onClose(); // Close the sidebar on link click
    }
  };

  return (
    <Flex
      direction='column'
      height='100%'
      pt='25px'
      px="16px"
      borderRadius='30px'
      backgroundColor="white"
      boxShadow="md"
    >
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>

        {/* Dashboard Link */}
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Link to="/admin/default" style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
            <Flex
              align="center"
              p={3}
              border="1px"
              borderColor="gray.200"
              borderRadius="8px"
              _hover={{ borderColor: "teal.400", bg: "gray.50" }}
              bg={activeLink === "/admin/dashboard" ? "teal.100" : "white"} // Active background color
            >
              <Icon as={MdDashboard} color="teal.500" mr={2} />
              <Text fontWeight="bold">Dashboard</Text>
            </Flex>
          </Link>
        </Box>

        {/* Leads Dropdown */}
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Flex
            align="center"
            onClick={toggleLeads}
            cursor="pointer"
            justify="space-between"
            p={3}
            border="1px"
            borderColor={isLeadsOpen ? "teal.500" : "gray.200"}
            borderRadius="8px"
            _hover={{ borderColor: "teal.400", bg: "gray.50" }}
            bg={isLeadsOpen ? "teal.100" : "white"}
          >
            <Flex align="center">
              <Icon as={MdPersonAdd} color="teal.500" mr={2} />
              <Text fontWeight="bold">Leads</Text>
            </Flex>
            <Icon as={isLeadsOpen ? MdArrowDropDown : MdArrowRight} />
          </Flex>
          <Collapse in={isLeadsOpen}>
            <Box pl={4} mt={2}>
              <Link to="/admin/leads/new" onClick={handleLinkClick}>
                <Flex
                  align="center"
                  p={2}
                  borderRadius="4px"
                  _hover={{ bg: "teal.200" }}
                >
                  <Icon as={MdPersonAdd} color="teal.600" mr={2} />
                  <Text>New Lead</Text>
                </Flex>
              </Link>
              <Link to="/admin/all-leads" onClick={handleLinkClick}>
                <Flex
                  align="center"
                  p={2}
                  borderRadius="4px"
                  _hover={{ bg: "teal.200" }}
                  mt={1}
                >
                  <Icon as={MdOutlineAnalytics} color="teal.600" mr={2} />
                  <Text>All Leads</Text>
                </Flex>
              </Link>
            </Box>
          </Collapse>
        </Box>

        {/* Reports Dropdown */}
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Flex
            align="center"
            onClick={toggleReports}
            cursor="pointer"
            justify="space-between"
            p={3}
            border="1px"
            borderColor={isReportsOpen ? "teal.500" : "gray.200"}
            borderRadius="8px"
            _hover={{ borderColor: "teal.400", bg: "gray.50" }}
            bg={isReportsOpen ? "teal.100" : "white"}
          >
            <Flex align="center">
              <Icon as={MdOutlineAnalytics} color="teal.500" mr={2} />
              <Text fontWeight="bold">Reports</Text>
            </Flex>
            <Icon as={isReportsOpen ? MdArrowDropDown : MdArrowRight} />
          </Flex>
          <Collapse in={isReportsOpen}>
            <Box pl={4} mt={2}>
              <Link to="/admin/reports/sales" onClick={handleLinkClick}>
                <Flex
                  align="center"
                  p={2}
                  borderRadius="4px"
                  _hover={{ bg: "teal.200" }}
                >
                  <Icon as={MdOutlineAnalytics} color="teal.600" mr={2} />
                  <Text>Sales Report</Text>
                </Flex>
              </Link>
              <Link to="/admin/reports/lead-performance" onClick={handleLinkClick}>
                <Flex
                  align="center"
                  p={2}
                  borderRadius="4px"
                  _hover={{ bg: "teal.200" }}
                  mt={1}
                >
                  <Icon as={MdOutlineAnalytics} color="teal.600" mr={2} />
                  <Text>Lead Performance</Text>
                </Flex>
              </Link>
            </Box>
          </Collapse>
        </Box>

      </Stack>
    </Flex>
  );
}

export default SidebarContent;