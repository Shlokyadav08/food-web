import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const API = import.meta.env.VITE_API_URL;
  const adminEmail = localStorage.getItem("email");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`${API}/auth/all_users`, {
          headers: { "X-Admin-Email": adminEmail },
        });
        setUsers(res.data?.users || res.data || []);
      } catch (err) {
        console.error(err);
        alert("Unable to fetch users (make sure you are admin)");
      }
    };
    fetchUsers();
  }, [adminEmail, API]);

  const deleteUser = async (id) => {
    if (!window.confirm("Delete user?")) return;
    try {
      await axios.delete(`${API}/admin/users/${id}`, {
        headers: { "X-Admin-Email": adminEmail },
      });
      setUsers((u) => u.filter((x) => x.id !== id));
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin Dashboard</h2>
      <div style={styles.card}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Email</th>
              <th style={styles.th}>Role</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} style={styles.tr}>
                <td style={styles.td}>{u.id}</td>
                <td style={styles.td}>{u.name}</td>
                <td style={styles.td}>{u.email}</td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.roleBadge,
                      background:
                        u.role === "admin" ? "#ff4d4f" : "#1890ff",
                    }}
                  >
                    {u.role}
                  </span>
                </td>
                <td style={styles.td}>
                  <button
                    style={styles.deleteBtn}
                    onClick={() => deleteUser(u.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="5" style={styles.emptyMsg}>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "40px",
    fontFamily: "'Segoe UI', sans-serif",
    background: "#f4f6f8",
    minHeight: "100vh",
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "#333",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    textAlign: "left",
    padding: "12px",
    background: "#fafafa",
    borderBottom: "2px solid #eee",
    fontWeight: "600",
    fontSize: "14px",
    color: "#555",
  },
  td: {
    padding: "12px",
    borderBottom: "1px solid #f0f0f0",
    fontSize: "14px",
    color: "#333",
  },
  tr: {
    transition: "background 0.2s ease",
  },
  roleBadge: {
    padding: "4px 10px",
    borderRadius: "20px",
    color: "#fff",
    fontSize: "12px",
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  deleteBtn: {
    background:"#ff4d00",
    border: "none",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "6px",
    fontSize: "13px",
    cursor: "pointer",
    transition: "background 0.3s",
  },
  emptyMsg: {
    textAlign: "center",
    padding: "20px",
    color: "#888",
  },
};
