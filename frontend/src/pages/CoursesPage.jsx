import CourseCard from "../components/CourseCard";
import SectionCard from "../components/SectionCard";
import { useAsyncData } from "../hooks/useAsyncData";
import { getCourses } from "../services/courses";


export default function CoursesPage() {
  const { data, loading, error } = useAsyncData(() => getCourses(), []);

  return (
    <SectionCard title="Course library" subtitle="Video lessons, markdown modules, quizzes, and coding exercises.">
      {loading ? <p className="text-sm text-slate-400">Loading courses...</p> : null}
      {error ? <p className="text-sm text-ember-200">{error}</p> : null}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(data || []).map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </SectionCard>
  );
}

