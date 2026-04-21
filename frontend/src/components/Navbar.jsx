import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar({ showLogout, showHelp = true }) {
   const navigate = useNavigate();
   const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div
      style={{
        width: "100%",
        background: "linear-gradient(90deg, #ffffff, #9eabba47)",
        color: "#104769",
        padding: "20px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",boxSizing: "border-box"
      }}
    >
      {/* Left Side */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <h2 style={{ margin: 0 }}>💰 Expense Tracker with Smart Insighter</h2>
      </div>

      {/* Right Side */}
      <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
        {showHelp && (
  <span
    style={{ cursor: "pointer" }}
    onClick={() =>
      alert("This app helps you track and analyze expenses")
    }
  >
    ❓ Help
  </span>
)}

        {showLogout && (
          <button
            onClick={handleLogout}
            style={{
              padding: "5px 10px",
              backgroundColor: "#104769",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
