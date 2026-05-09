export default function DashboardCard({ title, children }) {
  return (
    <section className="dashboard-card">
      <h2>{title}</h2>
      {children}
    </section>
  );
}