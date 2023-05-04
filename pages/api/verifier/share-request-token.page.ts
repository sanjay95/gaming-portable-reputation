import { z } from 'zod'
import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'
import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { cloudWalletClient } from '../clients/cloud-wallet-client'
import { iamClient } from '../clients/iam-client'
import { projectDid } from '../env'



const requestSchema = z
  .object({
    credentialsType: z.array(z.string()),
    holderdid: z.string().optional()
  })
  .strict()

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { credentialsType } = requestSchema.parse(req.body)
  const {
    wallet: { accessToken: cloudWalletAccessToken },
  } = await iamClient.authenticateCloudWallet({ did: projectDid ?? '' })

  const { shareRequestToken } = await cloudWalletClient.createShareRequestToken(
    { credentialsType },
    { accessToken: cloudWalletAccessToken }
  );



  res.status(200).json( shareRequestToken )
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)
