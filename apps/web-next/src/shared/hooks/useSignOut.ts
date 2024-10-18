import { signOut } from 'next-auth/react'

export const useSignOut = () => {
  return {
    trigger: signOut
  }
}
