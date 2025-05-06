import React from "react";

import { styled } from "@mui/system";
import Grid from "@mui/material/Grid2";
import { Box, Typography } from "@mui/material";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import StatCard from "./uiComponents/StatCard";
import { GroupOutlined, ShowChartOutlined, BarChartOutlined, StarOutlined } from "@mui/icons-material";
import SalesChart from "./uiComponents/SalesChart";
import LeadsOverview from "./uiComponents/LeadsOverview";
import RecentDeals from "./uiComponents/RecentDeals";
import UpcomingTasks from "./uiComponents/UpcomingTasks";
import { useTheme } from "@mui/material/styles";

const Dashboard: React.FC = () => {
  const theme = useTheme();
  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Dashboard
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, gap: 1 }}>
          <Typography component={'span'} variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.secondary }}>
            Current Period:
          </Typography>
          <Typography component={'span'} variant="body2" sx={{ fontWeight: 500, color: theme.palette.text.secondary }}>
            Q4 2024
          </Typography>
        </Box>
      </Box>

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Total Leads"
            value="2,543"
            trend={{ value: 12.5, isPositive: true }}
            icon={<GroupOutlined fontSize="medium" sx={{ color: "primary.main" }} />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Active Deals"
            value="187"
            trend={{ value: 8.2, isPositive: true }}
            icon={<ShowChartOutlined fontSize="small" sx={{ color: "primary.main" }} />}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Conversion Rate"
            value="24.8%"
            trend={{ value: 2.1, isPositive: false }}
            icon={<BarChartOutlined fontSize="small" sx={{ color: "primary.main" }} />}
            subtitle="Leads to Deals"
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <StatCard
            title="Revenue"
            value="$845,291"
            trend={{ value: 18.3, isPositive: true }}
            icon={<StarOutlined fontSize="small" sx={{ color: "primary.main" }} />}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 8 }}>
          <SalesChart />
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <LeadsOverview />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <RecentDeals />
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <UpcomingTasks />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
