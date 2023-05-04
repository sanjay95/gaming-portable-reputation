import type { NextApiRequest, NextApiResponse } from 'next'
import { z } from 'zod'
import { use } from 'next-api-middleware'
import { VerifiableCredential } from 'types/vc'
import { allowedHttpMethods } from '../../middlewares/allowed-http-methods'
import { errorHandler } from '../../middlewares/error-handler'
import { cloudWalletClient } from '../../clients/cloud-wallet-client'
import { iamClient } from '../../clients/iam-client'
import { projectDid } from '../../env'
import { gatherStudioProfile } from './helpers/gather-Studio-profile'
import { generateStudioProfileVc } from './helpers/generate-Studio-profile-vc'

type HandlerResponse = {
  vc: VerifiableCredential;
};

const requestSchema = z
  .object({
    holderDid: z.string(),
    useremail: z.string(),
    usermobile: z.string(),
    userName: z.string(),
    userage: z.string(),
    usercountry: z.string(),
    usercity: z.string(),
  })
  .strict()

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<HandlerResponse>
) {


  const { holderDid, ...rest } = requestSchema.parse(req.body)
  console.log('rest', { ...rest })

  const credentialSubject = await gatherStudioProfile({ ...rest })

  const unsignedStudioProfileVc = generateStudioProfileVc(
    holderDid,
    credentialSubject
  )

  const {
    wallet: { accessToken: cloudWalletAccessToken },
  } = await iamClient.authenticateCloudWallet({ did: projectDid ?? '' })

  const { vc } = await cloudWalletClient.signCredential(
    { vc: unsignedStudioProfileVc },
    { accessToken: cloudWalletAccessToken }
  )

  res.status(200).json({ vc })
}

export default use(allowedHttpMethods('POST'), errorHandler)(handler)


