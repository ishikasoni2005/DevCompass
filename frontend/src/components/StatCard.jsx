export default function StatCard({ label, value, hint }) {
  return (
    <div className="surface rounded-3xl p-5">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-3 font-display text-3xl font-bold text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-500">{hint}</p>
    </div>
  );
}

