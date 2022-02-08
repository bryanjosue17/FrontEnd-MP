import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { ToastProvider } from "react-toast-notifications";
import { Auth0Provider } from "@auth0/auth0-react";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <Auth0Provider
      domain="dev-m5d9qgfp.us.auth0.com"
      clientId="XmusOTm3QJ1DFTG7SySxlfqYMd22UVyK"
      redirectUri={window.location.origin}
    >
      <ToastProvider>
        <App />
      </ToastProvider>
    </Auth0Provider>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
