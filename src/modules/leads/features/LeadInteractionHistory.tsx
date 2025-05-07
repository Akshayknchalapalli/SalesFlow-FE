import React from 'react';
import { 
  Card, 
  CardContent, 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Avatar, 
  Menu, 
  MenuItem, 
  useTheme 
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  CalendarToday as CalendarIcon,
  Comment as CommentIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';

interface LeadInteractionHistoryProps {
  leadId?: string;
}

// Mock interaction data
const interactions = [
  {
    id: 1,
    type: 'email',
    date: '2024-05-03T10:25:00Z',
    title: 'Initial Outreach',
    content: 'Sent introduction email about our product suite and how it might help their business needs.',
    user: {
      name: 'John Doe',
      avatar: 'JD'
    }
  },
  {
    id: 2,
    type: 'call',
    date: '2024-05-04T15:30:00Z',
    title: 'Discovery Call',
    content: 'Discussed pain points and current processes. They are using a competitor but unhappy with support.',
    user: {
      name: 'Jane Smith',
      avatar: 'JS'
    }
  },
  {
    id: 3,
    type: 'meeting',
    date: '2024-05-07T14:00:00Z',
    title: 'Product Demo',
    content: 'Walked through the platform focusing on automation features. Client was impressed with the UI and ease of use.',
    user: {
      name: 'John Doe',
      avatar: 'JD'
    }
  },
  {
    id: 4,
    type: 'note',
    date: '2024-05-08T09:15:00Z',
    title: 'Follow-up Steps',
    content: 'Need to send pricing proposal by Friday. They want to include their IT team in the next call.',
    user: {
      name: 'John Doe',
      avatar: 'JD'
    }
  }
];

const LeadInteractionHistory: React.FC<LeadInteractionHistoryProps> = ({ leadId }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openId, setOpenId] = React.useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };

  const getInteractionIcon = (type: string) => {
    const iconStyle = { fontSize: 16 };
    switch (type) {
      case 'email': return <EmailIcon sx={{ ...iconStyle, color: theme.palette.primary.main }} />;
      case 'call': return <PhoneIcon sx={{ ...iconStyle, color: theme.palette.success.main }} />;
      case 'meeting': return <CalendarIcon sx={{ ...iconStyle, color: theme.palette.secondary.main }} />;
      case 'note': return <CommentIcon sx={{ ...iconStyle, color: theme.palette.warning.main }} />;
      default: return <CommentIcon sx={iconStyle} />;
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setOpenId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenId(null);
  };

  return (
    <Card sx={{ boxShadow: theme.shadows[1] }}>
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: `1px solid ${theme.palette.divider}`
        }}>
          <Typography variant="subtitle1">Interaction History</Typography>
          <Button 
            variant="contained" 
            size="small"
            startIcon={<AddIcon />}
          >
            Add Interaction
          </Button>
        </Box>
        
        <Box sx={{ position: 'relative', pl: 6, pr: 2 }}>
          {/* Timeline line */}
          <Box sx={{
            position: 'absolute',
            left: 48,
            top: 0,
            bottom: 0,
            width: '1px',
            bgcolor: 'divider'
          }}/>
          
          {interactions.map((interaction) => (
            <Box key={interaction.id} sx={{ py: 2, position: 'relative', display: 'flex' }}>
              {/* Icon container */}
              <Box sx={{
                position: 'absolute',
                left: -14,
                top: 16,
                zIndex: 1,
                bgcolor: 'background.paper',
                border: `2px solid ${theme.palette.divider}`,
                borderRadius: '50%',
                width: 32,
                height: 32,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {getInteractionIcon(interaction.type)}
              </Box>
              
              <Box sx={{ ml: 4, flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="body2" fontWeight="medium">
                      {interaction.title}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {formatDate(interaction.date)}
                    </Typography>
                  </Box>
                  <IconButton
                    size="small"
                    onClick={(e) => handleMenuOpen(e, interaction.id)}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={openId === interaction.id}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                  >
                    <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                    <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
                      Delete
                    </MenuItem>
                  </Menu>
                </Box>
                
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {interaction.content}
                </Typography>
                
                <Box sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                  <Avatar sx={{ 
                    width: 24, 
                    height: 24, 
                    fontSize: '0.75rem',
                    bgcolor: theme.palette.grey[200],
                    color: theme.palette.text.primary
                  }}>
                    {interaction.user.avatar}
                  </Avatar>
                  <Typography variant="caption" sx={{ ml: 1 }}>
                    {interaction.user.name}
                  </Typography>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default LeadInteractionHistory;