import { z } from 'zod'
import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'
import { dataProviderVcTypes } from 'utils/data-providers'
import { ApiError } from '../api-error'
import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { verifierClient } from '../clients/verifier-client'
import { cloudWalletClient } from '../clients/cloud-wallet-client'
import { iamClient } from '../clients/iam-client'
import { projectDid } from '../env'
import { verifyShareResponseTokenResult } from 'types/verifyShareResponseResult'

type HandlerResponse = {
  verifyShareResponseTokenResult: verifyShareResponseTokenResult
}

const requestSchema = z
  .object({
    shareRequestToken: z.string(),
    shareResponseToken: z.string(),
  })
  .strict()

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  //console.log('body',req.body);
  const { shareRequestToken, shareResponseToken } = requestSchema.parse(req.body)
  const {
    wallet: { accessToken: cloudWalletAccessToken },
  } = await iamClient.authenticateCloudWallet({ did: projectDid ?? '' })

  const { verifyShareResponseTokenResult } = await verifierClient.verifyShareResponse(
    { shareRequestToken, shareResponseToken },
    { accessToken: cloudWalletAccessToken })

  res.status(200).json(verifyShareResponseTokenResult as verifyShareResponseTokenResult)
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)
