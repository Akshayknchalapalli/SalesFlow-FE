import React from 'react';
import { Card, CardContent, Grid, Typography, Box, useTheme } from '@mui/material';
import {
  Group as UsersIcon,
  Star as StarIcon,
  LocalOffer as TagIcon,
  Link as LinkIcon
} from '@mui/icons-material';

const ContactStats = () => {
  const theme = useTheme();

  const stats = [
    { 
      title: 'Total Contacts', 
      value: '246', 
      change: '+8% from last month', 
      icon: <UsersIcon sx={{ color: theme.palette.primary.main }} />
    },
    { 
      title: 'Customers', 
      value: '127', 
      change: '+12% from last month', 
      icon: <StarIcon sx={{ color: theme.palette.success.main }} />
    },
    { 
      title: 'Prospects', 
      value: '85', 
      change: '+5% from last month', 
      icon: <TagIcon sx={{ color: theme.palette.info.main }} />
    },
    { 
      title: 'Associated Deals', 
      value: '92', 
      change: '+15% from last month',
      icon: <LinkIcon sx={{ color: theme.palette.secondary.main }} />
    },
  ];

  return (
    <Grid container spacing={2}>
      {stats.map((stat, index) => (
        <Grid item xs={12} md={6} lg={3} key={index}>
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
                    component="h3" 
                    mt={1}
                    fontWeight="bold"
                  >
                    {stat.value}
                  </Typography>
                  <Typography 
                    variant="caption" 
                    color="success.main"
                    mt={1}
                    display="block"
                  >
                    {stat.change}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    p: 1.5,
                    bgcolor: theme.palette.action.hover,
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

export default ContactStats;