import {
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  CartesianGrid,
} from "recharts";

import SectionCard from "../components/SectionCard";
import { useAsyncData } from "../hooks/useAsyncData";
import { getDashboard } from "../services/dashboard";


export default function AnalyticsDashboardPage() {
  const { data, loading, error } = useAsyncData(() => getDashboard(), []);

  if (loading) {
    return <p className="text-sm text-slate-400">Loading analytics...</p>;
  }

  if (error) {
    return <p className="text-sm text-ember-200">{error}</p>;
  }

  const radarData = Object.entries(data.coding_activity.topic_heatmap).map(([topic, score]) => ({
    topic: topic.replaceAll("_", " "),
    score,
  }));

  return (
    <div className="space-y-6">
      <SectionCard title="Analytics dashboard" subtitle="Skill progress, coding consistency, and roadmap signals.">
        <div className="grid gap-6 xl:grid-cols-2">
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.12)" />
                <PolarAngleAxis dataKey="topic" tick={{ fill: "#cbd5e1", fontSize: 12 }} />
                <Radar dataKey="score" stroke="#22d3ee" fill="#22d3ee" fillOpacity={0.35} />
                <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,0.12)" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data.progress}>
                <defs>
                  <linearGradient id="progressGradient" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="course" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip contentStyle={{ background: "#020617", border: "1px solid rgba(255,255,255,0.12)" }} />
                <Area type="monotone" dataKey="completion_percentage" stroke="#10b981" fill="url(#progressGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </SectionCard>

      <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <SectionCard title="Consistency score" subtitle="Derived from weekly coding activity and solved problems">
          <div className="rounded-[2rem] bg-gradient-to-br from-aurora-400/20 via-cyan-400/10 to-emerald-300/20 p-6">
            <p className="text-sm text-slate-300">Score</p>
            <p className="mt-2 font-display text-6xl text-white">{data.coding_activity.overview.consistency_score}</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-slate-300">
              Keep your weekly practice streak healthy and map each sprint to one project or one advanced DSA topic.
            </p>
          </div>
        </SectionCard>
        <SectionCard title="Interview focus suggestions" subtitle="Use these prompts to shape the next 2-3 weeks.">
          <div className="space-y-3">
            {data.coding_activity.recommendations.map((item) => (
              <p key={item} className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
                {item}
              </p>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}

