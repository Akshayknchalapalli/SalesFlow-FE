import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
  IconButton,
  CircularProgress,
  Alert,
  Link,
  useTheme,
  useMediaQuery,
  Divider,
} from "@mui/material";
import { Visibility, VisibilityOff, LockReset } from "@mui/icons-material";
import { resetPasswordThunk } from "../model/slices/authSlice";
import { AppDispatch } from "../../../store/store";
import SalesFlowLogoSvg from "../../../assets/svgs/SalesFlowLogoSvg";
import { ResetPasswordRequest } from "../model/AuthModels";

// Password validation schema
const passwordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    confirmPassword: z.string(),
    token: z.string(),
    email: z.string().email("Valid email is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Type for reset password form values
type ResetPasswordFormValues = z.infer<typeof passwordSchema>;

// Extended request type including email
interface ExtendedResetPasswordRequest extends ResetPasswordRequest {
  email?: string;
}

// ResetPassword page component
const ResetPassword: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Extract token and email from URL query params
  const searchParams = new URLSearchParams(location.search);
  const token = searchParams.get("token") || "";
  const email = searchParams.get("email") || "";

  // Initialize form
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      token: "",
      email: "",
    },
  });

  // Set token and email from URL
  useEffect(() => {
    if (token) setValue("token", token);
    if (email) setValue("email", email);
  }, [token, email, setValue]);

  // Handle form submission
  const onSubmit = async (data: ResetPasswordFormValues) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      const resultAction = await dispatch(
        resetPasswordThunk({
          token: data.token,
          newPassword: data.password,
          confirmPassword: data.confirmPassword,
        } as ExtendedResetPasswordRequest),
      );

      if (resetPasswordThunk.fulfilled.match(resultAction)) {
        setSuccess("Your password has been reset successfully.");
        // Redirect to login after 3 seconds
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else if (resultAction.error) {
        setError(
          resultAction.error.message ||
            "Failed to reset your password. Please try again.",
        );
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Reset password error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

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
              backgroundRepeat: "repeat",
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
            Reset Your Password
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
            Create a new secure password to access your SalesFlow account.
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

      {/* Right Section - Reset Password Form */}
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
              <LockReset sx={{ color: "#fff" }} />
            </Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ letterSpacing: "-0.3px" }}
            >
              Reset Your Password
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Create a new password for your account
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

          {!token && !email && (
            <Alert severity="warning" sx={{ mb: 2 }}>
              Invalid or expired reset link. Please request a new password
              reset.
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
                  disabled={!!email}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  InputProps={{
                    sx: { borderRadius: 1.5 },
                  }}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  margin="normal"
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    sx: { borderRadius: 1.5 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Controller
              name="confirmPassword"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  margin="normal"
                  variant="outlined"
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    sx: { borderRadius: 1.5 },
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={toggleConfirmPasswordVisibility}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
            />

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              disabled={loading || !token || !email}
              sx={{
                mt: 3,
                py: 1.5,
                boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.4)",
                borderRadius: 1.5,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {loading ? <CircularProgress size={24} /> : "Reset Password"}
            </Button>
          </form>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Remember your password?{" "}
              <Link
                href="/login"
                color="primary"
                sx={{ textDecoration: "none", fontWeight: 600 }}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
              >
                Sign in
              </Link>
            </Typography>
          </Box>
        </Paper>

        <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
          © {new Date().getFullYear()} SalesFlow. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default ResetPassword;
