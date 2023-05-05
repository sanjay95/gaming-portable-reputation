import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { use } from 'next-api-middleware'
import { VerifiableCredential } from 'types/vc'
import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { cloudWalletClient } from '../clients/cloud-wallet-client'
import { projectDid } from '../env'
import { authenticateCloudWallet } from '../helpers/authenticate-cloud-wallet'
import { nanoid } from 'nanoid'
import { iamClient } from '../clients/iam-client'
import { GameReputationSubject } from '../../../types/GameReputationSubject'

const requestSchema = z
  .object({
    gamename: z.string(),
    publisher: z.string(),
    company: z.string(),
    genre: z.string(),
    totalPlayedhours: z.number().optional(),
    gameLevel: z.number().optional(),
    //LAB4      score: z.number().optional()
  })
  .strict()

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  let success = false
  const accessToken = authenticateCloudWallet(req)
  const holderDid = await cloudWalletClient.getDid({ accessToken })
  debugger

  const stats = requestSchema.parse(req.body)

  try {
    const preferenceVc = await generateGameReputationVc(
      holderDid.did,
      stats as GameReputationSubject,
    )
    const {
      wallet: { accessToken: cloudWalletAccessToken },
    } = await iamClient.authenticateCloudWallet({ did: projectDid ?? '' })

    const { vc } = await cloudWalletClient.signCredential(
      { vc: preferenceVc },
      { accessToken: cloudWalletAccessToken },
    )

    await cloudWalletClient.storeCredentials(
      {
        vcs: [vc as VerifiableCredential],
      },
      { accessToken },
    )

    success = true
  } catch (e) {
    console.error(e)
  }

  res.json({
    success: success,
  })
}
const generateGameReputationVc = async (
  holderDid: string,
  stats: GameReputationSubject,
): Promise<VerifiableCredential> => {
  return {
    '@context': [
      'https://www.w3.org/2018/credentials/v1',
      'https://schema.affinidi.com/GameReputationV1-3.jsonld',
      //LAB4     "https://schema.affinidi.com/GameReputationV1-4.jsonld",
    ],
    id: `claimId:${nanoid()}`,
    type: ['VerifiableCredential', 'GameReputation'],
    holder: {
      id: holderDid,
    },
    issuanceDate: new Date().toISOString(),
    credentialSubject: stats,
    credentialSchema: {
      type: 'JsonSchemaValidator2018',
      id: 'https://schema.affinidi.com/GameReputationV1-3.json',
      //LAB4 id:'https://schema.affinidi.com/GameReputationV1-4.json',
    },
  }
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)
