
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get('/api/customer', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(res.data.message);
      } catch (err) {
        alert('Unauthorized');
        window.location.href = '/';
      }
    };

    fetchData();
  }, []);

  return <div><h2>{message}</h2></div>;
}

export default Dashboard;
