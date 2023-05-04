import { useCallback, useState } from 'react'

import { createCloudWalletAuthenticationHeaders, logout } from 'hooks/useAuthentication'
import { useAuthContext } from 'hooks/useAuthContext'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { cloudWalletClient } from './api/clients/cloud-wallet-client'

export const useAuth = () => {
  // const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { authState, setAuthState } = useAuthContext()

  
 

  return {
    isAuthorized: authState.authorized,
 
  }
}
