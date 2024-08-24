// src/pages/Welcome.jsx
import React from 'react';

function Welcome() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',  // Full height of the viewport
      textAlign: 'center',
      padding: '20px'
    }}>
      <div>
        <h1>Welcome to Car Market Analytics</h1>
        <p>Your one-stop solution to analyze car market trends.</p>
      </div>
    </div>
  );
}

export default Welcome;
