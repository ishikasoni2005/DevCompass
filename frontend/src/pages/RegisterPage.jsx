import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";


const experienceOptions = ["beginner", "intermediate", "advanced"];


export default function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    career_goal: "Backend Engineer",
    experience_level: "beginner",
    skills: "Python, Git, APIs",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      await register({
        ...form,
        skills: form.skills.split(",").map((skill) => skill.trim()).filter(Boolean),
      });
      navigate("/app/dashboard", { replace: true });
    } catch (caughtError) {
      const payload = caughtError?.response?.data;
      const message =
        typeof payload === "string"
          ? payload
          : Object.values(payload || {})
              .flat()
              .join(" ") || "Unable to create your account.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-7xl items-center px-4 py-10 sm:px-6">
      <section className="surface mx-auto w-full max-w-3xl rounded-[2rem] p-8 sm:p-10">
        <p className="font-display text-3xl text-white">Create your workspace</p>
        <p className="mt-2 max-w-2xl text-sm text-slate-400">
          Tell DevCompass where you want to go so we can generate roadmaps, projects, and interview prep around your goal.
        </p>
        <form className="mt-8 grid gap-5 md:grid-cols-2" onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Name</span>
            <input
              type="text"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
              required
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Email</span>
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
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
              required
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Experience level</span>
            <select
              value={form.experience_level}
              onChange={(event) => setForm((current) => ({ ...current, experience_level: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
            >
              {experienceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm text-slate-300">Career goal</span>
            <input
              type="text"
              value={form.career_goal}
              onChange={(event) => setForm((current) => ({ ...current, career_goal: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
              placeholder="Backend Engineer"
            />
          </label>
          <label className="block md:col-span-2">
            <span className="mb-2 block text-sm text-slate-300">Current skills</span>
            <input
              type="text"
              value={form.skills}
              onChange={(event) => setForm((current) => ({ ...current, skills: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
              placeholder="Python, Django, PostgreSQL"
            />
          </label>
          {error ? <p className="md:col-span-2 rounded-2xl border border-ember-400/20 bg-ember-500/10 px-4 py-3 text-sm text-ember-100">{error}</p> : null}
          <div className="md:col-span-2">
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </div>
        </form>
        <p className="mt-6 text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="text-aurora-200 underline decoration-transparent transition hover:decoration-aurora-200">
            Log in
          </Link>
        </p>
      </section>
    </div>
  );
}
