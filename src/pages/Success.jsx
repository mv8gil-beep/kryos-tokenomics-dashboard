import { useEffect } from "react";

const API = "https://web-production-db56c2.up.railway.app";

export default function Success() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const reportId = params.get("report_id");

    if (!reportId) return;

    localStorage.setItem("kryos_paid", "true");
    localStorage.setItem("kryos_report_id", reportId);

    fetch(`${API}/reports/${reportId}/mark-paid`, {
      method: "POST",
    })
      .then(() => {
        const mode = localStorage.getItem("kryos_report_mode");

if (mode === "launch") {
  window.location.href = `/?mode=launch&paid=true&report_id=${reportId}`;
} else {
  window.location.href = `/app?report_id=${reportId}`;
}
      })
      .catch((err) => {
        console.error("mark paid error:", err);
      });
  }, []);

  return (
    <div style={{ padding: 40, color: "white" }}>
      <h1>Payment Successful ✅</h1>
      <p>Unlocking your Kryos report...</p>
    </div>
  );
}