
import { Link, useLocation } from "react-router-dom";
import BarChartIcon from "@mui/icons-material/BarChart";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import DescriptionIcon from "@mui/icons-material/Description";
import MailIcon from "@mui/icons-material/Mail";
import SearchIcon from "@mui/icons-material/Search";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import { styled, Typography, Box, Avatar } from "@mui/material";
import { sidebarFadeIn } from "../../../theme/Animations";

const SidebarContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.sidebar.background,
  color: theme.sidebar.foreground,
  borderRight: `1px solid ${theme.sidebar.border}`,
  width: 260,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  animation: `${sidebarFadeIn} 0.6s cubic-bezier(0.4,0,0.2,1)`
}));

const SidebarHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(4, 3, 4, 3),
  display: "flex",
  alignItems: "center",
  borderBottom: `1px solid ${theme.sidebar.border}`,
}));

const LogoBadge = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.sidebar.primary,
  color: theme.sidebar.primaryForeground,
  height: 40,
  width: 40,
  borderRadius: 12,
  marginRight: theme.spacing(1.5),
  fontWeight: 700,
  fontSize: 22,
  letterSpacing: 1,
}));

const LogoText = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  fontWeight: theme.typography.fontWeightBold,
  color: theme.sidebar.foreground,
  letterSpacing: 1,
}));

const NavSectionHeader = styled(Typography)(({ theme }) => ({
  color: theme.sidebar.sectionHeader,
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: 1,
  margin: theme.spacing(3, 0, 1, 3),
  textTransform: 'uppercase',
}));

const Nav = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  marginTop: theme.spacing(2),
}));

const NavItem = styled(Link, { shouldForwardProp: (prop) => prop !== 'active' })<{
  active?: boolean;
}>(({ theme, active }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(1.5, 3),
  color: active ? theme.sidebar.primary : theme.sidebar.foreground,
  background: active ? 'rgba(37,99,235,0.12)' : 'transparent',
  borderRadius: 8,
  textDecoration: 'none',
  fontWeight: active ? 700 : 500,
  fontSize: 15,
  margin: theme.spacing(0.5, 1, 0.5, 1),
  transition: 'background 0.2s, color 0.2s',
  '&:hover': {
    background: 'rgba(37,99,235,0.08)',
    color: theme.sidebar.primary,
  },
}));

const NavIcon = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginRight: theme.spacing(2),
  fontSize: 22,
}));

const UserProfile = styled(Box)(({ theme }) => ({
  background: theme.sidebar.userProfileBackground,
  borderTop: `1px solid ${theme.sidebar.border}`,
  padding: theme.spacing(2.5, 3),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1.5),
}));

const UserName = styled(Typography)(({ theme }) => ({
  color: theme.sidebar.foreground,
  fontWeight: 600,
  fontSize: 15,
}));

const UserRole = styled(Typography)(({ theme }) => ({
  color: theme.sidebar.sectionHeader,
  fontSize: 13,
  fontWeight: 400,
}));

const Sidebar = () => {
  const location = useLocation();
  const navigation = [
    { name: "Dashboard", href: "/", icon: BarChartIcon },
    { name: "Contacts", href: "/contacts", icon: GroupIcon },
    { name: "Leads", href: "/leads", icon: GroupIcon },
    { name: "Deals", href: "/deals", icon: ShowChartIcon },
    { name: "Tasks", href: "/tasks", icon: CalendarTodayIcon },
    { name: "Emails", href: "/emails", icon: MailIcon },
    { name: "Documents", href: "/documents", icon: DescriptionIcon },
    { name: "Conversations", href: "/conversations", icon: ChatBubbleOutlineIcon },
  ];
  const secondaryNavigation = [
    { name: "Search", href: "/search", icon: SearchIcon },
    { name: "Settings", href: "/settings", icon: SettingsIcon },
  ];
  return (
    <SidebarContainer>
      <Box>
        <SidebarHeader>
          <LogoBadge>S</LogoBadge>
          <LogoText>Sales Flow</LogoText>
        </SidebarHeader>
        <NavSectionHeader>MAIN</NavSectionHeader>
        <Nav>
          {navigation.map((item) => (
            <NavItem
              key={item.name}
              to={item.href}
              active={location.pathname === item.href}
            >
              <NavIcon as={item.icon} />
              {item.name}
            </NavItem>
          ))}
        </Nav>
        <NavSectionHeader>OTHER</NavSectionHeader>
        <Nav>
          {secondaryNavigation.map((item) => (
            <NavItem
              key={item.name}
              to={item.href}
              active={location.pathname === item.href}
            >
              <NavIcon as={item.icon} />
              {item.name}
            </NavItem>
          ))}
        </Nav>
      </Box>
      <UserProfile>
        <Avatar sx={{ width: 36, height: 36, fontWeight: 700 }}>JD</Avatar>
        <Box>
          <UserName>John Doe</UserName>
          <UserRole>Sales Manager</UserRole>
        </Box>
      </UserProfile>
    </SidebarContainer>
  );
};

export default Sidebar;
