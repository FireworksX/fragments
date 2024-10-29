import { routerParams } from '@/shared/data'

export const linkConfig = {
  home: {
    path: '/',
    params: []
  },
  signup: {
    path: '/signup',
    params: []
  },
  login: {
    path: '/login',
    params: []
  },
  loginEmail: {
    path: '/login/email',
    params: []
  },
  project: {
    path: ({ projectSlug }) => `/project/${projectSlug}`,
    params: ['projectSlug']
  },
  projectsList: {
    path: '/project',
    params: []
  },
  createProject: {
    path: '/project/create',
    params: []
  },
  campaign: {
    path: ({ campaignSlug, projectSlug }) => `/project/${projectSlug}/campaigns/${campaignSlug}`,
    params: ['campaignSlug', 'projectSlug']
  },
  campaignStreams: {
    path: ({ campaignSlug, projectSlug }) => `/project/${projectSlug}/campaigns/${campaignSlug}/streams`,
    params: ['campaignSlug', 'projectSlug']
  },
  stream: {
    path: ({ campaignSlug, projectSlug, streamSlug }) =>
      `/project/${projectSlug}/campaigns/${campaignSlug}/streams/${streamSlug}`,
    params: ['campaignSlug', 'projectSlug', 'streamSlug']
  },
  editStream: {
    path: ({ campaignSlug, projectSlug, streamSlug }) =>
      `/project/${projectSlug}/campaigns/${campaignSlug}/streams/${streamSlug}?${routerParams.editMode}=true`,
    params: ['campaignSlug', 'projectSlug', 'streamSlug']
  },

  fragments: {
    path: ({ projectSlug }) => `/project/${projectSlug}/fragments`,
    params: ['projectSlug']
  },
  fragmentPreview: {
    path: ({ projectSlug, fragmentSlug }) => `/project/${projectSlug}/fragments/${fragmentSlug}`,
    params: ['projectSlug', 'fragmentSlug']
  },
  fragmentEdit: {
    path: ({ projectSlug, fragmentSlug }) => `/project/${projectSlug}/fragments/${fragmentSlug}/edit`,
    params: ['projectSlug', 'fragmentSlug']
  }
}

export type LinkType = keyof typeof linkConfig
