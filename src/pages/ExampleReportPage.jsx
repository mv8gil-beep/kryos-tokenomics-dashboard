export default function ExampleReportPage() {
  return (
    <div style={{ background: "#111827", minHeight: "100vh", color: "white" }}>
      <div style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
        <h1>Token Risk Breakdown: Example Token (XYZ)</h1>

        <p>
          This is a sample Kryos token risk report showing how early-stage launches can be
          evaluated beyond hype and narrative.
        </p>

        <p>
          The focus is on structural risk: dilution, unlock pressure, and distribution.
        </p>

        <hr style={{ margin: "32px 0", opacity: 0.2 }} />

        <h2>Overview</h2>
        <p><strong>Project:</strong> Example Token (XYZ)</p>
        <p><strong>Chain:</strong> Ethereum</p>
        <p><strong>Category:</strong> General DeFi / Launch Analysis</p>

        <h2>Core Metrics</h2>
        <p><strong>FDV (Fully Diluted Valuation):</strong> $120M</p>
        <p><strong>Circulating Supply:</strong> 12%</p>
        <p><strong>Implied Market Cap:</strong> ~$14.4M</p>

        <p>
          <strong>Analysis:</strong> Low circulating supply relative to FDV suggests significant
          future dilution risk. A large portion of tokens are not yet in the market.
        </p>

        <h2>Unlock Schedule</h2>
        <p><strong>TGE Unlock:</strong> 18%</p>
        <p><strong>Month 1 (M1):</strong> 12%</p>
        <p><strong>Month 3 (M3):</strong> 15%</p>
        <p><strong>Month 6 (M6):</strong> 10%</p>

        <p>
          <strong>Analysis:</strong> Front-loaded unlocks in the first 3 months create early sell
          pressure risk. This is a common pattern in launches that struggle to maintain price stability.
        </p>

        <h2>Distribution</h2>
        <p><strong>Team + Investors Allocation:</strong> ~55%</p>
        <p><strong>Public / Liquidity:</strong> ~20%</p>
        <p><strong>Ecosystem / Treasury:</strong> ~25%</p>

        <p>
          <strong>Analysis:</strong> High insider allocation increases the probability of sell
          pressure during unlock periods, especially if early investors are in profit.
        </p>

        <h2>Liquidity</h2>
        <p><strong>Estimated Liquidity Depth:</strong> Moderate</p>

        <p>
          <strong>Analysis:</strong> Liquidity may not be sufficient to absorb early unlock-driven
          selling, increasing volatility risk.
        </p>

        <h2>Key Risk Signals</h2>
        <ul>
          <li>High FDV relative to circulating supply</li>
          <li>Early unlock concentration (M1–M3)</li>
          <li>Heavy insider allocation</li>
          <li>Moderate liquidity support</li>
        </ul>

        <h2>Overall Assessment</h2>
        <p><strong>Risk Level:</strong> Moderate → High</p>

        <p>
          This structure suggests potential for early volatility and downward pressure unless
          sustained demand or strong liquidity offsets unlock events.
        </p>

        <h2>How to Think About This</h2>
        <p>
          This type of setup is common in new token launches where initial hype drives early price
          action, but structural supply increases create pressure over time.
        </p>

        <p>
          Investors should be cautious around early unlock periods.
        </p>

        <h2>Kryos Insight</h2>
        <p>
          Most token losses don’t come from bad ideas — they come from poor token structure.
        </p>

        <p>
          Understanding dilution and unlock timing is critical before entering a position.
        </p>

        <hr style={{ margin: "40px 0", opacity: 0.2 }} />

        <h2>Related Guides</h2>
        <ul>
          <li>
            <a href="/tokenomics-analysis" style={{ color: "#93c5fd" }}>
              How to Analyze Tokenomics Before Investing
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

        <h2 style={{ marginTop: 40 }}>Want a Full Breakdown?</h2>
        <p>Kryos provides structured token risk reports including:</p>

        <ul>
          <li>Launch score</li>
          <li>FDV dilution analysis</li>
          <li>Unlock pressure modeling (M1–M12)</li>
          <li>Signal-by-signal breakdown</li>
        </ul>

        <a
          href="/app"
          style={{
            display: "inline-block",
            marginTop: 20,
            padding: "14px 20px",
            background: "white",
            color: "black",
            borderRadius: 12,
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Get a Full Kryos Risk Report ($9.99)
        </a>
      </div>
    </div>
  );
}