// TODO: replace with client-sdk

import axios from 'axios'
import { VerifiableCredential } from 'types/vc'
import { apiKeyHash, cloudWalletApiUrl } from '../env'
import { input } from 'zod';


type Options = {
  accessToken: string;
};

export const cloudWalletClient = {
  signInPasswordless: async (input: {
    username: string;
  }): Promise<{ token: string }> => {
    const { data: token } = await axios<string>(
      `${cloudWalletApiUrl}/v1/users/sign-in-passwordless`,
      {
        method: 'POST',
        headers: {
          'Api-Key': apiKeyHash,
        },
        data: input,
      }
    )

    return { token }
  },
  confirmSignInPasswordless: async (input: {
    token: string;
    confirmationCode: string;
  }): Promise<{ accessToken: string }> => {
    const {
      data: { accessToken },
    } = await axios<{ accessToken: string }>(
      `${cloudWalletApiUrl}/v1/users/sign-in-passwordless/confirm`,
      {
        method: 'POST',
        headers: {
          'Api-Key': apiKeyHash,
        },
        data: input,
      }
    )

    return { accessToken }
  },
  getDid: async (options: Options): Promise<{ did: string }> => {
    const { data: did } = await axios<string>(
      `${cloudWalletApiUrl}/v1/users/get-did`,
      {
        method: 'GET',
        headers: {
          'Api-Key': apiKeyHash,
          Authorization: options.accessToken,
        },
      }
    )

    return { did }
  },
  logout: async (options: Options): Promise<void> => {
    await axios<void>(`${cloudWalletApiUrl}/v1/users/logout`, {
      method: 'POST',
      headers: {
        'Api-Key': apiKeyHash,
        Authorization: options.accessToken,
      },
    })
  },
  getCredentials: async (input: {}, options: Options): Promise<{ vcs: VerifiableCredential[] }> => {
    const { data: vcs } = await axios<VerifiableCredential[]>(
      `${cloudWalletApiUrl}/v1/wallet/credentials`,
      {
        method: 'GET',
        headers: {
          'Api-Key': apiKeyHash,
          Authorization: options.accessToken,
        },
      }
    )

    return { vcs }
  },
  signCredential: async (input: { vc: VerifiableCredential }, options: Options): Promise<{ vc: VerifiableCredential }> => {
    const {
      data: { signedCredential: vc },
    } = await axios<{ signedCredential: VerifiableCredential }>(
      `${cloudWalletApiUrl}/v1/wallet/sign-credential`,
      {
        method: 'POST',
        headers: {
          'Api-Key': apiKeyHash,
          Authorization: options.accessToken,
        },
        data: {
          unsignedCredential: input.vc,
        },
      }
    )

    return { vc }
  },
  storeCredentials: async (
    input: { vcs: VerifiableCredential[] },
    options: Options
  ): Promise<void> => {
    await axios<void>(`${cloudWalletApiUrl}/v1/wallet/credentials`, {
      method: 'POST',
      headers: {
        'Api-Key': apiKeyHash,
        Authorization: options.accessToken,
      },
      data: {
        data: input.vcs,
      },
    })
  },
  retrieveSharedCredential: async (input: { hash: string; key: string }): Promise<{ vc: VerifiableCredential }> => {
    const { data: vc } = await axios<VerifiableCredential>(`${cloudWalletApiUrl}/v1/share/${input.hash}`, {
      method: 'GET',
      headers: {
        'Api-Key': apiKeyHash,
      },
      params: {
        key: input.key,
      },
    })

    return { vc }
  },
  deleteCredentials: async (input: { vcId: string },
    options: Options): Promise<{ vc: any }> => {
    const { data: vc } = await axios<VerifiableCredential>(`${cloudWalletApiUrl}/v1/wallet/credentials/${input.vcId}`, {
      method: 'DELETE',
      headers: {
        'Api-Key': apiKeyHash,
        Authorization: options.accessToken,
      },

    })

    return { vc }
  },


  createShareRequestToken: async (input: { credentialsType: Array<string> }, options: Options):
    Promise<{ shareRequestToken: string }> => {
      const types = input.credentialsType.map((i)=>({type:[i]}))
      console.log('requested credentials types', types  );
     const {  data: shareRequestToken } = await axios<string>(
      `${cloudWalletApiUrl}/v1/wallet/credential-share-token/generate-request-token`,
      {
        method: 'POST',
        headers: {
          'Api-Key': apiKeyHash,
          Authorization: options.accessToken,
        },
        data: {
          requirements: types,      
        },
      }
    )

    return { shareRequestToken }
  },
  
  getCredentialsForRequestToken: async (input: {shareRequestToken:string}, options: Options): Promise<{ vcs: VerifiableCredential[] }> => {
    const { data: vcs } = await axios<VerifiableCredential[]>(
      `${cloudWalletApiUrl}/v1/wallet/credentials?credentialShareRequestToken=${input.shareRequestToken}`,
      {
        method: 'GET',
        headers: {
          'Api-Key': apiKeyHash,
          Authorization: options.accessToken,
        },
      }
    )

    return { vcs }
  },

  
  getShareResponseToken: async (input: {shareRequestToken:string, vcs:  VerifiableCredential[]}, options: Options): 
  Promise<{ shareResponseToken: string }> => {
    const { data: shareResponseToken } = await axios<string>(
      `${cloudWalletApiUrl}/v1/wallet/credential-share-token/create-response-token`,
      {
        method: 'POST',
        headers: {
          'Api-Key': apiKeyHash,
          Authorization: options.accessToken,
        },
        data: {
          credentialShareRequestToken: input.shareRequestToken,
          credentials:input.vcs
        },
      }
    )

    return { shareResponseToken }
  },
 
}
function i(value: string, index: number, array: string[]): unknown {
  throw new Error('Function not implemented.');
}

