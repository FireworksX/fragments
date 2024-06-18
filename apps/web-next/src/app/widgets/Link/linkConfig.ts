export const linkConfig = {
  home: '/',
  signup: '/signup',
  login: '/login',
  loginEmail: '/login/email',
  project: ({ projectSlug }) => `/project/${projectSlug}`,
  createProject: '/project/create',
  fragments: ({ projectSlug }) => `/project/${projectSlug}/fragments`,
  fragmentDetail: ({ projectSlug, fragmentSlug }) => `/project/${projectSlug}/fragments/${fragmentSlug}`
}

export type LinkType = keyof typeof linkConfig
