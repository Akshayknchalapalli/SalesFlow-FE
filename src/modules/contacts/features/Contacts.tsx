import React from 'react';
import { Tabs, Tab, Box, Typography, Button, useTheme } from '@mui/material';
import ContactsList from '../uiComponents/ContacstList';
import ContactStats from '../uiComponents/ContactStats';
import { 
  Add as AddIcon,
  PeopleOutline as PeopleOutlineIcon,
  BusinessOutlined as BusinessOutlinedIcon,
  HandshakeOutlined as HandshakeOutlinedIcon,
  PersonOutline as PersonOutlineIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Contacts = () => {
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
            Contact Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate('/contacts/new')}
            sx={{ 
              textTransform: 'none',
              '& .MuiSvgIcon-root': {
                fontSize: '1.2rem'
              }
            }}
          >
            Add Contact
          </Button>
        </Box>
      </Box>

      <Box sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <ContactStats />

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
              label="All Contacts" 
              value="all" 
            />
            <Tab 
              icon={<PersonOutlineIcon />} 
              iconPosition="start"
              label="Prospects" 
              value="prospects" 
            />
            <Tab 
              icon={<BusinessOutlinedIcon />} 
              iconPosition="start"
              label="Customers" 
              value="customers" 
            />
            <Tab 
              icon={<HandshakeOutlinedIcon />} 
              iconPosition="start"
              label="Partners" 
              value="partners" 
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
            {tabValue === 'all' && <ContactsList filter="all" />}
            {tabValue === 'prospects' && <ContactsList filter="prospect" />}
            {tabValue === 'customers' && <ContactsList filter="customer" />}
            {tabValue === 'partners' && <ContactsList filter="partner" />}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Contacts;