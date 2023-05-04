import { FC } from 'react'

import { ProfileForm } from './ProfileForm'

import { useProfile } from './useProfile'

const Profile: FC = () => {
  const {
    handleProfile,
    setUserEmail,
    setUserMobile,
    setUserAge,
    setUseCountry,
    setUserCity,
    setUserName,
    disabled,
    error,
    isLoading,
    inputError,
    setInputError,
  } = useProfile()

  return (
    <ProfileForm
      handleProfile={handleProfile}
      setUserEmail={setUserEmail}
      setUserMobile={setUserMobile}
      setUserAge={setUserAge}
      setUseCountry={ setUseCountry}
      setUserCity={setUserCity }
      setUserName={setUserName}
      disabled={disabled}
      isLoading={isLoading}
      error={error}
      inputError={inputError}
      setInputError={setInputError}
    />
  )
}

export default Profile
