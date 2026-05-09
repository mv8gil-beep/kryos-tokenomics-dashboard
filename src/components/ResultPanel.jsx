export default function ResultPanel({ title, data }) {
  return (
    <div className="result-panel">
      <h3>{title}</h3>
      <pre>{data ? JSON.stringify(data, null, 2) : "No data yet"}</pre>
    </div>
  );
}