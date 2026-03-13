import { useParams } from "react-router-dom";

import SectionCard from "../components/SectionCard";
import { useAsyncData } from "../hooks/useAsyncData";
import { getCourseDetail, getCourseProgress } from "../services/courses";
import { formatPercent } from "../utils/formatters";


export default function CoursePlayerPage() {
  const { courseId } = useParams();
  const courseQuery = useAsyncData(() => getCourseDetail(courseId), [courseId]);
  const progressQuery = useAsyncData(() => getCourseProgress(courseId), [courseId]);

  const firstLesson = courseQuery.data?.modules?.[0]?.lessons?.[0];

  if (courseQuery.loading) {
    return <p className="text-sm text-slate-400">Loading course player...</p>;
  }

  if (!courseQuery.data) {
    return <p className="text-sm text-ember-200">Course not found.</p>;
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.72fr_0.28fr]">
      <div className="space-y-6">
        <SectionCard title={courseQuery.data.title} subtitle={courseQuery.data.description}>
          <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-5">
            <p className="text-xs uppercase tracking-[0.3em] text-aurora-200">Current lesson</p>
            <h2 className="mt-3 font-display text-2xl text-white">{firstLesson?.title || "No lessons yet"}</h2>
            {firstLesson?.video_url ? (
              <div className="mt-5 aspect-video rounded-3xl border border-white/10 bg-slate-900/80 p-4">
                <iframe
                  title={firstLesson.title}
                  src={firstLesson.video_url}
                  className="h-full w-full rounded-2xl"
                  allowFullScreen
                />
              </div>
            ) : null}
            <article className="mt-5 whitespace-pre-wrap text-sm leading-7 text-slate-300">
              {firstLesson?.content || "Lesson content will appear here."}
            </article>
          </div>
        </SectionCard>

        {firstLesson?.quiz ? (
          <SectionCard title="Quiz" subtitle={`Passing score: ${firstLesson.quiz.passing_score}%`}>
            <div className="space-y-4">
              {firstLesson.quiz.questions.map((question, index) => (
                <div key={question.question || index} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-sm font-medium text-white">
                    {index + 1}. {question.question || question.prompt || "Question"}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        ) : null}

        {firstLesson?.coding_exercise ? (
          <SectionCard title={firstLesson.coding_exercise.title} subtitle="Coding exercise">
            <p className="text-sm text-slate-300">{firstLesson.coding_exercise.prompt}</p>
            {firstLesson.coding_exercise.starter_code ? (
              <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm text-slate-200">
                <code>{firstLesson.coding_exercise.starter_code}</code>
              </pre>
            ) : null}
          </SectionCard>
        ) : null}
      </div>

      <SectionCard
        title="Course outline"
        subtitle={progressQuery.data ? `${formatPercent(progressQuery.data.completion_percentage)} complete` : "Progress will appear here"}
      >
        <div className="space-y-4">
          {courseQuery.data.modules.map((module) => (
            <div key={module.id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-display text-lg text-white">{module.title}</p>
              <p className="mt-1 text-sm text-slate-400">{module.summary}</p>
              <div className="mt-4 space-y-2">
                {module.lessons.map((lesson) => (
                  <div key={lesson.id} className="rounded-2xl border border-white/10 px-3 py-2 text-sm text-slate-300">
                    {lesson.order}. {lesson.title}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}
