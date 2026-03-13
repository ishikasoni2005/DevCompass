export default function SectionCard({ title, subtitle, action, children, className = "" }) {
  return (
    <section className={`surface rounded-3xl p-5 sm:p-6 ${className}`}>
      {(title || subtitle || action) && (
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {title ? <h2 className="font-display text-xl font-semibold text-white">{title}</h2> : null}
            {subtitle ? <p className="mt-1 text-sm text-slate-400">{subtitle}</p> : null}
          </div>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

