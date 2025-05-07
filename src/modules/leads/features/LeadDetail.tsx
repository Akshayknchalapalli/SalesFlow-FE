import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Button, 
  Tabs, 
  Tab, 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Chip,
  useTheme 
} from '@mui/material';
import {
  ArrowBack as ArrowBackIcon,
  Comment as CommentIcon,
  CalendarToday as CalendarIcon,
  Description as FileTextIcon,
  Link as LinkIcon,
  Add as AddIcon
} from '@mui/icons-material';
import LeadContactInfo from './LeadContactInfo';
import LeadInteractionHistory from './LeadInteractionHistory';
import LeadDocuments from './LeadDocuments';
import LeadTasks from './LeadTasks';


const LeadDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabValue, setTabValue] = React.useState('history');
  const isNewLead = id === 'new';
  const title = isNewLead ? "Add New Contact" : "Contact Details";

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Button 
          variant="text" 
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/leads')}
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
          <LeadContactInfo isNew={isNewLead} leadId={id} />
          
          {!isNewLead && (
            <Box sx={{ mt: 3 }}>
              <Tabs 
                value={tabValue}
                onChange={(e, newValue) => setTabValue(newValue)}
                indicatorColor="primary"
                textColor="primary"
              >
                <Tab label="Interaction History" value="history" />
                <Tab label="Documents" value="documents" />
                <Tab label="Tasks" value="tasks" />
              </Tabs>

              <Box sx={{ mt: 2 }}>
                {tabValue === 'history' && <LeadInteractionHistory leadId={id} />}
                {tabValue === 'documents' && <LeadDocuments leadId={id} />}
                {tabValue === 'tasks' && <LeadTasks leadId={id} />}
              </Box>
            </Box>
          )}
        </Grid>
        
        {!isNewLead && (
          <Grid item xs={12} lg={4}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Quick Actions
                </Typography>
                <Box sx={{ display: 'grid', gap: 1 }}>
                  {[
                    { label: 'Add Interaction', icon: <CommentIcon /> },
                    { label: 'Schedule Task', icon: <CalendarIcon /> },
                    { label: 'Upload Document', icon: <FileTextIcon /> },
                    { label: 'Link to Deal', icon: <LinkIcon /> }
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
                    startIcon={<AddIcon fontSize="small" />}
                  >
                    Add
                  </Button>
                </Box>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {['High Priority', 'Qualified', 'Tech Industry'].map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{
                        bgcolor: [
                          theme.palette.primary.light,
                          theme.palette.success.light,
                          theme.palette.secondary.light
                        ][index],
                        color: [
                          theme.palette.primary.dark,
                          theme.palette.success.dark,
                          theme.palette.secondary.dark
                        ][index]
                      }}
                    />
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
                  <Typography variant="h6">Linked Records</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  No deals linked yet
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default LeadDetail;