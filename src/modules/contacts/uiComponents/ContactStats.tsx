import React from 'react';
import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import Grid from '@mui/material/GridLegacy';
import {
  GroupOutlined as UsersIcon,
  StarOutlined as StarIcon,
  LocalOfferOutlined as TagIcon,
  LinkOutlined as LinkIcon
} from '@mui/icons-material';

const ContactStats = () => {
  const theme = useTheme();

  const stats = [
    { 
      title: 'Total Contacts', 
      value: '246', 
      change: '+8% from last month', 
      icon: <UsersIcon color="primary" />
    },
    { 
      title: 'Customers', 
      value: '127', 
      change: '+12% from last month', 
      icon: <StarIcon color="success" />
    },
    { 
      title: 'Prospects', 
      value: '85', 
      change: '+5% from last month', 
      icon: <TagIcon color="primary" />
    },
    { 
      title: 'Associated Deals', 
      value: '92', 
      change: '+15% from last month',
      icon: <LinkIcon color="secondary" />
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
                    color="success.main"
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

export default ContactStats;