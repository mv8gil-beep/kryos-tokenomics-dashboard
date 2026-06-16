export default function FdvPage() {
  return (
    <div style={{ background: "#111827", minHeight: "100vh", color: "white" }}>
      <div style={{ padding: 24, maxWidth: 900, margin: "0 auto", lineHeight: 1.7 }}>
        <h1>What is FDV in Crypto?</h1>

        <p>
          FDV stands for <strong>Fully Diluted Valuation</strong>. It represents the total value
          of a token if all of its supply were unlocked and circulating.
        </p>

        <p>
          In simple terms, FDV helps investors understand how expensive a token might really be
          once all future tokens hit the market.
        </p>

        <h2>Why FDV Matters</h2>
        <p>
          Many token launches look attractive because the current market cap seems small. But if
          only a small percentage of the token supply is circulating, the true future valuation may
          be much higher.
        </p>

        <p>
          That creates a major risk: <strong>future dilution</strong>.
        </p>

        <h2>Simple Example</h2>
        <p>
          Imagine a token has:
        </p>

        <ul>
          <li>10 million tokens circulating today</li>
          <li>100 million total tokens eventually</li>
          <li>Current token price implies a $20 million current market cap</li>
        </ul>

        <p>
          If all 100 million tokens were unlocked, the implied FDV might be closer to $200 million.
        </p>

        <p>
          That gap between current market cap and fully diluted value is where a lot of launch risk
          hides.
        </p>

        <h2>High FDV vs Low FDV</h2>
        <p>
          A high FDV is not always bad, but it becomes dangerous when paired with:
        </p>

        <ul>
          <li>Low circulating supply</li>
          <li>Aggressive unlock schedules</li>
          <li>Weak liquidity</li>
          <li>Heavy insider allocations</li>
        </ul>

        <p>
          In those situations, the token can face ongoing sell pressure as more supply enters the market.
        </p>

        <h2>How Investors Use FDV</h2>
        <p>
          Smart investors do not just look at hype or current price. They compare:
        </p>

        <ul>
          <li>FDV</li>
          <li>Circulating supply ratio</li>
          <li>Unlock schedule</li>
          <li>Projected dilution over time</li>
        </ul>

        <p>
          This gives a better picture of whether a token launch is healthy or dangerous.
        </p>

        <h2>FDV Alone Is Not Enough</h2>
        <p>
          FDV is just one signal. A token can have a moderate FDV but still be risky if unlocks are too
          front-loaded. Likewise, a high FDV can sometimes be manageable if liquidity and vesting are strong.
        </p>

        <p>
          That is why FDV works best as part of a broader risk model.
        </p>

        <h2 style={{ marginTop: 40 }}>Related Guides</h2>

        <ul>
          <li>
            <a href="/tokenomics-analysis" style={{ color: "#93c5fd" }}>
              How to Analyze Tokenomics
            </a>
          </li>
          <li>
            <a href="/token-unlock-schedule" style={{ color: "#93c5fd" }}>
              Token Unlock Schedule Explained
            </a>
          </li>
          </ul>

        

        <h2>Want to Check a Token’s FDV Risk?</h2>

        <p>
          Kryos breaks down token launch risk using:
        </p>

        <ul>
          <li>FDV dilution analysis</li>
          <li>Circulating supply ratio</li>
          <li>Unlock pressure forecast</li>
          <li>Launch score and signal-by-signal breakdown</li>
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