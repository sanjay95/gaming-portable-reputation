import axios from 'axios'
import { useMutation, useQuery } from '@tanstack/react-query'

import { hostUrl } from 'pages/env'
import { createCloudWalletAuthenticationHeaders } from 'hooks/useAuthentication'
import { VcProfileMap } from 'types/profile'
import { ErrorResponse } from 'types/error'
import { VerifiableCredential } from 'types/vc'

export const useVcProfiles = () => {
  return useQuery<{ vcs: VcProfileMap }, ErrorResponse>(
    ['getVcs'],
    async () => {
      const {
        data: { vcs },
      } = await axios(`/api/profiles/get-vcs`, {
        method: 'GET',
        headers: createCloudWalletAuthenticationHeaders(),
      })

      return { vcs }
    },
    {
      retry: false,
    },
  )
}

export const useStudioVcProfiles = () => {
  return useMutation<{ vcs: VcProfileMap }, ErrorResponse>(
    ['getVcs'],
    async () => {
      const {
        data: { vcs },
      } = await axios(`/api/profiles/get-vcs`, {
        method: 'GET',
        headers: createCloudWalletAuthenticationHeaders(),
      })

      return { vcs }
    },
    {
      retry: false,
    },
  )
}

export const useVcAll = () => {
  return useQuery<{ vcs: VerifiableCredential[] }, ErrorResponse>(
    ['getVcsAll'],
    async () => {
      const {
        data: { vcs },
      } = await axios(`/api/profiles/get-vcs-all`, {
        method: 'GET',
        headers: createCloudWalletAuthenticationHeaders(),
      })

      return { vcs }
    },
    {
      retry: false,
    },
  )
}
