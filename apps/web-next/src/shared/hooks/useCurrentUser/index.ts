import { useCurrentUserQuery } from './queries/CurrentUser.generated'

export const useCurrentUser = () => {
  return useCurrentUserQuery()
}
