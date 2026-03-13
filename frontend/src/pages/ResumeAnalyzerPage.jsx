import { useState } from "react";

import Button from "../components/Button";
import SectionCard from "../components/SectionCard";
import SkillBadge from "../components/SkillBadge";
import { analyzeResume } from "../services/resume";


export default function ResumeAnalyzerPage() {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState("Backend Engineer");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      setError("Upload a resume PDF or text file first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await analyzeResume(file, targetRole);
      setResult(response);
    } catch {
      setError("Resume analysis failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
      <SectionCard title="Resume analyzer" subtitle="Upload a PDF and compare it against your target role.">
        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Target role</span>
            <input
              type="text"
              value={targetRole}
              onChange={(event) => setTargetRole(event.target.value)}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Resume file</span>
            <input
              type="file"
              accept=".pdf,.txt"
              onChange={(event) => setFile(event.target.files?.[0] || null)}
              className="w-full rounded-2xl border border-dashed border-white/15 bg-slate-900/80 px-4 py-6 text-sm text-slate-300"
            />
          </label>
          {error ? <p className="rounded-2xl border border-ember-400/20 bg-ember-500/10 px-4 py-3 text-sm text-ember-100">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Analyzing..." : "Analyze resume"}
          </Button>
        </form>
      </SectionCard>

      <SectionCard title="Analysis output" subtitle="Extracted skills, missing skills, and improvement areas.">
        {result ? (
          <div className="space-y-6">
            <div className="rounded-3xl bg-gradient-to-r from-aurora-400/20 to-emerald-300/20 p-5">
              <p className="text-sm text-slate-300">Resume score</p>
              <p className="mt-2 font-display text-5xl text-white">{result.score}</p>
            </div>
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-400">Extracted skills</p>
              <div className="flex flex-wrap gap-2">
                {result.extracted_skills.map((skill) => (
                  <SkillBadge key={skill} skill={skill} />
                ))}
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm uppercase tracking-[0.2em] text-slate-400">Missing skills</p>
              <div className="flex flex-wrap gap-2">
                {result.missing_skills.map((skill) => (
                  <span key={skill} className="rounded-full bg-ember-500/10 px-3 py-1 text-xs text-ember-100">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {result.suggested_improvements.map((item) => (
                <p key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                  {item}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-slate-400">Upload a resume to see analysis here.</p>
        )}
      </SectionCard>
    </div>
  );
}

