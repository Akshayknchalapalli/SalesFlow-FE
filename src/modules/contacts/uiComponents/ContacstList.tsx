import * as React from 'react';
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
import type { ContactDTO } from '../ContactDTO';

const mockContacts: (ContactDTO & { deals?: number })[] = [
  {
    id: 1,
    firstName: 'Emma',
    lastName: 'Wilson',
    email: 'emma.wilson@acme.com',
    phone: '(555) 234-5678',
    companyName: 'Acme Corp',
    jobTitle: 'Marketing Director',
    stage: 'customer',
    ownerId: 'Sarah Johnson',
    preferences: {
      preferredContactMethod: 'Email',
      preferredContactTime: 'Morning (9-11 AM)',
      doNotContact: false,
      marketingOptIn: true,
      communicationLanguage: 'English',
    },
    addresses: [
      {
        type: 'work',
        street: '123 Business Ave',
        city: 'New York',
        state: 'NY',
        postalCode: '10001',
        country: 'USA',
        primary: true,
      },
    ],
    socialProfiles: [
      {
        platform: 'LinkedIn',
        profileUrl: 'https://linkedin.com/in/emmawilson',
        username: 'emmawilson',
        verified: true,
      },
    ],
    notes: 'Key decision maker for marketing purchases.',
    createdAt: '2023-01-01T10:00:00Z',
    updatedAt: '2023-01-10T12:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    version: 1,
    deals: 3,
  },
  {
    id: 2,
    firstName: 'David',
    lastName: 'Chen',
    email: 'david.chen@techflow.com',
    phone: '(555) 876-5432',
    companyName: 'TechFlow Inc',
    jobTitle: 'CTO',
    stage: 'prospect',
    ownerId: 'Sarah Johnson',
    preferences: {
      preferredContactMethod: 'Email',
      preferredContactTime: 'Morning (9-11 AM)',
      doNotContact: false,
      marketingOptIn: true,
      communicationLanguage: 'English',
    },
    addresses: [
      {
        type: 'work',
        street: '456 Innovation St',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94103',
        country: 'USA',
        primary: true,
      },
    ],
    socialProfiles: [
      {
        platform: 'LinkedIn',
        profileUrl: 'https://linkedin.com/in/davidchen',
        username: 'davidchen',
        verified: true,
      },
    ],
    notes: 'Interested in AI and cloud technologies.',
    createdAt: '2023-01-02T11:00:00Z',
    updatedAt: '2023-01-11T13:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    version: 1,
    deals: 2,
  },
  {
    id: 3,
    firstName: 'Sophia',
    lastName: 'Rodriguez',
    email: 'sophia@innovate.com',
    phone: '(555) 345-6789',
    companyName: 'Innovate Solutions',
    jobTitle: 'CEO',
    stage: 'customer',
    ownerId: 'Sarah Johnson',
    preferences: {
      preferredContactMethod: 'Email',
      preferredContactTime: 'Afternoon (1-3 PM)',
      doNotContact: false,
      marketingOptIn: true,
      communicationLanguage: 'Spanish',
    },
    addresses: [
      {
        type: 'work',
        street: '789 Tech Blvd',
        city: 'San Diego',
        state: 'CA',
        postalCode: '92101',
        country: 'USA',
        primary: true,
      },
    ],
    socialProfiles: [
      {
        platform: 'LinkedIn',
        profileUrl: 'https://linkedin.com/in/sophiarodriguez',
        username: 'sophiarodriguez',
        verified: true,
      },
    ],
    notes: 'Leads innovation projects and strategic partnerships.',
    createdAt: '2023-01-03T12:00:00Z',
    updatedAt: '2023-01-12T14:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    version: 1,
    deals: 1,
  },
  {
    id: 4,
    firstName: 'Michael',
    lastName: 'Taylor',
    email: 'michael.t@global.com',
    phone: '(555) 567-8901',
    companyName: 'Global Enterprises',
    jobTitle: 'Sales Manager',
    stage: 'partner',
    ownerId: 'Sarah Johnson',
    preferences: {
      preferredContactMethod: 'Phone',
      preferredContactTime: 'Evening (7-9 PM)',
      doNotContact: false,
      marketingOptIn: true,
      communicationLanguage: 'English',
    },
    addresses: [
      {
        type: 'work',
        street: '101 Market St',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94103',
        country: 'USA',
        primary: true,
      },
    ],
    socialProfiles: [
      {
        platform: 'LinkedIn',
        profileUrl: 'https://linkedin.com/in/michael-taylor',
        username: 'michael-taylor',
        verified: true,
      },
    ],
    notes: 'Strong relationship with sales team.',
    createdAt: '2023-01-04T13:00:00Z',
    updatedAt: '2023-01-13T15:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    version: 1,
    deals: 4,
  },
  {
    id: 5,
    firstName: 'Olivia',
    lastName: 'Johnson',
    email: 'olivia.j@futuretech.com',
    phone: '(555) 678-9012',
    companyName: 'Future Tech',
    jobTitle: 'Product Manager',
    stage: 'prospect',
    ownerId: 'Sarah Johnson',
    preferences: {
      preferredContactMethod: 'Email',
      preferredContactTime: 'Morning (9-11 AM)',
      doNotContact: false,
      marketingOptIn: true,
      communicationLanguage: 'English',
    },
    addresses: [
      {
        type: 'work',
        street: '321 Innovation St',
        city: 'San Francisco',
        state: 'CA',
        postalCode: '94103',
        country: 'USA',
        primary: true,
      },
    ],
    socialProfiles: [
      {
        platform: 'LinkedIn',
        profileUrl: 'https://linkedin.com/in/oliviajohnson',
        username: 'oliviajohnson',
        verified: true,
      },
    ],
    notes: 'Interested in new product development.',
    createdAt: '2023-01-05T14:00:00Z',
    updatedAt: '2023-01-14T16:00:00Z',
    createdBy: 'admin',
    updatedBy: 'admin',
    version: 1,
    deals: 2,
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

const ContactsList: React.FC<ContactsListProps> = ({ filter }: ContactsListProps) => {
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

  const handleMenuCloseMenu = (_event: object, _reason: 'backdropClick' | 'escapeKeyDown') => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = () => {
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
                  <Typography fontWeight="medium">{contact.firstName} {contact.lastName}</Typography>
                </TableCell>

                <TableCell onClick={() => navigate(`/contacts/${contact.id}`)}>
                  <Box>
                    <Typography fontWeight="medium">{contact.jobTitle}</Typography>
                    <Typography variant="body2" color="text.secondary">{contact.companyName}</Typography>
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
                  <Typography variant="body2">{contact.createdAt}</Typography>
                </TableCell>

                <TableCell onClick={() => navigate(`/contacts/${contact.id}`)}>
                  <Typography variant="body2">{contact.deals ?? '-'}</Typography>
                </TableCell>

                <TableCell>
                  <IconButton
                    size="small"
                    onClick={(e: React.MouseEvent<HTMLElement>) => {
                      e.stopPropagation();
                      handleMenuOpen(e);
                    }}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleMenuCloseMenu}
                    onClick={(e: React.MouseEvent<HTMLElement>) => e.stopPropagation()}
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
                    <MenuItem onClick={handleMenuItemClick}>
                      <CalendarIcon fontSize="small" sx={{ mr: 1 }} />
                      Schedule Meeting
                    </MenuItem>
                    <MenuItem onClick={handleMenuItemClick}>
                      <EmailIcon fontSize="small" sx={{ mr: 1 }} />
                      Send Email
                    </MenuItem>
                    <MenuItem onClick={handleMenuItemClick}>
                      <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
                      Call
                    </MenuItem>
                    <MenuItem onClick={handleMenuItemClick}>
                      <LinkIcon fontSize="small" sx={{ mr: 1 }} />
                      Link a Deal
                    </MenuItem>
                    <MenuItem onClick={handleMenuItemClick} sx={{ color: 'error.main' }}>
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
export { mockContacts };