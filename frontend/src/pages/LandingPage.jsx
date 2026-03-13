import { Link } from "react-router-dom";

import Button from "../components/Button";


const features = [
  "AI-generated learning roadmaps tuned to your goal and current stack.",
  "Resume analysis with skill extraction and missing-skill recommendations.",
  "Project suggestions, course tracking, DSA analytics, and interview readiness.",
];


export default function LandingPage() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 section-grid opacity-40" />
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-8 sm:px-6">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-aurora-400 to-emerald-300 font-display text-lg font-bold text-slate-950">
              DC
            </div>
            <div>
              <p className="font-display text-xl text-white">DevCompass</p>
              <p className="text-sm text-slate-400">AI Powered Developer Career Navigator</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/login" className="rounded-2xl border border-white/10 px-4 py-3 text-sm text-white transition hover:bg-white/5">
              Log in
            </Link>
            <Link to="/register">
              <Button>Create account</Button>
            </Link>
          </div>
        </header>

        <main className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-[1.2fr_0.8fr]">
          <section>
            <div className="inline-flex rounded-full border border-aurora-300/20 bg-aurora-400/10 px-4 py-2 text-sm text-aurora-100">
              Personalized guidance for backend, full-stack, ML, and DevOps paths
            </div>
            <h1 className="mt-8 max-w-4xl font-display text-5xl font-bold leading-tight text-white sm:text-6xl">
              Find the fastest path from your current skills to your next developer role.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              DevCompass blends roadmap generation, resume intelligence, coding analytics, and structured courses into one focused career growth platform.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to="/register">
                <Button className="min-w-44">Start navigating</Button>
              </Link>
              <Link to="/login">
                <Button variant="secondary" className="min-w-44">
                  View workspace
                </Button>
              </Link>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="surface rounded-3xl p-5">
                <p className="font-display text-3xl text-white">8 weeks</p>
                <p className="mt-2 text-sm text-slate-400">Typical milestone-based learning sprint</p>
              </div>
              <div className="surface rounded-3xl p-5">
                <p className="font-display text-3xl text-white">3 engines</p>
                <p className="mt-2 text-sm text-slate-400">Roadmap, resume NLP, and recommendation intelligence</p>
              </div>
              <div className="surface rounded-3xl p-5">
                <p className="font-display text-3xl text-white">1 dashboard</p>
                <p className="mt-2 text-sm text-slate-400">Track learning progress, project fit, and coding consistency</p>
              </div>
            </div>
          </section>

          <section className="surface rounded-[2rem] p-6 shadow-glow">
            <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/70 p-6">
              <p className="text-xs uppercase tracking-[0.3em] text-aurora-200">Inside DevCompass</p>
              <div className="mt-5 space-y-4">
                {features.map((feature) => (
                  <div key={feature} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                    <p className="text-sm leading-6 text-slate-200">{feature}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-3xl bg-gradient-to-br from-aurora-400/20 via-cyan-400/10 to-emerald-300/20 p-5">
                <p className="text-sm text-slate-300">Example AI roadmap</p>
                <p className="mt-3 font-display text-2xl text-white">Backend Engineer</p>
                <div className="mt-4 space-y-3 text-sm text-slate-200">
                  <p>Week 1-2: Python + Data Structures</p>
                  <p>Week 3-4: Django REST APIs</p>
                  <p>Week 5-6: PostgreSQL + ORM</p>
                  <p>Week 7-8: Deployment + Docker</p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

