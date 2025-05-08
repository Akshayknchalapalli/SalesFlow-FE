import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import {
  GroupOutlined as UsersIcon,
  CommentOutlined as CommentIcon,
  CheckCircleOutlined as CheckCircleIcon,
  CancelOutlined as CancelIcon
} from '@mui/icons-material';

const LeadStats = () => {
  const theme = useTheme();

  const stats = [
    { 
      title: 'Total Leads', 
      value: '384', 
      change: '+12% from last month', 
      icon: <UsersIcon color="primary" />
    },
    { 
      title: 'Active Conversations', 
      value: '47', 
      change: '+5% from last month', 
      icon: <CommentIcon color="success" />
    },
    { 
      title: 'Qualified Leads', 
      value: '112', 
      change: '+18% from last month', 
      icon: <CheckCircleIcon color="primary" />
    },
    { 
      title: 'Lost Leads', 
      value: '28', 
      change: '-3% from last month',
      isNegative: true, 
      icon: <CancelIcon color="error" />
    },
  ];

  return (
    <Grid container spacing={2} sx={{ mb: 2 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} md={6} lg={3} key={index}>
          <Card 
            sx={{ 
              height: '100%',
              boxShadow: theme.card.boxShadow,
            }}
          >
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
                    component="h3" 
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
                    fontWeight={500}
                  >
                    {stat.change}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1,
                    bgcolor: theme.palette.grey[100],
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {React.cloneElement(stat.icon, { sx: { fontSize: 20 } })}
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