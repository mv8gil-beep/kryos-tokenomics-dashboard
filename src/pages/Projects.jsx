import { useEffect, useState } from "react";

const API = "/v1";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "Kryos",
    symbol: "KRY",
    chain: "Ethereum",
    total_supply: 20000000,
    fdv: 100000000,
    circulating_supply: 4000000,
    tge_unlock: 12,
  });

  async function loadProjects() {
    const res = await fetch(`${API}/v1/projects2`);
    const data = await res.json();
    setProjects(data);
  }

  async function createProject(e) {
    e.preventDefault();

    const res = await fetch(`${API}/v1/projects2`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    await res.json();
    await loadProjects();
  }

  async function generateReport(projectId) {
    alert("Premium report – $29. Payment required soon.");
    const res = await fetch(`${API}/v1/reports`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ project_id: projectId }),
    });

    const data = await res.json();

    if (data?.id) {
      window.location.href = `/report/${data.id}`;
    } else {
      alert("Failed to generate report");
    }
  }

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div style={{ padding: 24, color: "white" }}>
      <h1 style={{ fontSize: 28, marginBottom: 20 }}>Projects</h1>

      <form
        onSubmit={createProject}
        style={{
          display: "grid",
          gap: 12,
          maxWidth: 500,
          marginBottom: 32,
          background: "rgba(255,255,255,0.05)",
          padding: 20,
          borderRadius: 16,
        }}
      >
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Symbol"
          value={form.symbol}
          onChange={(e) => setForm({ ...form, symbol: e.target.value })}
        />
        <input
          placeholder="Chain"
          value={form.chain}
          onChange={(e) => setForm({ ...form, chain: e.target.value })}
        />
        <input
          type="number"
          placeholder="Total Supply"
          value={form.total_supply}
          onChange={(e) =>
            setForm({ ...form, total_supply: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="FDV"
          value={form.fdv}
          onChange={(e) => setForm({ ...form, fdv: Number(e.target.value) })}
        />
        <input
          type="number"
          placeholder="Circulating Supply"
          value={form.circulating_supply}
          onChange={(e) =>
            setForm({ ...form, circulating_supply: Number(e.target.value) })
          }
        />
        <input
          type="number"
          placeholder="TGE Unlock"
          value={form.tge_unlock}
          onChange={(e) =>
            setForm({ ...form, tge_unlock: Number(e.target.value) })
          }
        />

        <button type="submit">Save Project</button>
      </form>

      <div style={{ display: "grid", gap: 16 }}>
        {projects.map((project) => (
          <div
            key={project.id}
            style={{
              background: "rgba(255,255,255,0.05)",
              padding: 18,
              borderRadius: 16,
            }}
          >
            <h3 style={{ margin: 0 }}>
              {project.name} ({project.symbol})
            </h3>
            <p style={{ margin: "8px 0" }}>Chain: {project.chain}</p>
            <p style={{ margin: "8px 0" }}>
              Total Supply: {project.total_supply}
            </p>
            <p style={{ margin: "8px 0" }}>FDV: {project.fdv}</p>
            <p style={{ margin: "8px 0" }}>
              Circulating: {project.circulating_supply}
            </p>
            <p style={{ margin: "8px 0" }}>TGE Unlock: {project.tge_unlock}%</p>

            <button onClick={() => generateReport(project.id)}>
              Pay $29 → Generate Report
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}