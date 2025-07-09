import React, { useState } from "react";

function WelcomePage({ onLogin }) {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      onLogin(username.trim());
    }
  };

  return (
    <div style={styles.container}>
      {/* Logo Image */}
      <img
        src="/chef-logo.png"
        alt="Calorie Chef Logo"
        style={{
          width: 120,
          height: 120,
          marginBottom: 24,
          borderRadius: 20,
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          objectFit: "contain",
        }}
      />

      <h1 style={{ marginBottom: 30, color: "white", fontWeight: "700" }}>
        Welcome to Calorie Chef!
      </h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          autoFocus
          aria-label="Username"
        />
        <button type="submit" className="button-primary" aria-label="Continue to dashboard">
          Continue
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    background: "linear-gradient(135deg, #4e9af1 0%, #5f6efb 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "'Poppins', sans-serif",
    padding: 20,
  },
  form: {
    display: "flex",
    gap: 16,
    maxWidth: 380,
    width: "100%",
  },
  input: {
    flex: 1,
    padding: 14,
    fontSize: "1.1rem",
    borderRadius: 12,
    border: "none",
    outline: "none",
  },
};

export default WelcomePage;
