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
  fontWeight: 700,
  fontSize: theme.typography.pxToRem(13),
  borderRadius: 999,
  letterSpacing: 0.5,
  padding: '0 10px',
  height: 28,
  textTransform: 'capitalize',
  boxShadow: 'none',
}));

// Use theme.status for status chip background and text color (set in theme.ts)
const getStatusColor = (status: string, theme: any) => {
  switch (status) {
    case 'Active':
      return {
        bgcolor: theme.status.active.bg,
        color: theme.status.active.color,
        border: 'none',
      };
    case 'At Risk':
      return {
        bgcolor: theme.status.atRisk.bg,
        color: theme.status.atRisk.color,
        border: 'none',
      };
    case 'Won':
      return {
        bgcolor: theme.status.won.bg,
        color: theme.status.won.color,
        border: 'none',
      };
    default:
      return {
        bgcolor: theme.status.default.bg,
        color: theme.status.default.color,
        border: 'none',
      };
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