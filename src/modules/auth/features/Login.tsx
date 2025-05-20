import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Paper,
  Checkbox,
  FormControlLabel,
  Link,
  useTheme,
  useMediaQuery,
  Alert,
} from "@mui/material";
import Grid from "@mui/material/GridLegacy";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import SalesFlowLogoSvg from "../../../assets/svgs/SalesFlowLogoSvg";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import authApi from "../apis/authApi";
import { LoginRequest } from "../model/AuthModels";

// Define validation schema using Zod
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  rememberMe: z.boolean().optional(),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  useEffect(() => {
    // Check if user is already logged in
    const token =
      localStorage.getItem("accessToken") ||
      sessionStorage.getItem("accessToken");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onSubmit = async (data: LoginFormValues) => {
    try {
      setIsLoading(true);
      setLoginError(null);

      const loginData: LoginRequest = {
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe || false,
      };

      await authApi.login(loginData);

      // Navigate to dashboard on success
      navigate("/");
    } catch (error: any) {
      console.error("Login error:", error);
      setLoginError(
        error.response?.data?.message ||
          "Failed to sign in. Please check your credentials and try again.",
      );
    } finally {
      setIsLoading(false);
    }
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
            Welcome to SalesFlow
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
            Your all-in-one platform for managing leads, contacts, and sales
            processes efficiently.
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

      {/* Right Section - Login Form */}
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
              <LockOutlinedIcon sx={{ color: "#fff" }} />
            </Box>
            <Typography
              variant="h5"
              fontWeight={700}
              sx={{ letterSpacing: "-0.3px" }}
            >
              Sign in to SalesFlow
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Enter your credentials to continue
            </Typography>
          </Box>

          {loginError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {loginError}
            </Alert>
          )}

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Email Address"
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
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  fullWidth
                  label="Password"
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
                          onClick={handleClickShowPassword}
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

            <Box
              sx={{
                mt: 1,
                mb: 2,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Controller
                name="rememberMe"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.value}
                        onChange={field.onChange}
                        color="primary"
                      />
                    }
                    label="Remember me"
                  />
                )}
              />
              <Link
                href="/forgot-password"
                variant="body2"
                color="primary"
                sx={{ textDecoration: "none" }}
              >
                Forgot password?
              </Link>
            </Box>

            <Button
              fullWidth
              variant="contained"
              color="primary"
              type="submit"
              size="large"
              disabled={isLoading}
              sx={{
                mt: 2,
                py: 1.5,
                boxShadow: "0 4px 14px 0 rgba(59, 130, 246, 0.4)",
                borderRadius: 1.5,
                textTransform: "none",
                fontWeight: 600,
              }}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <Box sx={{ mt: 3, mb: 3 }}>
            <Divider>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>
          </Box>

          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<GoogleIcon />}
                sx={{
                  py: 1.25,
                  borderRadius: 1.5,
                  textTransform: "none",
                  borderColor: "rgba(0, 0, 0, 0.23)",
                  transition: "all 0.2s ease-in-out",
                  "&:hover": {
                    borderColor: "rgba(0, 0, 0, 0.5)",
                    bgcolor: "rgba(0, 0, 0, 0.04)",
                  },
                }}
              >
                Google
              </Button>
            </Grid>
            <Grid item xs={6}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<LinkedInIcon />}
                sx={{
                  py: 1.25,
                  borderRadius: 1.5,
                  textTransform: "none",
                  borderColor: theme.social.linkedin.color,
                  color: theme.social.linkedin.color,
                  "&:hover": {
                    borderColor: theme.social.linkedin.color,
                    backgroundColor: theme.social.linkedin.bg,
                  },
                }}
              >
                LinkedIn
              </Button>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, textAlign: "center" }}>
            <Typography variant="body2" color="text.secondary">
              Don't have an account?{" "}
              <Link
                href="#"
                variant="body2"
                color="primary"
                sx={{ textDecoration: "none", fontWeight: 600 }}
              >
                Request Access
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

export default Login;
