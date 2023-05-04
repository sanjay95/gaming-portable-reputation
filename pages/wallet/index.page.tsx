import { FC, useEffect } from 'react'
import { useRouter } from 'next/router'

import { ROUTES } from 'utils'
import { useVcAll } from 'hooks/useVcProfiles'
import { Container, Header, Spinner } from 'components'
import { useAuthContext } from 'hooks/useAuthContext'
import { ErrorCodes } from 'types/error'
import { showErrorToast } from 'utils/errorToast'

import * as S from './Wallet.styled'

const Wallet: FC = () => {
  const { push } = useRouter()
  const { data, error, isLoading } = useVcAll()
  const { authState, setAuthState } = useAuthContext()

  useEffect(() => {
    if (!authState.loading && !authState.authorized) {
      push(ROUTES.singIn)
      return;
    }
    else if (error) {
      if (error?.response?.data?.error?.code === ErrorCodes.JWT_EXPIRED_ERROR) {
        setAuthState((prevState) => ({
          ...prevState,
          authorized: false,
        }))
        push(ROUTES.singIn)
      } else {
        showErrorToast(error)
      }
    }
  }, [error, push, setAuthState])

  return (
    <>
      <Container>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Header title='Your Verifiable Credentials'></Header>
            <S.CardRow className='grid lg:grid-cols-2 lg:gap-10'>
              {data?.vcs.map((vc, i) => <><S.CardItem key={i}>
                <p><b>VC Id</b>: {vc.id}</p>
                <p><b>VC Type</b>: {vc.type.join(', ')}</p>
                <p><b>Issuance Date</b>: {vc.issuanceDate}</p>
                <p><b>Credentials</b>: {Object.keys(vc.credentialSubject).map(key => <p key={key} style={{paddingLeft:'1rem'}}>{key} : {JSON.stringify(vc.credentialSubject[key])}</p>)}</p>
              </S.CardItem></>)}
            </S.CardRow>
          </>
        )}
      </Container>
    </>
  )
}

export default Wallet
