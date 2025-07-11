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
  users: {
    path: ({ projectSlug }) => `/project/${projectSlug}/users`,
    params: ['projectSlug']
  },
  segments: {
    path: ({ projectSlug }) => `/project/${projectSlug}/users/segments`,
    params: ['projectSlug']
  },
  goals: {
    path: ({ projectSlug }) => `/project/${projectSlug}/goals`,
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
  areas: {
    path: ({ projectSlug }) => `/project/${projectSlug}/areas`,
    params: ['projectSlug']
  },
  area: {
    path: ({ areaSlug, projectSlug }) => `/project/${projectSlug}/areas/${areaSlug}`,
    params: ['areaSlug', 'projectSlug']
  },
  areaCampaigns: {
    path: ({ areaSlug, projectSlug }) => `/project/${projectSlug}/areas/${areaSlug}/campaigns`,
    params: ['areaSlug', 'projectSlug']
  },
  areaContent: {
    path: ({ areaSlug, projectSlug }) => `/project/${projectSlug}/areas/${areaSlug}/content`,
    params: ['areaSlug', 'projectSlug']
  },
  areaExperiments: {
    path: ({ areaSlug, projectSlug }) => `/project/${projectSlug}/areas/${areaSlug}/experiments`,
    params: ['areaSlug', 'projectSlug']
  },
  areaIntegration: {
    path: ({ areaSlug, projectSlug }) => `/project/${projectSlug}/areas/${areaSlug}/integration`,
    params: ['areaSlug', 'projectSlug']
  },
  campaign: {
    path: ({ areaSlug, projectSlug, campaignSlug }) =>
      `/project/${projectSlug}/areas/${areaSlug}/campaigns/${campaignSlug}`,
    params: ['areaSlug', 'projectSlug', 'campaignSlug']
  },
  campaignContent: {
    path: ({ areaSlug, projectSlug, campaignSlug }) =>
      `/project/${projectSlug}/areas/${areaSlug}/campaigns/${campaignSlug}/content`,
    params: ['areaSlug', 'projectSlug', 'campaignSlug']
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
