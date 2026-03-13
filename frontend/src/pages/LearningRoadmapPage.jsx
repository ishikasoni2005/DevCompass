import { useState } from "react";

import Button from "../components/Button";
import MilestoneTimeline from "../components/MilestoneTimeline";
import SectionCard from "../components/SectionCard";
import SkillBadge from "../components/SkillBadge";
import { useAsyncData } from "../hooks/useAsyncData";
import { generateRoadmap, getUserRoadmaps } from "../services/roadmap";


export default function LearningRoadmapPage() {
  const { data, setData, loading } = useAsyncData(() => getUserRoadmaps(), []);
  const [form, setForm] = useState({
    career_goal: "Backend Engineer",
    current_skills: "Python, Django",
    experience_level: "intermediate",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const roadmap = await generateRoadmap({
        career_goal: form.career_goal,
        current_skills: form.current_skills.split(",").map((skill) => skill.trim()).filter(Boolean),
        experience_level: form.experience_level,
      });
      setData((current) => [roadmap, ...(current || [])]);
    } catch {
      setError("Unable to generate roadmap.");
    } finally {
      setSubmitting(false);
    }
  };

  const latestRoadmap = data?.[0];

  return (
    <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
      <SectionCard title="Generate a roadmap" subtitle="Tell DevCompass where you want to go next.">
        <form className="space-y-4" onSubmit={onSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Career goal</span>
            <input
              type="text"
              value={form.career_goal}
              onChange={(event) => setForm((current) => ({ ...current, career_goal: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Current skills</span>
            <textarea
              value={form.current_skills}
              onChange={(event) => setForm((current) => ({ ...current, current_skills: event.target.value }))}
              rows={4}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm text-slate-300">Experience level</span>
            <select
              value={form.experience_level}
              onChange={(event) => setForm((current) => ({ ...current, experience_level: event.target.value }))}
              className="w-full rounded-2xl border border-white/10 bg-slate-900/80 px-4 py-3 text-white outline-none transition focus:border-aurora-400"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </label>
          {error ? <p className="rounded-2xl border border-ember-400/20 bg-ember-500/10 px-4 py-3 text-sm text-ember-100">{error}</p> : null}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? "Generating..." : "Generate roadmap"}
          </Button>
        </form>
      </SectionCard>

      <SectionCard
        title={latestRoadmap ? latestRoadmap.goal : "Your roadmap"}
        subtitle={latestRoadmap ? latestRoadmap.summary : "Generate a roadmap to unlock milestones."}
        action={loading ? <span className="text-sm text-slate-400">Loading...</span> : null}
      >
        {latestRoadmap ? (
          <>
            <div className="mb-6 flex flex-wrap gap-2">
              {latestRoadmap.recommended_technologies.map((skill) => (
                <SkillBadge key={skill} skill={skill} />
              ))}
            </div>
            <MilestoneTimeline milestones={latestRoadmap.milestones} />
          </>
        ) : (
          <p className="text-sm text-slate-400">No roadmaps yet. Generate one from the form.</p>
        )}
      </SectionCard>
    </div>
  );
}

