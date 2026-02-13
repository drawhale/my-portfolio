import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronRight,
  FlaskConical,
  Home,
  Menu,
  Network,
  SquareFunction,
  StickyNote,
  X,
} from "lucide-react";
import { type ReactNode, useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [groupedExpanded, setGroupedExpanded] = useState<
    Record<string, boolean>
  >({});

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/55 px-4 py-3 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="glass-chip rounded-xl p-2 text-white transition-colors hover:bg-white/20"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
            <Link
              to="/"
              className="glass-chip rounded-xl px-3 py-2 text-sm font-semibold tracking-wide text-white"
            >
              Portfolio
            </Link>
          </div>

          <span className="hidden rounded-full border border-white/20 bg-white/8 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-white/75 uppercase md:inline-flex">
            Bento + Glass UI
          </span>
        </div>
      </header>

      <aside
        className={`fixed left-0 top-0 z-50 flex h-full w-84 flex-col border-r border-white/20 bg-slate-950/72 shadow-2xl backdrop-blur-2xl transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/15 p-4">
          <h2 className="inline-flex items-center gap-2 text-sm font-bold tracking-[0.15em] text-white/88 uppercase">
            <FlaskConical className="h-4 w-4" />
            Navigation
          </h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="glass-chip rounded-lg p-2 text-white transition-colors hover:bg-white/20"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <NavLink
            to="/"
            icon={<Home size={18} />}
            label="Home"
            onClick={() => setIsOpen(false)}
          />

          <div className="my-3 h-px bg-white/10" />

          <NavLink
            to="/demo/start/server-funcs"
            icon={<SquareFunction size={18} />}
            label="Start - Server Functions"
            onClick={() => setIsOpen(false)}
          />

          <NavLink
            to="/demo/start/api-request"
            icon={<Network size={18} />}
            label="Start - API Request"
            onClick={() => setIsOpen(false)}
          />

          <div className="mb-2 flex items-center gap-2">
            <Link
              to="/demo/start/ssr"
              onClick={() => setIsOpen(false)}
              className="glass-chip flex-1 rounded-xl px-3 py-2.5 text-sm font-medium text-white/92 transition-colors hover:bg-white/20"
              activeProps={{
                className:
                  "glass-chip flex-1 rounded-xl border border-cyan-200/60 bg-cyan-200/20 px-3 py-2.5 text-sm font-semibold text-white",
              }}
            >
              <span className="inline-flex items-center gap-2">
                <StickyNote size={18} />
                Start - SSR Demos
              </span>
            </Link>
            <button
              type="button"
              className="glass-chip rounded-lg p-2 text-white transition-colors hover:bg-white/20"
              onClick={() =>
                setGroupedExpanded((prev) => ({
                  ...prev,
                  StartSSRDemo: !prev.StartSSRDemo,
                }))
              }
            >
              {groupedExpanded.StartSSRDemo ? (
                <ChevronDown size={18} />
              ) : (
                <ChevronRight size={18} />
              )}
            </button>
          </div>

          {groupedExpanded.StartSSRDemo && (
            <div className="ml-2 flex flex-col gap-1 border-l border-white/15 pl-3">
              <NavLink
                to="/demo/start/ssr/spa-mode"
                icon={<StickyNote size={16} />}
                label="SPA Mode"
                onClick={() => setIsOpen(false)}
              />
              <NavLink
                to="/demo/start/ssr/full-ssr"
                icon={<StickyNote size={16} />}
                label="Full SSR"
                onClick={() => setIsOpen(false)}
              />
              <NavLink
                to="/demo/start/ssr/data-only"
                icon={<StickyNote size={16} />}
                label="Data Only"
                onClick={() => setIsOpen(false)}
              />
            </div>
          )}
        </nav>
      </aside>
    </>
  );
}

function NavLink({
  to,
  icon,
  label,
  onClick,
}: {
  to: string;
  icon: ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="mb-2 flex items-center gap-2 rounded-xl border border-white/15 bg-white/6 px-3 py-2.5 text-sm font-medium text-white/90 transition-all hover:bg-white/16"
      activeProps={{
        className:
          "mb-2 flex items-center gap-2 rounded-xl border border-cyan-200/65 bg-cyan-200/20 px-3 py-2.5 text-sm font-semibold text-white",
      }}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
}
