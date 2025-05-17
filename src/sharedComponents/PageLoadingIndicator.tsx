import React from 'react';
import { Box, LinearProgress, useTheme } from '@mui/material';

interface PageLoadingIndicatorProps {
  isLoading?: boolean;
}

const PageLoadingIndicator: React.FC<PageLoadingIndicatorProps> = ({ isLoading = true }) => {
  const theme = useTheme();

  if (!isLoading) return null;

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
      }}
    >
      <LinearProgress
        sx={{
          height: 3,
          backgroundColor: 'transparent',
          '& .MuiLinearProgress-bar': {
            backgroundColor: theme.sidebar.primary,
            backgroundImage: `linear-gradient(to right, ${theme.sidebar.primary}, ${theme.status.customer.color})`,
          },
        }}
      />
    </Box>
  );
};

export default PageLoadingIndicator;