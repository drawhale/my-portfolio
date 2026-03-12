import portfolioProjects from './portfolio-projects.json'

export interface PortfolioProject {
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
  overview: string
  keyContributions: string[]
  takeaway: string
  color: string
  size: 'large' | 'medium' | 'wide' | 'tall'
  links: {
    demo?: string
    code?: string
  }
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
