import { FC, useEffect } from 'react'

import { Typography } from 'components'
import { DownloadIcon } from 'assets/download'
import { BattlenetIcon } from 'assets/battlenet'
import { VerifiableCredential } from 'types/vc'

import * as S from './Game1.styled'
import { redirect } from 'next/dist/server/api-utils'
import { ROUTES } from 'utils'
import router, { useRouter } from 'next/router'

 const Game1: FC=() => {
  return (
  
  <S.CardWrapper >
    <S.Header direction="column" alignItems="center" justifyContent="space-between">
    </S.Header>
    <button onClick={(e) => { window.location.href = ROUTES.game1 }}>
    <Typography variant="p1">
      Your game 1
    </Typography>
    </button>
  </S.CardWrapper>
)
  }

  export default Game1

