import React from "react";
import { useAuth } from "react-oidc-context";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard";

function App() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "13gsp3c44n3vt9gtds1q38ggtv"; // Replace with your actual client ID
    const logoutUri = "https://legal-edge.onrender.com"; // Redirect URI
    const cognitoDomain = "https://legal-edge.auth.us-east-1.amazoncognito.com"; // Replace this with your domain
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

  if (auth.isLoading) return <div>Loading...</div>;
  if (auth.error) return <div>Authentication error: {auth.error.message}</div>;

  return (
    <Router>
      {auth.isAuthenticated ? (
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      ) : (
        <div style={{ padding: "2rem" }}>
          <h2>Welcome to Legal Edge</h2>
          <button onClick={() => auth.signinRedirect()}>Sign in</button>
        </div>
      )}

      {auth.isAuthenticated && (
        <div style={{ padding: "1rem" }}>
          <p>Signed in as: {auth.user?.profile.email}</p>
          <button onClick={signOutRedirect}>Sign out</button>
        </div>
      )}
    </Router>
  );
}

export default App;
