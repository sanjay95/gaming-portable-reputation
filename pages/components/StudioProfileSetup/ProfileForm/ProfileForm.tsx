import { Dispatch, FC, FormEvent, SetStateAction, useState } from 'react'

import { Container, Header, Input, ProfileInput } from 'components'
import { ErrorResponse } from 'types/error'

import * as S from './ProfileForm.styled'
import { ProfileLabel } from 'components/Input/ProfileInput';

type ProfileFormProps = {
  handleProfile(e: FormEvent): void;
  setUserEmail(email: string): void;
  setUserMobile(mobile: string): void;
  setUserAge(age: string): void;
  setUseCountry(country: string): void;
  setUserCity(city: string): void;
  setUserName(dob:string):void
  disabled: boolean;
  isLoading: boolean;
  error: ErrorResponse | null;
  inputError: string | null;
  setInputError: Dispatch<SetStateAction<string | null>>;
};

export const ProfileForm: FC<ProfileFormProps> = ({
  handleProfile,
  setUserEmail,
  setUserMobile,
  setUserAge,
  setUseCountry,
  setUserCity,
  setUserName,
  disabled,
  error,
  inputError,
  setInputError,
  isLoading,
}) => {

  const [email, setEmail]= useState( localStorage.getItem('signInUsername'))
  const handleEmailChange = (value: string) => {
    if (inputError) {
      setInputError(null)
    }
    setUserEmail(value)
  }
  const handleMobileChange = (value: string) => {
    if (inputError) {
      setInputError(null)
    }
    setUserMobile(value)
  }
  const handleAgeChange = (value: string) => {
    if (inputError) {
      setInputError(null)
    }
    setUserAge(value)
    setUserEmail( email?.replace(/['"]+/g, '') as string)
  }
  const handleCountryChange = (value: string) => {
    if (inputError) {
      setInputError(null)
    }
    setUseCountry(value)
  }
  const handleCityChange = (value: string) => {
    if (inputError) {
      setInputError(null)
    }
    setUserCity(value)
    setUserEmail( email?.replace(/['"]+/g, '') as string)
  }
  const handleNameChange = (value: string) => {
    if (inputError) {
      setInputError(null)
    }
    setUserName(value)
    setUserEmail( email?.replace(/['"]+/g, '') as string)
  }

  return (
    <>
      <Header title="Profile Setup" />

      <Container>
        <div className="grid grid-cols-0 gap-2">
          <S.Form className="col-start-2" onSubmit={handleProfile}>

            <ProfileLabel
              id="email"
              type="email"
              label="Email address"
              placeholder={email?.replace(/['"]+/g, '') as string}
              //onChange={handleEmailChange}
              // hasError={Boolean(inputError || error?.message)}
              // helpText={inputError || error?.message}
            />
            {/* <ProfileInput
              id="mobile"
              type="number"
              label="Mobile number"
              placeholder="Enter your mobile number"
              onChange={handleMobileChange}
              hasError={Boolean(inputError || error?.message)}
              helpText={inputError || error?.message}
            /> */}
            <ProfileInput
              id="name"
              type="string"
              label="Name"
              placeholder="Enter your mame"
              onChange={handleNameChange}
            // hasError={Boolean(inputError || error?.message)}
            // helpText={inputError || error?.message}
            />
            <ProfileInput
              id="age"
              type="string"
              label="Age"
              placeholder="Enter your age"
              onChange={handleAgeChange}
            // hasError={Boolean(inputError || error?.message)}
            // helpText={inputError || error?.message}
            />
            {/* <ProfileInput
              id="country"
              type="string"
              label="Country"
              placeholder="Enter your country of residence"
              onChange={handleCountryChange}
            // hasError={Boolean(inputError || error?.message)}
            // helpText={inputError || error?.message}
            /> */}
            <ProfileInput
              id="city"
              type="string"
              label="City"
              placeholder="Enter your city of residence"
              onChange={handleCityChange}
            // hasError={Boolean(inputError || error?.message)}
            // helpText={inputError || error?.message}
            />

            <S.ButtonWrapper
              // disabled={disabled}
              type="submit"
              // loading={isLoading}
              fullWidth
            >
              Update Profile
            </S.ButtonWrapper>
          </S.Form>
        </div>
      </Container>
    </>
  )
}


