import React, { useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useDispatch } from "react-redux";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  InputAdornment,
  CircularProgress,
  Alert,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  FormHelperText,
  Link,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Email, Business, ArrowBack, MailOutline } from "@mui/icons-material";
import { forgotPasswordThunk } from "../model/slices/authSlice";
import { AppDispatch } from "../../../store/store";
import SalesFlowLogoSvg from "../../../assets/svgs/SalesFlowLogoSvg";
import { ForgotPasswordRequest } from "../model/AuthModels";

// Define forgot password form schema
const forgotPasswordSchema = z.object({
  email: z.string().email("Valid email is required"),
  tenantId: z.string().optional(),
});

// Type for forgot password form values
type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

// Extended request type including tenantId
interface ExtendedForgotPasswordRequest extends ForgotPasswordRequest {
  tenantId?: string;
}

// ForgotPassword page component
const ForgotPassword: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [availableTenants, setAvailableTenants] = useState([
    { id: "tenant1", name: "Tenant 1" },
    { id: "tenant2", name: "Tenant 2" },
    { id: "tenant3", name: "Tenant 3" },
  ]);

  // Initialize form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
      tenantId: "",
    },
  });

  // Handle forgot password submission
  const onSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const resultAction = await dispatch(
        forgotPasswordThunk({
          email: data.email,
        } as ExtendedForgotPasswordRequest),
      );

      if (forgotPasswordThunk.fulfilled.match(resultAction)) {
        // Request successful
        setSuccess("Password reset instructions have been sent to your email.");
      } else if (resultAction.error) {
        // Handle error
        setError(
          resultAction.error.message ||
            "Failed to process your request. Please try again.",
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Forgot password error:", err);
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        overflow: "hidden",
        backgroundColor: theme.palette.background.default,
      }}
    >
      {/* Left Section - Brand */}
      {!isMobile && (
        <Box
          sx={{
            width: "45%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            p: 6,
            bgcolor: theme.sidebar.background,
            color: "white",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              opacity: 0.05,
              backgroundImage:
                'url(\'data:image/svg+xml,%3Csvg width="100" height="100" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z" fill="%23ffffff" fill-opacity="1" fill-rule="evenodd"/%3E%3C/svg%3E\')',
              backgroundPosition: "0 0",
              backgroundSize: "100px 100px",
              animation: "moveBackground 30s linear infinite",
              "@keyframes moveBackground": {
                "0%": {
                  backgroundPosition: "0 0",
                },
                "100%": {
                  backgroundPosition: "100px 100px",
                },
              },
              backgroundRepeat: "repeat"
            }}
          />
          <Box sx={{ zIndex: 1, mb: 6, transform: "scale(0.9)" }}>
            <SalesFlowLogoSvg />
          </Box>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              zIndex: 1,
              mb: 3,
              textAlign: "center",
            }}
          >
            Forgot Your Password?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              opacity: 0.8,
              zIndex: 1,
              maxWidth: "80%",
              textAlign: "center",
            }}
          >
            Don't worry! Enter your email address and we'll send you
            instructions to reset your password.
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 10,
              zIndex: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2.5,
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    width: "180px",
                    height: "4px",
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderRadius: "4px",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: theme.chart.new,
                    boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
                    zIndex: 2,
                  }}
                />
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: theme.chart.contacted,
                    boxShadow: "0 0 10px rgba(16, 185, 129, 0.5)",
                    zIndex: 2,
                  }}
                />
                <Box
                  sx={{
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    bgcolor: theme.chart.qualified,
                    boxShadow: "0 0 10px rgba(249, 112, 102, 0.5)",
                    zIndex: 2,
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      )}

      {/* Right Section - Forgot Password Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        {isMobile && (
          <Box sx={{ mb: 6 }}>
            <SalesFlowLogoSvg />
          </Box>
        )}

        <Paper
          elevation={isMobile ? 0 : 12}
          sx={{
            p: 5,
            width: "100%",
            maxWidth: 480,
            borderRadius: 3,
            backgroundColor: theme.palette.background.paper,
          }}
        >
          <Box sx={{ mb: 3, textAlign: "center" }}>
            <Box
              sx={{
                display: "inline-flex",
                bgcolor: "primary.main",
                width: 50,
                height: 50,
                borderRadius: "50%",
                justifyContent: "center",
                alignItems: "center",
                mb: 2,
              }}
            >
              <MailOutline sx={{ color: "#fff" }} />
            </Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ letterSpacing: "-0.3px" }}
            >
              Forgot Password
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Enter your email and we'll send you instructions to reset your
              password
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email Address"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    sx: { borderRadius: 1.5 },
                  }}
                />
              )}
            />

            <Controller
              name="tenantId"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel id="tenant-select-label">
                    Tenant (Optional)
                  </InputLabel>
                  <Select
                    {...field}
                    labelId="tenant-select-label"
                    label="Tenant (Optional)"
                    error={!!errors.tenantId}
                    sx={{ borderRadius: 1.5 }}
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    {availableTenants.map((tenant) => (
                      <MenuItem key={tenant.id} value={tenant.id}>
                        {tenant.name}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.tenantId && (
                    <FormHelperText error>
                      {errors.tenantId.message}
                    </FormHelperText>
                  )}
                </FormControl>
              )}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.5,
                boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.4)",
                borderRadius: 1.5,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : (
                "Send Reset Instructions"
              )}
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: "center" }}>
            <Button
              component={RouterLink}
              to="/login"
              startIcon={<ArrowBack />}
              sx={{
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              Back to Login
            </Button>
          </Box>
        </Paper>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          © {new Date().getFullYear()} SalesFlow. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default ForgotPassword;
