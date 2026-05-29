import { useState, useEffect } from "react";

export default function Landing() {
  const [isPaid, setIsPaid] = useState(false);
  const [token, setToken] = useState("");
  const [chain, setChain] = useState("solana");
  const [mode, setMode] = useState("lookup");
  const [launchResult, setLaunchResult] = useState(null);
  const [launchLoading, setLaunchLoading] = useState(false);
  const API = import.meta.env.VITE_API_URL;
  const isMobile = window.innerWidth < 768;

  const [launchForm, setLaunchForm] = useState({
    total_supply: "",
    circulating_supply: "",
    fdv: "",
    liquidity: "",
    tge_pct: "",
    volume_24h: "",
    avg_daily_volume: "",
  });

  useEffect(() => {
    const savedId = localStorage.getItem("kryos_report_id");
    if (!savedId) return;

    fetch(`https://web-production-db56c2.up.railway.app/reports/${savedId}`)
      .then((res) => res.json())
      .then((data) => setIsPaid(data.paid))
      .catch(console.error);
  }, []);

  const page = {
  minHeight: "100vh",
  background: "#111827",
  color: "white",
  fontFamily: "Inter, system-ui, Arial, sans-serif",
  overflowX: "hidden",
  width: "100%",
  maxWidth: "100vw",
};

  const wrap = {
  maxWidth: 1200,
  margin: "0 auto",
  padding: isMobile ? "16px" : "24px",
  width: "100%",
  overflowX: "hidden",
};

  const hero = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1.1fr 0.9fr",
    gap: 32,
    alignItems: "center",
    padding: "48px 0 64px",
  };

  const card = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 24,
    padding: 24,
  };

  const smallCard = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: 18,
    padding: 16,
  };

  const buttonPrimary = {
    display: "inline-block",
    background: "white",
    color: "#111827",
    padding: "14px 20px",
    borderRadius: 16,
    textDecoration: "none",
    fontWeight: 600,
    marginRight: isMobile ? 0 : 12,
  };

  const buttonSecondary = {
    display: "inline-block",
    border: "1px solid rgba(255,255,255,0.18)",
    color: "white",
    padding: "14px 20px",
    borderRadius: 16,
    textDecoration: "none",
    fontWeight: 600,
  };

  const muted = { color: "rgba(255,255,255,0.72)" };

  const barWrap = {
    width: "100%",
    height: 10,
    background: "rgba(255,255,255,0.10)",
    borderRadius: 999,
    overflow: "hidden",
  };

  const sections = [
    {
      title: "Launch Score",
      text: "Score token launches using a structured risk engine built for crypto investors.",
    },
    {
      title: "Risk Signals",
      text: "Break down dilution, circulating supply, TGE unlocks, liquidity support, and cliff risk.",
    },
    {
      title: "Unlock Pressure",
      text: "Visualize likely sell pressure across M1, M3, M6, and M12 before buying.",
    },
  ];
      async function analyzeLaunch() {
        setLaunchResult(null);
 if (!launchForm.total_supply?.trim()) {
  setLaunchResult(null);
  alert("Total Supply is required.");
  return;
}

if (!launchForm.circulating_supply?.trim()) {
  setLaunchResult(null);
  alert("Circulating Supply is required.");
  return;
}

if (!launchForm.fdv?.trim()) {
  setLaunchResult(null);
  alert("FDV is required.");
  return;
}

if (!launchForm.liquidity?.trim()) {
  setLaunchResult(null);
  alert("Liquidity is required.");
  return;
}

  setLaunchLoading(true);
  

  const payload = {
      total_supply: Number(launchForm.total_supply),
      circulating_supply: Number(launchForm.circulating_supply),
      fdv: Number(launchForm.fdv),
      liquidity: Number(launchForm.liquidity),
      tge_pct: Number(launchForm.tge_pct),
      volume_24h: Number(launchForm.volume_24h),
      avg_daily_volume: Number(launchForm.avg_daily_volume),
      unlock_schedules: [
        {
          category: "Team",
          allocation_pct: 20,
          tge_pct: 0,
          cliff_months: 6,
          duration_months: 24,
        },
      ],
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/analyze-launch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      setLaunchResult(data);

      localStorage.setItem(
        "kryos_launch_report",
        JSON.stringify({
          input: payload,
          result: data,
        })
      );
    } catch (err) {
      console.error(err);
      alert("Launch analysis failed");
    } finally {
      setLaunchLoading(false);
    }
    }

    return (
      <div style={page}>
        <div style={wrap}>
          <section style={hero}>
            <div>
              <div
                style={{
                  display: "flex",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                <button
                  onClick={() => setMode("lookup")}
                  style={{
                    padding: "12px 18px",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                    background:
                      mode === "lookup"
                        ? "#6C5CE7"
                        : "rgba(255,255,255,0.08)",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  Token Lookup
                </button>

                <button
                  onClick={() => setMode("launch")}
                  style={{
                    padding: "12px 18px",
                    borderRadius: 12,
                    border: "none",
                    cursor: "pointer",
                    background:
                      mode === "launch"
                        ? "#6C5CE7"
                        : "rgba(255,255,255,0.08)",
                    color: "white",
                    fontWeight: 600,
                  }}
                >
                  New Launch Analyzer
                </button>
              </div>

              <div style={{ color: "yellow", marginTop: 10 }}>
                Current mode: {mode}
              </div>

              <h1 style={{ fontSize: isMobile ? 38 : 58, lineHeight: 1.05, margin: "18px 0 20px" }}>
                Analyze token launch risk before you buy.
              </h1>

              <p
                  style={{
                  ...muted,
                  fontSize: isMobile ? 18 : 20,
                  lineHeight: 1.6,
                  maxWidth: isMobile ? "100%" : 680,
                  width: "100%",
                }}
              >
                Kryos helps crypto investors quantify launch risk using structured tokenomics
                signals, unlock pressure modeling, and transparent scoring.
              </p>

              <div style={{ marginTop: 28 }}>
                <a
                  href={
                    mode === "launch"
                      ? "/app?mode=launch"
                      : "/app"
                  }
                  style={buttonPrimary}
                >
                  Analyze Token 
                </a>
              </div>

              {mode === "lookup" && (
                <div style={{ marginTop: 20, width: "100%" }}>
                  <select
                    value={chain}
                    onChange={(e) => setChain(e.target.value)}
                    style={{
                    padding: "12px 16px",
                    borderRadius: 10,
                    marginRight: isMobile ? 0 : 10,
                    width: isMobile ? "100%" : "auto",
                    marginBottom: isMobile ? 10 : 0,
                    }} 

                  >
                    <option value="solana">Solana</option>
                    <option value="ethereum">Ethereum</option>
                    <option value="base">Base</option>
                    <option value="bsc">BNB Chain</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Enter token contract address"
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    style={{
                      padding: "12px 16px",
                      borderRadius: 10,
                      border: "1px solid #334155",
                      background: "#1f2937",
                      color: "white",
                      width: isMobile ? "100%" : 360,
                      marginRight: isMobile ? 0 : 10,
                    }}
                  />
                  <div style={{ marginTop: 12, marginBottom: 16 }}>
  <p
    style={{
      color: "#94a3b8",
      marginBottom: 8,
      fontSize: 14,
    }}
  >
    Try example tokens:
  </p>

  <div
  style={{
    display: "flex",
    gap: 10,
    flexWrap: "wrap",
    width: "100%",
    marginTop: 10,
  }}
>
    <button
      onClick={() => {
        setToken("0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48");
        setChain("ethereum");
      }}
      style={{
        padding: "8px 14px",
        borderRadius: 999,
        border: "1px solid #334155",
        background: "#0f172a",
        color: "white",
        cursor: "pointer",
      }}
    >
      USDC
    </button>

    <button
      onClick={() => {
        setToken("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2");
        setChain("ethereum");
      }}
      style={{
        padding: "8px 14px",
        borderRadius: 999,
        border: "1px solid #334155",
        background: "#0f172a",
        color: "white",
        cursor: "pointer",
      }}
    >
      WETH
    </button>
  </div>
</div>

                 

                  <button
                    onClick={async () => {
                      localStorage.setItem("kryos_token", token);
                      localStorage.setItem("kryos_chain", chain);

                      localStorage.removeItem("kryos_report_id");
                      localStorage.removeItem("kryos_paid");

                      const reportRes = await fetch(`${API}/reports/create`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          email: "",
                          token,
                          chain,
                        }),
                      });

  const reportData = await reportRes.json();

  localStorage.setItem("kryos_report_id", reportData.report_id);

  window.location.href = `/app?report_id=${reportData.report_id}`;
}}
                    style={{
                      padding: "12px 18px",
                      borderRadius: 10,
                      background: "#22c55e",
                      border: "none",
                      color: "white",
                      fontWeight: 600,
                      cursor: "pointer",
                    }}
                  >
                    Analyze Token
                  </button>
                </div>
              )}

              {mode === "launch" && (
                <div
                  style={{
                    marginTop: 20,
                    padding: 24,
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.05)",
                    color: "white",
                  }}
                >
                  <h3 style={{ fontSize: 24, marginBottom: 16 }}>
                    New Launch Analyzer
                  </h3>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                      gap: 12,
                      maxWidth: isMobile ? "100%" : 720,
                    }}
                  >
                    {[
                      ["total_supply", "Total Supply"],
                      ["circulating_supply", "Circulating Supply"],
                      ["fdv", "FDV"],
                      ["liquidity", "Liquidity"],
                      ["tge_pct", "TGE %"],
                      ["volume_24h", "24h Volume"],
                      ["avg_daily_volume", "Average Daily Volume"],
                    ].map(([key, label]) => (
                      <input
                        key={key}
                        type="number"
                        placeholder={label}
                        value={launchForm[key]}
                        onChange={(e) =>
                          setLaunchForm({
                            ...launchForm,
                            [key]: e.target.value === "" ? "" : e.target.value,
                          })
                        }
                        style={{
                          padding: "12px 16px",
                          borderRadius: 10,
                          border: "1px solid #334155",
                          background: "#1f2937",
                          color: "white",
                        }}
                      />
                    ))}
                  </div>

                  <button
  onClick={analyzeLaunch}
  disabled={
    launchLoading ||
    !String(launchForm.total_supply || "").trim() ||
    !String(launchForm.circulating_supply || "").trim() ||
    !String(launchForm.fdv || "").trim() ||
    !String(launchForm.liquidity || "").trim()
    
  }
  style={{
    marginTop: 18,
    padding: "14px 22px",
    borderRadius: 12,
    border: "none",
    background:
      launchLoading ||
      !String(launchForm.total_supply || "").trim() ||
      !String(launchForm.circulating_supply || "").trim() ||
      !String(launchForm.fdv || "").trim() ||
      !String(launchForm.liquidity || "").trim()
      
        ? "#64748b"
        : "#22c55e",
    color: "white",
    fontWeight: 700,
    cursor: "pointer",
  }}
>
  {launchLoading ? "Analyzing..." : "Analyze Launch"}
</button>

                  {launchResult && (
                    <div
                      style={{
                        marginTop: 24,
                        padding: 20,
                        borderRadius: 16,
                        background: "rgba(17,24,39,0.72)",
                        border: "1px solid rgba(255,255,255,0.12)",
                      }}
                    >
                      <h3 style={{ fontSize: 24, marginBottom: 10 }}>
                        Launch Score: {launchResult.score} / 100
                      </h3>

                      <p style={{ fontSize: 18 }}>
                        Risk Level: <strong>{launchResult.risk}</strong>
                      </p>

                      <p style={{ color: "rgba(255,255,255,0.72)" }}>
                        {launchResult.summary}
                      </p>
                        {launchResult.investor_summary && (
  <div style={{ marginTop: 16 }}>
    <strong>Investor Summary</strong>
    <p style={{ color: "rgba(255,255,255,0.82)", lineHeight: 1.7 }}>
      {launchResult.investor_summary}
    </p>
  </div>
)}

{launchResult.would_invest && (
  <div style={{ marginTop: 16 }}>
    <strong>Would I Invest?</strong>
    <p style={{ color: "#f59e0b", fontWeight: 600 }}>
      {launchResult.would_invest}
    </p>
  </div>
)}

{launchResult.strengths?.length > 0 && (
  <div style={{ marginTop: 16 }}>
    <strong>Strengths</strong>
    <ul>
      {launchResult.strengths.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
)}

{launchResult.weaknesses?.length > 0 && (
  <div style={{ marginTop: 16 }}>
    <strong>Weaknesses</strong>
    <ul>
      {launchResult.weaknesses.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
)}
                      


                      <div style={{ marginTop: 16 }}>
                        <strong>Metrics</strong>
                        <ul>
                          <li>Circulating %: {launchResult.metrics?.circulating_pct}</li>
                          <li>FDV / Liquidity Ratio: {launchResult.metrics?.fdv_liquidity_ratio}</li>
                          <li>TGE %: {launchResult.metrics?.tge_pct}</li>
                          <li>Liquidity: ${launchResult.metrics?.liquidity}</li>
                        </ul>
                      </div>

                      {launchResult.warnings?.length > 0 && (
                        <div style={{ marginTop: 16 }}>
                          <strong>Warnings</strong>
                          <ul>
                            {launchResult.warnings.map((warning, index) => (
                              <li key={index}>{warning}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {launchResult.recommendations?.length > 0 && (
                        <div style={{ marginTop: 16 }}>
                          <strong>Recommendations</strong>
                          <ul>
                            {launchResult.recommendations.map((rec, index) => (
                              <li key={index}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

             <div
                     style={{
                     display: "grid",
                     gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                     gap: 14,
                     maxWidth: isMobile ? "100%" : 560,
                     marginTop: 30,
                     width: "100%",
                     }}
             >
                <div style={smallCard}>
                  <div style={{ fontSize: 30, fontWeight: 700 }}>70</div>
                  <div style={{ ...muted, marginTop: 6 }}>Example launch score</div>
                </div>
                <div style={smallCard}>
                  <div style={{ fontSize: 30, fontWeight: 700 }}>6</div>
                  <div style={{ ...muted, marginTop: 6 }}>Core risk signals</div>
                </div>
                <div style={smallCard}>
                  <div style={{ fontSize: 30, fontWeight: 700 }}>M1–M12</div>
                  <div style={{ ...muted, marginTop: 6 }}>Pressure forecast</div>
                </div>
              </div>
            </div>

            <div style={card}>
              <div style={{ ...smallCard, background: "rgba(17,24,39,0.7)" }}>
                <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "start",
    flexWrap: "wrap",
    gap: 12,
  }}
>
                  <div>
                    <div style={{ fontSize: 24, fontWeight: 700 }}>Kryos (KRY)</div>
                    <div style={{ ...muted, fontSize: 14, marginTop: 4 }}>Ethereum · Public launch report</div>
                  </div>
                  <div
                    style={{
                      padding: "10px 14px",
                      borderRadius: 14,
                      background: "rgba(16,185,129,0.15)",
                      border: "1px solid rgba(16,185,129,0.25)",
                      color: "#a7f3d0",
                      fontSize: 14,
                      fontWeight: 600,
                    }}
                  >
                    Healthy Launch
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, marginTop: 20 }}>
                  <div style={smallCard}>
                    <div style={muted}>Launch Score</div>
                    <div style={{ fontSize: 34, fontWeight: 700, marginTop: 8 }}>70 / 100</div>
                  </div>
                  <div style={smallCard}>
                    <div style={muted}>Pressure Level</div>
                    <div style={{ fontSize: 34, fontWeight: 700, marginTop: 8 }}>Medium</div>
                  </div>
                </div>

                <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
                  {[
                    ["Circulating Ratio", "Healthy", "20% circulating gives a stronger float than ultra-low float launches."],
                    ["FDV Dilution", "Moderate Risk", "High FDV versus circulating supply can create future sell pressure."],
                    ["Unlock Pressure", "Medium", "Projected pressure peaks early, then tapers off through M12."],
                  ].map(([title, status, body]) => (
                    <div key={title} style={smallCard}>
                      <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <div style={{ fontWeight: 600 }}>{title}</div>
                        <div style={{ ...muted, fontSize: 14 }}>{status}</div>
                      </div>
                      <div style={{ ...muted, lineHeight: 1.6, marginTop: 8 }}>{body}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section id="features" style={{ padding: "24px 0 20px" }}>
            <h2 style={{ fontSize: 40, marginBottom: 10 }}>Built for investors making fast decisions.</h2>
            <p style={{ ...muted, fontSize: 18,maxWidth: isMobile ? "100%" : 720 }}>
              Kryos focuses on one question: is this token launch investable or dangerous?
            </p>

            <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)", gap: 18, marginTop: 28 }}>
              {sections.map((section) => (
                <div key={section.title} style={card}>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>{section.title}</div>
                  <div style={{ ...muted, marginTop: 12, lineHeight: 1.7 }}>{section.text}</div>
                </div>
              ))}
            </div> 
          </section>

          <section id="sample" style={{ padding: "28px 0" }}>
            <div style={card}>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 28 }}>
                <div>
                  <h2 style={{ fontSize: 40, marginBottom: 10 }}>Sample output</h2>
                  <p style={{ ...muted, fontSize: 18, lineHeight: 1.7 }}>
                    Investors do not need another dashboard. They need a decision framework.
                  </p>
                  <ul style={{ marginTop: 20, lineHeight: 2, color: "rgba(255,255,255,0.82)" }}>
                    <li>Launch Score with transparent signal weights</li>
                    <li>Explainable risk labels instead of vague sentiment</li>
                    <li>Unlock pressure forecast across M1, M3, M6, and M12</li>
                    <li>Signal-by-signal breakdown for due diligence</li>
                  </ul>
                </div>

                <div
                    style={{
                    ...smallCard,
                    background: "rgba(17,24,39,0.72)",
                    width: "100%",
                    maxWidth: "100%",
                    overflowX: "hidden",
                  }}
                >
                  <div style={{ ...muted, marginBottom: 16 }}>Unlock Pressure</div>
                  {[
                    ["M1", 65],
                    ["M3", 48],
                    ["M6", 32],
                    ["M12", 22],
                  ].map(([month, width]) => (
                    <div key={month} style={{ marginBottom: 16 }}>
                      <div
                     style={{
                     display: "flex",
                     justifyContent: "space-between",
                     marginBottom: 6,
                     gap: 8,
                     }}
                      >
                        <span>{month}</span>
                        <span>{width}</span>
                      </div>
                      <div style={barWrap}>
                        <div
                          style={{
                            width: `${width}%`,
                            height: "100%",
                            background: "#67e8f9",
                            borderRadius: 999,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section style={{ padding: "40px 0" }}>
            <div style={{ maxWidth: 900 }}>
              <h2 style={{ fontSize: 36, marginBottom: 20 }}>Simple pricing</h2>

              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 20 }}>
                <div
                  style={{
                    padding: 24,
                    borderRadius: 20,
                    border: "1px solid rgba(255,255,255,0.15)",
                    background: "rgba(255,255,255,0.05)",
                  }}
                >
                  <h3>Free</h3>
                  <p style={{ opacity: 0.7 }}>Basic preview</p>
                  <p style={{ fontSize: 28, marginTop: 10 }}>$0</p>
                </div>

                <div
                  style={{
                    padding: 24,
                    borderRadius: 20,
                    border: "1px solid rgba(255,255,255,0.25)",
                    background: "rgba(255,255,255,0.08)",
                  }}
                >
                  <h3>Pro Report</h3>
                  <p style={{ opacity: 0.7 }}>Full risk analysis</p>
                  <p style={{ fontSize: 28, marginTop: 10 }}>$29</p>
                </div>
              </div>
            </div>
          </section>

          <section style={{ padding: "28px 0" }}>
            <div style={{ maxWidth: 900 }}>
              <h2 style={{ fontSize: 36, marginBottom: 16 }}>Learn Token Launch Risk</h2>
              <p style={{ color: "rgba(255,255,255,0.72)", marginBottom: 20 }}>
                Understand dilution, unlock pressure, and tokenomics before you invest.
              </p>

              <ul style={{ lineHeight: 2 }}>
                <li>
                  <a href="/tokenomics-analysis" style={{ color: "#93c5fd" }}>
                    Check any crypto before you buy it.
                  </a>
                </li>
                <li>
                  <a href="/fdv-crypto" style={{ color: "#93c5fd" }}>
                    What is FDV in Crypto?
                  </a>
                </li>
                <li>
                  <a href="/token-unlock-schedule" style={{ color: "#93c5fd" }}>
                    Token Unlock Schedule Explained
                  </a>
                </li>
              </ul>
            </div>
          </section>

          <section id="cta" style={{ padding: "28px 0 60px" }}>
            <div
              style={{
                ...card,
                background: "linear-gradient(90deg, rgba(34,211,238,0.10), rgba(59,130,246,0.10))",
                border: "1px solid rgba(34,211,238,0.18)",
              }}
            >
              <h2 style={{ fontSize: 42, marginBottom: 12 }}>
                Use Kryos before you buy the launch.
              </h2>

              <p style={{ ...muted, fontSize: 18, lineHeight: 1.7, maxWidth: 760 }}>
                Start with a tokenomics risk report, then expand into a repeatable launch diligence workflow.
              </p>

              <div style={{ marginTop: 26 }}>
                <p style={{ marginBottom: 12, fontSize: 18, color: "rgba(255,255,255,0.82)" }}>
                  Paste any token details and generate a full Kryos risk report.
                </p>

                <a
                  href={isPaid ? `/app?report_id=${localStorage.getItem("kryos_report_id")}` : "/app"}
                  style={buttonPrimary}
                >
                  {isPaid ? "View Full Report" : "Unlock Full Risk Analysis – $29"}
                </a>

                {isPaid && (
                  <div style={{ marginTop: 12, color: "#22c55e", fontWeight: 600 }}>
                    Full report unlocked ✅
                  </div>
                )}

                <a href="#sample" style={buttonSecondary}>
                  See Example Report
                </a>

                <div style={{ marginTop: 12 }}>
                  <a href="/reports/example-token" style={{ color: "#93c5fd" }}>
                    View Example Risk Report
                  </a>
                </div>
              </div>
            </div>
          </section>
          <footer
  style={{
    marginTop: 50,
    padding: "28px 0",
    borderTop: "1px solid rgba(255,255,255,0.08)",
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 14,
  }}
>
  Questions or support? Contact kryosanalytics@gmail.com
</footer>
        </div>
      </div>
  );
} 

  

