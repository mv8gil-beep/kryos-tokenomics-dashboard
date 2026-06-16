export default function TokenomicsPage() {
  return (
    <div style={{ background: "#111827", minHeight: "100vh", color: "white" }}>
      <div style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
        <h1>How to Analyze Tokenomics Before Investing</h1>

        <p>
          Tokenomics is one of the most important factors when evaluating a crypto project.
          A token can have strong hype, a great team, and still fail because of poor token design.
        </p>

        <p>
          This guide breaks down the key metrics you should look at before investing in any token launch.
        </p>

        <h2>1. FDV vs Circulating Supply</h2>
        <p>
          FDV (Fully Diluted Valuation) represents the value of the token if all supply is unlocked.
        </p>

        <p>If a token has a very high FDV but low circulating supply, it often means:</p>

        <ul>
          <li>Large amounts of tokens are still locked</li>
          <li>Future dilution is likely</li>
          <li>Early investors may face sell pressure</li>
        </ul>

        <p>
          This is one of the most common reasons tokens drop after launch.
        </p>

        <h2>2. Token Unlock Schedule</h2>
        <p>
          Token unlocks determine when locked tokens enter circulation.
        </p>

        <p>The most important periods are:</p>

        <ul>
          <li><strong>M1 (Month 1)</strong> – Early sell pressure</li>
          <li><strong>M3 (Month 3)</strong> – Investor unlocks</li>
          <li><strong>M6+</strong> – Longer-term dilution</li>
        </ul>

        <p>
          If a large percentage unlocks early, the price often struggles to hold.
        </p>

        <h2>3. Circulating Ratio</h2>
        <p>
          This measures how much of the total supply is already available in the market.
        </p>

        <ul>
          <li>Higher circulating supply = more stable price</li>
          <li>Lower circulating supply = higher volatility</li>
        </ul>

        <h2>4. Unlock Pressure</h2>
        <p>
          Unlock pressure estimates how much sell pressure enters the market over time.
        </p>

        <p>
          High early unlock pressure often leads to price declines shortly after launch.
        </p>

        <h2>5. Liquidity Support</h2>
        <p>
          Strong liquidity helps absorb sell pressure and stabilize price.
        </p>

        <p>
          Low liquidity combined with high unlocks is a high-risk setup.
        </p>

        <hr style={{ margin: "40px 0", opacity: 0.2 }} />

        <h2>Want a Full Risk Breakdown?</h2>

        <p>
          Kryos analyzes token launches using a structured risk model, including:
        </p>

        <ul>
          <li>Launch score</li>
          <li>FDV dilution risk</li>
          <li>Unlock pressure forecast (M1–M12)</li>
          <li>Signal-by-signal breakdown</li>
        </ul>

        <h2 style={{ marginTop: 40 }}>Related Guides</h2>

        <ul>
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
          Run a Kryos Risk Report ($9.99)
        </a>
      </div>
    </div>
  );
}