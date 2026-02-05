import Header from "../components/Header";

export default function Dashboard() {
  return (
    <>
      <Header title="Dashboard" subtitle="Admin overview" />

      <div className="admin-stats">
        <div className="stat-box">Products</div>
        <div className="stat-box">Orders</div>
        <div className="stat-box">Users</div>
        <div className="stat-box">Revenue</div>
      </div>
    </>
  );
}
