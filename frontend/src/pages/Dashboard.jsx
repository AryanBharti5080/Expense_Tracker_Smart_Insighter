import DashboardNavbar from "../components/DashboardNavbar";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../dashboard.css";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import {ResponsiveContainer } from "recharts";
import { LineChart, Line, XAxis, YAxis, CartesianGrid} from "recharts";

function Dashboard() {
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [editId, setEditId] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("dashboard");
  const toggleMenu = () => setShowMenu(!showMenu);
  const [expenses, setExpenses] = useState([]);
  const [budget, setBudget] = useState(10000);
  const [message, setMessage] = useState("");
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const fetchExpenses = async () => {
    const res = await axios.get("http://127.0.0.1:8000/expenses/");
    setExpenses(res.data);
  };

  useEffect(() => { fetchExpenses(); }, []);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate("/");
  }, [navigate]);

  const handleAdd = async () => {
    if (!amount || !description || !date) { alert("Please fill all fields"); return; }
    if (editId) {
      await axios.put(`http://127.0.0.1:8000/expenses/${editId}`, { amount, description, date });
      setMessage("Expense updated successfully ✅");
      setEditId(null);
    } else {
      await axios.post("http://127.0.0.1:8000/expenses/", {
        amount: Number(amount),
        description,
        date: new Date().toISOString().split("T")[0]
      });
      setMessage("Expense added successfully ✅");
    }
    setAmount(""); setDescription(""); setDate("");
    fetchExpenses();
    setCurrentPage(1);
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://127.0.0.1:8000/expenses/${id}`);
    fetchExpenses();
    setCurrentPage(1);
  };

  const handleEdit = (exp) => {
    setAmount(exp.amount);
    setDescription(exp.description);
    setDate(exp.date);
    setEditId(exp.id);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  const getTotal = () => expenses.reduce((sum, exp) => sum + exp.amount, 0);

  const getCategoryData = () => {
    const data = {};
    expenses.forEach((exp) => {
      data[exp.category] = (data[exp.category] || 0) + exp.amount;
    });
    return Object.keys(data).map((key) => ({ name: key, value: data[key] }));
  };

  const predictMonthly = () => {
    if (expenses.length === 0) return 0;
    return Math.round((getTotal() / expenses.length) * 30);
  };

  const getAnomalies = () => {
    if (expenses.length < 3) return [];
    const avg = getTotal() / expenses.length;
    return expenses.filter((exp) => exp.amount > avg * 2 && exp.amount > budget * 0.3);
  };

  const COLORS = ["#4169E1","#075244","#FFBB28","#9f4f27","#A28EFF","#c41a6f","#4b290c","#32CD32","#426f56","#00BFFF"];

  const getCategoryLineData = () => {
    const data = {};
    expenses.forEach((exp) => {
      data[exp.category] = (data[exp.category] || 0) + exp.amount;
    });
    return Object.keys(data).map((key) => ({ category: key, amount: data[key] }));
  };

  const sectionStyle = {
  backgroundColor: "#ffffff",
  padding: "15px",        // reduced from 30px
  borderRadius: "12px",
  marginBottom: "20px",
  boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
  border: "1px solid #eaeaea"
};

    const paginatedExpenses = expenses.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
  const totalPages = Math.ceil(expenses.length / itemsPerPage);
  
  return (
    <>
      <DashboardNavbar toggleMenu={toggleMenu} handleLogout={handleLogout} />

      <div style={{ display: "flex", minHeight: "100vh" }}>
       
       {/* SIDEBAR */}
<div style={{
  width: collapsed ? "60px" : "240px",
  transition: "width 0.3s ease",
  minHeight: "100vh",
  background: "linear-gradient(180deg, #0d1b4b 0%, #1a0a5e 50%, #2d0a6b 100%)",
  color: "white",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: "4px 0 24px rgba(0,0,0,0.18)",
  flexShrink: 0,
  overflow: "hidden"
}}>

  <div>
    {/* LOGO AREA — hides when collapsed */}
    {!collapsed && (
      <div style={{
        padding: "24px 20px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.08)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{
            width: "36px", height: "36px", borderRadius: "10px",
            background: "linear-gradient(135deg, #4f8ef7, #a855f7)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "18px", flexShrink: 0
          }}>💰</div>
          <div>
            <p style={{ margin: 0, fontWeight: "700", fontSize: "15px", letterSpacing: "0.3px" }}>SpendWise</p>
            <p style={{ margin: 0, fontSize: "11px", opacity: 0.5 }}>Expense Tracker</p>
          </div>
        </div>
      </div>
    )}

    {/* TOGGLE BUTTON */}
    <div style={{ padding: collapsed ? "16px 12px" : "12px 16px" }}>
      <button
        onClick={() => setCollapsed(!collapsed)}
        style={{
          width: "100%", padding: "8px", cursor: "pointer",
          border: "none", borderRadius: "8px",
          background: "rgba(255,255,255,0.08)",
          color: "white", fontSize: "18px",
          display: "flex", alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          transition: "background 0.2s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#0d1b4b"}
        onMouseLeave={(e) => e.currentTarget.style.background = "#0d1b4b"}
      >
        ☰
      </button>
    </div>

    {/* NAV ITEMS */}
    <div style={{ padding: "8px 12px" }}>
      {[
        { key: "dashboard", icon: "🏠", label: "Dashboard" },
        { key: "charts",    icon: "📊", label: "Visual Analytics"    },
        { key: "insights",  icon: "💡", label: "Insights"  },
        { key: "anomalies", icon: "⚠️",  label: "Anomalies" },
      ].map(({ key, icon, label }) => {
        const isActive = activeSection === key;
        return (
          <div
            key={key}
            onClick={() => setActiveSection(key)}
            title={collapsed ? label : ""}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: "12px",
              padding: collapsed ? "12px 0" : "11px 14px",
              borderRadius: "10px",
              marginBottom: "4px",
              cursor: "pointer",
              background: isActive
                ? "linear-gradient(90deg, rgba(79,142,247,0.25), rgba(168,85,247,0.15))"
                : "transparent",
              borderLeft: isActive && !collapsed ? "3px solid #4f8ef7" : "3px solid transparent",
              fontWeight: isActive ? "600" : "400",
              fontSize: "14px",
              opacity: isActive ? 1 : 0.65,
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.background = "rgba(255,255,255,0.07)";
              e.currentTarget.style.opacity = "1";
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.background = "transparent";
              e.currentTarget.style.opacity = isActive ? "1" : "0.65";
            }}
          >
            <span style={{ fontSize: "18px", minWidth: "20px", textAlign: "center" }}>{icon}</span>
            {!collapsed && (
              <>
                <span>{label}</span>
                {isActive && (
                  <span style={{
                    marginLeft: "auto", width: "6px", height: "6px",
                    borderRadius: "50%", background: "#4f8ef7"
                  }} />
                )}
              </>
            )}
          </div>
        );
      })}
    </div>
  </div>

  {/* BOTTOM USER CARD */}
  {!collapsed && (
    <div style={{
      margin: "12px",
      padding: "14px",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      cursor: "pointer"
    }}>
      <div style={{
        width: "36px", height: "36px", borderRadius: "50%",
        background: "linear-gradient(135deg, #4f8ef7, #a855f7)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "16px", flexShrink: 0
      }}>👤</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ margin: 0, fontSize: "13px", fontWeight: "600" }}>My Account</p>
        <p style={{ margin: 0, fontSize: "11px", opacity: 0.5 }}></p>
      </div>
      <span style={{ opacity: 0.4, fontSize: "12px" }}>→</span>
    </div>
  )}


</div>
{/* END SIDEBAR */}

        {/* MAIN CONTENT */}
        <div style={{ flex: 1, padding: "0px", background: "#eef2f7",}}>

          <div style={{
  width: "100%",
  maxWidth: "1255px",
  padding: "20px"
}}>
            <h2>Dashboard</h2>

         {/* State Card section */}
<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "16px",
  marginBottom: "28px"
}}>

  {/* Total Spent */}
  <div style={{
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 2px 12px rgba(79,142,247,0.10)",
    border: "1px solid rgba(0, 57, 155, 0.15)",
    position: "relative",
    overflow: "hidden"
  }}>
    <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px",
      background: "linear-gradient(135deg, rgba(79, 141, 247, 0.36), transparent)",
      borderRadius: "0 14px 0 80px" }} />
    <span style={{ fontSize: "22px" }}>💸</span>
    <p style={{ margin: "10px 0 4px", fontSize: "12px", color: "#888", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Spent</p>
    <h3 style={{ margin: 0, fontSize: "26px", fontWeight: "700", color: "#1a1a2e" }}>₹{getTotal().toLocaleString()}</h3>
    <div style={{ marginTop: "12px", height: "4px", background: "rgb(230, 230, 255)", borderRadius: "4px" }}>
      <div style={{
        height: "4px", borderRadius: "4px",
        background: "linear-gradient(90deg, #4f8ef7, #a855f7)",
        width: `${Math.min((getTotal() / budget) * 100, 100)}%`,
        transition: "width 0.5s ease"
      }} />
    </div>
    <p style={{ margin: "6px 0 0", fontSize: "11px", color: "#887e7e" }}>
      {Math.round((getTotal() / budget) * 100)}% of budget used
    </p>
  </div>

  {/* Budget */}
  <div style={{
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 2px 12px rgba(34,197,94,0.10)",
    border: "1px solid rgba(34,197,94,0.15)",
    position: "relative",
    overflow: "hidden"
  }}>
    <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px",
      background: "linear-gradient(135deg, rgba(13, 223, 90, 0.37), transparent)",
      borderRadius: "0 14px 0 80px" }} />
    <span style={{ fontSize: "22px" }}>🎯</span>
    <p style={{ margin: "10px 0 4px", fontSize: "12px", color: "#888", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.5px" }}>Monthly Budget</p>
    <h3 style={{ margin: 0, fontSize: "26px", fontWeight: "700", color: "#1a1a2e" }}>₹{budget.toLocaleString()}</h3>
    <p style={{ margin: "18px 0 0", fontSize: "11px", color: "#27c360", fontWeight: "600" }}>● Set limit</p>
  </div>

  {/* Remaining */}
  <div style={{
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: budget - getTotal() < 0
      ? "0 2px 12px rgba(239,68,68,0.12)"
      : "0 2px 12px rgba(16,185,129,0.10)",
    border: budget - getTotal() < 0
      ? "1px solid rgba(239,68,68,0.2)"
      : "1px solid rgba(16,185,129,0.15)",
    position: "relative",
    overflow: "hidden"
  }}>
    <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px",
      background: budget - getTotal() < 0
        ? "linear-gradient(135deg, rgba(239, 68, 68, 0.43), transparent)"
        : "linear-gradient(135deg, rgba(16, 185, 129, 0.29), transparent)",
      borderRadius: "0 14px 0 80px" }} />
    <span style={{ fontSize: "22px" }}>{budget - getTotal() < 0 ? "🚨" : "✅"}</span>
    <p style={{ margin: "10px 0 4px", fontSize: "12px", color: "#888", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.5px" }}>Remaining</p>
    <h3 style={{ margin: 0, fontSize: "26px", fontWeight: "700",
      color: budget - getTotal() < 0 ? "#ef4444" : "#10b981"
    }}>₹{(budget - getTotal()).toLocaleString()}</h3>
    <p style={{ margin: "18px 0 0", fontSize: "11px",
      color: budget - getTotal() < 0 ? "#ef4444" : "#10b981", fontWeight: "600"
    }}>
      {budget - getTotal() < 0 ? "● Over budget!" : "● On track"}
    </p>
  </div>

  {/* Prediction */}
  <div style={{
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 2px 12px rgba(168,85,247,0.10)",
    border: "1px solid rgba(168,85,247,0.15)",
    position: "relative",
    overflow: "hidden"
  }}>
    <div style={{ position: "absolute", top: 0, right: 0, width: "80px", height: "80px",
      background: "linear-gradient(135deg, rgba(169, 85, 247, 0.33), transparent)",
      borderRadius: "0 14px 0 80px" }} />
    <span style={{ fontSize: "22px" }}>🔮</span>
    <p style={{ margin: "10px 0 4px", fontSize: "12px", color: "#888", fontWeight: "500", textTransform: "uppercase", letterSpacing: "0.5px" }}>Month Forecast</p>
    <h3 style={{ margin: 0, fontSize: "26px", fontWeight: "700", color: "#1a1a2e" }}>₹{predictMonthly().toLocaleString()}</h3>
    <p style={{ margin: "18px 0 0", fontSize: "11px",
      color: predictMonthly() > budget ? "#ef4444" : "#a855f7", fontWeight: "600"
    }}>
      {predictMonthly() > budget ? "● Projected overspend" : "● Projected safe"}
    </p>
  </div>

</div>

            {/* DASHBOARD SECTION */}
            {activeSection === "dashboard" && (
              <>
                <div style={sectionStyle}>                
                  <h3>Add Expense</h3>
                  {message && (
                   <div style={{
                       backgroundColor: "#e6f4ea",
                      color: "#155724",
                      padding: "10px",
                      borderRadius: "6px",border: "1px solid #28a745",
                         marginBottom: "15px",
                      fontSize: "14px"
                     }}>
                  {message}
                  </div>
                 )}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "8px",
                    marginBottom: "15px"
                  }}>
                

                  <input type="number" placeholder="Amount (₹)" value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={{width: "80%",padding: "12px",borderRadius: "8px",border: "1px solid #ccc", boxSizing: "border-box",display: "block"}}/>

                  <input type="text" placeholder="Description (e.g. Food, Travel)" value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    style={{width: "80%",padding: "12px",borderRadius: "8px",border: "1px solid #ccc", boxSizing: "border-box",display: "block"}}/>
                  <input type="date" value={date}
                    onChange={(e) => setDate(e.target.value)}
                    style={{width: "80%",padding: "12px",borderRadius: "8px",border: "1px solid #ccc", boxSizing: "border-box",display: "block"}}/>
                  <button onClick={handleAdd} style={{
                    gridColumn: "span 2",
                    width: "40%", padding: "12px",
                    background: "linear-gradient(90deg, #0C67A0, #30146d)",
                    color: "white", border: "none", borderRadius: "8px",
                    fontWeight: "bold", cursor: "pointer"
                  }}>
                    {editId ? "Update Expense" : "Add Expense"}
                  </button>
                </div>
                <hr />

<h3>All Expenses List:</h3>
              
{/* EXPENSE LIST */}
<div style={{
  background: "#fff",
  borderRadius: "16px",
  boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
  border: "1px solid rgba(0,0,0,0.06)"
}}>
  {/* Table Header */}
  <div style={{
    display: "flex", alignItems: "center",
    padding: "16px 20px",
    borderBottom: "1px solid #f1f5f9",
    background: "#fafbfc"
  }}>
    <h3 style={{ margin: 0, fontSize: "16px", fontWeight: "700", color: "#1a1a2e", flex: 1 }}>
      Total Expenses:
      <span style={{
        marginLeft: "10px", fontSize: "12px", fontWeight: "600",
        background: "linear-gradient(90deg, #4f8ef7, #a855f7)",
        color: "white", padding: "2px 10px", borderRadius: "20px"
      }}>
        {expenses.length}
      </span>
    </h3>
    <span style={{ fontSize: "12px", color: "#000000" }}>
      Total: ₹{getTotal().toLocaleString()}
    </span>
  </div>

  {/* Column Headers */}
  {expenses.length > 0 && (
    <div style={{
      display: "grid",
      gridTemplateColumns: "280px 280px 250px 250px 170px",
      padding: "10px 20px",
      fontSize: "14px", fontWeight: "700", color: "#022d69",
      textTransform: "uppercase", letterSpacing: "0.5px",
      borderBottom: "1px solid #f1f5f9"
    }}>
      <span>Amount</span>
      <span style={{ minWidth: 0, overflow: "hidden" }}>Description</span>
      <span>Category</span>
      <span>Date</span>
      <span style={{ textAlign: "center" }}>Actions</span>
    </div>
  )}

  {/* Empty State */}
  {expenses.length === 0 && (
    <div style={{ padding: "60px 20px", textAlign: "center" }}>
      <div style={{ fontSize: "48px", marginBottom: "12px" }}>📭</div>
      <p style={{ color: "#888", fontSize: "15px", margin: 0 }}>No expenses yet.</p>
      <p style={{ color: "#bbb", fontSize: "13px", marginTop: "6px" }}>Add your first expense above!</p>
    </div>
  )}

  {/* Expense Rows */}
  {paginatedExpenses.map((exp, index) => {
    const categoryColors = {
      "Food 🍔":          { bg: "#fef3c7", color: "#92400e" },
      "Transport 🚗":     { bg: "#dbeafe", color: "#1e40af" },
      "Bills 💡":         { bg: "#fce7f3", color: "#9d174d" },
      "Shopping 🛍️":      { bg: "#f3e8ff", color: "#6b21a8" },
      "Health 💊":        { bg: "#dcfce7", color: "#166534" },
      "Entertainment 🎬": { bg: "#fee2e2", color: "#991b1b" },
      "Education 📚":     { bg: "#e0f2fe", color: "#0c4a6e" },
      "Travel ✈️":        { bg: "#d1fae5", color: "#065f46" },
      "Other 📌":         { bg: "#f1f5f9", color: "#475569" },
    };
    const catStyle = categoryColors[exp.category] || { bg: "#f1f5f9", color: "#040506" };

    return (
      <div
        key={exp.id}
        style={{
          display: "grid",
          gridTemplateColumns:  "280px 280px 250px 250px 170px",
          alignItems: "center",
          padding: "13px 20px",
          background: index % 2 === 0 ? "#fff" : "#fafbfc",
          borderBottom: "1px solid #f1f5f9",
          transition: "background 0.15s"
        }}
        onMouseEnter={(e) => e.currentTarget.style.background = "#f0f7ff"}
        onMouseLeave={(e) => e.currentTarget.style.background = index % 2 === 0 ? "#fff" : "#fafbfc"}
      >
        {/* Amount */}
        <span style={{ fontWeight: "700", color: "#1a1a2e", fontSize: "14px" }}>
          ₹{Number(exp.amount).toLocaleString()}
        </span>

        {/* Description */}
        <span style={{ color: "#000000", fontSize: "14px", paddingRight: "16px",
          overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",minWidth: 0 }}>
          {exp.description}
        </span>

        {/* Category Badge */}
        <span style={{
          display: "inline-block",
          background: catStyle.bg, color: catStyle.color,
          fontSize: "13px", fontWeight: "500",
          padding: "4px 10px", borderRadius: "20px",
          width: "fit-content"
        }}>
          {exp.category || "Other"}
        </span>

        {/* Date */}
        <span style={{ color: "#000000", fontSize: "13px" }}>{exp.date}</span>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: "6px", justifyContent: "center" }}>
          <button
            onClick={() => handleEdit(exp)}
            title="Edit"
            style={{
              width: "30px", height: "30px", borderRadius: "8px",
              border: "1px solid #e2e8f0", background: "#fff",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "13px",
              transition: "all 0.15s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#dbeafe";
              e.currentTarget.style.borderColor = "#4f8ef7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            ✏️
          </button>
          <button
            onClick={() => handleDelete(exp.id)}
            title="Delete"
            style={{
              width: "30px", height: "30px", borderRadius: "8px",
              border: "1px solid #e2e8f0", background: "#fff",
              cursor: "pointer", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "13px",
              transition: "all 0.15s"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#fee2e2";
              e.currentTarget.style.borderColor = "#ef4444";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            🗑️
          </button>
        </div>
      </div>
    );
  })}
  {/* PAGINATION */}
   {totalPages > 1 && (
    <div style={{
     display: "flex", alignItems: "center", justifyContent: "space-between",
     padding: "14px 20px", borderTop: "1px solid #f1f5f9", background: "#fafbfc"
   }}>
    <span style={{ fontSize: "13px", color: "#080809" }}>
      Showing {(currentPage - 1) * itemsPerPage + 1}–{Math.min(currentPage * itemsPerPage, expenses.length)} of {expenses.length} entries
    </span>
    <div style={{ display: "flex", gap: "6px" }}>
      <button
        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
        disabled={currentPage === 1}
        style={{
          padding: "6px 14px", borderRadius: "8px", border: "1px solid #e2e8f0",
          background: currentPage === 1 ? "#f8fafc" : "#fff",
          color: currentPage === 1 ? "#cbd5e1" : "#374151",
          cursor: currentPage === 1 ? "not-allowed" : "pointer",
          fontSize: "13px", fontWeight: "600"
        }}
      >← Prev</button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => setCurrentPage(page)}
          style={{
            padding: "6px 12px", borderRadius: "8px", fontSize: "13px", fontWeight: "600",
            border: page === currentPage ? "none" : "1px solid #e2e8f0",
            background: page === currentPage
              ? "linear-gradient(90deg, #4f8ef7, #a855f7)"
              : "#fff",
            color: page === currentPage ? "#fff" : "#374151",
            cursor: "pointer"
          }}
        >{page}</button>
      ))}

      <button
        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
        disabled={currentPage === totalPages}
        style={{
          padding: "6px 14px", borderRadius: "8px", border: "1px solid #e2e8f0",
          background: currentPage === totalPages ? "#f8fafc" : "#fff",
          color: currentPage === totalPages ? "#cbd5e1" : "#374151",
          cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          fontSize: "13px", fontWeight: "600"
        }}
      >Next →</button>
    </div>
  </div>
  )}
</div></div>
              </>
            )}

            {/* INSIGHTS SECTION */}
 {activeSection === "insights" && (
  <>

    {/* BUDGET SETTER CARD */}
    <div style={{
      background: "#fff",
      borderRadius: "16px",
      padding: "24px",
      marginBottom: "24px",
      boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
      border: "1px solid rgba(0,0,0,0.06)"
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
        <div style={{
          width: "32px", height: "32px", borderRadius: "8px",
          background: "linear-gradient(135deg, #4f8ef7, #a855f7)",
          display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px"
        }}>🎯</div>
        <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#1a1a2e" }}>
          Set Monthly Budget
        </h3>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
        <div style={{ position: "relative", flex: "1", minWidth: "200px" }}>
          <span style={{
            position: "absolute", left: "14px", top: "50%", transform: "translateY(-50%)",
            fontSize: "16px", fontWeight: "700", color: "#4f8ef7"
          }}>₹</span>
          <input
            type="number"
            placeholder="Enter your budget"
            value={budget}
            onChange={(e) => setBudget(Number(e.target.value))}
            style={{
              width: "100%", padding: "12px 14px 12px 32px",
              borderRadius: "10px", border: "1.5px solid #e2e8f0",
              fontSize: "15px", fontWeight: "600", outline: "none",
              boxSizing: "border-box", background: "#fafafa",
              color: "#1a1a2e"
            }}
            onFocus={(e) => e.target.style.borderColor = "#4f8ef7"}
            onBlur={(e) => e.target.style.borderColor = "#e2e8f0"}
          />
        </div>
        <div style={{
          padding: "12px 20px", borderRadius: "10px",
          background: "linear-gradient(90deg, #4f8ef7, #a855f7)",
          color: "white", fontWeight: "700", fontSize: "14px",
          whiteSpace: "nowrap"
        }}>
          Budget: ₹{Number(budget).toLocaleString()}
        </div>
      </div>
    </div>

    {/* STATS ROW */}
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
      gap: "16px",
      marginBottom: "24px"
    }}>

    </div>

    {/* BUDGET PROGRESS CARD */}
    <div style={{
      background: "#fff", borderRadius: "16px", padding: "24px",
      marginBottom: "24px",
      boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
      border: "1px solid rgba(0,0,0,0.06)"
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
        <h3 style={{ margin: 0, fontSize: "15px", fontWeight: "700", color: "#1a1a2e" }}>
          📊 Budget Usage
        </h3>
        <span style={{
          fontSize: "13px", fontWeight: "700",
          color: (getTotal() / budget) * 100 >= 100 ? "#ef4444"
               : (getTotal() / budget) * 100 >= 80  ? "#f59e0b"
               : "#10b981"
        }}>
          {Math.min(Math.round((getTotal() / budget) * 100), 100)}% used
        </span>
      </div>

      {/* Progress Bar */}
      <div style={{ height: "12px", background: "#f1f5f9", borderRadius: "8px", overflow: "hidden", marginBottom: "12px" }}>
        <div style={{
          height: "100%", borderRadius: "8px",
          width: `${Math.min((getTotal() / budget) * 100, 100)}%`,
          background: (getTotal() / budget) * 100 >= 100 ? "#ef4444"
                    : (getTotal() / budget) * 100 >= 80  ? "linear-gradient(90deg, #f59e0b, #ef4444)"
                    : "linear-gradient(90deg, #4f8ef7, #a855f7)",
          transition: "width 0.6s ease"
        }} />
      </div>

      {/* Progress Labels */}
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#94a3b8" }}>
        <span>₹0</span>
        <span>₹{Math.round(budget * 0.5).toLocaleString()} (50%)</span>
        <span>₹{Number(budget).toLocaleString()} (100%)</span>
      </div>

      {/* Warning Messages */}
      <div style={{ marginTop: "16px" }}>
        {(getTotal() / budget) * 100 >= 100 && (
          <div style={{
            padding: "12px 16px", borderRadius: "10px",
            background: "#fef2f2", border: "1px solid #fecaca",
            color: "#991b1b", fontSize: "13px", fontWeight: "600",
            display: "flex", alignItems: "center", gap: "8px"
          }}>
            🚨 You have exceeded your budget by ₹{(getTotal() - budget).toLocaleString()}!
          </div>
        )}
        {(getTotal() / budget) * 100 >= 80 && (getTotal() / budget) * 100 < 100 && (
          <div style={{
            padding: "12px 16px", borderRadius: "10px",
            background: "#fffbeb", border: "1px solid #fde68a",
            color: "#92400e", fontSize: "13px", fontWeight: "600",
            display: "flex", alignItems: "center", gap: "8px"
          }}>
            ⚠️ Warning! You have used 80% of your budget. Slow down your spending.
          </div>
        )}
        {(getTotal() / budget) * 100 < 80 && (
          <div style={{
            padding: "12px 16px", borderRadius: "10px",
            background: "#f0fdf4", border: "1px solid #bbf7d0",
            color: "#166534", fontSize: "13px", fontWeight: "600",
            display: "flex", alignItems: "center", gap: "8px"
          }}>
            ✅ Great job! You are managing your budget well.
          </div>
        )}
      </div>
    </div>

    {/* SPENDING TIPS CARD */}
    <div style={{
      background: "linear-gradient(135deg, #0d1b4b, #2d0a6b)",
      borderRadius: "16px", padding: "24px",
      boxShadow: "0 2px 16px rgba(0,0,0,0.15)"
    }}>
      <h3 style={{ margin: "0 0 16px", fontSize: "15px", fontWeight: "700", color: "white" }}>
        💬 Smart Spending Tips
      </h3>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {[
          { icon: "📌", tip: "Track every expense — small ones add up fast." },
          { icon: "📅", tip: "Review your spending every week, not just month end." },
          { icon: "🎯", tip: "Keep your daily spending under ₹" + Math.round(budget / 30).toLocaleString() + " to stay on track." },
          { icon: "💡", tip: predictMonthly() > budget
              ? `At this rate you'll overspend by ₹${(predictMonthly() - budget).toLocaleString()} this month.`
              : `You're on track to save ₹${(budget - predictMonthly()).toLocaleString()} this month!` },
        ].map(({ icon, tip }, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "flex-start", gap: "10px",
            padding: "10px 14px", borderRadius: "10px",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.1)"
          }}>
            <span style={{ fontSize: "16px", flexShrink: 0 }}>{icon}</span>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", lineHeight: "1.5" }}>{tip}</span>
          </div>
        ))}
      </div>
    </div>
  </>)}

            {/* CHARTS SECTION */}
           {activeSection === "charts" && (

 <div style={{ ...sectionStyle, maxWidth: "100%" }}>

    {/* PIE CHART */}
    {/* CHARTS ROW */}
 <div style={{ display: "flex", gap: "2px", flexWrap: "wrap" }}>

  {/* PIE CHART */}
  <div style={{
    flex: 1, minWidth: "20px",
    background: "#fff", borderRadius: "16px", padding: "24px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.06)"
  }}>
    <h3 style={{ margin: "0 0 20px", fontSize: "15px", fontWeight: "700", color: "#1a1a2e" }}>
      🥧 Category Breakdown
    </h3>
    <div style={{ width: "100%", height: "450px" }}>
      <ResponsiveContainer>
        <PieChart>
          <Pie data={getCategoryData()} dataKey="value" nameKey="name" outerRadius={130} label>
            {getCategoryData().map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </div>

  {/* LINE CHART */}
  <div style={{
    flex: 1, minWidth: "350px",
    background: "#fff", borderRadius: "16px", padding: "24px",
    boxShadow: "0 2px 16px rgba(0,0,0,0.07)", border: "1px solid rgba(0,0,0,0.06)"
  }}>
    <h3 style={{ margin: "0 0 20px", fontSize: "15px", fontWeight: "700", color: "#1a1a2e" }}>
      📈 Spending Trend by Category
    </h3>
    <div style={{ width: "100%", height: "450px" }}>
      <ResponsiveContainer>
        <LineChart data={getCategoryLineData()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="amount" stroke="#4f8ef7" strokeWidth={3} dot={{ fill: "#a855f7", r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div>
 </div></div>
 )}

            {/* ANOMALIES SECTION */}
            {activeSection === "anomalies" && (
              <>
                <h3>Unusual Transactions:</h3>
                {getAnomalies().length === 0 && <p>No anomalies detected.</p>}
                {getAnomalies().map((exp) => (
                  <p key={exp.id} style={{ color: "orange" }}>⚠️ ₹{exp.amount} - {exp.description}</p>
                ))}
              </>
            )}

          </div>
        </div>
        {/* END MAIN CONTENT */}

      </div>
      {/* END FLEX CONTAINER */}
    </>
  );
}

export default Dashboard;