import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const API = "https://web-production-db56c2.up.railway.app";

function formatMoney(value) {
  if (value >= 1_000_000_000) {
    return `$${(value / 1_000_000_000).toFixed(2)}B`;
  }

  if (value >= 1_000_000) {
    return `$${(value / 1_000_000).toFixed(2)}M`;
  }

  if (value >= 1_000) {
    return `$${(value / 1_000).toFixed(2)}K`;
  }

  return `$${Number(value || 0).toFixed(4)}`;
}

export default function App() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reportMode, setReportMode] = useState("token");
  const [analysisError, setAnalysisError] = useState("");
  const [savedLaunchReport, setSavedLaunchReport] = useState({
  input: {
    tge_pct: 0,
  },
  result: {
    score: 0,
    risk: "",
    summary: "",
    metrics: {
      circulating_pct: 0,
      fdv_liquidity_ratio: 0,
      tge_pct: 0,
      liquidity: 0,
    },
    warnings: [],
    recommendations: [],
  },
});

  const params = new URLSearchParams(window.location.search);
  const reportId =
  params.get("report_id") || localStorage.getItem("kryos_report_id");
  const [analysis, setAnalysis] = useState(null);
  const isMobile = window.innerWidth < 768;

  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");

  if (mode === "launch") {
    setReportMode("launch");

    const saved = localStorage.getItem("kryos_launch_report");

    if (saved) {
      setSavedLaunchReport(JSON.parse(saved));
    }

    setLoading(false);
    return;
  }

  if (!reportId) {
    setLoading(false);
    return;
  }

  // 1. Load report (paid + token)
  fetch(`${API}/reports/${reportId}`)
  .then((res) => res.json())
  .then((data) => {
   setReport(data);

console.log("REPORT DATA BEFORE ANALYSIS:", data);

return fetch(`${API}/analyze-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: data.token,
        chain: data.chain || "solana",
      }),
    });
  })
   .then((res) => res.json())
  .then((analysisData) => {
  console.log("ANALYSIS DATA:", analysisData);

  if (analysisData?.error) {
    setAnalysisError("Token not found. Try another token or chain.");
    setAnalysis(null);
    setLoading(false);
    return;
  }

  setAnalysisError("");
  setAnalysis(analysisData);
  setLoading(false);
})
    .catch((err) => {
      console.error(err);
      setLoading(false);
    });
}, [reportId]);



  const card = {
  background: "#1f2937",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 18,
  padding: 24,
  color: "white",
};
  const tag = {
  background: "#1e293b",
  padding: "8px 14px",
  borderRadius: 999,
  color: "#cbd5e1",
  fontSize: 14,
  border: "1px solid #334155",
};

  if (loading) {
    return <div style={{ padding: 40 }}>Loading report...</div>;
  }
  if (analysisError) {
  return (
    <div style={{ padding: 40, color: "white" }}>
      <h1>Token not found</h1>

      <p>{analysisError}</p>

      <a href="/" style={{ color: "#38bdf8" }}>
        Try another token
      </a>
    </div>
  );
}
  
  if (
  new URLSearchParams(window.location.search).get("mode") !== "launch" &&
  (!report || !report.paid)
) {
  return (
    <div style={{ padding: 40, color: "white" }}>
      <h1>Free Token Preview</h1>

<p style={{ color: "#cbd5e1", marginBottom: 28 }}>
  Analyze token launch risk before unlocking the full premium report.
</p>

<div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
    marginTop: 24,
    marginBottom: 30,
  }}
>
  <div style={card}>
    <h3>Risk Score</h3>
    <div style={{ fontSize: 48, fontWeight: 800 }}>
      {analysis?.score || "--"}
    </div>
  </div>

  <div style={card}>
    <h3>Risk Level</h3>
    <div style={{ fontSize: 36, fontWeight: 800 }}>
      {analysis?.risk || "--"}
    </div>
  </div>

  <div style={card}>
    <h3>Liquidity</h3>
    <div style={{ fontSize: 32, fontWeight: 800 }}>
      {formatMoney(analysis?.liquidity)}
    </div>
  </div>

  <div style={card}>
    <h3>24H Volume</h3>
    <div style={{ fontSize: 32, fontWeight: 800 }}>
      {formatMoney(analysis?.volume_24h)}
    </div>
  </div>
</div>

<p style={{ color: "#94a3b8", marginBottom: 20 }}>
  Unlock the full report for:
</p>

      <button
        style={{
          background: "#22c55e",
          color: "white",
          border: "none",
          padding: "14px 22px",
          borderRadius: 14,
          fontWeight: 700,
          fontSize: 18,
          cursor: "pointer",
          marginTop: 16,
        }}
        onClick={async () => {
          const reportRes = await fetch(`${API}/reports/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: "",
              token: localStorage.getItem("kryos_token") || "",
              chain: localStorage.getItem("kryos_chain") || "solana",
            }),
          });

        const reportData = await reportRes.json();
localStorage.setItem("kryos_report_id", reportData.report_id);

const STRIPE_MODE = import.meta.env.VITE_STRIPE_MODE;

if (STRIPE_MODE === "development") {
  localStorage.setItem("kryos_paid", "true");
  window.location.href = `/app?mode=${reportMode}`;
  return;
}

const checkoutRes = await fetch(`${API}/checkout`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    report_id: reportData.report_id,
    mode: reportMode,
  }),
});

const checkoutData = await checkoutRes.json();

if (checkoutData.url) {
  window.location.href = checkoutData.url;
}
        }}
      >
        Continue to Checkout — $9.99
      </button>
    </div>
  );
}
      
  
 if (
  new URLSearchParams(window.location.search).get("mode") === "launch" &&
  !savedLaunchReport
) {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        padding: 40,
        fontFamily: "Inter, system-ui, Arial, sans-serif",
      }}
    >
      <a href="/" style={{ color: "#93c5fd" }}>
        ← Back to Home
      </a>

      <h1>No saved launch report found</h1>

      <p>
        Please go back, run the New Launch Analyzer first,
        then open the full report.
      </p>
    </div>
  );
}

return (


<>
  {reportMode === "launch" && savedLaunchReport && (
  <div
    style={{
      padding: isMobile ? 20 : 32,
      borderRadius: 28,
      background:
        "linear-gradient(135deg, rgba(30,41,59,1) 0%, rgba(15,23,42,1) 100%)",
      border: "1px solid rgba(255,255,255,0.08)",
      marginBottom: 28,
      boxShadow: "0 10px 40px rgba(0,0,0,0.35)",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 24,
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <div>
        <div
          style={{
            fontSize: 14,
            letterSpacing: 1.2,
            textTransform: "uppercase",
            color: "#67e8f9",
            fontWeight: 700,
            marginBottom: 8,
          }}
        >
          Kryos Risk Engine v1
        </div>

        <h1
          style={{
            fontSize: isMobile ? 34 : 52,
            lineHeight: 1,
            margin: 0,
            fontWeight: 800,
            letterSpacing: -2,
          }}
        >
          Premium Launch Risk Report
        </h1>

        <p
          style={{
            color: "#94a3b8",
            marginTop: 16,
            fontSize: 18,
            maxWidth: 760,
            lineHeight: 1.7,
          }}
        >
          Institutional-style tokenomics analysis focused on dilution,
          liquidity stress, unlock pressure, and launch stability.
        </p>

        <button
          onClick={() => window.print()}
          style={{
            marginTop: 18,
            padding: "14px 22px",
            borderRadius: 12,
            border: "1px solid rgba(103,232,249,0.35)",
            background: "rgba(103,232,249,0.12)",
            color: "#67e8f9",
            fontWeight: 700,
            cursor: "pointer",
            width: isMobile ? "100%" : "auto",
            fontSize: 16,
          }}
        >
          Export PDF
        </button>
      </div>
      <div
  style={{
    minWidth: isMobile ? "100%" : 240,
    padding: 24,
    borderRadius: 24,
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    textAlign: "center",
  }}
>
  <div
    style={{
      fontSize: 14,
      textTransform: "uppercase",
      letterSpacing: 1,
      color: "#94a3b8",
      marginBottom: 10,
    }}
  >
    Launch Score
  </div>

  <div
    style={{
      fontSize: 64,
      fontWeight: 800,
      lineHeight: 1,
      color:
        savedLaunchReport.result.score >= 75
          ? "#22c55e"
          : savedLaunchReport.result.score >= 50
          ? "#facc15"
          : "#ef4444",
    }}
  >
    {savedLaunchReport.result.score}
  </div>

  <div
    style={{
      marginTop: 12,
      fontSize: 18,
      fontWeight: 700,
      color:
        savedLaunchReport.result.score >= 75
          ? "#22c55e"
          : savedLaunchReport.result.score >= 50
          ? "#facc15"
          : "#ef4444",
    }}
  >
    {savedLaunchReport.result.score >= 75
      ? "Low Risk"
      : savedLaunchReport.result.score >= 50
      ? "Moderate Risk"
      : "High Risk"}
  </div>

  <div
    style={{
      marginTop: 16,
      fontSize: 13,
      color: "#94a3b8",
      lineHeight: 1.6,
    }}
  >
    Generated from liquidity depth, dilution pressure,
    unlock schedules, and launch stability signals.
  </div>
</div>

      <div
        style={{
          padding: "14px 18px",
          borderRadius: 18,
          background:
            savedLaunchReport.result.score >= 75
              ? "rgba(34,197,94,0.15)"
              : savedLaunchReport.result.score >= 50
              ? "rgba(250,204,21,0.15)"
              : "rgba(239,68,68,0.15)",
        }}
      >
        <div
          style={{
            fontSize: 14,
            color: "#cbd5e1",
            marginBottom: 6,
          }}
        >
          Overall Risk
        </div>

        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            color:
              savedLaunchReport.result.score >= 75
                ? "#22c55e"
                : savedLaunchReport.result.score >= 50
                ? "#facc15"
                : "#ef4444",
          }}
        >
          {savedLaunchReport.result.risk}
        </div>
      </div>
    </div>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile
          ? "1fr"
          : "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 18,
        marginTop: 30,
      }}
    >
      

      <div
    style={{
    ...card,
    background: "rgba(15,23,42,0.85)",
    border: "1px solid rgba(103,232,249,0.12)",
    boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
  }}
>
        <div style={{ color: "#94a3b8", marginBottom: 10 }}>
          TGE Unlock
        </div>

        <div
          style={{
            fontSize: isMobile ? 42 : 52,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          {savedLaunchReport.input.tge_pct}%
        </div>

        <div style={{ marginTop: 10, color: "#cbd5e1" }}>
          Initial circulating unlock
        </div>
      </div>

      <div
            style={{
            ...card,
            background: "rgba(15,23,42,0.85)",
            border: "1px solid rgba(103,232,249,0.12)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.22)",
          }}
      >
        <div style={{ color: "#94a3b8", marginBottom: 10 }}>
          FDV / Liquidity
        </div>

        <div
          style={{
            fontSize: isMobile ? 42 : 52,
            fontWeight: 800,
            letterSpacing: -1,
          }}
        >
          {savedLaunchReport.result.metrics.fdv_liquidity_ratio}
        </div>

        <div style={{ marginTop: 10, color: "#cbd5e1" }}>
          Liquidity stress ratio
        </div>
      </div>
    </div>
  </div>
)}
   

{reportMode === "launch" && savedLaunchReport && (
  <div style={{ display: "grid", gap: 18 }}>
   <div
  style={{
    ...card,
    border:
      savedLaunchReport.result.metrics.circulating_pct < 10
        ? "1px solid rgba(239,68,68,0.45)"
        : savedLaunchReport.result.metrics.circulating_pct < 20
        ? "1px solid rgba(250,204,21,0.45)"
        : "1px solid rgba(34,197,94,0.45)",
    background:
       savedLaunchReport.result.metrics.circulating_pct < 10
        ? "#3b0a0a"
        : savedLaunchReport.result.metrics.circulating_pct < 20
        ? "#3b2a0a"
        : "#0f3b24",
  }}
>
  <h3>Dilution Analysis</h3>
  <p>
    Circulating supply is{" "}
    {savedLaunchReport.result.metrics.circulating_pct}% of total supply.
    Lower float can create higher volatility and larger future dilution risk.
  </p>
</div>

   <div
  style={{
    ...card,
    border:
      savedLaunchReport.result.metrics.fdv_liquidity_ratio > 40
        ? "1px solid rgba(239,68,68,0.45)"
        : savedLaunchReport.result.metrics.fdv_liquidity_ratio > 20
        ? "1px solid rgba(250,204,21,0.45)"
        : "1px solid rgba(34,197,94,0.45)",

    background:
      savedLaunchReport.result.metrics.fdv_liquidity_ratio > 40
        ? "#3b0a0a"
    : savedLaunchReport.result.metrics.fdv_liquidity_ratio > 20
        ? "#3b2a0a"
    :     "#0f3b24",
  }}
>
  <h3>Liquidity Stress</h3>

  <p>
    FDV / liquidity ratio is{" "}
    {savedLaunchReport.result.metrics.fdv_liquidity_ratio}. A higher ratio
    means the token may move sharply under moderate sell pressure.
  </p>
</div>

    <div style={card}>
  <h3>Unlock Timeline</h3>

  <p>
    {savedLaunchReport.input.tge_pct <= 15
      ? "Kryos detects a relatively controlled initial unlock structure with reduced immediate dilution exposure during early trading phases."
      : savedLaunchReport.input.tge_pct <= 30
      ? "Kryos detects moderate early unlock exposure which may increase short-term volatility during initial liquidity discovery."
      : "Kryos detects aggressive early unlock exposure which may create elevated sell pressure immediately following launch."}
  </p>

  <p
    style={{
      marginTop: 14,
      color: "#94a3b8",
      lineHeight: 1.7,
    }}
  >
    Estimated unlock behavior suggests the highest pressure period occurs during
    early circulation expansion before stabilizing over longer vesting periods.
  </p>
</div>

    <div
  style={{
    ...card,
    border:
      savedLaunchReport.result.score < 50
        ? "1px solid rgba(239,68,68,0.45)"
        : savedLaunchReport.result.score < 75
        ? "1px solid rgba(250,204,21,0.45)"
        : "1px solid rgba(34,197,94,0.45)",
      background:
      savedLaunchReport.result.metrics.fdv_liquidity_ratio > 40
        ? "#3b0a0a"
    : savedLaunchReport.result.metrics.fdv_liquidity_ratio > 20
        ? "#3b2a0a"
        : "#0f3b24",
  }}
>
  <h3>Projected Sell Pressure</h3>
      <p>
        Based on the entered liquidity, FDV, volume, and TGE, Kryos flags this as
        a {savedLaunchReport.result.risk} risk launch.
      </p>
    </div>

    <div
  style={{
    ...card,
    border:
      savedLaunchReport.result.score < 50
        ? "1px solid rgba(239,68,68,0.45)"
        : savedLaunchReport.result.score < 75
        ? "1px solid rgba(250,204,21,0.45)"
        : "1px solid rgba(34,197,94,0.45)",
    background:
      savedLaunchReport.result.score < 50
        ? "#3b0a0a"
        : savedLaunchReport.result.score < 75
        ? "#3b2a0a"
        : "#0f3b24",
  }}
>
  <h3>Launch Stability Index</h3>
      <p>
        Stability score: {savedLaunchReport.result.score} / 100.
      </p>
    </div>
    <div
  style={{
    ...card,
    background:
      "linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(30,41,59,1) 100%)",
    border: "1px solid rgba(103,232,249,0.18)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  }}
>
  <h3 style={{ marginTop: 0 }}>Signal Breakdown</h3>

  <div style={{ display: "grid", gap: 12 }}>
    {[
      ["Dilution Risk", `${savedLaunchReport.result.metrics.circulating_pct}% circulating`, savedLaunchReport.result.metrics.circulating_pct < 20 ? "Moderate / High" : "Healthy"],
      ["Liquidity Stress", `${savedLaunchReport.result.metrics.fdv_liquidity_ratio} FDV/Liquidity`, savedLaunchReport.result.metrics.fdv_liquidity_ratio > 20 ? "Elevated" : "Controlled"],
      ["TGE Unlock", `${savedLaunchReport.input.tge_pct}% at launch`, savedLaunchReport.input.tge_pct > 30 ? "Aggressive" : "Manageable"],
      ["Launch Stability", `${savedLaunchReport.result.score}/100 score`, savedLaunchReport.result.score >= 75 ? "Strong" : savedLaunchReport.result.score >= 50 ? "Moderate" : "Weak"],
    ].map(([signal, value, status]) => (
      <div
        key={signal}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr 1fr",
          gap: 12,
          padding: 14,
          borderRadius: 14,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <strong>{signal}</strong>
        <span style={{ color: "#cbd5e1" }}>{value}</span>
        <span style={{ color: "#67e8f9", fontWeight: 700 }}>{status}</span>
      </div>
    ))}
  </div>
</div>
<div
  style={{
    ...card,
    background:
      "linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(30,41,59,1) 100%)",
    border: "1px solid rgba(103,232,249,0.18)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  }}
>
  <div
    style={{
      color: "#67e8f9",
      fontSize: 13,
      letterSpacing: 1.1,
      textTransform: "uppercase",
      fontWeight: 700,
      marginBottom: 10,
    }}
  >
    Benchmark Comparison
  </div>

  <h3
    style={{
      marginTop: 0,
      marginBottom: 20,
      fontSize: 28,
    }}
  >
    Comparable Launch Analysis
  </h3>

  <div
    style={{
      overflowX: "auto",
    }}
  >
    <table
      style={{
        width: "100%",
        borderCollapse: "collapse",
        color: "white",
      }}
    >
      <thead>
        <tr
          style={{
            background: "rgba(255,255,255,0.05)",
          }}
        >
          <th style={{ padding: 14, textAlign: "left" }}>Metric</th>
          <th style={{ padding: 14, textAlign: "left" }}>This Launch</th>
          <th style={{ padding: 14, textAlign: "left" }}>
            Typical Mid-Cap
          </th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td style={{ padding: 14 }}>TGE Unlock</td>
          <td style={{ padding: 14 }}>
            {savedLaunchReport.input.tge_pct}%
          </td>
          <td style={{ padding: 14, color: "#94a3b8" }}>32%</td>
        </tr>

        <tr>
          <td style={{ padding: 14 }}>FDV / Liquidity</td>
          <td style={{ padding: 14 }}>
            {savedLaunchReport.result.metrics.fdv_liquidity_ratio}
          </td>
          <td style={{ padding: 14, color: "#94a3b8" }}>28</td>
        </tr>

        <tr>
          <td style={{ padding: 14 }}>Launch Stability</td>
          <td style={{ padding: 14 }}>
            {savedLaunchReport.result.score}/100
          </td>
          <td style={{ padding: 14, color: "#94a3b8" }}>54/100</td>
        </tr>

        <tr>
          <td style={{ padding: 14 }}>Circulating Float</td>
          <td style={{ padding: 14 }}>
            {savedLaunchReport.result.metrics.circulating_pct}%
          </td>
          <td style={{ padding: 14, color: "#94a3b8" }}>18%</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div
    style={{
      marginTop: 24,
      padding: 18,
      borderRadius: 16,
      background: "rgba(103,232,249,0.08)",
      border: "1px solid rgba(103,232,249,0.18)",
      color: "#cbd5e1",
      lineHeight: 1.7,
    }}
  >
    Kryos estimates this launch structure ranks above average
    compared to typical speculative mid-cap token launches.
  </div>
</div>
  <div
  style={{
    ...card,
    background:
      "linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(30,41,59,1) 100%)",
    border: "1px solid rgba(255,255,255,0.08)",
    overflow: "hidden",
    position: "relative",
  }}
>
  <div
    style={{
      position: "absolute",
      inset: 0,
      backdropFilter: "blur(6px)",
      background: "rgba(15,23,42,0.45)",
      zIndex: 1,
    }}
  />

  <div style={{ position: "relative", zIndex: 2 }}>
    <div
      style={{
        color: "#67e8f9",
        fontSize: 13,
        letterSpacing: 1.1,
        textTransform: "uppercase",
        fontWeight: 700,
        marginBottom: 10,
      }}
    >
      Premium Institutional Modules
    </div>

    <h3
      style={{
        marginTop: 0,
        marginBottom: 20,
        fontSize: 28,
      }}
    >
      Advanced Launch Intelligence
    </h3>

    <div
      style={{
        display: "grid",
        gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
        gap: 16,
      }}
    >
      {[
        "Wallet Concentration Analysis",
        "Liquidity Stress Simulation",
        "Comparable Launch Benchmarks",
        "Smart Money Activity",
        "Vesting Heatmap",
        "Market Maker Stability",
      ].map((item) => (
        <div
          key={item}
          style={{
            padding: 18,
            borderRadius: 16,
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{item}</span>

          <span
            style={{
              padding: "6px 10px",
              borderRadius: 999,
              background: "rgba(103,232,249,0.12)",
              color: "#67e8f9",
              fontSize: 12,
              fontWeight: 700,
            }}
          >
            🔒 Locked
          </span>
        </div>
      ))}
    </div>

    <div
      style={{
        marginTop: 24,
        padding: 18,
        borderRadius: 16,
        background: "rgba(103,232,249,0.08)",
        border: "1px solid rgba(103,232,249,0.18)",
        color: "#cbd5e1",
        lineHeight: 1.7,
      }}
    >
      Unlock advanced institutional-grade launch diagnostics,
      benchmark modeling, and wallet intelligence with Kryos Premium.
    </div>
  </div>
</div>

    <div style={card}>
      <h3>Investor Risk Summary</h3>
      <div
  style={{
    ...card,
    background:
      "linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(30,41,59,1) 100%)",
    border: "1px solid rgba(103,232,249,0.18)",
    boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 18,
      flexWrap: "wrap",
      gap: 12,
    }}
  >
    <div>
      <div
        style={{
          color: "#67e8f9",
          fontSize: 13,
          letterSpacing: 1.1,
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        AI Executive Analysis
      </div>

     <h2
  style={{
    margin: 0,
    fontSize: 32,
    fontWeight: 800,
    letterSpacing: -0.5,
  }}
>
  Executive Summary
</h2>
    </div>

    <div
      style={{
        padding: "8px 14px",
        borderRadius: 999,
        background: "rgba(103,232,249,0.12)",
        color: "#67e8f9",
        fontWeight: 700,
        fontSize: 14,
      }}
    >
      Generated by Kryos AI
    </div>
  </div>

  <p
    style={{
      color: "#cbd5e1",
      lineHeight: 1.9,
      fontSize: 17,
    }}
  >
    {savedLaunchReport.result.score >= 75
      ? "This launch structure appears relatively healthy due to moderate TGE exposure, acceptable liquidity support, and manageable dilution pressure. The current tokenomics profile suggests lower short-term volatility risk compared to typical low-float launches. Investors should continue monitoring future unlock schedules and liquidity sustainability as market conditions evolve."
      : savedLaunchReport.result.score >= 50
      ? "This launch structure presents moderate risk. While liquidity conditions may support initial trading stability, dilution pressure and unlock exposure could create elevated volatility during future distribution phases. Investors should monitor token emission schedules closely."
      : "This launch structure presents elevated risk conditions driven by dilution pressure, weak liquidity support, and aggressive unlock exposure. The current tokenomics profile may lead to unstable trading conditions and higher downside volatility during post-launch distribution cycles."}
  </p>
</div>
<div
  style={{
    ...card,
    background:
      "linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(30,41,59,1) 100%)",
  }}
>
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 24,
      flexWrap: "wrap",
      gap: 12,
    }}
  >
    <div>
      <div
        style={{
          color: "#67e8f9",
          fontSize: 13,
          letterSpacing: 1.1,
          textTransform: "uppercase",
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        Unlock Pressure Model
      </div>

      <h3
        style={{
          margin: 0,
          fontSize: 28,
        }}
      >
        Projected Sell Pressure Timeline
      </h3>
    </div>

    <div
      style={{
        color: "#94a3b8",
        fontSize: 14,
      }}
    >
      Simulated launch pressure forecast
    </div>
  </div>

  {[
    { label: "M1", value: 72 },
    { label: "M3", value: 58 },
    { label: "M6", value: 39 },
    { label: "M12", value: 24 },
  ].map((item) => (
    <div
      key={item.label}
      style={{
        marginBottom: 22,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 8,
          color: "#cbd5e1",
          fontWeight: 600,
        }}
      >
        <span>{item.label}</span>
        <span>{item.value}</span>
      </div>

      <div
        style={{
          height: isMobile ? 10 : 14,
          borderRadius: 999,
          background: "rgba(255,255,255,0.08)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${item.value}%`,
            height: "100%",
            borderRadius: 999,
            background:
              item.value > 65
                ? "#ef4444"
                : item.value > 40
                ? "#facc15"
                : "#22c55e",
            transition: "width 0.4s ease",
          }}
        />
      </div>
    </div>
  ))}

  <p
    style={{
      marginTop: 12,
      color: "#94a3b8",
      lineHeight: 1.7,
    }}
  >
    Kryos estimates sell pressure decreases over time as early unlock volatility
    stabilizes and liquidity conditions mature.
  </p>
</div>
<div
  style={{
    ...card,
    background:
      "linear-gradient(135deg, rgba(15,23,42,1) 0%, rgba(30,41,59,1) 100%)",
    border: "1px solid rgba(103,232,249,0.18)",
  }}
>
  <h3 style={{ marginTop: 0 }}>Unlock Pressure Curve</h3>

  <p style={{ color: "#94a3b8", lineHeight: 1.7 }}>
    Projected sell pressure trend across the first 12 months after launch.
  </p>

  <div style={{ width: "100%", height: 260, marginTop: 20 }}>
    <ResponsiveContainer>
      <LineChart
        data={[
          { month: "M1", pressure: 72 },
          { month: "M3", pressure: 58 },
          { month: "M6", pressure: 39 },
          { month: "M12", pressure: 24 },
        ]}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
        <XAxis dataKey="month" stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="pressure"
          stroke="#67e8f9"
          strokeWidth={3}
          dot={{ r: 5 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>
      <p>
        {savedLaunchReport.result.summary}
      </p>

      {savedLaunchReport.result.warnings?.length > 0 && (
        <ul>
          {savedLaunchReport.result.warnings.map((warning, index) => (
            <li key={index}>{warning}</li>
          ))}
        </ul>
      )}
    </div>
  </div>
)}

{reportMode !== "launch" && (

   
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        fontFamily: "Inter, system-ui, Arial, sans-serif",
        padding: 40,
      }}
    >
      <a href="/" style={{ color: "#93c5fd" }}>← Back to Home</a>

      <h1
  style={{
    fontSize: 52,
    marginTop: 24,
    fontWeight: 800,
    letterSpacing: -1,
  }}
>
  {analysis?.base_name || "Token"} Risk Report
</h1>

<div
  style={{
    display: "flex",
    gap: 12,
    marginTop: 12,
    flexWrap: "wrap",
  }}
>
  <div style={tag}>
    {analysis?.base_symbol}
  </div>

  <div style={tag}>
    {analysis?.chain}
  </div>

  <div style={tag}>
    {analysis?.dex}
  </div>
</div>
      <p style={{ color: "#cbd5e1" }}>
        Paid report unlocked ✅ · Report ID: {reportId}
      </p>
  {analysis && (
    <div style={{ marginTop: 20 }}>
    <h2>Live Token Analysis</h2>

    <div>Score: {analysis.score} / 100</div>
    <div>Risk: {analysis.risk}</div>
    <div>Price: ${analysis.price}</div>
    <div>Liquidity: ${analysis.liquidity}</div>
    <div>24h Volume: ${analysis.volume_24h}</div>
    <div>FDV: ${analysis.fdv}</div>
  </div>
)}
  <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: 20,
    marginTop: 36,
  }}
>
  <div style={card}>
    <h3>Risk Score</h3>

    <div
      style={{
        fontSize: 56,
        fontWeight: 800,
        color:
          analysis?.score > 75
            ? "#22c55e"
            : analysis?.score > 50
            ? "#facc15"
            : "#ef4444",
      }}
    >
      {analysis?.score}
    </div>

    <p style={{ color: "#cbd5e1" }}>
      {analysis?.risk} Risk
    </p>
  </div>

  <div style={card}>
    <h3>Price</h3>

    <div style={{ fontSize: 38, fontWeight: 800 }}>
      {formatMoney(analysis?.price)}
    </div>

    <p style={{ color: "#cbd5e1" }}>
      Live DEX price
    </p>
  </div>

  <div style={card}>
    <h3>Liquidity</h3>

    <div style={{ fontSize: 38, fontWeight: 800 }}>
      {formatMoney(analysis?.liquidity)}
    </div>

    <p style={{ color: "#cbd5e1" }}>
      On-chain liquidity
    </p>
  </div>

  <div style={card}>
    <h3>24H Volume</h3>

    <div style={{ fontSize: 38, fontWeight: 800 }}>
      {formatMoney(analysis?.volume_24h)}
    </div>

    <p style={{ color: "#cbd5e1" }}>
      Trading activity
    </p>
  </div>
</div>

      <div style={{ ...card, marginTop: 28 }}>
        <h2>Risk Breakdown</h2>
        <ul style={{ lineHeight: 2 }}>
          <li><strong>Circulating Ratio:</strong> 20% circulating gives a healthier float than ultra-low float launches.</li>
          <li><strong>FDV Dilution:</strong> High FDV compared to circulating supply may create future sell pressure.</li>
          <li><strong>Unlock Pressure:</strong> Early unlocks may create volatility during months 1–3.</li>
          <li><strong>Signal Quality:</strong> Risk is explainable and based on visible tokenomics signals.</li>
        </ul>
      </div>

      <div style={{ ...card, marginTop: 28 }}>
        <h2>Unlock Pressure Forecast</h2>

        {[
          ["M1", 65],
          ["M3", 48],
          ["M6", 32],
          ["M12", 22],
        ].map(([label, value]) => (
          <div key={label} style={{ marginBottom: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <strong>{label}</strong>
              <span>{value}</span>
            </div>
            <div style={{ height: 10, background: "#334155", borderRadius: 10 }}>
              <div
                style={{
                  width: `${value}%`,
                  height: 10,
                  background: "#67e8f9",
                  borderRadius: 10,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div style={{ ...card, marginTop: 28 }}>
        <h2>Plain-English Summary</h2>
        <p style={{ color: "#cbd5e1", lineHeight: 1.8 }}>
          This token launch has a moderate risk profile. The strongest concern is future dilution and early unlock pressure.
          The launch is not automatically dangerous, but investors should monitor unlock timing, circulating supply changes,
          and FDV compared to real market demand.
             </p>
       </div>
       <div
  style={{
    marginTop: 40,
    paddingTop: 20,
    borderTop: "1px solid rgba(255,255,255,0.08)",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 14,
  }}
>
  Questions or support? Contact support@kryos.io
     </div>
    </div>
)}
</>
);
} 