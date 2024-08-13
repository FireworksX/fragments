export const linkConfig = {
  home: '/',
  signup: '/signup',
  login: '/login',
  loginEmail: '/login/email',
  project: ({ projectSlug }) => `/project/${projectSlug}`,
  projectsList: '/project',
  createProject: '/project/create',
  fragments: ({ projectSlug }) => `/project/${projectSlug}/fragments`,
  fragmentPreview: ({ projectSlug, fragmentSlug }) => `/project/${projectSlug}/fragments/${fragmentSlug}`,
  fragmentEdit: ({ projectSlug, fragmentSlug }) => `/project/${projectSlug}/fragments/${fragmentSlug}/edit`
}

export type LinkType = keyof typeof linkConfig
