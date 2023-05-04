import { useRouter } from 'next/router'
import { FormEvent, useEffect, useState } from 'react'
import { ROUTES } from 'utils'
import { useLocalStorage } from 'hooks/useLocalStorage'
import {
  getDid,
  useProfileMutation,
  createCloudWalletAuthenticationHeaders,
} from 'hooks/useAuthentication'
import { useAuthContext } from 'hooks/useAuthContext'
import { count } from 'console'
import { VerifiableCredential } from 'types/vc'
import axios from 'axios'
import { hostUrl } from 'pages/env'
import { toast } from 'components'
import { DataProvider } from 'utils/data-providers'
import { VcProfileMap } from 'types/profile'

export const useProfile = () => {
  const [useremail, setUserEmail] = useState<string>('')
  const [usermobile, setUserMobile] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [userage, setUserAge] = useState<string>()
  const [usercountry, setUseCountry] = useState<string>('')
  const [usercity, setUserCity] = useState<string>('')

  const [inputError, setInputError] = useState<string | null>(null)
  const navigate = useRouter()
  const storage = useLocalStorage()
  const { authState, setAuthState } = useAuthContext()
  const { mutateAsync, error, isLoading } = useProfileMutation()

  const validateEmail = (email: string) =>
    email.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )

  const handleProfile = async (e: FormEvent) => {
    e.preventDefault()
    setInputError(null)

    if (!validateEmail(useremail)) {
      setInputError('This is not a valid email address.')
      return
    }
    const holderDid = await getDid()

    const {
      data: { vc },
    } = await axios<{ vc: VerifiableCredential }>(
      '/api/data-providers/StudioProfile/issue-vc',
      {
        method: 'POST',
        data: {
          holderDid,
          useremail,
          usermobile,
          userName,
          userage,
          usercountry,
          usercity,
        },
      },
    )

    await axios('/api/cloud-wallet/store-vc', {
      method: 'POST',
      headers: createCloudWalletAuthenticationHeaders(),
      data: { vc },
    })
    // const { push } = useRouter()
    // await push(ROUTES.battleNet)

    if (vc) {
      toast('Your data has been successfully Saved.', {
        type: 'success',
        autoClose: 10000,
      })

      const profileVC: VcProfileMap = {
        [DataProvider.studio]: vc,
      }

      setAuthState((prevState) => {
        return { ...prevState, vc: profileVC }
      })
      navigate.push(ROUTES.home)
    }
  }

  return {
    disabled: !useremail,
    error,
    isLoading,
    handleProfile,
    setUserEmail,
    setUserMobile,
    setUserAge,
    setUseCountry,
    setUserCity,
    setUserName,
    inputError,
    setInputError,
  }
}
