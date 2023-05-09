import { createTheme, ThemeProvider } from "@mui/material/styles";
// import "./App.css";
import Login from "./containers/auth/login";

function App() {
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Login />
      </div>
    </ThemeProvider>
  );
}

export default App;
