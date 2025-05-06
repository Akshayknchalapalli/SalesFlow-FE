import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Link,
  Checkbox,
  Box,
  Stack,
  useTheme,
  styled
} from '@mui/material';
import {
  Phone as CallIcon,
  Email as MailIcon,
  CalendarToday as CalendarIcon,
  AccessTime as ClockIcon
} from '@mui/icons-material';

const tasks = [
    {
      id: 1,
      title: 'Call with Acme Inc.',
      type: 'call',
      date: 'Today',
      time: '2:30 PM',
      completed: false,
    },
    {
      id: 2,
      title: 'Follow up with Jane Doe',
      type: 'email',
      date: 'Today',
      time: '4:00 PM',
      completed: false,
    },
    {
      id: 3,
      title: 'Proposal review meeting',
      type: 'meeting',
      date: 'Tomorrow',
      time: '10:00 AM',
      completed: false,
    },
    {
      id: 4,
      title: 'Send contract to Wayne Enterprises',
      type: 'email',
      date: 'Dec 6',
      time: '12:00 PM',
      completed: true,
    },
  ];

const TaskItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  gap: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2),
  transition: theme.transitions.create('background-color'),
  '&:hover': {
    backgroundColor: theme.palette.action.hover
  }
}));

const getTaskIcon = (type: string, theme: any) => {
  const iconStyle = { fontSize: 16, color: theme.palette.primary.main };
  
  switch (type) {
    case 'call': return <CallIcon sx={iconStyle} />;
    case 'email': return <MailIcon sx={iconStyle} />;
    case 'meeting': return <CalendarIcon sx={iconStyle} />;
    default: return null;
  }
};

const UpcomingTasks = () => {
  const theme = useTheme();

  return (
    <Card sx={{ 
      background: theme.card.background,
      borderRadius: theme.card.borderRadius,
      boxShadow: theme.card.boxShadow
    }}>
      <CardHeader
        title={<Typography variant="h5" fontWeight="bold">Upcoming Tasks</Typography>}
        action={
          <Link 
            href="/tasks" 
            sx={{ 
              fontSize: theme.typography.body2,
              color: 'primary.main',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            View All
          </Link>
        }
        sx={{ pb: 2 }}
      />
      <CardContent>
        <Stack gap={2}>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              sx={{
                backgroundColor: task.completed ? theme.palette.action.selected : 'inherit',
                borderColor: task.completed ? theme.palette.divider : theme.palette.divider
              }}
            >
              <Checkbox 
                size="small" 
                checked={task.completed} 
                sx={{ mt: '3px' }} 
              />
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? 'text.disabled' : 'text.primary'
                  }}
                >
                  {task.title}
                </Typography>
                <Stack direction="row" gap={3} mt={1}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CalendarIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {task.date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ClockIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                    <Typography variant="caption" color="text.secondary">
                      {task.time}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {getTaskIcon(task.type, theme)}
                    <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'capitalize' }}>
                      {task.type}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </TaskItem>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default UpcomingTasks;