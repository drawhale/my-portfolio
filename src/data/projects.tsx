import {
  Code2,
  Database,
  Globe,
  Palette,
  Rocket,
  Smartphone,
  Sparkles,
  Zap,
} from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  fullDescription?: string;
  tags: string[];
  color: string;
  icon: React.ReactNode;
  size: "large" | "medium" | "wide" | "tall";
  demoUrl?: string;
  codeUrl?: string;
}

export const projects: Project[] = [
  {
    id: "e-commerce",
    title: "E-Commerce Platform",
    description:
      "Full-stack e-commerce solution with advanced features including product catalog, cart management, and secure payment processing.",
    fullDescription:
      "A comprehensive e-commerce platform built from the ground up. Features include real-time inventory management, advanced search with filters, secure Stripe payment integration, order tracking, and an admin dashboard for managing products and orders.",
    tags: ["React", "Node.js", "MongoDB", "Stripe"],
    color: "from-purple-500 to-pink-500",
    icon: <Rocket className="w-8 h-8" />,
    size: "large",
  },
  {
    id: "design-system",
    title: "Design System",
    description:
      "Comprehensive component library with 50+ reusable components.",
    fullDescription:
      "A fully documented design system featuring 50+ accessible, customizable components. Includes dark mode support, responsive variants, and comprehensive Storybook documentation with interactive examples.",
    tags: ["React", "TailwindCSS", "Storybook"],
    color: "from-cyan-500 to-blue-500",
    icon: <Palette className="w-8 h-8" />,
    size: "medium",
  },
  {
    id: "ai-chatbot",
    title: "AI Chat Bot",
    description:
      "Intelligent chatbot powered by OpenAI with context-aware responses.",
    fullDescription:
      "An AI-powered chatbot with conversation memory, context awareness, and streaming responses. Features include conversation history, custom persona settings, and integration with various data sources for enhanced responses.",
    tags: ["Next.js", "OpenAI", "TypeScript"],
    color: "from-green-500 to-emerald-500",
    icon: <Sparkles className="w-8 h-8" />,
    size: "medium",
  },
  {
    id: "analytics-dashboard",
    title: "Analytics Dashboard",
    description:
      "Real-time analytics platform with interactive charts and data visualization.",
    fullDescription:
      "A real-time analytics dashboard featuring interactive D3.js visualizations, customizable widgets, data export capabilities, and automated report generation. Handles millions of data points with optimized performance.",
    tags: ["React", "D3.js", "PostgreSQL"],
    color: "from-orange-500 to-red-500",
    icon: <Database className="w-8 h-8" />,
    size: "wide",
  },
  {
    id: "api-gateway",
    title: "API Gateway",
    description:
      "High-performance API gateway with rate limiting and caching.",
    fullDescription:
      "A robust API gateway handling 10,000+ requests per second. Features include intelligent rate limiting, Redis caching, request/response transformation, authentication middleware, and comprehensive logging with metrics.",
    tags: ["Node.js", "Redis", "Docker"],
    color: "from-indigo-500 to-purple-500",
    icon: <Zap className="w-8 h-8" />,
    size: "medium",
  },
  {
    id: "portfolio",
    title: "Portfolio Website",
    description:
      "Modern portfolio site with animations and responsive design.",
    fullDescription:
      "This very website you're viewing! Built with TanStack Start for server-side rendering, GSAP for smooth animations, and Tailwind CSS for styling. Features include view transitions and a responsive bento grid layout.",
    tags: ["TanStack Start", "GSAP", "Tailwind"],
    color: "from-pink-500 to-rose-500",
    icon: <Globe className="w-8 h-8" />,
    size: "medium",
  },
  {
    id: "mobile-app",
    title: "Mobile App",
    description: "Cross-platform mobile application with native performance.",
    fullDescription:
      "A cross-platform mobile app with native-like performance. Features include offline support, push notifications, biometric authentication, and seamless synchronization across devices.",
    tags: ["React Native", "Expo", "Firebase"],
    color: "from-blue-500 to-cyan-500",
    icon: <Smartphone className="w-8 h-8" />,
    size: "tall",
  },
  {
    id: "code-editor",
    title: "Code Editor",
    description:
      "Web-based code editor with syntax highlighting and autocomplete.",
    fullDescription:
      "A powerful web-based code editor built on Monaco Editor. Features include multi-language support, intelligent autocomplete, real-time collaboration, and WebAssembly-powered Rust tooling for enhanced performance.",
    tags: ["Monaco", "WebAssembly", "Rust"],
    color: "from-yellow-500 to-orange-500",
    icon: <Code2 className="w-8 h-8" />,
    size: "medium",
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return projects.find((p) => p.id === id);
};

export const getSizeClasses = (size: string) => {
  switch (size) {
    case "large":
      return "md:col-span-2 md:row-span-2";
    case "wide":
      return "md:col-span-2";
    case "tall":
      return "md:row-span-2";
    default:
      return "";
  }
};
