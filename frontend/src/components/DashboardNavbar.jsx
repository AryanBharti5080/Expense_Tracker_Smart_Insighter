import React from "react";
import {  FaSignOutAlt } from "react-icons/fa";

function DashboardNavbar({ toggleMenu, handleLogout }) {
  return (
    <div
      style={{
        width: "100%",margin: 0,
        background: "linear-gradient(90deg, #0C67A0, #30146d)",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        color: "#ffffff",
        padding: "20px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",boxSizing: "border-box"
      }}
    >
      {/* LEFT */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
       
        <h2 style={{ margin: 0 }}>💰 Expense Tracker with Smart Insighter</h2>
      </div>

      {/* RIGHT */}
      <div style={{ display: "flex", alignItems: "center", gap: "30px" }}>

        <span
    style={{ cursor: "pointer" }}
    onClick={() =>
      alert("This app helps you track and analyze expenses")
    }
  >
    ❓ Help
  </span>

        {/* LOGOUT */}
       <button onClick={handleLogout}
            style={{
              padding: "5px 10px",
              backgroundColor: "#104769",
              color: "#ffffff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            <FaSignOutAlt /> Logout
</button>

      </div>
    </div>
  );
}

export default DashboardNavbar;