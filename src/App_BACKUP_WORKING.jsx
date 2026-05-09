import { useState, useEffect } from "react";

const API = "/v1";

export default function App() {
  const [token, setToken] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [totalSupply, setTotalSupply] = useState(0);
  const [tge, setTge] = useState(0);
  const [team, setTeam] = useState(0);
  const [months, setMonths] = useState(12);
  const [reportId, setReportId] = useState(null);
  const [isPaid, setIsPaid] = useState(false);

  const inputStyle = {
  padding: 12,
  width: 320,
  marginTop: 12,
  borderRadius: 10,
  border: "1px solid rgba(255,255,255,0.25)",
  background: "white",
  color: "#111827",
  fontSize: 16,
  outline: "none",
  display: "block",
};

  


  async function generatePreview() {
  const id = Date.now().toString();   // 👈 ADD THIS LINE
  setReportId(id); 
  setLoading(true);
  setError("");
  setShowPreview(false);

  try {
    const payload = {
  vesting: {
    total_supply: totalSupply || 100000000,
    months: months || 12,
    rules: [
      {
        category: "Public",
        allocation_pct: 20,
        tge_pct: tge || 10,
        duration_months: 6,
      },
      {
        category: "Team",
        allocation_pct: team || 20,
        tge_pct: 0,
        duration_months: months || 24,
      },
    ],
  },
};

    const res = await fetch(`${API}/compare_all`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": "put-a-long-random-string-here",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    const balanced = data?.data?.balanced;

    
      const unlock = balanced?.max_unlock_pct || 0;

let score = 100;

// TGE risk
if (tge > 40) score -= 35;
else if (tge > 25) score -= 25;
else if (tge > 15) score -= 15;
else if (tge > 8) score -= 8;

// Unlock pressure risk
if (unlock > 25) score -= 30;
else if (unlock > 15) score -= 20;
else if (unlock > 8) score -= 10;

// Team allocation risk
if (team > 35) score -= 20;
else if (team > 25) score -= 12;
else if (team > 15) score -= 6;

// Vesting duration risk
if (months < 6) score -= 25;
else if (months < 12) score -= 15;
else if (months < 18) score -= 8;

// Clamp score
score = Math.max(0, Math.min(100, Math.round(score)));

let risk = "Low";
if (score < 50) risk = "High";
else if (score < 75) risk = "Medium";

let topRisk = "Healthy Structure";

if (tge > 25) {
  topRisk = "High TGE Dump Risk";
} else if (unlock > 15) {
  topRisk = "Unlock Pressure";
} else if (team > 25) {
  topRisk = "High Team Allocation";
} else if (months < 12) {
  topRisk = "Short Vesting";
}


setPreview({
  score,
  risk,
  topRisk,
});

    setShowPreview(true);
  } catch (err) {
    setPreview({
      score: 42,
      risk: "Medium",
      topRisk: "Unlock Pressure",
    });

    setError("API failed — showing sample preview.");
    setShowPreview(true);
  } finally {
    setLoading(false);
  }
}

  return (
    <>
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        fontFamily: "Inter, system-ui, Arial, sans-serif",
        padding: 32,
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ fontSize: 42, marginBottom: 12 }}>Kryos App</h1>

        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 18, lineHeight: 1.6 }}>
          Generate a free preview, then unlock the full Kryos risk report.
        </p>

       <div style={{ marginTop: 20 }}>
  <h3>Tokenomics Input</h3>

  <input
    placeholder="Token Name"
    value={token}
    onChange={(e) => setToken(e.target.value)}
    style={inputStyle}
  />

  <input
    placeholder="Total Supply"
    onChange={(e) => setTotalSupply(Number(e.target.value))}
    style={inputStyle}
  />

  <input
    placeholder="TGE %"
    onChange={(e) => setTge(Number(e.target.value))}
    style={inputStyle}
  />

  <input
    placeholder="Team Allocation %"
    onChange={(e) => setTeam(Number(e.target.value))}
    style={inputStyle}
  />

  <input
    placeholder="Vesting Months"
    onChange={(e) => setMonths(Number(e.target.value))}
    style={inputStyle}
  />
</div>
           <button
  type="button"
  onClick={() => {
    console.log("BUTTON CLICKED");
    generatePreview();
  }}
  style={{
    padding: 12,
    cursor: "pointer",
    background: "white",
    color: "#111827",
    borderRadius: 10,
    border: "none",
    fontWeight: 600,
  }}
>
  {loading ? "Analyzing..." : "Generate Free Preview"}
</button>
          
        </div>

        {showPreview &&  (
  <div
    style={{
      marginTop: 30,
      padding: 20,
      borderRadius: 16,
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.12)",
    }}
  >
    <h3 style={{ marginTop: 0 }}>
      Preview for {token || "Token"}
    </h3>

    {error && (
      <p style={{ color: "#facc15" }}>
        {error}
      </p>
    )}

    <p>
      Unlock Pressure Score: <strong>{preview.score} / 100</strong>
    </p>
    <p>
      Risk Level: <strong>{preview.risk}</strong>
    </p>
   <p>
  Top Risk: <strong>{preview.topRisk}</strong>
</p>

{isPaid ? (
  <div>
    ✅ Unlock pressure forecast
    <br />
    ✅ Full signal-by-signal breakdown
  </div>
) : (
  <div>
    🔒 Unlock pressure forecast
    <br />
    🔒 Full signal-by-signal breakdown
  </div>
)}
</div>
)}
        <div
          style={{
            marginTop: 28,
            padding: 24,
            borderRadius: 20,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
          }}
        >
          <h2 style={{ marginTop: 0 }}>Get a Full Report – $29</h2>

          <p style={{ color: "rgba(255,255,255,0.75)", lineHeight: 1.6 }}>
            Unlock the full Kryos risk report instantly after previewing the token.
          </p>

          <ul style={{ lineHeight: 1.9, color: "rgba(255,255,255,0.85)" }}>
            <li>Launch score preview ✅</li>
            <li>FDV dilution risk preview ✅</li>
            <li>🔒 Unlock pressure forecast</li>
            <li>🔒 Signal-by-signal breakdown</li>
          </ul>

          <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
  <button
    type="button"
    onClick={async () => {
      console.log("PAY CLICKED", reportId);
      
      const res = await fetch("https://excellent-reproductive-parent-everyone.trycloudflare.com/v1/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ report_id: reportId }),
      });

      const data = await res.json();
      window.location.href = data.url;
    }}
    style={{
      display: "inline-block",
      background: "white",
      color: "#111827",
      padding: "14px 20px",
      borderRadius: 16,
      border: "none",
      textDecoration: "none",
      fontWeight: 600,
      cursor: "pointer",
    }}
  >
    Get Full Risk Report – $29
  </button>

  <a
    href="/"
    style={{
      display: "inline-block",
      border: "1px solid rgba(255,255,255,0.18)",
      color: "white",
      padding: "14px 20px",
      borderRadius: 16,
      textDecoration: "none",
      fontWeight: 600,
    }}
  >
    Back to Home
  </a>
</div>
        </div>
      </div>   
      </>
  );
}