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
  projectSetting: {
    path: ({ projectSlug }) => `/project/${projectSlug}/settings`,
    params: ['projectSlug']
  },
  projectCreate: {
    path: '/project/create',
    params: []
  },
  createProject: {
    path: '/project/create',
    params: []
  },
  campaignsList: {
    path: ({ projectSlug }) => `/project/${projectSlug}/campaigns`,
    params: ['projectSlug']
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

  builder: {
    path: ({ projectSlug }) => `/project/${projectSlug}/builder`,
    params: ['projectSlug']
  }
}

export type LinkType = keyof typeof linkConfig
