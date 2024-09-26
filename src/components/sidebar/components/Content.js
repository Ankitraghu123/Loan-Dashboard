// chakra imports
import { Box, Flex, Stack, Collapse, Text, useDisclosure, useBreakpointValue } from "@chakra-ui/react";
import Brand from "components/sidebar/components/Brand";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Icon } from '@chakra-ui/react';
import {
  MdHome,
  MdArrowDropDown,
  MdArrowRight,
  MdPersonAdd,
  MdOutlineAnalytics,
  MdDashboard
} from 'react-icons/md';
import { isAdmin } from "utils/config";
import { isAssociate } from "utils/config";
import { toast } from "react-toastify";

// FUNCTIONS

function SidebarContent(props) {
  const navigate = useNavigate()
  const { routes,onClose } = props;

  // Custom hooks for handling collapsible sections
  const { isOpen: isLeadsOpen, onToggle: toggleLeads } = useDisclosure();
  const { isOpen: isReportsOpen, onToggle: toggleReports } = useDisclosure();

  const isMobile = useBreakpointValue({ base: true, md: false }); 
  // State to manage active link
  const [activeLink, setActiveLink] = useState('');
  const location = useLocation();

  // Set active link based on current URL
  useEffect(() => {
    setActiveLink(location.pathname);
  }, [location.pathname]);

  const logouthandler = () =>{
    localStorage.clear();
    navigate('/auth/sign-in')
    toast.success('logged out successfully')
  }

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
      // backgroundColor="white"
      boxShadow="md"
    >
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>

        {/* Dashboard Link */}
       
         <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
        <Link to={isAssociate() ? "/admin/associate-dashboard" : isAdmin()? "/admin/main-dashboard" : ""} style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
          <Flex
            align="center"
            p={3}
            border="1px"
            borderColor="gray.200"
            borderRadius="8px"
            _hover={{ borderColor: "teal.400", bg: "gray.50" }}
            bg={activeLink === "/admin/associate-dashboard" ? "teal.100" : ""} // Active background color
          >
            <Icon as={MdDashboard} color="teal.500" mr={2} />
            <Text fontWeight="bold">Dashboard</Text>
          </Flex>
        </Link>
      </Box> 
       

        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Link to="/admin/add-lead" style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
            <Flex
              align="center"
              p={3}
              border="1px"
              borderColor="gray.200"
              borderRadius="8px"
              _hover={{ borderColor: "teal.400", bg: "gray.50" }}
              bg={activeLink === "/admin/add-lead" ? "teal.100" : ""} // Active background color
            >
              <Icon as={MdDashboard} color="teal.500" mr={2} />
              <Text fontWeight="bold">Add Lead</Text>
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
            bg={isLeadsOpen ? "teal.100" : ""}
          >
            <Flex align="center">
              <Icon as={MdPersonAdd} color="teal.500" mr={2} />
              <Text fontWeight="bold">Leads</Text>
            </Flex>
            <Icon as={isLeadsOpen ? MdArrowDropDown : MdArrowRight} />
          </Flex>
          <Collapse in={isLeadsOpen}>
            <Box pl={4} mt={2}>
           {isAdmin() ?  <Link to="/admin/all-leads" onClick={handleLinkClick}>
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
              </Link> : null}

             {isAssociate() ? 
              <>
                 <Link to="/admin/associate-pending-lead" onClick={handleLinkClick}>
               <Flex
                 align="center"
                 p={2}
                 borderRadius="4px"
                 _hover={{ bg: "teal.200" }}
               >
                 <Icon as={MdOutlineAnalytics} color="teal.600" mr={2} />
                 <Text>Pending Lead</Text>
               </Flex>
             </Link>
             <Link to="/admin/associate-sanction-lead" onClick={handleLinkClick}>
               <Flex
                 align="center"
                 p={2}
                 borderRadius="4px"
                 _hover={{ bg: "teal.200" }}
               >
                 <Icon as={MdOutlineAnalytics} color="teal.600" mr={2} />
                 <Text>Sanction Lead</Text>
               </Flex>
             </Link>
             <Link to="/admin/associate-disbarsed-lead" onClick={handleLinkClick}>
               <Flex
                 align="center"
                 p={2}
                 borderRadius="4px"
                 _hover={{ bg: "teal.200" }}
               >
                 <Icon as={MdOutlineAnalytics} color="teal.600" mr={2} />
                 <Text>Disbarsement Lead</Text>
               </Flex>
             </Link>
              </> : null 
            }
             
            </Box>
          </Collapse>
        </Box>

        {/* Reports Dropdown */}
 <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
<Link to={isAssociate() ? "/admin/associate-rejected-lead" : ""} style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
          <Flex
            align="center"
            p={3}
            border="1px"
            borderColor="gray.200"
            borderRadius="8px"
            _hover={{ borderColor: "teal.400", bg: "gray.50" }}
            bg={activeLink === "/admin/associate-rejected-lead" ? "teal.100" : ""} // Active background color
          >
            <Icon as={MdDashboard} color="teal.500" mr={2} />
            <Text fontWeight="bold">Rejected Lead</Text>
          </Flex>
        </Link>
        </Box>


       {isAssociate() ? 
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
            bg={isReportsOpen ? "teal.100" : ""}
          >
            <Flex align="center">
              <Icon as={MdOutlineAnalytics} color="teal.500" mr={2} />
              <Text fontWeight="bold">My Earnings</Text>
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
                  <Text>Estimated Earnings</Text>
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
                  <Text>Actual Earnings</Text>
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
                  <Text>Received Amouont</Text>
                </Flex>
              </Link>
            </Box>
          </Collapse>
        </Box> : null 
      }

      {isAdmin() ?
      <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
      <Link to='/admin/loan' style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
                <Flex
                  align="center"
                  p={3}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="8px"
                  _hover={{ borderColor: "teal.400", bg: "gray.50" }}
                  bg={activeLink === "/admin/loan" ? "teal.100" : "white"} // Active background color
                >
                  <Icon as={MdDashboard} color="teal.500" mr={2} />
                  <Text fontWeight="bold">Loans</Text>
                </Flex>
              </Link>
              </Box>:null
      }

{isAdmin() ?
      <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
      <Link to='/admin/registerAssociate' style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
                <Flex
                  align="center"
                  p={3}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="8px"
                  _hover={{ borderColor: "teal.400", bg: "gray.50" }}
                  bg={activeLink === "/admin/registerAssociate" ? "teal.100" : "white"} // Active background color
                >
                  <Icon as={MdDashboard} color="teal.500" mr={2} />
                  <Text fontWeight="bold">Add Associate</Text>
                </Flex>
              </Link>
              </Box>:null
      }

{isAdmin() ?
      <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
      <Link to='/admin/all-associates' style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
                <Flex
                  align="center"
                  p={3}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="8px"
                  _hover={{ borderColor: "teal.400", bg: "gray.50" }}
                  bg={activeLink === "/admin/all-associates" ? "teal.100" : "white"} // Active background color
                >
                  <Icon as={MdDashboard} color="teal.500" mr={2} />
                  <Text fontWeight="bold">All Associates</Text>
                </Flex>
              </Link>
              </Box>:null
      }

{isAdmin() ?
      <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
      <Link to='/admin/add-docs' style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
                <Flex
                  align="center"
                  p={3}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="8px"
                  _hover={{ borderColor: "teal.400", bg: "gray.50" }}
                  bg={activeLink === "/admin/add-docs" ? "teal.100" : "white"} // Active background color
                >
                  <Icon as={MdDashboard} color="teal.500" mr={2} />
                  <Text fontWeight="bold">Add Documents</Text>
                </Flex>
              </Link>
              </Box>:null
      }

<Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
      {/* <Link to='/admin/loan' style={{ textDecoration: 'none' }}> */}
                <Flex
                  align="center"
                  p={3}
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="8px"
                  onClick={logouthandler}
                  _hover={{ borderColor: "teal.400", bg: "gray.50" }}
                  // bg={activeLink === "/admin/loan" ? "teal.100" : "white"} // Active background color
                >
                  <Icon as={MdDashboard} color="teal.500" mr={2} />
                  <Text fontWeight="bold">Logout</Text>
                </Flex>
              {/* </Link> */}
              </Box>
      </Stack>
    </Flex>
  );
}

export default SidebarContent;