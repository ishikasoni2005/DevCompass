export default function LoadingScreen({ message = "Loading..." }) {
  return (
    <div className="flex min-h-screen items-center justify-center px-6">
      <div className="surface rounded-3xl px-8 py-6 text-center">
        <div className="mx-auto mb-4 h-12 w-12 animate-pulse rounded-full bg-gradient-to-r from-aurora-400 to-emerald-300" />
        <p className="font-display text-xl">{message}</p>
        <p className="mt-2 text-sm text-slate-400">Preparing your DevCompass workspace.</p>
      </div>
    </div>
  );
}

