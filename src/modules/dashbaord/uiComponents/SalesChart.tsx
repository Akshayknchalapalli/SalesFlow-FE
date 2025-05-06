import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardHeader, CardContent, Typography, useTheme, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const data = [
    { name: 'Jan', value: 8400 },
    { name: 'Feb', value: 9200 },
    { name: 'Mar', value: 9800 },
    { name: 'Apr', value: 10900 },
    { name: 'May', value: 11900 },
    { name: 'Jun', value: 10200 },
    { name: 'Jul', value: 12100 },
    { name: 'Aug', value: 13100 },
    { name: 'Sep', value: 12400 },
    { name: 'Oct', value: 12000 },
    { name: 'Nov', value: 13200 },
    { name: 'Dec', value: 14100 }
];

const CustomTooltip = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1.5),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    boxShadow: theme.shadows[3],
    color: theme.palette.primary.main,
}));

const SalesChart = () => {
    const theme = useTheme();

    return (
        <Card sx={{ gridColumn: 'span 2', background: theme.card.background, borderRadius: theme.card.borderRadius, boxShadow: theme.card.boxShadow }}>
            <CardHeader
                title={
                    <Typography variant="h5" fontWeight="bold">
                        Revenue Overview
                    </Typography>
                }
                action={
                    <Typography variant="body2" color="text.secondary">
                        This Year
                    </Typography>
                }
                sx={{ pb: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
            />
            <CardContent>
                <Box sx={{ height: 320, mt: 2 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart
                            data={data}
                            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                        >
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop
                                        offset="5%"
                                        stopColor={theme.palette.primary.main}
                                        stopOpacity={0.3}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor={theme.palette.primary.main}
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke={theme.palette.divider}
                            />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fontSize: 12,
                                    fill: theme.palette.text.secondary
                                }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{
                                    fontSize: 12,
                                    fill: theme.palette.text.secondary
                                }}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <Tooltip
                                content={({ active, payload, label }) => (
                                    <CustomTooltip>
                                        {active && payload && payload.length && (
                                            <>
                                                <Typography variant="body2" fontWeight="medium">
                                                    {label}
                                                </Typography>
                                                <Typography
                                                    variant="body2"
                                                    color={theme.palette.primary.main}
                                                    fontWeight="medium"
                                                >
                                                    ${payload?.[0]?.value?.toLocaleString()}
                                                </Typography>
                                            </>
                                        )}
                                    </CustomTooltip>
                                )}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={theme.palette.primary.main}
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </Box>
            </CardContent>
        </Card>
    );
};

export default SalesChart;