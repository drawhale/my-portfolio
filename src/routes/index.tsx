import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";
import { getSizeClasses, projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Check at render time (not in useEffect!) for View Transition snapshot
  const isNavigatingBackRef = useRef(
    typeof window !== "undefined" &&
      sessionStorage.getItem("isNavigatingBack") === "true",
  );

  const handleCardClick = (projectId: string) => {
    // Use View Transitions API if available
    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        // navigate() returns a promise, so View Transition waits for render
        await navigate({ to: "/project/$projectId", params: { projectId } });
      });
    } else {
      navigate({ to: "/project/$projectId", params: { projectId } });
    }
  };

  useEffect(() => {
    if (isNavigatingBackRef.current) {
      // Clean up flag - elements are already visible for View Transition
      sessionStorage.removeItem("isNavigatingBack");
      return;
    }

    // First visit: hide elements immediately, then animate
    gsap.set(".bento-card", { y: 60, opacity: 0 });
    gsap.set(".projects-header", { y: -30, opacity: 0 });

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      gsap.to(".bento-card", {
        duration: 0.8,
        y: 0,
        opacity: 1,
        stagger: 0.1,
        ease: "power3.out",
        clearProps: "transform,opacity", // 애니메이션 완료 후 인라인 스타일 제거
      });

      gsap.to(".projects-header", {
        duration: 1,
        y: 0,
        opacity: 1,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Projects Section - Full Screen */}
      <section
        ref={projectsRef}
        className="projects-section min-h-screen py-12 px-6 max-w-7xl mx-auto flex flex-col"
      >
        {/* Header */}
        <div className="projects-header text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tight">
            Featured{" "}
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
            Crafting beautiful digital experiences with modern web technologies
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[320px] gap-4 flex-1">
          {projects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleCardClick(project.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCardClick(project.id);
                }
              }}
              role="button"
              tabIndex={0}
              style={{ viewTransitionName: `project-card-${project.id}` }}
              className={`bento-card group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-black/20 overflow-hidden cursor-pointer ${getSizeClasses(project.size)}`}
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative h-full flex flex-col">
                {/* Icon */}
                <div
                  style={{ viewTransitionName: `project-icon-${project.id}` }}
                  className={`inline-flex p-3 bg-linear-to-br ${project.color} rounded-2xl mb-4 text-white shadow-lg shadow-black/10 self-start backdrop-blur-sm border border-white/20`}
                >
                  {project.icon}
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col">
                  <h3
                    style={{
                      viewTransitionName: `project-title-${project.id}`,
                    }}
                    className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-300 group-hover:to-cyan-300 group-hover:bg-clip-text transition-all duration-300"
                  >
                    {project.title}
                  </h3>

                  <p className="text-white/70 text-sm md:text-base mb-4 leading-relaxed flex-1">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs font-medium bg-white/10 text-white/90 rounded-full border border-white/20 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* View Details */}
                  <div className="flex items-center gap-2 mt-auto text-white/50 group-hover:text-white transition-colors duration-300">
                    <span className="text-sm font-medium">View Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/50 text-sm">
            Built with <span className="text-red-400">♥</span> using TanStack
            Start, TailwindCSS, and GSAP
          </p>
        </div>
      </footer>
    </div>
  );
}
