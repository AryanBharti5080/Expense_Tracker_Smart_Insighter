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
      const res = await axios.post("http://127.0.0.1:8000/register", {
        name,
        email: email.trim().toLowerCase(),
        password,
      });

      alert(res.data.message);
    } catch (err) {
      setError("Registration failed (email already exist)");
    }
  };  

  return (
  <>
    <Navbar />

    <div style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "90vh",
  backgroundColor: "#0C67A0"
}}>
  
    <div style={{
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
}}>
      <div style={{
         backgroundColor: "#FFFFFF",
        padding: "30px",
         border: "1px solid #cfc3d58b",
         borderRadius: "15px",
        width: "300px",
        textAlign: "center",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.77)"
      }}>

      <h2>Signup</h2>

      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
   style={{
  width: "100%",
  padding: "10px",
  marginBottom: "1px",
  borderRadius: "8px",
  border: "1px solid #ccc",

}}
      />
      <br /><br />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
         style={{
  width: "100%",
  padding: "10px",
  marginBottom: "1px",
  borderRadius: "8px",
  border: "1px solid #ccc",

}}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
         style={{
  width: "100%",
  padding: "10px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",

}}
      />
      <br /><br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <button
  onClick={handleRegister}
  style={{
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg, #0C67A0, #30146d)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
  }}
>
Signup</button>
    <p>
      Already have an account?{" "}
      <span onClick={() => navigate("/")} style={{ color: "blue", cursor: "pointer" }}>
        Login
      </span>
    </p>
    </div>
   </div>
  </div>
  </>
  );
}

export default Register;