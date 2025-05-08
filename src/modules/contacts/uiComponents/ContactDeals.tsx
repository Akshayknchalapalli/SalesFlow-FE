import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  Chip,
  Box,
  useTheme,
  styled
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';

interface ContactDealsProps {
  contactId?: string;
}

const DealItem = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('background-color'),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer'
  }
}));

const ContactDeals: React.FC<ContactDealsProps> = ({ contactId }) => {
  const theme = useTheme();
  
  // Mock deals data (same as original)
  const deals = [
    {
      id: '1',
      title: 'Enterprise License Renewal',
      value: '$45,000',
      stage: 'Negotiation',
      probability: 75,
      expectedClose: 'May 30, 2025'
    },
    {
      id: '2',
      title: 'Product Expansion - Marketing Module',
      value: '$12,500',
      stage: 'Proposal',
      probability: 50,
      expectedClose: 'June 15, 2025'
    },
    {
      id: '3',
      title: 'Professional Services',
      value: '$8,000',
      stage: 'Discovery',
      probability: 30,
      expectedClose: 'July 10, 2025'
    }
  ];

  // Stage badge styling using theme
  const getStageBadge = (stage: string) => {
    const stageConfig: Record<string, { label: string, status: 'prospect' | 'customer' | 'partner' }> = {
      Discovery: { label: 'Discovery', status: 'prospect' },
      Proposal: { label: 'Proposal', status: 'partner' },
      Negotiation: { label: 'Negotiation', status: 'customer' },
      'Closed Won': { label: 'Closed Won', status: 'customer' },
      'Closed Lost': { label: 'Closed Lost', status: 'prospect' }
    };

    const config = stageConfig[stage] ?? stageConfig.Discovery;
    const status = config?.status ?? 'prospect';

    return (
      <Chip
        label={config?.label}
        size="small"
        sx={{
          backgroundColor: theme.status[status].bg,
          color: theme.status[status].color,
          fontWeight: 500,
          '& .MuiChip-label': {
            color: theme.status[status].color
          }
        }}
      />
    );
  };

  return (
    <Card sx={{ boxShadow: theme.shadows[1] }}>
      <CardHeader
        title={<Typography variant="h6">Associated Deals</Typography>}
        action={
          <Button
            variant="contained"
            size="small"
            startIcon={<AddIcon fontSize="small" />}
            sx={{ textTransform: 'none' }}
          >
            New Deal
          </Button>
        }
        sx={{
          py: 2,
          '& .MuiCardHeader-action': { alignSelf: 'center' }
        }}
      />
      <CardContent>
        <Box sx={{ display: 'grid', gap: 2 }}>
          {deals.map((deal) => (
            <DealItem key={deal.id}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}>
                <Box>
                  <Typography variant="body1" fontWeight="medium">
                    {deal.title}
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1, mt: 1, alignItems: 'center' }}>
                    {getStageBadge(deal.stage)}
                    <Typography variant="body2" color="text.secondary">
                      {deal.value}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Chip
                    label={`${deal.probability}% Probability`}
                    size="small"
                    sx={{
                      bgcolor: theme.palette.grey[200],
                      color: theme.palette.text.secondary,
                      fontWeight: 500
                    }}
                  />
                  <Typography variant="caption" color="text.disabled" display="block" mt={1}>
                    Expected close: {deal.expectedClose}
                  </Typography>
                </Box>
              </Box>
            </DealItem>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactDeals;