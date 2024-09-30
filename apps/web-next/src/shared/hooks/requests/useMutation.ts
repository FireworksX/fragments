import useSWRMutation from 'swr/mutation'
import { axios } from '@/shared/api/axios'
import { RequestType } from '@/shared/hooks/requests/requestConfig'
import { usePathByType } from '@/shared/hooks/requests/usePathByType'

type MutationMethod = 'post' | 'delete' | 'put'

const fetcher = (url: string, data: any, method: MutationMethod = 'post') => axios[method](url, data)

interface UseMutationOptions {
  method?: MutationMethod
}

export const useMutation = <Type extends RequestType>(type: Type, options?: UseMutationOptions) => {
  const path = usePathByType(type, options)
  return useSWRMutation(path, (url: string, { arg }) => fetcher(url, arg, options?.method))
}
