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
// import Lead from 'views/admin/Lead';
import AllLeads from 'views/admin/AllLeads/components/AllLeads';
import LeadDetail from 'views/admin/LeadDetail/components/LeadDetail';
import AssociateRegisterForm from 'views/admin/RegisterBusinessAssociate/component/AssociateRegisterForm';
import AssociatePendingLeads from 'views/Associates/AssociateLeads/components/AssociatePendingLeads';
import AssociateDisbarsement from 'views/Associates/AssociateLeads/components/AssociateDisbarsement';
import AssociateSanctionLead from 'views/Associates/AssociateLeads/components/AssociateSanctionLead';
import AssociateRejectedLead from 'views/Associates/AssociateLeads/components/AssociateRejectedLead';
import AssociateDashboard from 'views/Associates/AssociateLeads/components/AssociateDashboard';
import AssocitaeAllLeads from 'views/Associates/AssociateLeads/components/AssocitaeAllLeads';
import RegisterBusinessAssociate from 'views/admin/RegisterBusinessAssociate/index';
import { AddLeadForm } from 'views/admin/Lead/components/addLeadForm';
import { isAssociate } from 'utils/config';
import { isAdmin } from 'utils/config';
import AllAssociates from 'views/admin/AllAssociates';
import ViewDocuments from 'views/Documents/ViewDocuments';
import AddDocuments from 'views/Documents/AddDocuments';
import AddFileStages from 'views/FileStages/AddFileStages';
import AdminDashboard from 'views/admin/AdminDashboard';
import AllRejectedLead from 'views/admin/AllLeads/components/AllRejectedLead';
import AddTeleCaller from 'views/Telecaller/AddTeleCaller';
import AllTelecallers from 'views/Telecaller/AllTelecallers';
import AddSalesExecutive from 'views/SalesExecutive/AddSalesExecutive';
import AllSalesExecutive from 'views/SalesExecutive/AllSalesExecutive';
import AddManager from 'views/Manager/AddManager';
import AllManagers from 'views/Manager/AllManagers';
import AllCallsLead from 'views/admin/LeadDetail/AllCallsLead';
import AllMeetingsLead from 'views/admin/LeadDetail/AllMeetingsLead';
// import { AddLeadForm } from 'views/Lead/components/addLeadForm';

const routes = [

  ...(isAssociate() ? [
    
  {
    name: 'Associate Dashboard',
    layout: '/admin',
    path: '/associate-dashboard',
    component: <AssociateDashboard />,
  },

  {
    name: 'Associate All Leads',
    layout: '/admin',
    path: '/associate-all-lead',
    component: <AssocitaeAllLeads />,
  },

  {
    name: 'Pending Lead',
    layout: '/admin',
    path: '/associate-pending-lead',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <AssociatePendingLeads />,
    secondary: true,
  },

  {
    name: 'Sanction Lead',
    layout: '/admin',
    path: '/associate-sanction-lead',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <AssociateSanctionLead />,
    secondary: true,
  },
  {
    name: 'Disbarsment Lead',
    layout: '/admin',
    path: '/associate-disbarsed-lead',
    component: <AssociateDisbarsement />,
    secondary: true,
  },
  {
    name: 'Rejected Lead',
    layout: '/admin',
    path: '/associate-rejected-lead',
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    component: <AssociateRejectedLead />,
    secondary: true,
  },
  ] : []),

  
  

 
  ...(isAdmin() ? [
    {
      name: 'Loan Types',
      layout: '/admin',
      icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
      path: '/loan',
      component: <Loans />,
    },
    {
      name: 'Register Associate',
      layout: '/admin',
      path: '/registerAssociate',
      icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
      component: <RegisterBusinessAssociate />,
    },
    {
      name: 'All Leads',
      layout: '/admin',
      icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
      path: '/all-leads',
      component: <AllLeads />,
    },
    {
      name: 'All Rejected lead',
      layout: '/admin',
      icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
      path: '/all-rejected-lead',
      component: <AllRejectedLead />,
    },

    {
      name: 'All Associates',
      layout: '/admin',
      path: '/all-associates',
      component: <AllAssociates />,
    },
    {
      name: 'Add Telecaller',
      layout: '/admin',
      path: '/add-telecaller',
      component: <AddTeleCaller />,
    },
    {
      name: 'All Telecaller',
      layout: '/admin',
      path: '/all-telecaller',
      component: <AllTelecallers />,
    },
    {
      name: 'Add Sales Executive',
      layout: '/admin',
      path: '/add-sales-executive',
      component: <AddSalesExecutive />,
    },
    {
      name: 'All Sales Executive',
      layout: '/admin',
      path: '/all-sales-executive',
      component: <AllSalesExecutive />,
    },
    {
      name: 'Add Manager',
      layout: '/admin',
      path: '/add-manager',
      component: <AddManager />,
    },
    {
      name: 'All Managers',
      layout: '/admin',
      path: '/all-manager',
      component: <AllManagers />,
    },
    {
      name: 'Documenst',
      layout: '/admin',
      path: '/add-docs',
      component: <AddDocuments />,
    },
    {
      name: 'File Stages',
      layout: '/admin',
      path: '/add-fileStages',
      component: <AddFileStages/>,
    },
    {
      name: 'Admin Dashboard',
      layout: '/admin',
      path: '/dashboard',
      component: <AdminDashboard/>,
    },

    {
      name: 'All Calls for lead',
      layout: '/admin',
      path: '/all-calls/:id',
      icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
      component: <AllCallsLead />,
    }, 

    {
      name: 'All Meetings for lead',
      layout: '/admin',
      path: '/all-meetings/:id',
      icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
      component: <AllMeetingsLead />,
    }, 
  ] : []),

 ...(isAssociate() || isAdmin() ? [
  {
    name:'View Docs',
    layout: '/admin',
    path: '/view-docs/:id',
    component: <ViewDocuments />,
  },
  {
    name: 'Lead Detail',
    layout: '/admin',
    path: '/lead-detail/:id',
    icon: <Icon as={MdBarChart} width="20px" height="20px" color="inherit" />,
    component: <LeadDetail />,
  }, 
  {
    name: 'Add Lead',
    layout: '/admin',
    path: '/add-lead',
    component: <AddLeadForm />,
    secondary: true,
  },
 ]:[]),
 
  {
    name: 'Sign In',
    layout: '/auth',
    path: '/sign-in',
    icon: <Icon as={MdLock} width="20px" height="20px" color="inherit" />,
    component: <SignInCentered />,
  },
  
  
];

export default routes;





// {
  //   name: 'RTL Admin',
  //   layout: '/rtl',
  //   path: '/rtl-default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: <RTL />,
  // },
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

   // {
  //   name: 'Dashboard',
  //   layout: '/admin',
  //   path: '/default',
  //   icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
  //   component: <MainDashboard />,
  // },
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
