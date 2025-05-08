import React from "react";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import type { GridLegacyProps } from "@mui/material/GridLegacy";
import {
  GroupOutlined,
  ShowChartOutlined,
  BarChartOutlined,
  StarOutlined,
} from "@mui/icons-material";
import SalesChart from "./uiComponents/SalesChart";
import LeadsOverview from "./uiComponents/LeadsOverview";
import RecentDeals from "./uiComponents/RecentDeals";
import UpcomingTasks from "./uiComponents/UpcomingTasks";
import { useTheme } from "@mui/material/styles";
import StatCard from "./uiComponents/StatCard";

const Dashboard: React.FC = () => {
  const theme = useTheme();
  return (
    <Box
      width="100%"
      sx={{
        height: "calc(100vh - 64px)", // Subtract header height
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        backgroundColor: theme.palette.grey[100],
      }}
    >
      <Box
        sx={{
          px: 3,
          pt: 4,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          position: "sticky",
          top: 0,
          backgroundColor: theme.palette.grey[100],
          zIndex: 1,
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", gap: 1 }}
        >
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Dashboard
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              component={"span"}
              variant="body2"
              sx={{ fontWeight: 500, color: theme.palette.text.secondary }}
            >
              Current Period:
            </Typography>
            <Typography
              component={"span"}
              variant="body2"
              sx={{ fontWeight: 600, color: theme.palette.text.secondary }}
            >
              Q4 2024
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ px: 3, display: "flex", flexDirection: "column", gap: 2 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Total Leads"
              value="2,543"
              trend={{ value: 12.5, isPositive: true }}
              icon={
                <GroupOutlined fontSize="medium" sx={{ color: "primary.main" }} />
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Active Deals"
              value="187"
              trend={{ value: 8.2, isPositive: true }}
              icon={
                <ShowChartOutlined
                  fontSize="small"
                  sx={{ color: "primary.main" }}
                />
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Conversion Rate"
              value="24.8%"
              trend={{ value: 2.1, isPositive: false }}
              icon={
                <BarChartOutlined
                  fontSize="small"
                  sx={{ color: "primary.main" }}
                />
              }
              subtitle="Leads to Deals"
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <StatCard
              title="Revenue"
              value="$845,291"
              trend={{ value: 18.3, isPositive: true }}
              icon={
                <StarOutlined fontSize="small" sx={{ color: "primary.main" }} />
              }
            />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <SalesChart />
          </Grid>
          <Grid item xs={12} md={4}>
            <LeadsOverview />
          </Grid>
        </Grid>

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <RecentDeals />
          </Grid>
          <Grid item xs={12} md={6}>
            <UpcomingTasks />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Dashboard;
