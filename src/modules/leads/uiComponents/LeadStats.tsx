import React from 'react';
import { Card, CardContent, Grid, Typography, Box, useTheme } from '@mui/material';
import {
  Group as UsersIcon,
  Comment as CommentIcon,
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const LeadStats = () => {
  const theme = useTheme();

  const stats = [
    { 
      title: 'Total Leads', 
      value: '384', 
      change: '+12% from last month', 
      icon: <UsersIcon sx={{ color: theme.palette.primary.main }} />
    },
    { 
      title: 'Active Conversations', 
      value: '47', 
      change: '+5% from last month', 
      icon: <CommentIcon sx={{ color: theme.palette.secondary.main }} />
    },
    { 
      title: 'Qualified Leads', 
      value: '112', 
      change: '+18% from last month', 
      icon: <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
    },
    { 
      title: 'Lost Leads', 
      value: '28', 
      change: '-3% from last month',
      isNegative: true, 
      icon: <CancelIcon sx={{ color: theme.palette.error.main }} />
    },
  ];

  return (
    <Grid container spacing={2}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} lg={3} key={index}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Box>
                  <Typography 
                    variant="body2" 
                    color="text.secondary" 
                    fontWeight={500}
                  >
                    {stat.title}
                  </Typography>
                  <Typography 
                    variant="h4" 
                    component="div" 
                    mt={1}
                    fontWeight="bold"
                  >
                    {stat.value}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color={stat.isNegative ? 'error.main' : 'success.main'}
                    mt={1}
                    display="block"
                  >
                    {stat.change}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: 'grey.100',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {React.cloneElement(stat.icon, { sx: { fontSize: 24 } })}
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default LeadStats;