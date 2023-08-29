import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import variables from "styles/variables.module.scss";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import chakraTheme from "@chakra-ui/theme";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./routes";
import { AuthProvider } from "context/AuthProvider";
import RequireAuth from "components/RequireAuth";
import AuthVerify from "lib/AuthVerify";
import "styles/index.scss";

const { Button, Input, Select, Textarea } = chakraTheme.components;

const theme = extendTheme({
  colors: {
    primary: {
      main: variables.primaryColor,
    },
    secondary: {
      main: variables.secondaryColor,
    },
    error: {
      main: variables.errorColor,
    },
  },
  config: {
    useSystemColorMode: false,
    initialColorMode: "light",
  },
  fonts: {
    body: "Poppins, sans-serif",
    heading: "Poppins, serif",
  },
  components: {
    Button,
    Input,
    Select,
    Textarea,
  },
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <ChakraProvider theme={theme}>
          <Routes>
            {appRoutes.map((route) =>
              route.protected ? (
                <Route element={<RequireAuth />} key={route.key}>
                  <Route path={route.path} element={<route.component />} />
                </Route>
              ) : (
                <Route
                  key={route.key}
                  path={route.path}
                  element={<route.component />}
                />
              )
            )}
          </Routes>

          <AuthVerify />
        </ChakraProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
