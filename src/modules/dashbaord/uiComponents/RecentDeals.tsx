import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Link,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  useTheme,
  Box
} from '@mui/material';
import { styled } from '@mui/material/styles';

const deals = [
  {
    company: 'Acme Inc.',
    value: '$45,000',
    stage: 'Negotiation',
    contact: 'John Smith',
    status: 'Active',
    lastActivity: '2 hours ago',
  },
  {
    company: 'Globex Corp',
    value: '$72,500',
    stage: 'Proposal',
    contact: 'Jane Doe',
    status: 'At Risk',
    lastActivity: '1 day ago',
  },
  {
    company: 'Stark Industries',
    value: '$134,200',
    stage: 'Qualified',
    contact: 'Tony Stark',
    status: 'Active',
    lastActivity: '3 days ago',
  },
  {
    company: 'Wayne Enterprises',
    value: '$95,000',
    stage: 'Closed Won',
    contact: 'Bruce Wayne',
    status: 'Won',
    lastActivity: '5 days ago',
  },
];

const StatusChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  fontSize: theme.typography.pxToRem(12),
  borderRadius: theme.shape.borderRadius,
}));

const getStatusColor = (status: string, theme: any) => {
  switch (status) {
    case 'Active':
      return { bgcolor: theme.palette.primary.light, color: theme.palette.primary.dark };
    case 'At Risk':
      return { bgcolor: theme.palette.error.light, color: theme.palette.error.dark };
    case 'Won':
      return { bgcolor: theme.palette.success.light, color: theme.palette.success.dark };
    default:
      return { bgcolor: theme.palette.grey[200], color: theme.palette.text.secondary };
  }
};

const RecentDeals = () => {
  const theme = useTheme();

  return (
    <Card sx={{ 
      background: theme.card.background,
      borderRadius: theme.card.borderRadius,
      boxShadow: theme.card.boxShadow,
      height: '100%'
    }}>
      <CardHeader
        title={<Typography variant="h5" fontWeight="bold">Recent Deals</Typography>}
        action={
          <Link 
            href="/deals" 
            sx={{ 
              fontSize: theme.typography.body2,
              color: 'primary.main',
              '&:hover': { textDecoration: 'underline' }
            }}
          >
            View All
          </Link>
        }
        sx={{ pb: 1 }}
      />
      <CardContent sx={{ pt: 0 }}>
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ borderBottom: `1px solid ${theme.palette.divider}` }}>
                <TableCell sx={{ py: 1.5, px: 2, minWidth: 200 }}>
                  <Typography variant="body2" color="text.secondary">Company</Typography>
                </TableCell>
                <TableCell sx={{ py: 1.5, px: 2 }}>
                  <Typography variant="body2" color="text.secondary">Value</Typography>
                </TableCell>
                <TableCell sx={{ py: 1.5, px: 2 }}>
                  <Typography variant="body2" color="text.secondary">Stage</Typography>
                </TableCell>
                <TableCell sx={{ py: 1.5, px: 2 }}>
                  <Typography variant="body2" color="text.secondary">Status</Typography>
                </TableCell>
                <TableCell sx={{ py: 1.5, px: 2 }}>
                  <Typography variant="body2" color="text.secondary">Last Activity</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {deals.map((deal, index) => (
                <TableRow 
                  key={index}
                  hover
                  sx={{ 
                    '&:last-child td': { borderBottom: 0 },
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: theme.palette.action.hover }
                  }}
                >
                  <TableCell sx={{ py: 1.5, px: 2 }}>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {deal.company}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {deal.contact}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell sx={{ py: 1.5, px: 2 }}>
                    <Typography variant="body2" fontWeight="medium">
                      {deal.value}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ py: 1.5, px: 2 }}>
                    <Typography variant="body2">{deal.stage}</Typography>
                  </TableCell>
                  <TableCell sx={{ py: 1.5, px: 2 }}>
                    <StatusChip
                      label={deal.status}
                      size="small"
                      sx={getStatusColor(deal.status, theme)}
                    />
                  </TableCell>
                  <TableCell sx={{ py: 1.5, px: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      {deal.lastActivity}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </CardContent>
    </Card>
  );
};

export default RecentDeals;