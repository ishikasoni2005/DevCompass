import { Link } from "react-router-dom";


export default function CourseCard({ course }) {
  return (
    <article className="surface rounded-3xl p-5 transition hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-aurora-200">{course.category}</p>
          <h3 className="mt-2 font-display text-2xl text-white">{course.title}</h3>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-300">
          {course.difficulty}
        </span>
      </div>
      <p className="mt-4 text-sm leading-6 text-slate-300">{course.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {(course.tags || []).slice(0, 4).map((tag) => (
          <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
            {tag}
          </span>
        ))}
      </div>
      <div className="mt-6 flex items-center justify-between text-sm text-slate-400">
        <span>{course.estimated_hours}h guided track</span>
        <Link
          to={`/app/courses/${course.id}`}
          className="rounded-full border border-white/10 px-4 py-2 text-white transition hover:bg-white/5"
        >
          Open course
        </Link>
      </div>
    </article>
  );
}
