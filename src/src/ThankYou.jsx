export default function ThankYou() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#111827",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Inter, system-ui, Arial, sans-serif",
        padding: 24,
      }}
    >
      <div style={{ maxWidth: 700, textAlign: "center" }}>
        <h1>Payment received ✅</h1>
        <p style={{ opacity: 0.8, marginTop: 12 }}>
          Send your token details and tokenomics to your email and your full Kryos
          risk report will be delivered within 24 hours.
        </p>
        <p style={{ marginTop: 20, opacity: 0.7 }}>
          Include:
          <br />• Token name
          <br />• Tokenomics or project link
          <br />• Any specific concerns you want analyzed
        </p>
        <a
          href="/"
          style={{
            display: "inline-block",
            marginTop: 28,
            background: "white",
            color: "#111827",
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
  );
}