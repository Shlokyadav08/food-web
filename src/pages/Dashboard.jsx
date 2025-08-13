import React from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { FiLogOut, FiShoppingCart, FiUsers, FiPieChart } from "react-icons/fi";

export default function Dashboard() {
  const name = localStorage.getItem("email") || "User";

  const data = [
    { name: "Mon", value: 1800 },
    { name: "Tue", value: 2400 },
    { name: "Wed", value: 2000 },
    { name: "Thu", value: 3200 },
    { name: "Fri", value: 2800 },
    { name: "Sat", value: 4200 },
    { name: "Sun", value: 3800 },
  ];

  // Colors
  const primaryColor = "#FF7E35";
  const darkColor = "#2E2E2E";

  // Styles
  const container = {
    display: "flex",
    height: "100vh",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    backgroundColor: "#f9fafb",
  };

  const sidebar = {
    width: "250px",
    backgroundColor: darkColor,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    padding: "20px 0",
  };

  const logo = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    padding: "0 20px",
  };

  const navItem = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    padding: "10px 20px",
    cursor: "pointer",
    borderRadius: "8px",
    transition: "background 0.3s",
  };

  const navItemHover = {
    backgroundColor: primaryColor,
  };

  const main = {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
  };

  const header = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const heading = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
  };

  const subText = {
    color: primaryColor,
    fontWeight: "500",
  };

  const addButton = {
    backgroundColor: primaryColor,
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    fontWeight: "500",
  };

  const cardsGrid = {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px",
    marginBottom: "20px",
  };

  const card = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  const cardTitle = {
    fontSize: "0.9rem",
    color: "#666",
  };

  const cardValue = {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#333",
    margin: "5px 0",
  };

  const growthTextGreen = {
    fontSize: "0.8rem",
    color: "green",
  };

  const growthTextRed = {
    fontSize: "0.8rem",
    color: "red",
  };

  const gridMain = {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "20px",
  };

  const section = {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
  };

  const sectionHeading = {
    fontWeight: "600",
    fontSize: "1rem",
    color: "#333",
    marginBottom: "5px",
  };

  const sectionSub = {
    fontSize: "0.8rem",
    color: "#999",
    marginBottom: "10px",
  };

  const listItem = {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    borderBottom: "1px solid #f0f0f0",
  };

  return (
    <div style={container}>
      {/* Sidebar */}
      <aside style={sidebar}>
        <div>
          <div style={logo}>FoodCRM</div>
          <div>
            <div style={navItem}>
              <FiPieChart /> Dashboard
            </div>
            <div style={navItem}>
              <FiShoppingCart /> Orders
            </div>
            <div style={navItem}>
              <FiUsers /> Customers
            </div>
          </div>
        </div>
        <div style={{ padding: "0 20px" }}>
          <button style={{ color: "red", background: "transparent", border: "none", display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main style={main}>
        {/* Header */}
        <div style={header}>
          <div>
            <h1 style={heading}>Food Orders Dashboard</h1>
            <p>
              Welcome, <span style={subText}>{name}</span>
            </p>
          </div>
          <button style={addButton}>Add Order</button>
        </div>

        {/* Stats Cards */}
        <div style={cardsGrid}>
          <div style={card}>
            <h2 style={cardTitle}>Total Orders</h2>
            <p style={cardValue}>1,245</p>
            <span style={growthTextGreen}>+5% from last week</span>
          </div>
          <div style={card}>
            <h2 style={cardTitle}>Revenue</h2>
            <p style={cardValue}>$18,230</p>
            <span style={growthTextGreen}>+3.2% from last week</span>
          </div>
          <div style={card}>
            <h2 style={cardTitle}>Expenses</h2>
            <p style={cardValue}>$4,120</p>
            <span style={growthTextRed}>-1.8% from last week</span>
          </div>
          <div style={card}>
            <h2 style={cardTitle}>Tax</h2>
            <p style={cardValue}>$1,210</p>
            <span style={growthTextGreen}>+2% from last week</span>
          </div>
        </div>

        {/* Chart + Best Selling */}
        <div style={gridMain}>
          {/* Chart */}
          <div style={section}>
            <h2 style={sectionHeading}>Revenue Overview</h2>
            <p style={sectionSub}>Last 7 days performance</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={data}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="value" fill={primaryColor} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Best Selling */}
          <div style={section}>
            <h2 style={sectionHeading}>Best Selling Items</h2>
            <ul style={{ marginTop: "10px" }}>
              <li style={listItem}>
                <span>Cheese Burger</span> <span style={{ color: "#777" }}>402 sold</span>
              </li>
              <li style={listItem}>
                <span>Pepperoni Pizza</span> <span style={{ color: "#777" }}>316 sold</span>
              </li>
              <li style={listItem}>
                <span>Pasta Alfredo</span> <span style={{ color: "#777" }}>280 sold</span>
              </li>
              <li style={listItem}>
                <span>Chocolate Cake</span> <span style={{ color: "#777" }}>274 sold</span>
              </li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
}
