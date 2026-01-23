import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Code2, ExternalLink, X } from "lucide-react";
import { getProjectById } from "../../data/projects";

export const Route = createFileRoute("/project/$projectId")({
  component: ProjectDetail,
});

function ProjectDetail() {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();
  const project = getProjectById(projectId);

  const handleClose = () => {
    // Use View Transitions API if available
    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        sessionStorage.setItem("isNavigatingBack", "true");
        // navigate() returns a promise, so View Transition waits for render
        await navigate({ to: "/" });
      });
    } else {
      sessionStorage.setItem("isNavigatingBack", "true");
      navigate({ to: "/" });
    }
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">
            Project Not Found
          </h1>
          <Link
            to="/"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      <div
        style={{ viewTransitionName: `project-card-${project.id}` }}
        className={`min-h-screen bg-linear-to-br ${project.color} bg-opacity-10`}
      >
        {/* Gradient Background */}
        <div
          className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-10`}
        />

        {/* Content */}
        <div className="relative z-10 min-h-screen flex flex-col">
          {/* Header */}
          <header className="p-6 flex items-center justify-between">
            <button
              type="button"
              onClick={handleClose}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all duration-300 backdrop-blur-sm border border-white/20"
            >
              <X className="w-5 h-5" />
            </button>
          </header>

          {/* Main Content */}
          <main className="flex-1 px-6 pb-12 max-w-4xl mx-auto w-full">
            {/* Icon & Title */}
            <div className="mb-8">
              <div
                style={{ viewTransitionName: `project-icon-${project.id}` }}
                className={`inline-flex p-4 bg-linear-to-br ${project.color} rounded-2xl mb-6 text-white shadow-lg`}
              >
                {project.icon}
              </div>
              <h1
                style={{ viewTransitionName: `project-title-${project.id}` }}
                className="text-4xl md:text-6xl font-black text-white mb-4"
              >
                {project.title}
              </h1>
              <p className="text-xl text-white/70">
                {project.fullDescription || project.description}
              </p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-12">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm font-medium bg-white/10 text-white rounded-full border border-white/20 backdrop-blur-sm"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              {project.demoUrl && (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all duration-300 backdrop-blur-sm border border-white/20"
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
              )}
              {project.codeUrl && (
                <a
                  href={project.codeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-2 px-6 py-3 bg-linear-to-r ${project.color} text-white font-medium rounded-xl transition-all duration-300 shadow-lg`}
                >
                  <Code2 className="w-5 h-5" />
                  View Code
                </a>
              )}
              {!project.demoUrl && !project.codeUrl && (
                <div className="text-white/50 italic">
                  This is the site you're currently viewing!
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
