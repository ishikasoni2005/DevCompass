import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import SectionCard from "../components/SectionCard";
import SkillBadge from "../components/SkillBadge";
import StatCard from "../components/StatCard";
import { useAsyncData } from "../hooks/useAsyncData";
import { getDashboard } from "../services/dashboard";
import { formatPercent } from "../utils/formatters";


export default function DashboardPage() {
  const { data, loading, error } = useAsyncData(() => getDashboard(), []);

  if (loading) {
    return <p className="px-2 py-10 text-sm text-slate-400">Loading dashboard...</p>;
  }

  if (error) {
    return <p className="rounded-3xl border border-ember-400/20 bg-ember-500/10 px-5 py-4 text-sm text-ember-100">{error}</p>;
  }

  return (
    <div className="space-y-6">
      <section className="surface section-grid overflow-hidden rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-aurora-200">Career command center</p>
            <h1 className="mt-4 font-display text-4xl font-bold text-white">
              {data.profile.career_goal || "Shape your next role"}
            </h1>
            <p className="mt-4 max-w-2xl text-slate-300">
              Track roadmap completion, coding activity, course progress, and skill momentum from one place.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-slate-950/70 px-5 py-4">
            <p className="text-sm text-slate-400">Experience level</p>
            <p className="mt-1 font-display text-2xl capitalize text-white">{data.profile.experience_level}</p>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Roadmaps created" value={data.overview.roadmaps_created} hint="Saved learning plans" />
        <StatCard label="Completed courses" value={data.overview.completed_courses} hint="Career-ready content shipped" />
        <StatCard label="Roadmap completion" value={formatPercent(data.overview.roadmap_completion)} hint="Average across tracked courses" />
        <StatCard label="Active skills" value={data.overview.active_skills} hint="Declared technical strengths" />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <SectionCard title="Coding activity" subtitle="Weekly problem-solving consistency">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.coding_activity.weekly_activity}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="week" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,0.12)" }} />
                <Line type="monotone" dataKey="problems" stroke="#22d3ee" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>

        <SectionCard title="Skill focus areas" subtitle="Topic heatmap from coding profiles">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={Object.entries(data.coding_activity.topic_heatmap).map(([topic, score]) => ({
                  topic: topic.replaceAll("_", " "),
                  score,
                }))}
              >
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="topic" stroke="#64748b" angle={-18} textAnchor="end" height={70} />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,0.12)" }} />
                <Bar dataKey="score" fill="#10b981" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
        <SectionCard title="Active skill stack" subtitle="What DevCompass is using to personalize guidance">
          <div className="flex flex-wrap gap-2">
            {(data.profile.skills || []).map((skill) => (
              <SkillBadge key={skill} skill={skill} />
            ))}
          </div>
          <div className="mt-6 space-y-3">
            {(data.coding_activity.recommendations || []).map((item) => (
              <p key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                {item}
              </p>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Recommended next moves" subtitle="Fresh opportunities based on your current momentum">
          <div className="grid gap-4 md:grid-cols-2">
            {(data.recommended_courses || []).map((course) => (
              <div key={course.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-aurora-200">{course.category}</p>
                <p className="mt-2 font-display text-lg text-white">{course.title}</p>
                <p className="mt-2 text-sm text-slate-400 capitalize">{course.difficulty}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
