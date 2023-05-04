import { z } from 'zod'
import { use } from 'next-api-middleware'
import type { NextApiRequest, NextApiResponse } from 'next'
import { authenticateCloudWallet } from '../helpers/authenticate-cloud-wallet'
import { allowedHttpMethods } from '../middlewares/allowed-http-methods'
import { errorHandler } from '../middlewares/error-handler'
import { cloudWalletClient } from '../clients/cloud-wallet-client'
import { VerifiableCredential } from 'types/vc'

const requestSchema = z
  .object({
    vcId: z.string(),
  })
  .strict()

async function handler(req: NextApiRequest, res: NextApiResponse<void>) {
  const accessToken = authenticateCloudWallet(req)

  const { vcId } = requestSchema.parse(req.body)
  console.log('Delete operation for ID : ', vcId)


  await cloudWalletClient.deleteCredentials(
    {
      vcId: vcId,
    },
    { accessToken }
  )

  res.status(200).end()
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)
