import { routerParams } from '@/shared/data'

export const BUILDER_NODE_KEY = 'node'

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
  projectSettingTokens: {
    path: ({ projectSlug }) => `/project/${projectSlug}/settings/tokens`,
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
  landing: {
    path: ({ campaignSlug, projectSlug, streamSlug, landingSlug }) =>
      `/project/${projectSlug}/campaigns/${campaignSlug}/streams/${streamSlug}/${landingSlug}`,
    params: ['campaignSlug', 'projectSlug', 'streamSlug', 'landingSlug']
  },

  builder: {
    path: ({ projectSlug }) => `/project/${projectSlug}/builder`,
    params: ['projectSlug']
  },
  builderFragment: {
    path: ({ projectSlug, fragmentId }) => `/project/${projectSlug}/builder?${BUILDER_NODE_KEY}=${fragmentId}`,
    params: ['projectSlug', 'fragmentId']
  }
}

export type LinkType = keyof typeof linkConfig
