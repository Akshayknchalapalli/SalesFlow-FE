import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  useTheme
} from '@mui/material';
import {
  EmailOutlined as EmailIcon,
  PhoneOutlined as PhoneIcon,
  MoreVert as MoreVertIcon,
  CalendarTodayOutlined as CalendarIcon,
  PersonAddOutlined as UserPlusIcon,
  LocalOfferOutlined as TagIcon,
  DeleteOutlined as DeleteIcon
} from '@mui/icons-material';

const mockLeads = [
    {
      id: '1',
      name: 'John Doe',
      company: 'Acme Inc',
      email: 'john.doe@acme.com',
      phone: '(555) 123-4567',
      source: 'Web Form',
      status: 'new',
      score: 85,
      assignedTo: 'Sarah Johnson',
      lastContacted: '2 days ago',
      nextAction: 'Tomorrow'
    },
    {
      id: '2',
      name: 'Jane Smith',
      company: 'Globex Corp',
      email: 'jane.smith@globex.com',
      phone: '(555) 987-6543',
      source: 'Referral',
      status: 'contacted',
      score: 72,
      assignedTo: 'Mark Wilson',
      lastContacted: 'Today',
      nextAction: 'May 10, 2025'
    },
    {
      id: '3',
      name: 'Michael Johnson',
      company: 'Initech',
      email: 'michael.j@initech.com',
      phone: '(555) 456-7890',
      source: 'Trade Show',
      status: 'qualified',
      score: 94,
      assignedTo: 'Sarah Johnson',
      lastContacted: 'Yesterday',
      nextAction: 'May 8, 2025'
    },
    {
      id: '4',
      name: 'Sara Williams',
      company: 'Umbrella Corp',
      email: 'sara.w@umbrella.com',
      phone: '(555) 321-7654',
      source: 'Advertisement',
      status: 'lost',
      score: 45,
      assignedTo: 'Mark Wilson',
      lastContacted: '1 week ago',
      nextAction: 'N/A'
    },
    {
      id: '5',
      name: 'Robert Brown',
      company: 'Stark Industries',
      email: 'robert.b@stark.com',
      phone: '(555) 789-0123',
      source: 'Email Campaign',
      status: 'new',
      score: 68,
      assignedTo: 'Sarah Johnson',
      lastContacted: '3 days ago',
      nextAction: 'May 7, 2025'
    },
  ];

const StatusChip = ({ status }: { status: string }) => {
  const theme = useTheme();
  const statusConfig: Record<string, { label: string, status: 'prospect' | 'customer' | 'partner' | 'error' }> = {
    new: { label: 'New', status: 'prospect' },
    contacted: { label: 'Contacted', status: 'partner' },
    qualified: { label: 'Qualified', status: 'customer' },
    lost: { label: 'Lost', status: 'error' }
  };
  
  const config = statusConfig[status] || statusConfig.new;
  const statusType = config?.status ?? 'prospect';

  return (
    <Chip
      label={config?.label}
      size="small"
      sx={{
        backgroundColor: statusType === 'error' ? '#FEE2E2' : theme.status[statusType].bg,
        color: statusType === 'error' ? theme.palette.error.main : theme.status[statusType].color,
        fontWeight: 500,
        '& .MuiChip-label': {
          color: statusType === 'error' ? theme.palette.error.main : theme.status[statusType].color
        }
      }}
    />
  );
};

interface LeadsListProps {
  filter: string;
}

const LeadsList: React.FC<LeadsListProps> = ({ filter }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openId, setOpenId] = React.useState<string | null>(null);

  const filteredLeads = filter === 'all' 
    ? mockLeads 
    : mockLeads.filter(lead => lead.status === filter);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setOpenId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenId(null);
  };

  return (
    <Box sx={{ 
      backgroundColor: theme.palette.background.paper, 
      boxShadow: theme.card.boxShadow,
      overflow: 'hidden'
    }}>
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1" fontWeight="medium">Leads</Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<TagIcon />}
              sx={{ textTransform: 'none' }}
            >
              Filter
            </Button>
            <Button 
              variant="outlined" 
              size="small" 
              startIcon={<UserPlusIcon />}
              sx={{ textTransform: 'none' }}
            >
              Import
            </Button>
          </Box>
        </Box>
      </Box>

      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"><Checkbox /></TableCell>
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Name</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Company</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Source</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Status</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Contact Info</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Lead Score</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Assigned To</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Last Contacted</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Next Action</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow 
                key={lead.id} 
                hover 
                sx={{ '&:hover': { backgroundColor: 'action.hover' }, cursor: 'pointer' }}
              >
                <TableCell padding="checkbox"><Checkbox /></TableCell>
                
                <TableCell onClick={() => navigate(`/leads/${lead.id}`)}>
                  <Typography fontWeight="medium">{lead.name}</Typography>
                </TableCell>

                <TableCell onClick={() => navigate(`/leads/${lead.id}`)}>
                  {lead.company}
                </TableCell>

                <TableCell onClick={() => navigate(`/leads/${lead.id}`)}>
                  {lead.source}
                </TableCell>

                <TableCell onClick={() => navigate(`/leads/${lead.id}`)}>
                  <StatusChip status={lead.status} />
                </TableCell>

                <TableCell onClick={() => navigate(`/leads/${lead.id}`)}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
                      <Typography variant="body2">{lead.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
                      <Typography variant="body2">{lead.phone}</Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell onClick={() => navigate(`/leads/${lead.id}`)}>
                  <Chip
                    label={lead.score}
                    size="small"
                    sx={{
                      bgcolor: theme.palette.grey[200],
                      color: theme.palette.text.secondary,
                      fontWeight: 500
                    }}
                  />
                </TableCell>

                <TableCell onClick={() => navigate(`/leads/${lead.id}`)}>
                  {lead.assignedTo}
                </TableCell>

                <TableCell onClick={() => navigate(`/leads/${lead.id}`)}>
                  {lead.lastContacted}
                </TableCell>

                <TableCell onClick={() => navigate(`/leads/${lead.id}`)}>
                  {lead.nextAction}
                </TableCell>

                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e, lead.id);
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={openId === lead.id}
                    onClose={handleMenuClose}
                    onClick={(e) => e.stopPropagation()}
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
                    <MenuItem onClick={handleMenuClose}>
                      <CalendarIcon fontSize="small" sx={{ mr: 1 }} />
                      Schedule Meeting
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                      Send Email
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                      Call
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
                      <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                      Delete Lead
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default LeadsList;