import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Email and Password are required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Invalid email format");
      return;
    }

    if (password.length < 4) {
      setError("Password must be at least 4 characters");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://127.0.0.1:8000/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      alert(res.data.message);
      localStorage.setItem("isLoggedIn", "true");
      navigate("./Dashboard");
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* PAGE BACKGROUND */}
      <div style={{
        minHeight: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0d1b4b 0%, #1a0a5e 50%, #0C67A0 100%)",
        padding: "20px",
        position: "relative",
        overflow: "hidden"
      }}>

        {/* DECORATIVE CIRCLES */}
        <div style={{
          position: "absolute", width: "300px", height: "300px",
          borderRadius: "50%", background: "rgba(79,142,247,0.08)",
          top: "-80px", left: "-80px", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", width: "200px", height: "200px",
          borderRadius: "50%", background: "rgba(168,85,247,0.08)",
          bottom: "-60px", right: "-60px", pointerEvents: "none"
        }} />

        {/* LOGIN CARD */}
        <div style={{
          backgroundColor: "#ffffff",
          padding: "40px 36px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "320px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
          position: "relative",
          zIndex: 1
        }}>

          {/* LOGO */}
          <div style={{ textAlign: "center", marginBottom: "28px" }}>
            <div style={{
             
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "26px", margin: "0 auto 14px"
            }}></div>
            <h2 style={{ margin: 0, fontSize: "22px", fontWeight: "800", color: "#1a1a2e" }}>
             💰 Welcome Back
            </h2>
            <p style={{ margin: "6px 0 0", fontSize: "13px", color: "#94a3b8" }}>
              Login to your SpendWise account
            </p>
          </div>

          {/* EMAIL FIELD */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{
              display: "block", fontSize: "12px", fontWeight: "700",
              color: "#475569", marginBottom: "7px",
              textTransform: "uppercase", letterSpacing: "0.5px"
            }}>
              Email Address
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: "13px", top: "50%",
                transform: "translateY(-50%)", fontSize: "16px", pointerEvents: "none"
              }}>📧</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{
                  width: "100%", padding: "11px 14px 11px 40px",
                  borderRadius: "10px", border: "1.5px solid #e2e8f0",
                  fontSize: "14px", outline: "none", boxSizing: "border-box",
                  background: "#d9dde1", transition: "border-color 0.2s, box-shadow 0.2s"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4f8ef7";
                  e.target.style.boxShadow = "0 0 0 3px rgba(79,142,247,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          {/* PASSWORD FIELD */}
          <div style={{ marginBottom: "20px" }}>
            <label style={{
              display: "block", fontSize: "12px", fontWeight: "700",
              color: "#475569", marginBottom: "7px",
              textTransform: "uppercase", letterSpacing: "0.5px"
            }}>
              Password
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: "13px", top: "50%",
                transform: "translateY(-50%)", fontSize: "16px", pointerEvents: "none"
              }}>🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                style={{
                  width: "100%", padding: "11px 40px 11px 40px",
                  borderRadius: "10px", border: "1.5px solid #e2e8f0",
                  fontSize: "14px", outline: "none", boxSizing: "border-box",
                  background: "#d9dde1", transition: "border-color 0.2s, box-shadow 0.2s"
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = "#4f8ef7";
                  e.target.style.boxShadow = "0 0 0 3px rgba(79,142,247,0.15)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "#e2e8f0";
                  e.target.style.boxShadow = "none";
                }}
              />
              {/* SHOW / HIDE PASSWORD */}
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute", right: "13px", top: "50%",
                  transform: "translateY(-50%)", fontSize: "16px",
                  cursor: "pointer", userSelect: "none"
                }}
              >
                {showPassword ? "🙈" : "👁️"}
              </span>
            </div>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div style={{
              display: "flex", alignItems: "center", gap: "8px",
              background: "#fff1f1", border: "1px solid #fecaca",
              borderRadius: "8px", padding: "10px 14px",
              marginBottom: "16px"
            }}>
              <span style={{ fontSize: "14px" }}>⚠️</span>
              <p style={{ margin: 0, fontSize: "13px", color: "#dc2626", fontWeight: "500" }}>
                {error}
              </p>
            </div>
          )}

          {/* LOGIN BUTTON */}
          <button
            onClick={handleLogin}
            disabled={loading}
            style={{
              width: "100%", padding: "13px",
              background: loading
  ? "#2a2a3d"
  : "linear-gradient(135deg, #0C67A0 0%, #1a0a5e 50%, #0d1b4b 100%)",
              color: "white", border: "none", borderRadius: "10px",
              fontWeight: "700", fontSize: "15px", cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.3px", transition: "opacity 0.2s",
              marginBottom: "20px"
            }}
            onMouseEnter={(e) => { if (!loading) e.target.style.opacity = "0.9"; }}
            onMouseLeave={(e) => { e.target.style.opacity = "1"; }}
          >
            {loading ? "Logging in..." : "Login →"}
          </button>

          {/* DIVIDER */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px"
          }}>
            <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
          </div>

          {/* SIGNUP LINK */}
          <p style={{ textAlign: "center", margin: 0, fontSize: "13px", color: "#64748b" }}>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{
                color: "#4f8ef7", fontWeight: "700",
                cursor: "pointer", textDecoration: "underline"
              }}
            >
              Sign Up
            </span>
          </p>

        </div>
      </div>
    </>
  );
}

export default Login;
