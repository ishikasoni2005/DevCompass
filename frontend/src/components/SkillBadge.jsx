export default function SkillBadge({ skill }) {
  return (
    <span className="rounded-full border border-aurora-300/20 bg-aurora-400/10 px-3 py-1 text-xs font-medium text-aurora-100">
      {skill}
    </span>
  );
}

