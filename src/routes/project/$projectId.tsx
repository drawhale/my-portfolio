import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Code2, ExternalLink, Sparkles, X } from "lucide-react";
import { getProjectById } from "../../data/projects";

export const Route = createFileRoute("/project/$projectId")({
  component: ProjectDetail,
});

function ProjectDetail() {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();
  const project = getProjectById(projectId);

  const handleClose = () => {
    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        sessionStorage.setItem("isNavigatingBack", "true");
        await navigate({ to: "/" });
      });
    } else {
      sessionStorage.setItem("isNavigatingBack", "true");
      navigate({ to: "/" });
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-slate-950 px-6 py-20">
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

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute -right-24 top-12 h-96 w-96 rounded-full bg-fuchsia-400/18 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-96 w-96 rounded-full bg-cyan-400/16 blur-3xl" />

      <div
        style={{ viewTransitionName: `project-card-${project.id}` }}
        className="relative z-10 mx-auto min-h-screen w-full max-w-5xl px-5 pb-12 pt-8 md:px-8"
      >
        <header className="glass-panel mb-6 flex items-center justify-between rounded-3xl p-4 md:p-5">
          <button
            type="button"
            onClick={handleClose}
            className="glass-chip inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white transition-all duration-300 hover:bg-white/20"
          >
            <ArrowLeft className="h-[18px] w-[18px]" />
            Back
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="glass-chip rounded-full p-2.5 text-white transition-all duration-300 hover:bg-white/20"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <main className="glass-panel rounded-4xl p-5 md:p-8">
          <div className="glass-chip mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.14em] text-white/92 uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Project Story
          </div>

          {project.image ? (
            <div
              style={{ viewTransitionName: `project-image-${project.id}` }}
              className="relative mb-7 h-64 overflow-hidden rounded-3xl md:h-92"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-full w-full object-cover"
              />
              <div
                className={`absolute inset-0 bg-linear-to-tr ${project.color} opacity-[0.22] mix-blend-screen`}
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/42 via-48% to-transparent" />
            </div>
          ) : (
            <div
              style={{ viewTransitionName: `project-dot-${project.id}` }}
              className={`mb-5 h-4 w-4 rounded-full bg-linear-to-br ${project.color} shadow-[0_0_22px_rgba(255,255,255,0.34)]`}
            />
          )}

          <div className="mb-7">
            <h1
              style={{ viewTransitionName: `project-title-${project.id}` }}
              className="text-4xl font-extrabold tracking-tight text-white md:text-6xl"
            >
              {project.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-white/78 md:text-xl">
              {project.fullDescription || project.description}
            </p>
          </div>

          <div className="mb-10 flex flex-wrap gap-2.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="glass-chip rounded-full px-3 py-1.5 text-xs font-semibold tracking-wide text-white/92"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-chip inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-white/20"
              >
                <ExternalLink className="h-[18px] w-[18px]" />
                Live Demo
              </a>
            )}
            {project.codeUrl && (
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 rounded-xl bg-linear-to-r ${project.color} px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_28px_rgba(0,0,0,0.28)] transition-transform duration-300 hover:translate-y-[-2px]`}
              >
                <Code2 className="h-[18px] w-[18px]" />
                View Code
              </a>
            )}
            {!project.demoUrl && !project.codeUrl && (
              <div className="glass-chip rounded-xl px-4 py-3 text-sm text-white/70">
                This is the site you're currently viewing.
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
