import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";


export default function LoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form);
      navigate(location.state?.from?.pathname || "/app/dashboard", { replace: true });
    } catch (caughtError) {
      setError(caughtError?.response?.data?.detail || "Unable to sign in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6">
      <div className="grid w-full gap-8 lg:grid-cols-[1fr_460px]">
        <section className="hidden rounded-[2rem] border border-white/10 bg-white/[0.04] p-10 lg:block">
          <p className="text-sm uppercase tracking-[0.3em] text-aurora-200">Developer Career Navigator</p>
          <h1 className="mt-6 font-display text-5xl font-bold text-white">
            Step back into your roadmap, analytics, and project system.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
            Track course completion, monitor coding consistency, analyze resumes, and generate new growth plans whenever your target role changes.
          </p>
        </section>

        <section className="surface rounded-[2rem] p-8">
          <p className="font-display text-3xl text-white">Log in</p>
          <p className="mt-2 text-sm text-slate-400">Continue building your developer growth system.</p>
          <form className="mt-8 space-y-5" onSubmit={onSubmit}>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
                placeholder="you@example.com"
                required
              />
            </label>
            <label className="block">
              <span className="mb-2 block text-sm text-slate-300">Password</span>
              <input
                type="password"
                value={form.password}
                onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
                className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
                placeholder="Your password"
                required
              />
            </label>
            {error ? <p className="rounded-2xl border border-ember-400/20 bg-ember-500/10 px-4 py-3 text-sm text-ember-100">{error}</p> : null}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Log in"}
            </Button>
          </form>
          <p className="mt-6 text-sm text-slate-400">
            New here?{" "}
            <Link to="/register" className="text-aurora-200 underline decoration-transparent transition hover:decoration-aurora-200">
              Create an account
            </Link>
          </p>
        </section>
      </div>
    </div>
  );
}

