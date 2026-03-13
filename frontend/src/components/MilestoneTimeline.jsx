export default function MilestoneTimeline({ milestones = [] }) {
  return (
    <div className="space-y-4">
      {milestones.map((milestone) => (
        <div key={milestone.id || milestone.order} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-r from-aurora-400 to-emerald-300 text-sm font-bold text-slate-950">
              {milestone.week_start}
            </div>
            <div className="mt-2 h-full w-px bg-white/10" />
          </div>
          <div className="surface mb-4 flex-1 rounded-3xl p-4">
            <div className="flex flex-wrap items-center gap-3">
              <h4 className="font-display text-lg text-white">{milestone.title}</h4>
              <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                Weeks {milestone.week_start}-{milestone.week_end}
              </span>
            </div>
            <p className="mt-2 text-sm text-slate-300">{milestone.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {(milestone.resources || []).map((resource) => (
                <span key={resource} className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
                  {resource}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

