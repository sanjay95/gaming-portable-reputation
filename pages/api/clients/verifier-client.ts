// TODO: replace with client-sdk

import axios from 'axios'
import { VerifiableCredential } from '../../../types/vc'
import { apiKeyHash, verifierApiUrl } from '../env'
import { verifyShareResponseTokenResult } from 'types/verifyShareResponseResult';

type Options = {
  accessToken: string;
};

type VerifyCredentialOutput = {
  errors: string[]
  isValid: boolean
}

export const verifierClient = {
  verifyCredentials: async (input: { verifiableCredentials: VerifiableCredential[] }): Promise<VerifyCredentialOutput> => {
    const { data } = await axios<VerifyCredentialOutput>(
      `${verifierApiUrl}/v1/verifier/verify-vcs`,
      {
        method: 'POST',
        headers: {
          'Api-Key': apiKeyHash,
        },
        data: input,
      }
    )

    return data
  },

  verifyShareResponse: async (input: {shareRequestToken:string, shareResponseToken:  string}, options: Options): 
  Promise<{ verifyShareResponseTokenResult: verifyShareResponseTokenResult }> => {
    const { data: verifyShareResponseTokenResult } = await axios<verifyShareResponseTokenResult>(
      `${verifierApiUrl}/v1/verifier/verify-share-response`,
      {
        method: 'POST',
        headers: {
          'Api-Key': apiKeyHash,
          Authorization: options.accessToken,
        },
        data: {
          credentialShareRequestToken: input.shareRequestToken,
          credentialShareResponseToken:input.shareResponseToken
        },
      }
    )

    return { verifyShareResponseTokenResult }
  },
}
