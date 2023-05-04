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
    const hasPreferenceVc = vcs.some((x) =>
        x.type.includes("GameSettings")
    );
    const preferencevc= vcs.find((x)=>x.type.includes("GameSettings"))
   
    res.json({
        hasPreferences: hasPreferenceVc,
        preferencevc:preferencevc
    });
}

export default use(allowedHttpMethods("POST"), errorHandler)(handler);
