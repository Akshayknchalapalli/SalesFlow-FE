import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  icon: React.ReactNode;
  subtitle?: string;
}

const CardContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  border: `1px solid ${theme.palette.divider}`,
  transition: theme.transitions.create('box-shadow'),
  '&:hover': {
    boxShadow: theme.shadows[3],
  },
  height: 150,
}));

// Use theme.icon.statCardBg for icon background (set in theme.ts)
const IconContainer = styled(Box)(({ theme }) => ({
  backgroundColor: theme.icon.statCardBg,
  borderRadius: theme.shape.borderRadius / 2,
  width: theme.spacing(5),
  height: theme.spacing(5),
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.primary.main,
}));

const TrendUp = styled(Box)(({ theme }) => ({
  color: theme.palette.success.main,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const TrendDown = styled(Box)(({ theme }) => ({
  color: theme.palette.error.main,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(0.5),
}));

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon, subtitle }) => {
  return (
    <CardContainer>
      <Box display="flex" justifyContent="space-between" alignItems="flex-start">
        <Box>
          <Typography variant="body2" color="text.secondary" fontWeight="medium">
            {title}
          </Typography>
          <Typography variant="h5" mt={1} fontWeight="bold" color="text.primary">
            {value}
          </Typography>
          {subtitle && (
            <Typography variant="caption" color="text.secondary" mt={1} display="block">
              {subtitle}
            </Typography>
          )}
        </Box>
        <IconContainer>{icon}</IconContainer>
      </Box>

      {trend && (
        <Box mt={1}>
          {trend.isPositive ? (
            <TrendUp>
              <ArrowUpward sx={{ fontSize: 16 }} />
              <Typography variant="body2" component="span" fontWeight="medium">
                {trend.value}% from last month
              </Typography>
            </TrendUp>
          ) : (
            <TrendDown>
              <ArrowDownward sx={{ fontSize: 16 }} />
              <Typography variant="body2" component="span" fontWeight="medium">
                {Math.abs(trend.value)}% from last month
              </Typography>
            </TrendDown>
          )}
        </Box>
      )}
    </CardContainer>
  );
};

export default StatCard;