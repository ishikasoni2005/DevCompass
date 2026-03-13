import { useMemo, useState } from "react";

import ProjectCard from "../components/ProjectCard";
import SectionCard from "../components/SectionCard";
import { useAsyncData } from "../hooks/useAsyncData";
import { getProjects } from "../services/projects";


export default function ProjectSuggestionsPage() {
  const [filter, setFilter] = useState("all");
  const { data, loading } = useAsyncData(() => getProjects(), []);

  const filteredProjects = useMemo(() => {
    if (!data) {
      return [];
    }
    if (filter === "all") {
      return data;
    }
    return data.filter((project) => project.difficulty === filter);
  }, [data, filter]);

  return (
    <SectionCard
      title="Smart project recommendations"
      subtitle="Use projects to close skill gaps and build interview-ready proof of work."
      action={
        <div className="flex gap-2">
          {["all", "beginner", "intermediate", "advanced"].map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setFilter(level)}
              className={`rounded-full px-4 py-2 text-sm capitalize transition ${
                filter === level
                  ? "bg-white text-slate-950"
                  : "border border-white/10 bg-white/5 text-slate-300"
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      }
    >
      {loading ? <p className="text-sm text-slate-400">Loading recommendations...</p> : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </SectionCard>
  );
}

