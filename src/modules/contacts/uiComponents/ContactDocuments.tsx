import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  Button,
  IconButton,
  Box,
  useTheme,
  styled
} from '@mui/material';
import {
  Description as FileIcon,
  Download as DownloadIcon,
  Upload as UploadIcon
} from '@mui/icons-material';

interface ContactDocumentsProps {
  contactId?: string;
}

const DocumentItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('background-color'),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
    cursor: 'pointer'
  }
}));

const ContactDocuments: React.FC<ContactDocumentsProps> = ({ contactId }) => {
  const theme = useTheme();

  const documents = [
    {
      id: '1',
      name: 'Contract Agreement.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadedBy: 'Sarah Johnson',
      uploadedDate: 'April 15, 2025'
    },
    {
      id: '2',
      name: 'Meeting Notes - Product Demo.docx',
      type: 'docx',
      size: '543 KB',
      uploadedBy: 'Mark Wilson',
      uploadedDate: 'April 20, 2025'
    },
    {
      id: '3',
      name: 'Custom Requirements.xlsx',
      type: 'xlsx',
      size: '1.2 MB',
      uploadedBy: 'Sarah Johnson',
      uploadedDate: 'April 28, 2025'
    }
  ];

  const getDocumentIcon = (type: string) => {
    const iconStyle = { fontSize: 32 };
    switch (type) {
      case 'pdf':
        return <FileIcon sx={{ ...iconStyle, color: '#ef4444' }} />;
      case 'docx':
        return <FileIcon sx={{ ...iconStyle, color: '#3b82f6' }} />;
      case 'xlsx':
        return <FileIcon sx={{ ...iconStyle, color: '#22c55e' }} />;
      default:
        return <FileIcon sx={{ ...iconStyle, color: theme.palette.text.secondary }} />;
    }
  };

  return (
    <Card sx={{ boxShadow: theme.shadows[1] }}>
      <CardHeader
        title={<Typography variant="h6">Documents</Typography>}
        action={
          <Button
            variant="contained"
            size="small"
            startIcon={<UploadIcon fontSize="small" />}
            sx={{ textTransform: 'none' }}
          >
            Upload Document
          </Button>
        }
        sx={{
          py: 2,
          '& .MuiCardHeader-action': { alignSelf: 'center' }
        }}
      />
      <CardContent>
        <Box sx={{ display: 'grid', gap: 2 }}>
          {documents.map((document) => (
            <DocumentItem key={document.id}>
              <Box sx={{ mr: 2 }}>
                {getDocumentIcon(document.type)}
              </Box>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="body1" fontWeight="medium">
                  {document.name}
                </Typography>
                <Typography variant="caption" color="text.secondary" display="block" mt={0.5}>
                  {document.size} • Uploaded by {document.uploadedBy} on {document.uploadedDate}
                </Typography>
              </Box>
              <IconButton size="small" sx={{ color: 'text.secondary' }}>
                <DownloadIcon fontSize="small" />
              </IconButton>
            </DocumentItem>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ContactDocuments;