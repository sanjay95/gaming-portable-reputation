import { FC } from 'react'

import { Typography } from 'components'
import { DownloadIcon } from 'assets/download'
import { BattlenetIcon } from 'assets/battlenet'
import { VerifiableCredential } from 'types/vc'

import * as S from './Game2.styled'
import { redirect } from 'next/dist/server/api-utils'
import { ROUTES } from 'utils'
import { useRouter } from 'next/router'


const Game2: FC = () => {
  const navigate = useRouter()
  return (
    <S.CardWrapper >
      <S.Header direction="column" alignItems="center" justifyContent="space-between">
      </S.Header>
      <button onClick={(e) => { window.location.href = ROUTES.game2 }}>
        <Typography variant="p1">
          your game 2
        </Typography>
        </button>
    </S.CardWrapper>
  )
}

export default Game2
