import React from 'react';
import { Tabs, Tab, Box, Typography, Button, useTheme } from '@mui/material';
import LeadsList from '../uiComponents/LeadsList';
import LeadStats from '../uiComponents/LeadStats';
import { 
  Add as AddIcon,
  PeopleOutline as PeopleOutlineIcon,
  NewReleasesOutlined as NewReleasesIcon,
  PhoneOutlined as PhoneIcon,
  CheckCircleOutlined as CheckCircleIcon,
  CancelOutlined as CancelIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Leads = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState('all');

  return (
    <Box
      width="100%"
      sx={{
        height: "calc(100vh - 64px)", // Subtract header height
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.background.default,
      }}
    >
      <Box
        sx={{
          px: 3,
          pt: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.background.default,
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Lead Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/leads/new')}
            sx={{ 
              textTransform: 'none',
              '& .MuiSvgIcon-root': {
                fontSize: '1.2rem'
              }
            }}
          >
            Add Lead
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <LeadStats />

        <Box sx={{ mt: 1 }}>
          <Tabs 
            value={tabValue}
            onChange={(e, newValue) => setTabValue(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              backgroundColor: theme.palette.grey[100],
              borderRadius: 1,
              px: 2,
              boxShadow: theme.card.boxShadow,
              width: 'fit-content',
              '& .MuiTab-root': {
                textTransform: 'none',
                fontWeight: 500,
                minHeight: 48,
                '&.Mui-selected': {
                  fontWeight: 600,
                }
              }
            }}
          >
            <Tab 
              icon={<PeopleOutlineIcon />} 
              iconPosition="start"
              label="All Leads" 
              value="all" 
            />
            <Tab 
              icon={<NewReleasesIcon />} 
              iconPosition="start"
              label="New" 
              value="new" 
            />
            <Tab 
              icon={<PhoneIcon />} 
              iconPosition="start"
              label="Contacted" 
              value="contacted" 
            />
            <Tab 
              icon={<CheckCircleIcon />} 
              iconPosition="start"
              label="Qualified" 
              value="qualified" 
            />
            <Tab 
              icon={<CancelIcon />} 
              iconPosition="start"
              label="Lost" 
              value="lost" 
            />
          </Tabs>

          <Box 
            sx={{ 
              mt: 2,
              backgroundColor: theme.palette.background.paper,
              borderRadius: theme.shape.borderRadius,
              boxShadow: theme.card.boxShadow,
              '& .MuiTableHead-root': {
                backgroundColor: theme.palette.grey[50],
                '& .MuiTableCell-root': {
                  fontWeight: 600,
                  color: theme.palette.text.secondary,
                  borderBottom: `1px solid ${theme.palette.divider}`
                }
              },
              '& .MuiTableBody-root': {
                '& .MuiTableCell-root': {
                  borderBottom: `1px solid ${theme.palette.divider}`
                }
              }
            }}
          >
            {tabValue === 'all' && <LeadsList filter="all" />}
            {tabValue === 'new' && <LeadsList filter="new" />}
            {tabValue === 'contacted' && <LeadsList filter="contacted" />}
            {tabValue === 'qualified' && <LeadsList filter="qualified" />}
            {tabValue === 'lost' && <LeadsList filter="lost" />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Leads;