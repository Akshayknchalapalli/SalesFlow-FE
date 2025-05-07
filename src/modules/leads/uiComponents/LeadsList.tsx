import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Checkbox,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Typography,
  useTheme
} from '@mui/material';
import {
  Email as EmailIcon,
  Phone as PhoneIcon,
  MoreVert as MoreVertIcon,
  CalendarToday as CalendarIcon,
  PersonAdd as UserPlusIcon,
  LocalOffer as TagIcon,
  Delete as TrashIcon
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
  const statusConfig = {
    new: { label: 'New', color: 'primary' },
    contacted: { label: 'Contacted', color: 'warning' },
    qualified: { label: 'Qualified', color: 'success' },
    lost: { label: 'Lost', color: 'error' },
  };
  
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.new;
  
  return (
    <Chip
      label={config.label}
      size="small"
      sx={{
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.primary,
        '&:hover': { backgroundColor: theme.palette.action.hover }
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
    <Paper sx={{ overflow: 'hidden' }}>
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 2 
        }}>
          <Typography variant="subtitle1" fontWeight="medium">
            Leads
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button variant="outlined" startIcon={<TagIcon />}>
              Filter
            </Button>
            <Button variant="outlined" startIcon={<UserPlusIcon />}>
              Import
            </Button>
          </Box>
        </Box>
      </Box>

      <TableContainer sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Company</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Contact Info</TableCell>
              <TableCell>Lead Score</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Last Contacted</TableCell>
              <TableCell>Next Action</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLeads.map((lead) => (
              <TableRow 
                key={lead.id} 
                hover 
                sx={{ '&:hover': { backgroundColor: 'action.hover' } }}
              >
                <TableCell padding="checkbox">
                  <Checkbox />
                </TableCell>
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
                      <EmailIcon fontSize="small" />
                      <Typography variant="body2">{lead.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon fontSize="small" />
                      <Typography variant="body2">{lead.phone}</Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell onClick={() => navigate(`/leads/${lead.id}`)}>
                  <Chip
                    label={lead.score}
                    size="small"
                    sx={{ bgcolor: 'grey.100', color: 'text.primary' }}
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
                    onClick={(e) => handleMenuOpen(e, lead.id)}
                    size="small"
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={openId === lead.id}
                    onClose={handleMenuClose}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right'
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'right'
                    }}
                  >
                    <MenuItem onClick={handleMenuClose}>
                      <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                      Send Email
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                      Call
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose}>
                      <CalendarIcon fontSize="small" sx={{ mr: 1 }} />
                      Schedule Task
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
                      <TrashIcon fontSize="small" sx={{ mr: 1 }} />
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default LeadsList;