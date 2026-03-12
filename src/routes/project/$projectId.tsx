import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Code2, ExternalLink, Sparkles, X } from "lucide-react";
import { getProjectById } from "../../data/projects";

export const Route = createFileRoute("/project/$projectId")({
  component: ProjectDetail,
});

function ProjectDetail() {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();
  const project = getProjectById(projectId);

  const handleClose = () => {
    navigate({ to: "/" });
  };

  if (!project) {
    return (
      <div className="min-h-screen px-6 py-20">
        <div className="glass-panel mx-auto max-w-xl rounded-3xl p-8 text-center">
          <h1 className="mb-3 text-4xl font-bold text-white">
            Project Not Found
          </h1>
          <Link
            to="/"
            className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/18"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const periodLabel =
    project.period.start === project.period.end
      ? project.period.start
      : `${project.period.start} ~ ${project.period.end}`;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none absolute -right-24 top-12 h-96 w-96 rounded-full bg-rose-300/16 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-teal-300/18 blur-3xl" />

      <div className="relative z-10 mx-auto min-h-screen w-full max-w-5xl px-5 pb-12 pt-8 md:px-8">
        <header className="flex justify-end">
          <button
            type="button"
            className="glass-panel mb-3 flex items-center justify-between rounded-full p-3 md:p-4 cursor-pointer"
            aria-label="Close"
            onClick={handleClose}
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <main
          style={{ viewTransitionName: `project-card-${project.id}` }}
          className="glass-panel rounded-4xl p-5 md:p-8"
        >
          {/* 상단 배지 */}
          <div className="mb-4 flex justify-between items-center gap-2">
            <div className="glass-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/92 uppercase">
              <Sparkles className="h-3.5 w-3.5" />
              {project.type === "side" ? "Side Project" : "Work"}
            </div>
            {/* 컬러 도트 */}
            <div
              style={{ viewTransitionName: `project-dot-${project.id}` }}
              className={`mb-5 h-4 w-4 rounded-full bg-linear-to-br ${project.color} shadow-[0_0_22px_rgba(255,255,255,0.34)]`}
            />
          </div>

          {/* 제목 + 역할 */}
          <div className="mb-7">
            <h1
              style={{ viewTransitionName: `project-title-${project.id}` }}
              className="text-4xl font-extrabold tracking-tight text-white md:text-6xl"
            >
              {project.title}
            </h1>
            <p className="mt-2 text-sm text-white/45">
              {project.role} | {periodLabel}
            </p>
          </div>

          {/* Overview */}
          <p className="mb-10 max-w-3xl text-base leading-relaxed text-white/78 md:text-lg">
            {project.overview}
          </p>

          {/* Key Contributions */}
          <div className="mb-8">
            <h2 className="mb-4 text-xs font-semibold tracking-[0.18em] text-white/45 uppercase">
              Key Contributions
            </h2>
            <ul className="space-y-3">
              {project.keyContributions.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 text-sm leading-relaxed text-white/78 md:text-base"
                >
                  <span className="mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-gray-300" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Takeaway */}
          <div
            className="mb-10 glass-chip rounded-2xl px-5 py-4"
            style={{
              background:
                "linear-gradient(135deg, #00000066 0%, #00000066 100%)",
            }}
          >
            <p className="text-sm leading-relaxed text-white/65 italic md:text-base">
              {project.takeaway}
            </p>
          </div>

          {/* 태그 */}
          <div className="mb-8 flex flex-wrap gap-2.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="glass-chip rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide text-white/92"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 링크 */}
          <div className="flex flex-wrap gap-3">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-2xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(0,0,0,0.24)] backdrop-blur-xl transition-all duration-300 hover:bg-white/18 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(0,0,0,0.32)]"
              >
                <ExternalLink className="h-4.5 w-4.5" />
                Live Demo
              </a>
            )}
            {project.links.code && (
              <a
                href={project.links.code}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-2xl bg-linear-to-r ${project.color} px-6 py-3 text-sm font-semibold text-white shadow-[0_4px_20px_rgba(0,0,0,0.32)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(0,0,0,0.4)]`}
              >
                <Code2 className="h-4.5 w-4.5" />
                View Code
              </a>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
