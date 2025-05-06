import React from 'react';
import {
  AppBar,
  Toolbar,
  InputBase,
  IconButton,
  Button,
  Badge,
  Menu,
  MenuItem,
  Divider,
  Box,
  styled,
  Typography
} from '@mui/material';
import {
  Search as SearchIcon,
  NotificationsOutlined as NotificationsIcon,
  Add as AddIcon
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  borderBottom: `1px solid ${theme.palette.divider}`,
  height: '64px',
  justifyContent: 'center',
}));

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '256px',
  marginRight: theme.spacing(2),
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 4),
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.action.hover,
    fontSize: theme.typography.body2.fontSize,
    width: '100%',
    transition: theme.transitions.create('width'),
    '&:focus': {
      outline: `1px solid ${theme.palette.primary.main}`,
    },
  },
}));

const NotificationBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 4,
    top: 4,
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    fontSize: theme.typography.caption.fontSize,
    height: 16,
    minWidth: 16,
  },
}));

const Header = () => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <StyledAppBar position="sticky" elevation={0}>
      <Toolbar>
        <SearchContainer>
          <SearchIcon sx={{
            position: 'absolute',
            left: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            color: theme.palette.text.secondary,
            fontSize: 16
          }} />
          <SearchInput
            placeholder="Search..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </SearchContainer>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <IconButton
            color="inherit"
            onClick={handleMenuOpen}
            sx={{
              position: 'relative',
              // background: theme.palette.primary.main, 
              // color: theme.palette.common.white, 
              '&:hover': {
                backgroundColor: theme.palette.action.hover // Subtle hover effect
              }
            }}
          >
            <NotificationBadge badgeContent={3} color="error">
              <NotificationsIcon fontSize="medium" sx={{
                color: theme.palette.text.secondary
              }}
              />
            </NotificationBadge>
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            PaperProps={{
              sx: {
                width: 320,
                maxHeight: 320,
                mt: 1,
                // borderRadius: 8,
                boxShadow: theme.shadows[3],
                background: theme.palette.background.paper,
              }
            }}
          >
            <MenuItem dense sx={{  variant: 'subtitle2', cursor: 'default' }}>
              Notifications
            </MenuItem>
            <Divider />

            <Box sx={{ maxHeight: 240, overflow: 'auto' }}>
              {[1, 2, 3].map((item) => (
                <MenuItem key={item}>
                  <Box p={0}>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      New lead assigned to you
                    </Typography>
                    <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                      Acme Inc. • 15 minutes ago
                    </Typography>
                  </Box>
                </MenuItem>
              ))}
            </Box>

            <Divider />
            <MenuItem sx={{
              variant:'caption',
              color: theme.palette.primary.main,
              justifyContent: 'center',
              background: 'transparent',
              '&:hover': { backgroundColor: 'transparent', color: theme.palette.primary.dark },
            }}>
              View all notifications
            </MenuItem>
          </Menu>

          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon fontSize="small" />}
            sx={{
              textTransform: 'none',
              boxShadow: 'none',
              background: theme.sidebar.primary,
              color: theme.palette.common.white,
              '&:hover': {
                background: theme.palette.primary.dark,
                color: theme.palette.common.white,
                boxShadow: 'none',
              },
            }}
          >
            Create
          </Button>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;