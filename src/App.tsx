import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { darkTheme, lightTheme } from "./theme/Theme";
import "./App.css";
import AppRoutes from "./routes/AppRoutes";
import { useState, useEffect } from "react";
import LoadingScreen from "./sharedComponents/LoadingScreen";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  // Simulate loading time with a minimum display duration
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4500); // Increased loading time to show the animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <CssBaseline />
      {loading ? (
        <LoadingScreen />
      ) : (
        <AppRoutes />
      )}
    </ThemeProvider>
  );
}

export default App;
