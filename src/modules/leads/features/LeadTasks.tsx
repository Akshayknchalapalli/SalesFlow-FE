import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  IconButton,
  Checkbox,
  List,
  ListItem,
  Divider,
  Menu,
  MenuItem,
  useTheme
} from '@mui/material';
import {
  PhoneOutlined as PhoneIcon,
  EmailOutlined as EmailIcon,
  CalendarTodayOutlined as CalendarIcon,
  CommentOutlined as CommentIcon,
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  AccessTimeOutlined as ClockIcon
} from '@mui/icons-material';

interface LeadTasksProps {
  leadId?: string;
}

const tasks = [
    {
      id: 1,
      title: 'Follow-up call',
      type: 'call',
      dueDate: '2024-05-10T14:00:00Z',
      completed: false,
      description: 'Discuss proposal and pricing options',
      assignedTo: 'John Doe'
    },
    {
      id: 2,
      title: 'Send product documentation',
      type: 'email',
      dueDate: '2024-05-08T12:00:00Z',
      completed: true,
      description: 'PDF brochures and case studies',
      assignedTo: 'Jane Smith'
    },
    {
      id: 3,
      title: 'Schedule demo with IT team',
      type: 'meeting',
      dueDate: '2024-05-12T10:30:00Z',
      completed: false,
      description: 'Technical deep dive for their technical team',
      assignedTo: 'John Doe'
    },
    {
      id: 4,
      title: 'Prepare contract draft',
      type: 'task',
      dueDate: '2024-05-15T17:00:00Z',
      completed: false,
      description: 'Include the negotiated terms and pricing',
      assignedTo: 'Jane Smith'
    }
  ];

const LeadTasks: React.FC<LeadTasksProps> = ({ leadId }) => {
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

  const getTaskIcon = (type: string) => {
    const iconStyle = { fontSize: 16 };
    switch (type) {
      case 'call': return <PhoneIcon sx={{ ...iconStyle, color: 'success.main' }} />;
      case 'email': return <EmailIcon sx={{ ...iconStyle, color: 'primary.main' }} />;
      case 'meeting': return <CalendarIcon sx={{ ...iconStyle, color: 'secondary.main' }} />;
      case 'task': return <CommentIcon sx={{ ...iconStyle, color: 'warning.main' }} />;
      default: return <CommentIcon sx={iconStyle} />;
    }
  };

  const isOverdue = (dueDate: string, completed: boolean) => {
    if (completed) return false;
    return new Date(dueDate) < new Date();
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
    <Card sx={{ 
      boxShadow: theme.card.boxShadow,
      '& .MuiCardContent-root': {
        p: 0
      }
    }}>
      <CardContent>
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: `1px solid ${theme.palette.divider}`
        }}>
          <Typography variant="subtitle1" fontWeight={600}>Tasks</Typography>
          <Button 
            variant="contained" 
            size="small"
            startIcon={<AddIcon />}
            sx={{ 
              textTransform: 'none',
              '& .MuiSvgIcon-root': {
                fontSize: '1.2rem'
              }
            }}
          >
            Add Task
          </Button>
        </Box>

        <List sx={{ p: 0 }}>
          {tasks.map((task) => (
            <React.Fragment key={task.id}>
              <ListItem 
                sx={{ 
                  display: 'flex', 
                  alignItems: 'flex-start', 
                  p: 2,
                  bgcolor: task.completed ? 'action.selected' : 'inherit',
                  '&:hover': { bgcolor: 'action.hover' }
                }}
              >
                <Checkbox 
                  checked={task.completed} 
                  sx={{ mt: '3px', mr: 2 }} 
                />
                
                <Box sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 600,
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'text.disabled' : 'text.primary'
                      }}
                    >
                      {task.title}
                    </Typography>
                    <Box sx={{ ml: 1 }}>{getTaskIcon(task.type)}</Box>
                  </Box>
                  
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      mt: 0.5,
                      color: task.completed ? 'text.disabled' : 'text.secondary'
                    }}
                  >
                    {task.description}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <ClockIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
                    <Typography 
                      variant="caption" 
                      sx={{ 
                        color: isOverdue(task.dueDate, task.completed) ? 'error.main' : 'text.secondary',
                        fontWeight: isOverdue(task.dueDate, task.completed) ? 500 : 'inherit'
                      }}
                    >
                      {isOverdue(task.dueDate, task.completed) && !task.completed && 'Overdue: '}
                      {formatDate(task.dueDate)}
                    </Typography>
                    <Box sx={{ mx: 1, color: 'divider' }}>•</Box>
                    <Typography variant="caption" color="text.secondary">
                      Assigned to: {task.assignedTo}
                    </Typography>
                  </Box>
                </Box>

                <IconButton 
                  size="small" 
                  onClick={(e) => handleMenuOpen(e, task.id)}
                >
                  <MoreVertIcon fontSize="small" />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={openId === task.id}
                  onClose={handleMenuClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  PaperProps={{
                    sx: {
                      boxShadow: 'none',
                      border: `1px solid ${theme.palette.divider}`
                    }
                  }}
                >
                  <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                  <MenuItem onClick={handleMenuClose}>
                    {task.completed ? "Mark as incomplete" : "Mark as complete"}
                  </MenuItem>
                  <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
                    Delete
                  </MenuItem>
                </Menu>
              </ListItem>
              <Divider component="li" />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default LeadTasks;