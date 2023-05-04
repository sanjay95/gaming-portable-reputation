import axios from "axios";
import { createCloudWalletAuthenticationHeaders } from 'hooks/useAuthentication'
import { verifyShareResponseTokenResult } from "types/verifyShareResponseResult";

export const GenerateRequestToken = async (vcTypes: string[]) => {
    try {
        const response = await axios(
            '/api/verifier/share-request-token',
            {
                method: 'POST',
                headers: createCloudWalletAuthenticationHeaders(),
                data: { credentialsType: vcTypes }
            }

        )
        return response.data;
    } catch (e) {
        console.error(e)
    }
}
export const retrieveVCForRequestedToken = async (requestToken: string) => {
    try {
        const response = await axios(
            '/api/holder/get-vcs-for-shareRequestToken',
            {
                method: 'POST',
                headers: createCloudWalletAuthenticationHeaders(),
                data: { shareRequestToken: requestToken }
            }

        )
        return response.data;
    } catch (e) {
        console.error(e)
    }
}

export const generateShareResponseToken = async (requestToken: string) => {
    try {
        const response = await axios(
            '/api/holder/build-shaResponseToken',
            {
                method: 'POST',
                headers: createCloudWalletAuthenticationHeaders(),
                data: { shareRequestToken: requestToken }
            }

        )
        return response.data;
    } catch (e) {
        console.error(e)
    }
}
export const verifyShareResponseTokenPage = async (requestToken: string, responseToken: string) => {
    try {

        const response = await axios(
            '/api/verifier/verify-shareResponseToken',
            {
                method: 'POST',
                headers: createCloudWalletAuthenticationHeaders(),
                data: {
                    shareRequestToken: requestToken,
                    shareResponseToken: responseToken
                }
            }

        )
        return response.data as verifyShareResponseTokenResult;
    } catch (e) {
        console.error(e)
    }
}

export const hasPreferenceVC = async (): Promise<boolean> => {
    try {
        const response = await axios(`/api/game/has-preferences`, {
            method: "POST",
            headers: createCloudWalletAuthenticationHeaders(),
        });
        return response.data.hasPreferences;
    } catch (e) {
        console.error(e);
    }

    return false;
};