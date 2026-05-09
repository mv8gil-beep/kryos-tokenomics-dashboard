export default function JsonInput({ value, onChange }) {
  return (
    <div>
      <label className="section-label">Tokenomics JSON Input</label>
      <textarea
        className="json-textarea"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}