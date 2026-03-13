export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-aurora-400 via-cyan-400 to-emerald-300 text-slate-950 hover:brightness-110",
    secondary:
      "border border-white/10 bg-white/5 text-white hover:bg-white/10",
    danger:
      "border border-ember-400/30 bg-ember-500/10 text-ember-200 hover:bg-ember-500/20",
  };

  return (
    <button
      className={`rounded-2xl px-5 py-3 text-sm font-semibold transition ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

