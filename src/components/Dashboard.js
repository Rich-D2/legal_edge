// src/components/Dashboard.js
import React, { useEffect, useState } from "react";
import { useAuth } from "react-oidc-context";
import axios from "axios";

function Dashboard() {
  const auth = useAuth();
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await axios.get("https://legal-edge.onrender.com/api/dashboard", {
          headers: {
            Authorization: `Bearer ${auth.user?.access_token}`,
          },
        });
        setMessage(res.data.message);
      } catch (err) {
        console.error("API error:", err);
        setMessage("Unauthorized or error fetching dashboard");
      }
    };

    fetchDashboard();
  }, [auth.user]);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard</h1>
      <p>{message}</p>
    </div>
  );
}

export default Dashboard;
