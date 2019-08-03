import React from "react";
import CustomRoutes from "./routes.js";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Raleway"].join(",")
  }
  // palette: {
  //   secondary: {
  //     main: "#FFB6C1",
  //     contrastText: "#FFF"
  //   }
  // }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CustomRoutes />
    </ThemeProvider>
  );
}

export default App;
