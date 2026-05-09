import { useEffect } from "react";

const API = "https://web-production-801ec.up.railway.app";

export default function Success() {
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const reportId = params.get("report_id");

  if (!reportId) return;

  fetch(`${API}/reports/${reportId}/mark-paid`, {
    method: "POST",
  })
    .then(() => {
      localStorage.setItem("kryos_paid", "true");
      localStorage.setItem("kryos_report_id", reportId);
    })
    .catch((err) => console.error("mark paid error:", err));
}, []);

  return (
    <div style={{ padding: 40, color: "white" }}>
      <h1>Payment Successful ✅</h1>
      <p>Your report is now unlocked.</p>

      <a
        href={`/app?report_id=${localStorage.getItem("kryos_report_id")}`}
       style={{ color: "lightblue" }}
>
  View Full Report →
</a>
    </div>
  );
}