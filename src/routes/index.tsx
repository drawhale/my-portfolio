import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import type { PortfolioProject } from "../data/projects";
import { getSizeClasses, projects } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const projectsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  // StrictMode 이중 실행 방어: 컴포넌트 실제 언마운트 시 ref 초기화됨
  const effectRanRef = useRef(false);

  useLayoutEffect(() => {
    // React StrictMode의 이중 실행을 막아 애니메이션이 두 번 실행되지 않게 함
    if (effectRanRef.current) return;
    effectRanRef.current = true;

    // 첫 방문이 아니면 (SPA 재방문, 뒤로 가기 등) 즉시 최종 상태로 설정
    const isFirstVisit = sessionStorage.getItem("indexVisited") !== "true";

    if (!isFirstVisit) {
      gsap.set(".hero-container, .hero-sub", {
        opacity: 1,
        filter: "none",
        y: 0,
      });
      gsap.set(".hero-evelop, .hero-eb", { width: 0, opacity: 0 });
      gsap.set(".hero-ong, .hero-ook", { width: "2.8ch", opacity: 1 });
      gsap.set(".hero-d", {
        x: 6,
        textShadow:
          "0 0 5px rgba(226,232,240,0.22), 0 0 11px rgba(186,230,253,0.12)",
      });
      gsap.set(".hero-w", {
        textShadow:
          "0 0 5px rgba(226,232,240,0.22), 0 0 11px rgba(186,230,253,0.12)",
      });
      gsap.set(".projects-header", { opacity: 1, y: 0 });
      gsap.set(".bento-card", { opacity: 1, y: 0, scale: 1 });
      return;
    }

    // 첫 방문 기록
    sessionStorage.setItem("indexVisited", "true");

    gsap.set(".bento-card", { y: 56, opacity: 0, scale: 0.98 });
    gsap.set(".projects-header", { y: -28, opacity: 0 });

    gsap.set(".hero-container, .hero-sub", {
      y: 12,
      opacity: 0,
      filter: "blur(8px)",
    });
    gsap.set(".hero-d, .hero-w", {
      textShadow: "0 0 0 rgba(0,0,0,0)",
      scale: 1,
    });

    gsap.set(".hero-evelop, .hero-eb", { width: "auto", opacity: 1 });
    gsap.set(".hero-ong, .hero-ook", { width: 0, opacity: 0 });

    const timer = setTimeout(() => {
      const introTimeline = gsap.timeline();

      introTimeline
        .to(".hero-container", {
          duration: 0.5,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power2.out",
        })
        .to(
          ".hero-d, .hero-w",
          {
            duration: 0.42,
            scale: 1.12,
            textShadow:
              "0 0 10px rgba(125,211,252,0.9), 0 0 24px rgba(56,189,248,0.55), 0 0 42px rgba(217,70,239,0.34), 0 0 62px rgba(244,114,182,0.2)",
            ease: "power2.out",
          },
          0.48,
        )
        .to(
          ".hero-d, .hero-w",
          {
            duration: 0.3,
            scale: 1.05,
            textShadow:
              "0 0 7px rgba(186,230,253,0.55), 0 0 18px rgba(167,139,250,0.28), 0 0 28px rgba(244,114,182,0.15)",
            ease: "power2.out",
          },
          0.84,
        )
        .to(
          ".hero-evelop, .hero-eb",
          {
            duration: 0.45,
            width: 0,
            opacity: 0,
            filter: "blur(5px)",
            ease: "power2.inOut",
          },
          1.0,
        )
        .to(
          ".hero-ong",
          {
            duration: 0.58,
            width: "2.8ch",
            opacity: 1,
            ease: "power3.out",
          },
          1.5,
        )
        .to(
          ".hero-ook",
          {
            duration: 0.45,
            width: "2.8ch",
            opacity: 1,
            ease: "power3.out",
          },
          1.55,
        )
        .to(
          ".hero-d",
          {
            duration: 0.36,
            x: 6,
            textShadow:
              "0 0 5px rgba(226,232,240,0.22), 0 0 11px rgba(186,230,253,0.12)",
            ease: "power2.out",
          },
          1.8,
        )
        .to(
          ".hero-w",
          {
            duration: 0.36,
            textShadow:
              "0 0 5px rgba(226,232,240,0.22), 0 0 11px rgba(186,230,253,0.12)",
            ease: "power2.out",
          },
          1.8,
        )
        .to(
          ".hero-sub",
          {
            duration: 0.45,
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            ease: "power2.out",
          },
          1.85,
        );

      gsap.to(".bento-card", {
        duration: 0.82,
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.08,
        delay: 2.15,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });

      gsap.to(".projects-header", {
        duration: 0.92,
        y: 0,
        opacity: 1,
        delay: 2.05,
        ease: "power3.out",
        clearProps: "transform,opacity",
      });
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      <div className="pointer-events-none absolute -left-20 top-16 h-80 w-80 rounded-full bg-teal-300/20 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-0 h-96 w-96 rounded-full bg-rose-300/16 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-96 w-96 rounded-full bg-indigo-300/14 blur-3xl" />

      <section
        ref={projectsRef}
        className="projects-section relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 pb-14 pt-12 md:px-8"
      >
        <div className="mb-7 flex flex-col items-center md:mb-9">
          <div className="relative w-full max-w-2xl h-[5.2rem] md:h-[7.4rem] overflow-visible">
            <div className="hero-container absolute inset-0 flex justify-center items-end gap-0 text-[2.25rem] leading-none font-extrabold tracking-tight text-white opacity-0 md:text-[4.1rem]">
              <span className="inline-flex items-end gap-0">
                <span className="hero-d bg-linear-to-r from-cyan-100 to-teal-200 bg-clip-text text-transparent pb-2 md:pb-3">
                  D
                </span>
                <span className="hero-evelop inline-block overflow-hidden whitespace-nowrap bg-linear-to-r from-cyan-100 via-white to-blue-200 bg-clip-text text-transparent pb-2 md:pb-3">
                  evelop&nbsp;
                </span>
                <span
                  className="hero-ong inline-block overflow-hidden whitespace-nowrap bg-linear-to-r from-cyan-100 via-white to-blue-200 bg-clip-text text-transparent pb-2 md:pb-3"
                  style={{ direction: "rtl", width: 0, opacity: 0 }}
                >
                  <span className="inline-block" style={{ direction: "ltr" }}>
                    ong
                  </span>
                </span>
              </span>

              <span className="ml-1.5 inline-flex items-end gap-0 md:ml-3">
                <span className="hero-w bg-linear-to-r from-rose-100 to-fuchsia-200 bg-clip-text text-transparent pb-2 md:pb-3">
                  W
                </span>
                <span className="hero-eb inline-block overflow-hidden whitespace-nowrap bg-linear-to-r from-rose-100 via-white to-fuchsia-200 bg-clip-text text-transparent pb-2 md:pb-3">
                  eb
                </span>
                <span
                  className="hero-ook inline-block overflow-hidden whitespace-nowrap bg-linear-to-r from-rose-100 via-white to-fuchsia-200 bg-clip-text text-transparent pb-2 md:pb-3"
                  style={{ width: 0, opacity: 0 }}
                >
                  ook
                </span>
              </span>
            </div>
          </div>

          <p className="hero-sub mt-3 text-center text-sm text-white/66 opacity-0 md:text-base">
            Creativity as a tool, thriving on challenges
          </p>
        </div>

        <header
          className="projects-header relative mb-10 border-b border-white/15 pb-8 md:pb-10"
          style={{ opacity: 0 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/8 px-3 py-1.5 text-xs md:text-sm font-semibold tracking-[0.18em] text-white/90 uppercase backdrop-blur-xl">
            <Sparkles className="h-3.5 w-3.5" />
            Featured Projects
          </div>

          <p className="mt-5 max-w-3xl text-xs leading-relaxed text-white/72 md:text-lg italic">
            단순히 구현하는 것에서 그치지 않고, 문제의 본질을 파악하고 더 나은
            방향을 찾는 것을 즐깁니다.
            <br />
            도전을 망설이지 않고 창의적인 아이디어와 섬세한 고민을 담아 제품을
            만들고, 그것을 사용하는 사람이 만족감을 느낄 때 가장 큰 보람을
            느끼고 그런 개발자가 되는 것이 목표입니다.
          </p>
        </header>

        <div className="grid grid-cols-1 auto-rows-[280px] gap-4 md:grid-cols-4 md:auto-rows-[320px]">
          {projects.map((project: PortfolioProject) => (
            <button
              type="button"
              key={project.id}
              onClick={() => {
                navigate({
                  to: "/project/$projectId",
                  params: { projectId: project.id },
                });
              }}
              style={{
                viewTransitionName: `project-card-${project.id}`,
                opacity: 0,
              }}
              className={`bento-card grid-shimmer glass-panel group relative flex flex-col overflow-hidden rounded-[1.8rem] p-5 text-left transition-all duration-500 hover:-translate-y-1.5 hover:border-white/45 hover:shadow-[0_24px_40px_rgba(0,0,0,0.34)] focus-visible:outline-2 focus-visible:outline-cyan-300 cursor-pointer ${getSizeClasses(project.size)}`}
            >
              <div
                className={`pointer-events-none absolute inset-0 bg-linear-to-br ${project.color} opacity-[0.06] mix-blend-screen transition-opacity duration-500 group-hover:opacity-30`}
              />

              {project.image && (
                <div
                  className={`relative -mx-5 -mt-5 mb-4 shrink-0 overflow-hidden rounded-t-[1.8rem] ${project.size === "medium" || project.size === "wide" ? "h-[38%]" : "h-[52%]"}`}
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/40 via-45% to-transparent" />
                </div>
              )}

              {!project.image && (
                <div className="mb-3 flex items-center justify-between">
                  <div
                    className={`h-3.5 w-3.5 rounded-full bg-linear-to-br ${project.color} shadow-[0_0_20px_rgba(255,255,255,0.25)]`}
                  />
                  <span className="text-[11px] font-medium text-white/40 uppercase tracking-[0.12em]">
                    {project.type === "side" ? "Side" : ""}
                  </span>
                </div>
              )}

              <div className="relative flex min-h-0 flex-1 flex-col">
                <h3
                  style={{ viewTransitionName: `project-title-${project.id}` }}
                  className="relative mb-2 text-xl font-bold md:text-2xl"
                >
                  <span className="transition-opacity duration-300 group-hover:opacity-0">
                    {project.title}
                  </span>
                  <span className="absolute inset-0 bg-linear-to-r from-cyan-100 to-fuchsia-100 bg-clip-text text-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {project.title}
                  </span>
                </h3>

                {!project.image && (
                  <p className="mb-1 text-[11px] text-white/40">
                    {project.role}
                  </p>
                )}

                <p className="mb-4 flex-1 text-sm leading-relaxed text-white/72 md:text-[0.95rem]">
                  {project.summary}
                </p>

                <div className="mb-4 flex flex-wrap gap-2">
                  {project.tags.slice(0, 2).map((tag) => (
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
            </button>
          ))}
        </div>
      </section>

      <footer className="relative z-10 border-t border-white/10 px-6 py-7">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center justify-between gap-2 text-xs text-white/55 md:flex-row md:text-sm">
          <a
            href="https://github.com/drawhale"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-white/80"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <title>github</title>
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            GitHub
          </a>
          <p>&copy; 2026 DW. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
