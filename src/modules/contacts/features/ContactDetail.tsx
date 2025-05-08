import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Tabs, 
  Tab, 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Chip,
  useTheme 
} from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import {
  ArrowBack as ArrowBackIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Link as LinkIcon,
  Description as FileIcon,
  LocalOffer as TagIcon,
  Dashboard
} from '@mui/icons-material';
import ContactInfo from '../uiComponents/ContactInfo';
import ContactInteractions from '../uiComponents/ContactInteractions';
import ContactDeals from '../uiComponents/ContactDeals';
import ContactDocuments from '../uiComponents/ContactDocuments';

const ContactDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isNewContact = id === 'new';
  const [tabValue, setTabValue] = React.useState('interactions');

  const title = isNewContact ? "Add New Contact" : "Contact Details";

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Button 
          variant="text" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/contacts')}
          sx={{ p: 1 }}
        >
          Back
        </Button>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <ContactInfo isNew={isNewContact} contactId={id} />
          
          {!isNewContact && (
            <Box sx={{ mt: 3 }}>
              <Tabs 
                value={tabValue} 
                onChange={(e, newValue) => setTabValue(newValue)}
                indicatorColor="primary"
                textColor="primary"
                sx={{
                  backgroundColor: theme.palette.grey[100],
                  borderRadius: 1,
                  px: 2,
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
                <Tab label="Communication History" value="interactions" />
                <Tab label="Associated Deals" value="deals" />
                <Tab label="Documents" value="documents" />
              </Tabs>

              <Box sx={{ mt: 2 }}>
                {tabValue === 'interactions' && <ContactInteractions contactId={id} />}
                {tabValue === 'deals' && <ContactDeals contactId={id} />}
                {tabValue === 'documents' && <ContactDocuments contactId={id} />}
              </Box>
            </Box>
          )}
        </Grid>
        
        {!isNewContact && (
          <Grid item xs={12} lg={4}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'grid', gap: 1 }}>
                  {[
                    { label: 'Send Email', icon: <EmailIcon /> },
                    { label: 'Make Call', icon: <PhoneIcon /> },
                    { label: 'Schedule Meeting', icon: <CalendarIcon /> },
                    { label: 'Create Deal', icon: <LinkIcon /> },
                    { label: 'Upload Document', icon: <FileIcon /> }
                  ].map((action, index) => (
                    <Button
                      key={index}
                      variant="outlined"
                      fullWidth
                      startIcon={action.icon}
                      sx={{ justifyContent: 'flex-start' }}
                    >
                      {action.label}
                    </Button>
                  ))}
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Contact Preferences
                </Typography>
                <Box sx={{ display: 'grid', gap: 1.5 }}>
                  {[
                    ['Preferred Contact Method:', 'Email'],
                    ['Best Time to Contact:', 'Morning (9-11 AM)'],
                    ['Timezone:', 'EST (UTC-5)'],
                    ['Communication Frequency:', 'Weekly']
                  ].map(([label, value], index) => (
                    <Box key={index} sx={{ display: 'flex' }}>
                      <Typography variant="body2" sx={{ fontWeight: 500, mr: 1 }}>
                        {label}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  mb: 2 
                }}>
                  <Typography variant="h6">Tags</Typography>
                  <Button 
                    variant="text" 
                    size="small" 
                    startIcon={<TagIcon fontSize="small" />}
                  >
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {['Enterprise', 'Decision Maker', 'Tech Industry'].map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{
                        backgroundColor: theme.status[['prospect', 'customer', 'partner'][index] as keyof typeof theme.status]?.bg || theme.status.default.bg,
                        color: theme.status[['prospect', 'customer', 'partner'][index] as keyof typeof theme.status]?.color || theme.status.default.color,
                        fontWeight: 500,
                        '& .MuiChip-label': {
                          color: theme.status[['prospect', 'customer', 'partner'][index] as keyof typeof theme.status]?.color || theme.status.default.color
                        }
                      }}
                    />
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default ContactDetail;