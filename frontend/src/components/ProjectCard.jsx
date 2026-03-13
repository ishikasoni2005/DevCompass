export default function ProjectCard({ project }) {
  return (
    <article className="surface rounded-3xl p-5">
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-display text-xl text-white">{project.title}</h3>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
          {project.difficulty}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-300">{project.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {(project.tech_stack || []).map((tech) => (
          <span key={tech} className="rounded-full bg-emerald-300/10 px-3 py-1 text-xs text-emerald-100">
            {tech}
          </span>
        ))}
      </div>
      <div className="mt-5 space-y-2">
        {(project.learning_outcomes || []).slice(0, 3).map((item) => (
          <p key={item} className="text-sm text-slate-400">
            {item}
          </p>
        ))}
      </div>
    </article>
  );
}

