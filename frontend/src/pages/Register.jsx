import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";

function Register() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setError("");

    if (!name || !email || !password) {
      setError("All fields are required");
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
      const res = await axios.post("http://127.0.0.1:8000/register", {
        name,
        email: email.trim().toLowerCase(),
        password,
      });

      alert(res.data.message);
    } catch (err) {
      setError("Registration failed (email already exists)");
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
          top: "-80px", right: "-80px", pointerEvents: "none"
        }} />
        <div style={{
          position: "absolute", width: "200px", height: "200px",
          borderRadius: "50%", background: "rgba(168,85,247,0.08)",
          bottom: "-60px", left: "-60px", pointerEvents: "none"
        }} />

        {/* REGISTER CARD */}
        <div style={{
          backgroundColor: "#ffffff",
          padding: "40px 36px",
          borderRadius: "20px",
          width: "100%",
          maxWidth: "330px",
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
             💰 Create Account
            </h2>
            
          </div>

          {/* NAME FIELD */}
          <div style={{ marginBottom: "16px" }}>
            <label style={{
              display: "block", fontSize: "12px", fontWeight: "700",
              color: "#475569", marginBottom: "7px",
              textTransform: "uppercase", letterSpacing: "0.5px"
            }}>
              Full Name
            </label>
            <div style={{ position: "relative" }}>
              <span style={{
                position: "absolute", left: "13px", top: "50%",
                transform: "translateY(-50%)", fontSize: "16px", pointerEvents: "none"
              }}>👤</span>
              <input
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
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
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
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
                placeholder="Min. 4 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
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

            {/* PASSWORD STRENGTH BAR */}
            {password.length > 0 && (
              <div style={{ marginTop: "8px", display: "flex", alignItems: "center", gap: "4px" }}>
                {[1, 2, 3].map((level) => (
                  <div key={level} style={{
                    flex: 1, height: "3px", borderRadius: "3px",
                    background: password.length >= level * 3
                      ? level === 1 ? "#ef4444"
                        : level === 2 ? "#f59e0b"
                        : "#10b981"
                      : "#e2e8f0",
                    transition: "background 0.3s"
                  }} />
                ))}
                <span style={{ fontSize: "11px", color: "#94a3b8", marginLeft: "6px", whiteSpace: "nowrap" }}>
                  {password.length < 3 ? "Weak" : password.length < 6 ? "Fair" : "Strong"}
                </span>
              </div>
            )}
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

          {/* SIGNUP BUTTON */}
          <button
            onClick={handleRegister}
            disabled={loading}
            style={{
              width: "100%", padding: "13px",
              background: loading
                ? "#94a3b8"
                : "linear-gradient(135deg, #0C67A0 0%, #1a0a5e 50%, #0d1b4b 100%)",
              color: "white", border: "none", borderRadius: "10px",
              fontWeight: "700", fontSize: "15px",
              cursor: loading ? "not-allowed" : "pointer",
              letterSpacing: "0.3px", transition: "opacity 0.2s",
              marginBottom: "20px"
            }}
            onMouseEnter={(e) => { if (!loading) e.target.style.opacity = "0.9"; }}
            onMouseLeave={(e) => { e.target.style.opacity = "1"; }}
          >
            {loading ? "Creating Account..." : "Create Account →"}
          </button>

          {/* DIVIDER */}
          <div style={{
            display: "flex", alignItems: "center", gap: "10px", marginBottom: "20px"
          }}>
            <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
            <span style={{ fontSize: "12px", color: "#94a3b8" }}>OR</span>
            <div style={{ flex: 1, height: "1px", background: "#e2e8f0" }} />
          </div>

          {/* LOGIN LINK */}
          <p style={{ textAlign: "center", margin: 0, fontSize: "13px", color: "#64748b" }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              style={{
                color: "#4f8ef7", fontWeight: "700",
                cursor: "pointer", textDecoration: "underline"
              }}
            >
              Login
            </span>
          </p>

        </div>
      </div>
    </>
  );
}

export default Register;
