import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Box,
  useTheme,
  styled
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Comment as CommentIcon,
  Add as AddIcon
} from '@mui/icons-material';

interface ContactInteractionsProps {
  contactId?: string;
}

const TimelineItem = styled(Box)(({ theme }) => ({
  position: 'relative',
  right: 12,
  paddingBottom: theme.spacing(3),
  '&:last-child': {
    paddingBottom: 0
  }
}));

const InteractionIcon = styled(Box)(({ theme }) => ({
  position: 'absolute',
  left: theme.spacing(-2),
  top: 0,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: '50%',
  padding: theme.spacing(0.5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
}));

const ContactInteractions: React.FC<ContactInteractionsProps> = ({ contactId }) => {
  const theme = useTheme();

  const interactions = [
    {
      id: '1',
      type: 'email',
      date: 'May 3, 2025',
      description: 'Sent follow-up email about product demo',
      user: 'Sarah Johnson'
    },
    {
      id: '2',
      type: 'call',
      date: 'April 28, 2025',
      description: 'Discussed pricing options and implementation timeline',
      user: 'Mark Wilson'
    },
    {
      id: '3',
      type: 'meeting',
      date: 'April 20, 2025',
      description: 'Initial product demo with marketing team',
      user: 'Sarah Johnson'
    },
    {
      id: '4',
      type: 'note',
      date: 'April 15, 2025',
      description: 'Made initial contact via LinkedIn - interested in enterprise solution',
      user: 'Sarah Johnson'
    },
  ];

  const getInteractionIcon = (type: string) => {
    const iconStyle = { fontSize: 16 };
    switch (type) {
      case 'email':
        return <EmailIcon sx={{ ...iconStyle, color: '#3b82f6' }} />;
      case 'call':
        return <PhoneIcon sx={{ ...iconStyle, color: '#22c55e' }} />;
      case 'meeting':
        return <CalendarIcon sx={{ ...iconStyle, color: '#8b5cf6' }} />;
      case 'note':
        return <CommentIcon sx={{ ...iconStyle, color: '#f59e0b' }} />;
      default:
        return <CommentIcon sx={{ ...iconStyle, color: theme.palette.text.secondary }} />;
    }
  };

  return (
    <Card sx={{ boxShadow: theme.shadows[1] }}>
      <CardHeader
        title={<Typography variant="h6">Communication History</Typography>}
        action={
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon fontSize="small" />}
            sx={{ textTransform: 'none' }}
          >
            Add Interaction
          </Button>
        }
        sx={{
          py: 2,
          '& .MuiCardHeader-action': { alignSelf: 'center' }
        }}
      />
      <CardContent>
        <Box sx={{ 
          position: 'relative',
          pl: 2,
          borderLeft: `1px solid ${theme.palette.divider}`
        }}>
          {interactions.map((interaction) => (
            <TimelineItem key={interaction.id}>
              <InteractionIcon>
                {getInteractionIcon(interaction.type)}
              </InteractionIcon>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'flex-start'
                }}>
                  <Typography variant="body2" fontWeight="medium">
                    {interaction.type.charAt(0).toUpperCase() + interaction.type.slice(1)}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {interaction.date}
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {interaction.description}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
                  by {interaction.user}
                </Typography>
              </Box>
            </TimelineItem>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactInteractions;