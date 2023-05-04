import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { use } from "next-api-middleware";
import { allowedHttpMethods } from "../middlewares/allowed-http-methods";
import { errorHandler } from "../middlewares/error-handler";
import { cloudWalletClient } from "../clients/cloud-wallet-client";
import { authenticateCloudWallet } from "../helpers/authenticate-cloud-wallet";

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const accessToken = authenticateCloudWallet(req);
    const { vcs } = await cloudWalletClient.getCredentials({}, { accessToken });

    const preferenceVc = vcs
        .filter((x) => x.type.includes("GameSettings"))
        .pop();

    res.json(preferenceVc?.credentialSubject);
}

export default use(allowedHttpMethods("GET"), errorHandler)(handler);
