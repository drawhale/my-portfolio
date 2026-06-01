import portfolioProjects from './portfolio-projects.json'

interface PortfolioProjectBase {
  id: string
  title: string
  type: 'side' | 'work'
  period: {
    start: string
    end: string
  }
  role: string
  tags: string[]
  summary: string
  image?: string
  color: string
  size: 'large' | 'medium' | 'wide' | 'tall'
  links: {
    demo?: string
    code?: string
  }
}

interface StorytellingProject extends PortfolioProjectBase {
  problem: string
  approach: string
  solution: string[]
  takeaway: string
}

interface LegacyProject extends PortfolioProjectBase {
  overview: string
  keyContributions: string[]
  takeaway: string
}

export type PortfolioProject = StorytellingProject | LegacyProject

export const hasStorytellingStructure = (
  project: PortfolioProject,
): project is StorytellingProject => {
  return 'problem' in project
}

export const projects = portfolioProjects as PortfolioProject[]

export const getProjectById = (id: string): PortfolioProject | undefined => {
  return projects.find((p) => p.id === id)
}

export const getSizeClasses = (size: string) => {
  switch (size) {
    case 'large':
      return 'md:col-span-2 md:row-span-2'
    case 'wide':
      return 'md:col-span-2'
    case 'tall':
      return 'md:row-span-2'
    default:
      return ''
  }
}
