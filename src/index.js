import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { AuthProvider } from "react-oidc-context";

const cognitoAuthConfig = {
  authority: "https://legal-edge.auth.us-east-1.amazoncognito.com", // <-- Hosted UI domain
  client_id: "13gsp3c44n3vt9gtds1q38ggtv",
  redirect_uri: "https://legal-edge.onrender.com",
  response_type: "code",
  scope: "email openid phone",
};

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider {...oidcConfig}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
