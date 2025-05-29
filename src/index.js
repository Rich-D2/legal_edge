import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const oidcConfig = {
  authority: "https://your-cognito-domain.auth.us-east-1.amazoncognito.com",
  client_id: "your-client-id",
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
