import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: "https://cognito-idp.us-east-1.amazonaws.com/us-east-1_PWjircQoX/.well-known/jwks.json",
  client_id: "13gsp3c44n3vt9gtds1q38ggtv",
  redirect_uri: "https://legal-edge.onrender.com",
  response_type: "code",
  scope: "openid email profile",
};

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
