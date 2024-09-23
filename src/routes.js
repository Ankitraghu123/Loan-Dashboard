import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/admin/default';
import NFTMarketplace from 'views/admin/marketplace';
import Profile from 'views/admin/profile';
import DataTables from 'views/admin/dataTables';
import RTL from 'views/admin/rtl';
import Register from 'views/admin/register'
import Loans from 'views/loans'

// Auth Imports
import SignInCentered from 'views/auth/signIn';
import { AddLeadForm } from 'views/admin/Lead/components/addLeadForm';
import AllLeads from 'views/admin/AllLeads/components/AllLeads';
import LeadDetail from 'views/admin/LeadDetail/components/LeadDetail';
// import { AddLeadForm } from 'views/Lead/components/addLeadForm';

const routes = [
  {
    name: 'Dashboard',
    layout: '/admin',
    path: '/default',
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: <MainDashboard />,
  },
  // {
  //   name: 'NFT Marketplace',
  //   layout: '/admin',
  //   path: '/nft-marketplace',
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width="20px"
  //       height="20px"
  //       color="inherit"
  //     />
  //   ),
  //   component: <NFTMarketplace />,
  //   secondary: true,
  // },


  // {
  //   name: 'Registration Form',
  //   layout: '/admin',
  //   path: '/registration',
  //   icon: (
  //     <Icon
  //       as={MdOutlineShoppingCart}
  //       width="20px"
  //       height="20px"
  //       color="inherit"
  //     />
  //   ),
  //   component: <Register />,
  //   secondary: true,
  // },
  {
    name: 'All Leads',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/all-leads',
    component: <AllLeads />,
  },

  {
    name: 'Add Lead',
    layout: '/admin',
    path: '/add-lead',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <AddLeadForm />,
    secondary: true,
  },
  {
    name: 'Pending Lead',
    layout: '/admin',
    path: '/add-lead',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <AddLeadForm />,
    secondary: true,
  },
  {
    name: 'Sanction Lead',
    layout: '/admin',
    path: '/add-lead',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <AddLeadForm />,
    secondary: true,
  },
  {
    name: 'Disbarsment Lead',
    layout: '/admin',
    path: '/add-lead',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <AddLeadForm />,
    secondary: true,
  },
  {
    name: 'Rejected Lead By Bank',
    layout: '/admin',
    path: '/add-lead',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <AddLeadForm />,
    secondary: true,
  },
  {
    name: 'Rejected Lead By Admin',
    layout: '/admin',
    path: '/add-lead',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <AddLeadForm />,
    secondary: true,
  },
  {
    name: 'Loan Types',
    layout: '/admin',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    path: '/loan',
    component: <Loans />,
  },
  {
    name: 'Lead Detail',
    layout: '/admin',
    path: '/lead-detail/:id',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: <LeadDetail />,
  }, 
  // {
  //   name: 'Data Tables',
  //   layout: '/admin',
  //   icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
  //   path: '/data-tables',
  //   component: <DataTables />,
  // },
  // {

  //   name: 'Profile',
  //   layout: '/admin',
  //   path: '/profile',
  //   icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
  //   component: <Profile />,
  // },
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  // {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: '/rtl-default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: <RTL />,
  // },
];

export default routes;
