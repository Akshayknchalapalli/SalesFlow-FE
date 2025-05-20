import { useEffect, useState } from 'react';
import { Box, Typography, useTheme, styled, keyframes } from '@mui/material';
import { cardFadeIn } from '../theme/Animations';
import LoadingSpinner from './LoadingSpinner';

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(0.97);
  }
`;

const waveAnimation = keyframes`
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
`;

const dashAnimation = keyframes`
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
`;

const fadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const LogoContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.sidebar.background,
  width: 100,
  height: 100,
  borderRadius: '20px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: 60,
  fontWeight: 700,
  color: theme.sidebar.primaryForeground,
  marginBottom: theme.spacing(4),
  overflow: 'hidden',
  animation: `${pulseAnimation} 2s ease-in-out infinite`,
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)`,
    animation: `${waveAnimation} 1.5s linear infinite`
  }
}));

const StaggeredText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'delay',
})<{ delay?: number }>(({ theme, delay = 0 }) => ({
  opacity: 0,
  animation: `${fadeInAnimation} 0.5s ease-out forwards`,
  animationDelay: `${delay}ms`,
}));

const ProgressText = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  fontSize: 16,
  color: theme.palette.text.secondary,
  marginTop: theme.spacing(2),
}));

const LoadingScreen = () => {
  const theme = useTheme();
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');

  useEffect(() => {
    const loadingMessages = [
      'Initializing application...',
      'Loading your sales data...',
      'Preparing dashboard analytics...',
      'Syncing contact information...',
      'Setting up your workspace...',
      'Almost ready...',
    ];

    let currentIndex = 0;
    const messageInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % loadingMessages.length;
      const nextMessage = loadingMessages[currentIndex];
      if (nextMessage) {
        setLoadingText(nextMessage);
      }
    }, 1200);

    // Simulate progress with non-linear speed (faster at beginning, slower at end)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Slow down as we get closer to 100
        const increment = prev < 60 ? 2 : prev < 85 ? 1 : 0.5;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: theme.palette.background.default,
        zIndex: 9999,
        animation: `${cardFadeIn} 0.5s ease-in-out`,
        backgroundImage: `radial-gradient(circle at 25px 25px, ${theme.palette.background.paper} 2%, transparent 0%), radial-gradient(circle at 75px 75px, ${theme.palette.background.paper} 2%, transparent 0%)`,
        backgroundSize: '100px 100px',
      }}
    >
      <LogoContainer>
        <Typography
          variant="h1"
          sx={{
            fontWeight: 900,
            fontSize: 60,
            fontFamily: '"Inter", sans-serif',
          }}
        >
          S
        </Typography>
      </LogoContainer>

      <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <LoadingSpinner size={80} thickness={4} color={theme.sidebar.primary} />
        <ProgressText>
          {progress}% Complete
        </ProgressText>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 2 }}>
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: 600,
            fontSize: 24,
            color: theme.palette.text.primary,
            mb: 1,
          }}
        >
          SalesFlow CRM
        </Typography>

        <Box sx={{ display: 'flex', mb: 3 }}>
          {['S', 'A', 'L', 'E', 'S', 'F', 'L', 'O', 'W'].map((letter, index) => (
            <StaggeredText
              key={index}
              variant="subtitle1"
              delay={100 * index}
              sx={{
                fontWeight: 500,
                fontSize: 14,
                color: theme.palette.primary.main,
                letterSpacing: 2,
                mx: 0.2,
              }}
            >
              {letter}
            </StaggeredText>
          ))}
        </Box>

        <Typography
          variant="body1"
          sx={{
            color: theme.palette.text.secondary,
            fontWeight: 500,
          }}
        >
          {loadingText}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingScreen;