import { FC, useEffect } from 'react'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Spinner, toast } from 'components'

import { createCloudWalletAuthenticationHeaders, getDid, } from 'hooks/useAuthentication'
import { VerifiableCredential } from 'types/vc'
import { ROUTES } from 'utils'
import { hostUrl } from 'pages/env'

const BattleNetCallback: FC = () => {
  const { push } = useRouter()
  const { status } = useSession()

  useEffect(() => {
    if (status === 'loading') return

    async function issueVc() {
      const holderDid = await getDid()

      const {
        data: { vc },
      } = await axios<{ vc: VerifiableCredential }>(
        '/api/data-providers/battle-net/issue-vc',
        {
          method: 'POST',
          data: {
            holderDid,
          },
        }
      )

      await axios('/api/cloud-wallet/store-vc', {
        method: 'POST',
        headers: createCloudWalletAuthenticationHeaders(),
        data: { vc },
      })

      await push(ROUTES.battleNet)

      toast('Your data has been successfully imported.', {
        type: 'success',
        autoClose: 10000
      })
    }

    issueVc()
  }, [push, status])

  return <Spinner />
}

export default BattleNetCallback
