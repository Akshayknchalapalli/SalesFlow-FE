import React from 'react';
import { Box, useTheme, keyframes } from '@mui/material';

const rotateAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const dashAnimation = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`;

interface LoadingSpinnerProps {
  size?: number;
  thickness?: number;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 40,
  thickness = 4,
  color,
}) => {
  const theme = useTheme();
  const spinnerColor = color || theme.palette.primary.main;

  return (
    <Box
      sx={{
        display: 'inline-flex',
        animation: `${rotateAnimation} 2s linear infinite`,
        width: size,
        height: size,
      }}
    >
      <svg
        viewBox="0 0 50 50"
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={spinnerColor}
          strokeWidth={thickness}
          strokeLinecap="round"
          style={{
            animation: `${dashAnimation} 1.5s ease-in-out infinite`,
            strokeDasharray: '90, 150',
            strokeDashoffset: 0,
          }}
        />
      </svg>
    </Box>
  );
};

export default LoadingSpinner;