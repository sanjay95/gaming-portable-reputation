import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { use } from "next-api-middleware";
import { allowedHttpMethods } from "../middlewares/allowed-http-methods";
import { errorHandler } from "../middlewares/error-handler";
import { cloudWalletClient } from "../clients/cloud-wallet-client";
import { authenticateCloudWallet } from "../helpers/authenticate-cloud-wallet";



const requestSchema = z
    .object({
        shareRequestToken: z.string(),
    })
    .strict()

async function handler(req: NextApiRequest, res: NextApiResponse<string>) {
    const accessToken = authenticateCloudWallet(req);

    const { shareRequestToken } = requestSchema.parse(req.body);

    const { vcs } = await cloudWalletClient.getCredentialsForRequestToken({ shareRequestToken }, { accessToken });

    const { shareResponseToken } = await cloudWalletClient.getShareResponseToken({ shareRequestToken, vcs }, { accessToken });

    res.json(shareResponseToken);
}

export default use(allowedHttpMethods("POST"), errorHandler)(handler);
