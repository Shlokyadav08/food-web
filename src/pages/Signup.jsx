import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import burgerImage from "../assets/pizza.png"; 

export default function Signup() {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    const role =
      ["shlok", "kunal"].includes(name.trim().toLowerCase()) ? "admin" : "user";

    setLoading(true);
    try {
      const res = await axios.post(
        `${API}/auth/signup`,
        {
          username: name,
          email: email,
          password: password,
          role: role
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.status === 201 || res.status === 200) {
        alert(res.data?.message || "Signup successful! Please log in.");
        navigate("/login");
      }
    } catch (err) {
      if (err.response) {
        alert(err.response.data?.detail || "Signup failed");
      } else if (err.request) {
        alert("No response from server. Please check your connection.");
      } else {
        alert("An error occurred: " + err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.authContainer}>
        {/* Left Side */}
        <div style={styles.authLeft}>
          <div style={styles.authForm}>
            <h2 style={styles.heading}>Sign Up</h2>
            <form onSubmit={handleSignup}>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Full Name"
                style={styles.input}
              />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="E-mail"
                style={styles.input}
              />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                style={styles.input}
              />

              <button type="submit" style={styles.authBtn} disabled={loading}>
                {loading ? "Please wait..." : "Sign Up"}
              </button>
            </form>

            <p style={styles.authAlt}>
              Already have an account?{" "}
              <Link to="/login" style={styles.textOrange}>
                Log in here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side */}
        <div style={styles.authRight}>
          <img
            src={burgerImage}
            alt="Burger Illustration"
            style={styles.authImage}
          />
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(135deg, #ff4d00, #ff8a3d)",
  },
  authContainer: {
    display: "flex",
    width: "90%",
    maxWidth: "900px",
    height: "550px",
    background: "#fff",
    borderRadius: "16px",
    overflow: "hidden",
    boxShadow: "-1px -1px 30px #fbc17b",
  },
  authRight: {
    flex: 1,
    background: "linear-gradient(135deg, #ff4d00, #ff8a3d)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    padding: "20px",
  },
  authImage: {
    maxWidth: "150%",
    marginRight: 60,
    height: "auto",
  },
  authLeft: {
    flex: 1,
    background: "#fdf8f3",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px",
  },
  authForm: {
    width: "100%",
    maxWidth: "320px",
  },
  heading: {
    textAlign: "center",
    fontSize: "26px",
    fontWeight: "600",
    color: "#ff4d00",
    marginBottom: "25px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "16px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    background: "#fff",
    fontSize: "14px",
    outline: "none",
    transition: "0.3s",
  },
  authBtn: {
    width: "100%",
    padding: "12px",
    background: "#ff4d00",
    color: "white",
    fontWeight: "bold",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background 0.3s ease",
  },
  authAlt: {
    textAlign: "center",
    fontSize: "13px",
    marginTop: "12px",
    color: "#555",
  },
  textOrange: {
    color: "#ff4d00",
    textDecoration: "none",
    fontWeight: "500",
  },
};
