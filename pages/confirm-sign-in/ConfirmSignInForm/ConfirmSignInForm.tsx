import { FC, ReactNode, useEffect, useState } from 'react'

import { Box, Container, Header, Typography } from 'components'
import { ErrorCodes, ErrorResponse } from 'types/error'

import * as S from './ConfirmSignInForm.styled'

type ConfirmSignInFormProps = {
  error: ErrorResponse | null
  onSubmit(): void
  inputs: ReactNode
  isButtonDisabled: boolean
  isLoading: boolean
  handleResendCode(): void
}

export const ConfirmSignInForm: FC<ConfirmSignInFormProps> = ({
  error,
  onSubmit,
  inputs,
  isButtonDisabled,
  handleResendCode,
  isLoading,
}) => {
  
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    error?.message
  )

  useEffect(() => {
    if (error) {
      if (error.response?.data?.error?.code === ErrorCodes.INVALID_OTP_CODE) {
        setErrorMessage('Code is incorrect, please try again.')
      } else {
        setErrorMessage(error.message)
      }
    }
  }, [error])

  return (
    <>
      <Header title='Sign in' />

      <Container>
        <div className='grid lg:grid-cols-3 lg:gap-16'>
          <S.Wrapper className='lg:col-start-2'>
            <S.Prompt variant='p1'>
              Please enter the verification code you received in your email.
            </S.Prompt>
            <form id='confirmation' onSubmit={onSubmit}>
              <Box gap={4}>
              <S.Label variant='p4' hasError={Boolean(error)}>Verification code</S.Label>

                <S.VerificationFieldContainer direction='row' gap={30}>
                  {inputs}
                </S.VerificationFieldContainer>
              </Box>

              {error && <Typography variant='e1'>{errorMessage}</Typography>}
            </form>

            <S.SignInButton
              form='confirmation'
              type='submit'
              disabled={isButtonDisabled}
              loading={isLoading}
              fullWidth
            >
              Sign in
            </S.SignInButton>

            <Typography variant='p1'>
            By signing up, you agree to let Studio {' '}
            <Typography
                variant='l1'
                onClick={handleResendCode}
                role='button'
                tabIndex={0}
              >
            create and share verifiable credentials on your behalf
            </Typography>{' '}, 
            which may include personal information. We will only use your credentials to personalize your experience 
            with our service and provide our service to you as required by law. 
            We will take all reasonable steps to protect your data and {' '}
            <Typography
                variant='l1'
                onClick={handleResendCode}
                role='button'
                tabIndex={0}
              >
              not share it with third parties 
                without your explicit consent
              </Typography>{' '}
              
            </Typography>
          </S.Wrapper>
        </div>
      </Container>
    </>
  )
}
