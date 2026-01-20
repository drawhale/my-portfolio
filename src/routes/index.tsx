import { createFileRoute } from "@tanstack/react-router";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Code2, ExternalLink, Github, Palette, Rocket } from "lucide-react";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const heroRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Hero animation
    const ctx = gsap.context(() => {
      gsap.from(".hero-title", {
        duration: 1.2,
        y: 100,
        opacity: 0,
        ease: "power4.out",
      });

      gsap.from(".hero-subtitle", {
        duration: 1,
        y: 50,
        opacity: 0,
        delay: 0.3,
        ease: "power3.out",
      });

      gsap.from(".hero-description", {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.5,
        ease: "power3.out",
      });

      // Project cards animation with ScrollTrigger
      gsap.from(".project-card", {
        scrollTrigger: {
          trigger: ".projects-section",
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        duration: 0.8,
        y: 100,
        opacity: 0,
        stagger: 0.2,
        ease: "power3.out",
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      title: "E-Commerce Platform",
      description:
        "A full-stack e-commerce solution with React, Node.js, and MongoDB. Features include product catalog, shopping cart, and payment integration.",
      tags: ["React", "Node.js", "MongoDB", "Stripe"],
      color: "from-purple-500 to-pink-500",
      icon: <Rocket className="w-8 h-8" />,
    },
    {
      title: "Design System",
      description:
        "A comprehensive component library and design system built with React and TailwindCSS. Includes 50+ reusable components.",
      tags: ["React", "TailwindCSS", "Storybook"],
      color: "from-cyan-500 to-blue-500",
      icon: <Palette className="w-8 h-8" />,
    },
    {
      title: "AI Chat Application",
      description:
        "Real-time chat application powered by OpenAI API with streaming responses, conversation history, and markdown support.",
      tags: ["Next.js", "OpenAI", "TailwindCSS", "Vercel"],
      color: "from-green-500 to-emerald-500",
      icon: <Code2 className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-linear-to-br from-purple-500/20 via-transparent to-transparent blur-3xl animate-pulse" />
          <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-linear-to-tl from-cyan-500/20 via-transparent to-transparent blur-3xl animate-pulse" />
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-linear-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-full backdrop-blur-sm">
            <span className="hero-subtitle text-sm font-medium bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              🚀 Welcome to my Portfolio
            </span>
          </div>

          <h1 className="hero-title text-6xl md:text-8xl font-black text-white mb-6 tracking-[-0.05em]">
            Creative{" "}
            <span className="bg-linear-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Developer
            </span>
          </h1>

          <p className="hero-description text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Crafting beautiful digital experiences with modern web technologies.
            Specialized in React, TypeScript, and creative animations.
          </p>

          <div className="hero-description flex flex-wrap items-center justify-center gap-4">
            <button className="group px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 hover:scale-105">
              View Projects
              <ExternalLink className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-slate-800/50 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all duration-300 border border-slate-700 hover:border-slate-600 backdrop-blur-sm">
              <Github className="inline-block mr-2 w-5 h-5" />
              GitHub
            </button>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        ref={projectsRef}
        className="projects-section py-24 px-6 max-w-7xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Featured{" "}
            <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            A collection of my recent work showcasing various technologies and
            creative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="project-card group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden"
            >
              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-linear-to-br ${project.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
              />

              <div className="relative">
                <div
                  className={`inline-flex p-4 bg-linear-to-br ${project.color} rounded-xl mb-6 text-white shadow-lg`}
                >
                  {project.icon}
                </div>

                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:from-purple-400 group-hover:to-cyan-400 group-hover:bg-clip-text transition-all duration-300">
                  {project.title}
                </h3>

                <p className="text-slate-400 mb-6 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="px-3 py-1 text-xs font-medium bg-slate-800 text-slate-300 rounded-full border border-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button className="flex-1 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors">
                    <ExternalLink className="inline-block mr-1 w-4 h-4" />
                    Demo
                  </button>
                  <button className="flex-1 px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium rounded-lg transition-colors">
                    <Code2 className="inline-block mr-1 w-4 h-4" />
                    Code
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-slate-500">
            Built with <span className="text-red-500">♥</span> using TanStack
            Start, TailwindCSS, and GSAP
          </p>
        </div>
      </footer>
    </div>
  );
}
