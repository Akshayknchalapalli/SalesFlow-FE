import React from 'react';
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  useTheme,
  Divider
} from '@mui/material';
import {
  DescriptionOutlined as PdfIcon,
  InsertDriveFileOutlined as DocIcon,
  ImageOutlined as PptIcon,
  TableChartOutlined as XlsIcon,
  Add as AddIcon,
  VisibilityOutlined as ViewIcon,
  DownloadOutlined as DownloadIcon,
  MoreVert as MoreIcon
} from '@mui/icons-material';

interface LeadDocumentsProps {
  leadId?: string;
}

// Mock documents data
const documents = [
    {
      id: 1,
      name: 'Initial Proposal.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedAt: '2024-05-02T14:30:00Z',
      uploadedBy: 'John Doe'
    },
    {
      id: 2,
      name: 'Meeting Notes.docx',
      type: 'docx',
      size: '456 KB',
      uploadedAt: '2024-05-04T16:45:00Z',
      uploadedBy: 'Jane Smith'
    },
    {
      id: 3,
      name: 'Product Overview.pptx',
      type: 'pptx',
      size: '3.8 MB',
      uploadedAt: '2024-05-05T10:15:00Z',
      uploadedBy: 'John Doe'
    },
    {
      id: 4,
      name: 'Client Requirements.xlsx',
      type: 'xlsx',
      size: '1.2 MB',
      uploadedAt: '2024-05-07T09:30:00Z',
      uploadedBy: 'John Doe'
    }
  ];

const LeadDocuments: React.FC<LeadDocumentsProps> = ({ leadId }) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openId, setOpenId] = React.useState<number | null>(null);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const getDocumentIcon = (type: string) => {
    const iconStyle = { fontSize: 32 };
    switch (type) {
      case 'pdf': return <PdfIcon sx={{ ...iconStyle, color: theme.palette.error.main }} />;
      case 'docx': return <DocIcon sx={{ ...iconStyle, color: theme.palette.info.main }} />;
      case 'pptx': return <PptIcon sx={{ ...iconStyle, color: theme.palette.warning.main }} />;
      case 'xlsx': return <XlsIcon sx={{ ...iconStyle, color: theme.palette.success.main }} />;
      default: return <DocIcon sx={iconStyle} />;
    }
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, id: number) => {
    setAnchorEl(event.currentTarget);
    setOpenId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setOpenId(null);
  };

  return (
    <Card sx={{ 
      boxShadow: theme.card.boxShadow,
      '& .MuiCardContent-root': {
        p: 0
      }
    }}>
      <CardContent>
        <Box sx={{ 
          p: 2, 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          borderBottom: `1px solid ${theme.palette.divider}`
        }}>
          <Typography variant="subtitle1" fontWeight={600}>Documents</Typography>
          <Button 
            variant="contained" 
            size="small"
            startIcon={<AddIcon />}
            sx={{ 
              textTransform: 'none',
              '& .MuiSvgIcon-root': {
                fontSize: '1.2rem'
              }
            }}
          >
            Upload
          </Button>
        </Box>
        
        <List sx={{ p: 0 }}>
          {documents.map((document) => (
            <React.Fragment key={document.id}>
              <ListItem sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                px: 3, 
                py: 2,
                '&:hover': { bgcolor: 'action.hover' }
              }}>
                <ListItemIcon sx={{ minWidth: 48, mr: 2 }}>
                  {getDocumentIcon(document.type)}
                </ListItemIcon>
                
                <ListItemText
                  primary={
                    <Typography variant="body1" fontWeight={600}>
                      {document.name}
                    </Typography>
                  }
                  secondary={
                    <Box component="span" sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" component="span" color="text.secondary">
                        {document.size}
                      </Typography>
                      <Box component="span" sx={{ mx: 1 }}>•</Box>
                      <Typography variant="body2" component="span" color="text.secondary">
                        Uploaded {formatDate(document.uploadedAt)}
                      </Typography>
                      <Box component="span" sx={{ mx: 1 }}>•</Box>
                      <Typography variant="body2" component="span" color="text.secondary">
                        by {document.uploadedBy}
                      </Typography>
                    </Box>
                  }
                />
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <IconButton size="small">
                    <ViewIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small">
                    <DownloadIcon fontSize="small" />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={(e) => handleMenuOpen(e, document.id)}
                  >
                    <MoreIcon fontSize="small" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={openId === document.id}
                    onClose={handleMenuClose}
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
                    <MenuItem onClick={handleMenuClose}>Rename</MenuItem>
                    <MenuItem onClick={handleMenuClose}>Share</MenuItem>
                    <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
                      Delete
                    </MenuItem>
                  </Menu>
                </Box>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default LeadDocuments;