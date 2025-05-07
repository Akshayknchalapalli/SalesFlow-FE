import React from 'react';
import { Tabs, Tab, Box, Typography, Button, useTheme } from '@mui/material';
import ContactsList from '../uiComponents/ContacstList';
import ContactStats from '../uiComponents/ContactStats';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
  const navigate = useNavigate();
  const [tabValue, setTabValue] = React.useState('all');

  return (
    <Box>
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4 
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Contact Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/contacts/new')}
          sx={{ textTransform: 'none' }}
        >
          Add Contact
        </Button>
      </Box>

      <ContactStats />

      <Box sx={{ mt: 3 }}>
        <Tabs 
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Contacts" value="all" />
          <Tab label="Prospects" value="prospects" />
          <Tab label="Customers" value="customers" />
          <Tab label="Partners" value="partners" />
        </Tabs>

        <Box sx={{ mt: 2 }}>
          {tabValue === 'all' && <ContactsList filter="all" />}
          {tabValue === 'prospects' && <ContactsList filter="prospect" />}
          {tabValue === 'customers' && <ContactsList filter="customer" />}
          {tabValue === 'partners' && <ContactsList filter="partner" />}
        </Box>
      </Box>
    </Box>
  );
};

export default Contacts;