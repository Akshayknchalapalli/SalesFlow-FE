import { Box, Grid2, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" fontWeight={500} p={2}>
        Dashboard
      </Typography>
      <Grid2 size={12}>
        <Grid2 size={3} display={"flex"} gap={1} pl={3}>
          <Box width={300} height={200} sx={{ backgroundColor: "red" }}>
            Total Leads
          </Box>
          <Box width={300} height={200} sx={{ backgroundColor: "red" }}>
            Active Deals
          </Box>
          <Box width={300} height={200} sx={{ backgroundColor: "red" }}>
            Conversation Rate
          </Box>
          <Box width={300} height={200} sx={{ backgroundColor: "red" }}>
            Revenue
          </Box>
        </Grid2>
        <Grid2 size={4} display={"flex"} gap={1} pl={3}>
          <Box width={900} height={400} sx={{ backgroundColor: "red" }}>
            Revenue OverView
          </Box>
          <Box width={300} height={300} sx={{ backgroundColor: "red" }}>
            Leads OverView
          </Box>
        </Grid2>
        <Grid2 size={4} display={"flex"} gap={1} pl={3}>
          <Box width={400} height={600} sx={{ backgroundColor: "red" }}>
            Recent Deals
          </Box>
          <Box width={700} height={600} sx={{ backgroundColor: "red" }}>
            Upcoming Tasks
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default Dashboard;
