import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useMutation } from '@/app/hooks/requests/useMutation'
import { requestType } from '@/app/hooks/requests/requestConfig'

export const useSignOut = () => {
  const { trigger, isMutating, data } = useMutation(requestType.signOut)

  useEffect(() => {
    if (data) {
      signOut()
    }
  }, [data])

  return {
    fetching: isMutating,
    trigger
  }
}
