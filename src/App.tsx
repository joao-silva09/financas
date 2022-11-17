import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import Header from "./layout/Header";
import { ColorModeContext, useMode } from "./themes";
import AppSidebar from "./layout/AppSidebar";
import Routes from "./routes";

function App() {
  const [theme, colorMode] = useMode();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Routes />
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
