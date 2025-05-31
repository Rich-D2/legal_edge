// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import axios from "axios";

function Dashboard() {
  const auth = useAuth();
  const [message, setMessage] = useState("Loading...");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const token = auth.user?.access_token;
      if (!token) {
        setMessage("No access token found.");
        return;
      }

      try {
        const res = await axios.get("https://legal-edge.onrender.com/api/dashboard", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(res.data.message);
      } catch (err) {
        console.error("Error fetching dashboard:", err);
        setMessage("Unauthorized or error fetching dashboard.");
        setError(err.response?.data || err.message);
      }
    };

    fetchDashboard();
  }, [auth.user]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>{message}</p>
      {error && (
        <pre style={{ color: "red" }}>
          {typeof error === "string" ? error : JSON.stringify(error, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default Dashboard;
