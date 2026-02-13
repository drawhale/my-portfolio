import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { getSizeClasses, projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const isNavigatingBackRef = useRef(
    typeof window !== "undefined" &&
      sessionStorage.getItem("isNavigatingBack") === "true",
  );

  const handleCardClick = (projectId: string) => {
    if (document.startViewTransition) {
      document.startViewTransition(async () => {
        await navigate({ to: "/project/$projectId", params: { projectId } });
      });
    } else {
      navigate({ to: "/project/$projectId", params: { projectId } });
    }
  };

  useEffect(() => {
    if (isNavigatingBackRef.current) {
      sessionStorage.removeItem("isNavigatingBack");
      return;
    }

    gsap.set(".bento-card", { y: 56, opacity: 0, scale: 0.98 });
    gsap.set(".projects-header", { y: -28, opacity: 0 });

    const timer = setTimeout(() => {
      gsap.to(".bento-card", {
        duration: 0.82,
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      gsap.to(".projects-header", {
        duration: 0.92,
        y: 0,
        opacity: 1,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute -left-20 top-16 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-fuchsia-400/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-sky-400/12 blur-3xl" />

      <section
        ref={projectsRef}
        className="projects-section relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-14 pt-12 md:px-8"
      >
        <div className="projects-header glass-panel mb-8 rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
          <div className="glass-chip mb-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold tracking-[0.18em] text-white/90 uppercase">
            <Sparkles className="h-3.5 w-3.5" />
            Selected Work
          </div>

          <h1 className="text-balance text-4xl font-extrabold tracking-tight md:text-6xl lg:text-7xl">
            Bento Portfolio,
            <br />
            <span className="bg-gradient-to-r from-cyan-200 via-white to-fuchsia-200 bg-clip-text text-transparent">
              Glass Reimagined
            </span>
          </h1>

          <p className="mt-5 max-w-3xl text-sm leading-relaxed text-white/72 md:text-lg">
            A curated selection of builds focused on delightful interaction,
            resilient architecture, and pixel-precise product execution.
          </p>
        </div>

        <div className="grid grid-cols-1 auto-rows-[280px] gap-4 md:grid-cols-4 md:auto-rows-[320px]">
          {projects.map((project) => (
            <article
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
              className={`bento-card grid-shimmer glass-panel group relative overflow-hidden rounded-[1.8rem] p-5 transition-all duration-500 hover:-translate-y-1.5 hover:border-white/45 hover:shadow-[0_24px_40px_rgba(0,0,0,0.34)] focus-visible:outline-2 focus-visible:outline-cyan-300 ${getSizeClasses(project.size)}`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.color} opacity-[0.18] mix-blend-screen transition-opacity duration-500 group-hover:opacity-30`}
              />

              {project.image ? (
                <div
                  style={{ viewTransitionName: `project-image-${project.id}` }}
                  className="relative -mx-5 -mt-5 mb-4 h-[58%] overflow-hidden rounded-t-[1.8rem]"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/48 via-45% to-transparent" />
                </div>
              ) : (
                <div
                  style={{ viewTransitionName: `project-dot-${project.id}` }}
                  className={`mb-4 h-3.5 w-3.5 rounded-full bg-gradient-to-br ${project.color} shadow-[0_0_20px_rgba(255,255,255,0.25)]`}
                />
              )}

              <div className="relative flex h-full flex-col">
                <h3
                  style={{ viewTransitionName: `project-title-${project.id}` }}
                  className="relative mb-3 text-xl font-bold md:text-2xl"
                >
                  <span className="transition-opacity duration-300 group-hover:opacity-0">
                    {project.title}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-cyan-100 to-fuchsia-100 bg-clip-text text-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {project.title}
                  </span>
                </h3>

                {!project.image && (
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-white/72 md:text-[0.95rem]">
                    {project.description}
                  </p>
                )}

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="glass-chip rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white/92"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-2 text-white/62 transition-colors duration-300 group-hover:text-white">
                  <span className="text-xs font-semibold tracking-[0.14em] uppercase">
                    View Details
                  </span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-6 py-7">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 text-xs text-white/55 md:flex-row md:text-sm">
          <p>Crafted with TanStack Start, Tailwind CSS, and GSAP.</p>
          <p className="tracking-[0.12em] uppercase">Portfolio Experience</p>
        </div>
      </footer>
    </div>
  );
}
