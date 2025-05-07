import React from 'react';
import { Tabs, Tab, Box, Typography, Button, useTheme } from '@mui/material';
import LeadsList from '../uiComponents/LeadsList';
import { Add as AddIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import LeadStats from '../uiComponents/LeadStats';

const Leads = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState('all');

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 4 
      }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          Lead Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/leads/new')}
          sx={{ textTransform: 'none' }}
        >
          Add Lead
        </Button>
      </Box>

      <LeadStats />

      <Box sx={{ mt: 3 }}>
        <Tabs 
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="All Leads" value="all" />
          <Tab label="New" value="new" />
          <Tab label="Contacted" value="contacted" />
          <Tab label="Qualified" value="qualified" />
          <Tab label="Lost" value="lost" />
        </Tabs>

        <Box sx={{ mt: 2 }}>
          {tabValue === 'all' && <LeadsList filter="all" />}
          {tabValue === 'new' && <LeadsList filter="new" />}
          {tabValue === 'contacted' && <LeadsList filter="contacted" />}
          {tabValue === 'qualified' && <LeadsList filter="qualified" />}
          {tabValue === 'lost' && <LeadsList filter="lost" />}
        </Box>
      </Box>
    </Box>
  );
};

export default Leads;