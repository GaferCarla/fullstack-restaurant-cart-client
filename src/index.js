import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css"; // // Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./state";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme";

//Auth0
import { Auth0Provider } from "@auth0/auth0-react";

const store = configureStore({
  reducer: {
    //for multiple reducers from cartSlice in ../state/index.js
    //it's call cartReducer because we have the propierty name: "cart",
    cart: cartReducer,
  },
});

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Auth0Provider
    domain={domain}
    clientId={clientId}
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
    useRefreshTokens={true}
    cacheLocation="localstorage"
  >
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </Auth0Provider>
);
