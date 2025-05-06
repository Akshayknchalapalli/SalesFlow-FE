import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, Typography, Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';

const data = [
  { name: 'New', value: 25, color: '#3B82F6' },
  { name: 'Contacted', value: 35, color: '#10B981' },
  { name: 'Qualified', value: 20, color: '#F97066' },
  { name: 'Lost', value: 20, color: '#6B7280' },
];

const TooltipContainer = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  padding: theme.spacing(1.5),
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[2],
}));

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <Typography variant="body2" fontWeight="medium">
          {payload[0].name}
        </Typography>
        <Typography 
          variant="body2" 
          fontWeight="medium"
          sx={{ color: payload[0].payload.color }}
        >
          {payload[0].value} leads ({((payload[0].value / 100) * 100).toFixed(0)}%)
        </Typography>
      </TooltipContainer>
    );
  }
  return null;
};

const LegendList = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(2),
  justifyContent: 'center',
  marginTop: theme.spacing(2),
}));

const LegendItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const CustomLegend = ({ payload }: any) => {
  const theme = useTheme();

  return (
    <LegendList>
      {payload.map((entry: any, index: number) => (
        <LegendItem key={`item-${index}`}>
          <Box sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: entry.color
          }} />
          <Typography variant="body2" color="text.secondary">
            {entry.value}
          </Typography>
        </LegendItem>
      ))}
    </LegendList>
  );
};

const LeadsOverview = () => {
  const theme = useTheme();

  return (
    <Card sx={{ 
      height: "100%",
      display: 'flex',
      flexDirection: 'column',
      background: theme.card.background,
      borderRadius: theme.card.borderRadius,
      boxShadow: theme.card.boxShadow,
    }}>
      <CardHeader
        title={
          <Typography variant="h5" fontWeight="bold">
            Leads Overview
          </Typography>
        }
      />
      <CardContent sx={{ flex: 1, position: 'relative' }}>
        <Box sx={{ 
          height: 300,
          minHeight: 300,
          width: '100%'
        }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                startAngle={90}
                endAngle={ 450}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </PieChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default LeadsOverview;