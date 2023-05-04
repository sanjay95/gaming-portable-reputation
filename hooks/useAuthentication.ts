import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useState, Dispatch, SetStateAction } from 'react'

import { ErrorResponse } from 'types/error'

import { hostUrl } from '../pages/env'
import { getItemFromLocalStorage } from './useLocalStorage'
import { VcProfileMap } from 'types/profile'

export type SignInInput = {
  username: string
}

export const signIn = async (input: SignInInput): Promise<string> => {
  const {
    data: { token },
  } = await axios<{ token: string }>(`/api/cloud-wallet/sign-in`, {
    method: 'POST',
    data: input,
  })

  return token
}

export type ConfirmSignInInput = {
  token: string
  confirmationCode: string
}

export type ConfirmSignInOutput = {
  accessToken: string
}

export const confirmSignIn = async (
  input: ConfirmSignInInput
): Promise<ConfirmSignInOutput> => {
  const {
    data: { accessToken },
  } = await axios<{ accessToken: string }>(
    `/api/cloud-wallet/confirm-sign-in`,
    {
      method: 'POST',
      data: input,
    }
  )

  return { accessToken }
}

export const getDid = async (): Promise<string> => {
  const {
    data: { did },
  } = await axios<{ did: string }>(`/api/cloud-wallet/get-did`, {
    method: 'GET',
    headers: createCloudWalletAuthenticationHeaders(),
  })

  return did
}

export const logout = async () => {
  try {
    await axios<void>(`/api/cloud-wallet/logout`, {
      method: 'POST',
      headers: createCloudWalletAuthenticationHeaders(),
    })
  } catch (e) {}
}

export const createCloudWalletAuthenticationHeaders = () => {
  const cloudWalletAccessToken = getItemFromLocalStorage(
    'cloudWalletAccessToken'
  )
  return {
    ...(cloudWalletAccessToken && { Authorization: cloudWalletAccessToken }),
  }
}

export const useSignInMutation = () => {
  return useMutation<string, ErrorResponse, SignInInput, () => void>(signIn)
}

export const useProfileMutation = () => {
  return useMutation<string, ErrorResponse, SignInInput, () => void>(signIn)
}

export const useConfirmSignInMutation = () => {
  return useMutation<
    ConfirmSignInOutput,
    ErrorResponse,
    ConfirmSignInInput,
    () => void
  >(confirmSignIn)
}

export type UserState = {
  authorized: boolean
  loading: boolean
  vc?: VcProfileMap
}

const BASIC_STATE: UserState = {
  authorized: false,
  loading: true 
}

export const useAuthentication = () => {
  const [authState, setAuthState] = useState<UserState>(BASIC_STATE)

  const updatePartiallyState =
    <T>(updateFunction: Dispatch<SetStateAction<T>>) =>
    (newState: Partial<T>) => {
      updateFunction((prev) => ({ ...prev, ...newState }))
    }
  const updateAuthState = updatePartiallyState<typeof authState>(setAuthState)

  const authenticate = async () => {
    try {
      await getDid()

      updateAuthState({ loading: false, authorized: true })
    } catch (error) {
      updateAuthState({ loading: false, authorized: false })
    }
  }

  return { authState, setAuthState, authenticate, updateAuthState }
}
