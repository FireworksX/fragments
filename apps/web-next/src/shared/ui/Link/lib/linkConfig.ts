import { routerParams } from '@/shared/data'

export const linkConfig = {
  home: '/',
  signup: '/signup',
  login: '/login',
  loginEmail: '/login/email',
  project: ({ projectSlug }) => `/project/${projectSlug}`,
  projectsList: '/project',
  createProject: '/project/create',

  campaign: ({ campaignSlug, projectSlug }) => `/project/${projectSlug}/campaigns/${campaignSlug}`,
  campaignStreams: ({ campaignSlug, projectSlug }) => `/project/${projectSlug}/campaigns/${campaignSlug}/streams`,
  stream: ({ campaignSlug, projectSlug, streamSlug }) =>
    `/project/${projectSlug}/campaigns/${campaignSlug}/streams/${streamSlug}`,
  editStream: ({ campaignSlug, projectSlug, streamSlug }) =>
    `/project/${projectSlug}/campaigns/${campaignSlug}/streams/${streamSlug}?${routerParams.editMode}=true`,

  fragments: ({ projectSlug }) => `/project/${projectSlug}/fragments`,
  fragmentPreview: ({ projectSlug, fragmentSlug }) => `/project/${projectSlug}/fragments/${fragmentSlug}`,
  fragmentEdit: ({ projectSlug, fragmentSlug }) => `/project/${projectSlug}/fragments/${fragmentSlug}/edit`
}

export type LinkType = keyof typeof linkConfig
