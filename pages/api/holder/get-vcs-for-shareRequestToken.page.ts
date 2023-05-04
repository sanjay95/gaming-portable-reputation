import { z } from "zod";
import { use } from "next-api-middleware";
import type { NextApiRequest, NextApiResponse } from "next";
import { allowedHttpMethods } from "../middlewares/allowed-http-methods";
import { errorHandler } from "../middlewares/error-handler";
import { cloudWalletClient } from "../clients/cloud-wallet-client";
import { authenticateCloudWallet } from "../helpers/authenticate-cloud-wallet";
import { VerifiableCredential } from "types/vc";

type HandlerResponse = {
  vcs: VerifiableCredential[]
}

const requestSchema = z
  .object({
    shareRequestToken: z.string(),
  })
  .strict()

async function handler(req: NextApiRequest, res: NextApiResponse<HandlerResponse>) {
    const accessToken = authenticateCloudWallet(req);
    
    const {shareRequestToken}=requestSchema.parse(req.body);

    const { vcs } = await cloudWalletClient.getCredentialsForRequestToken({shareRequestToken}, { accessToken });

    const preferenceVc = vcs
        .filter((x) => x.type.includes("GameSettings"))
        .pop();

    res.json({vcs});
}

export default use(allowedHttpMethods("POST"), errorHandler)(handler);
