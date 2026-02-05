import { useEffect, useState } from "react";
import Header from "../components/Header";
import Table from "../components/Table";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/orders", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then(res => res.json())
      .then(setOrders);
  }, []);

  return (
    <>
      <Header title="Orders" subtitle="Manage orders" />

      <Table
        columns={[
          { key: "tracking_id", label: "Tracking ID" },
          { key: "shipment_status", label: "Status" },
          { key: "total", label: "Total" },
        ]}
        data={orders}
      />
    </>
  );
}
