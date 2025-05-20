import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Button, Paper, Container } from '@mui/material';
import { Error as ErrorIcon, Home as HomeIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';

const Unauthorized: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          <ErrorIcon color="error" sx={{ fontSize: 80, mb: 2 }} />
          
          <Typography variant="h4" component="h1" gutterBottom>
            Access Denied
          </Typography>
          
          <Typography variant="body1" color="text.secondary" paragraph>
            You don't have permission to access this page.
            This might be because you don't have the required role or permissions.
          </Typography>
          
          <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
            <Button
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={handleGoBack}
            >
              Go Back
            </Button>
            
            <Button
              variant="contained"
              startIcon={<HomeIcon />}
              onClick={handleGoHome}
            >
              Go to Home
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Unauthorized;