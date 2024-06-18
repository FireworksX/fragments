interface ProjectOptions {
  skip?: number
  limit?: number
}

export const requestConfig = {
  login: '/auth/login',
  signUp: '/auth/signUp',
  signOut: '/auth/signOut',
  profile: '/auth/profile',
  projectsUploadLogo: '/project/upload-logo',
  projectCreate: '/project',
  projectList: '/project',
  projectDetail: ({ projectSlug }) => `/project/${projectSlug}`,

  fragmentsCreate: ({ projectSlug }) => `/project/${projectSlug}/fragments`,
  fragmentsList: ({ projectSlug }) => `/project/${projectSlug}/fragments`
} as const

export const requestType: Record<keyof typeof requestConfig, keyof typeof requestConfig> = Object.keys(
  requestConfig
).reduce((acc, key) => {
  acc[key] = key
  return acc
}, {} as any)

export type RequestType = keyof typeof requestConfig
export type RequestOption<Type extends RequestType> = Type extends (options: infer Options) => any ? Options : never
