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
  LinkOutlined as LinkIcon,
  CalendarTodayOutlined as CalendarIcon,
  MoreVert as MoreVertIcon,
  LocalOfferOutlined as TagIcon,
  InsertDriveFileOutlined as FileIcon,
  DeleteOutlined as DeleteIcon
} from '@mui/icons-material';

const mockContacts = [
    {
      id: '1',
      name: 'Emma Wilson',
      title: 'Marketing Director',
      company: 'Acme Corp',
      email: 'emma.wilson@acme.com',
      phone: '(555) 234-5678',
      stage: 'customer',
      lastContact: '1 day ago',
      deals: 3
    },
    {
      id: '2',
      name: 'David Chen',
      title: 'CTO',
      company: 'TechFlow Inc',
      email: 'david.chen@techflow.com',
      phone: '(555) 876-5432',
      stage: 'prospect',
      lastContact: '3 days ago',
      deals: 1
    },
    {
      id: '3',
      name: 'Sophia Rodriguez',
      title: 'CEO',
      company: 'Innovate Solutions',
      email: 'sophia@innovate.com',
      phone: '(555) 345-6789',
      stage: 'customer',
      lastContact: 'Today',
      deals: 4
    },
    {
      id: '4',
      name: 'Michael Taylor',
      title: 'Sales Manager',
      company: 'Global Enterprises',
      email: 'michael.t@global.com',
      phone: '(555) 567-8901',
      stage: 'partner',
      lastContact: 'Yesterday',
      deals: 2
    },
    {
      id: '5',
      name: 'Olivia Johnson',
      title: 'Product Manager',
      company: 'Future Tech',
      email: 'olivia.j@futuretech.com',
      phone: '(555) 678-9012',
      stage: 'prospect',
      lastContact: '1 week ago',
      deals: 0
    },
  ];

  const StageChip = ({ stage }: { stage: string }) => {
    const theme = useTheme();
    
    const stageConfig: Record<string, { label: string }> = {
      prospect: { label: 'Prospect' },
      customer: { label: 'Customer' },
      partner: { label: 'Partner' },
    };
  
    const config = stageConfig[stage as keyof typeof stageConfig] || stageConfig.prospect;
  
    return (
      <Chip
        label={config?.label}
        size="small"
        sx={{
          backgroundColor: theme.status[stage as keyof typeof theme.status]?.bg || theme.status.default.bg,
          color: theme.status[stage as keyof typeof theme.status]?.color || theme.status.default.color,
          fontWeight: 500,
          '& .MuiChip-label': {
            color: theme.status[stage as keyof typeof theme.status]?.color || theme.status.default.color
          }
        }}
      />
    );
  };

interface ContactsListProps {
    filter: string;
  }

const ContactsList: React.FC<ContactsListProps> = ({ filter }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const filteredContacts = filter === 'all' 
    ? mockContacts 
    : mockContacts.filter(contact => contact.stage === filter);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ 
      backgroundColor: theme.palette.background.paper, 
      // borderRadius: theme.shape.borderRadius,
      boxShadow: theme.card.boxShadow,
      overflow: 'hidden'
    }}>
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="body1" fontWeight="medium">Contacts</Typography>
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
              startIcon={<FileIcon />}
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
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Title/Company</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Relationship</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Contact Info</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Last Contact</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Associated Deals</Typography></TableCell>
              <TableCell><Typography variant="body2" fontWeight={600} color="text.secondary">Actions</Typography></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredContacts.map((contact) => (
              <TableRow 
                key={contact.id} 
                hover 
                sx={{ '&:hover': { backgroundColor: 'action.hover' }, cursor: 'pointer' }}
              >
                <TableCell padding="checkbox"><Checkbox /></TableCell>
                
                <TableCell onClick={() => navigate(`/contacts/${contact.id}`)}>
                  <Typography fontWeight="medium">{contact.name}</Typography>
                </TableCell>

                <TableCell onClick={() => navigate(`/contacts/${contact.id}`)}>
                  <Box>
                    <Typography fontWeight="medium">{contact.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{contact.company}</Typography>
                  </Box>
                </TableCell>

                <TableCell onClick={() => navigate(`/contacts/${contact.id}`)}>
                  <StageChip stage={contact.stage} />
                </TableCell>

                <TableCell onClick={() => navigate(`/contacts/${contact.id}`)}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <EmailIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
                      <Typography variant="body2">{contact.email}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <PhoneIcon sx={{ fontSize: 14, color: theme.palette.text.secondary }} />
                      <Typography variant="body2">{contact.phone}</Typography>
                    </Box>
                  </Box>
                </TableCell>

                <TableCell onClick={() => navigate(`/contacts/${contact.id}`)}>
                  <Typography variant="body2">{contact.lastContact}</Typography>
                </TableCell>

                <TableCell onClick={() => navigate(`/contacts/${contact.id}`)}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <LinkIcon sx={{ fontSize: 14, color: theme.palette.primary.main }} />
                    <Typography variant="body2">{contact.deals} deals</Typography>
                  </Box>
                </TableCell>

                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMenuOpen(e);
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
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
                    <MenuItem onClick={handleMenuClose}>
                      <LinkIcon fontSize="small" sx={{ mr: 1 }} />
                      Link a Deal
                    </MenuItem>
                    <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
                      <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                      Delete Contact
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

export default ContactsList;