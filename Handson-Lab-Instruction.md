# Portable reputation – Uses of Verifiable Credentials

This is a ready-to-use reference app that showcases the usage of Affinidi API for issuing, sharing and storing verifiable credentials in the wallet.

---
<details>
  <summary> Lab 0 : </summary>

## Pre-Requisite

To run this lab you need to set up the Issuer credentials. 
To Know more about Issuer, [click here](https://academy.affinidi.com/what-are-verifiable-credentials-79f1846a7b9#:~:text=about%20these%20entities.-,Issuer,-An%20issuer%20is)

 To set up issuer credentials, you need PROJECT_ID, PROJECT_DID, API_KEY_HASH

you will use Affnidi's VS code extension tool to generate these required data.
#### Please follow the instruction below.

You need to have the following installed on your machine:

- [NodeJs v16 and higher](https://nodejs.org). (it's recommended to use [nvm](https://github.com/nvm-sh/nvm))
- [VS Code](https://code.visualstudio.com/)

Instal Affinidi extension from extension marketplace:

```
Go to to extension market place and search Affinidi or Affinidi.affinidi
or browse https://marketplace.visualstudio.com/items?itemName=Affinidi.affinidi
```
[Affinidi's VS Code Extension](https://marketplace.visualstudio.com/items?itemName=Affinidi.affinidi)

To use the extension, you first need to create an Affinidi account and a project

```
To do that, click on Affinidi logo in sidebar, then click on “Create an account with Affinidi”, 

enter your email and the OTP code that you received in your inbox.
```
![alt text](https://github.com/affinidi/vscode-extension/raw/HEAD/media/docs/create_account.png "")

Once the account is created, a project named Default Project will be created automatically. As part of it, a digital identity will be created for you – your personal DID.
Initially, the Default Project will be set as your Active Project.

![alt text](https://github.com/affinidi/vscode-extension/raw/HEAD/media/docs/default_project.png)
![alt text](https://github.com/affinidi/vscode-extension/raw/HEAD/media/docs/inactive_projects.png)



Either create a new project or use the default project. 
To get the project details. click on the default project below.

<img width="1075" alt="image" src="https://user-images.githubusercontent.com/1314582/236203164-f3a74bb0-be58-4daf-a07b-8beb24ec8bc7.png">
Take the values of PROJECT_ID, PROJECT_DID, and API_KEY_HASH from here to use later in the gaming project. 

---


## Setup Project 
Setting up the reference app is easy, just follow these steps:  
1. Clone the repo:
    ```
    $ git clone https://github.com/sanjay95/gaming-portable-reputation.git
    $ cd gaming-portable-reputation
    
    ```
2. Install the dependencies:
    ```
    $ npm install
    ```
3. Create a `.env` file:
    ```
    $ cp .env.example .env
    ```
   **Enter values for `PROJECT_ID`, `PROJECT_DID` and `API_KEY_HASH` from your Affinidi project **properties** from the previous steps. you can also use [CLI](https://github.com/affinidi/affinidi-cli) to create the project.
    
 4. Launch the app:
The app will be available locally on http://localhost:3000.

</details>

---
<details>
  <summary> Lab 1 : </summary>

## Use the project to Issue and store Verifiable Credentials 

This is a simple web app with user registration and two simple games.
You can play games without login, but game stats and settings will not be saved. 


There will be a total of three types of Verifiable credentials created. 

1. Studio Profile
2. GameSetting
3. GameStats

### Creating studio profile and Issuing ProfileVC

- browse the application at http://localhost:3000.
- click on the JOIN OUR TEAM button 
- enter your email and provide the OTP
- the first login will prompt you to complete the profile (here Studio profile VC will be issued to the logged-in user's wallet)

As soon as you save your profile, your wallet will be active with profile VC. 
You can browse [wallet credentials](http://localhost:3000/wallet) to view the credentials issued to you and stored in your wallet. 

### `Issuance` 
```typescript
//pages/components/StudioProfileSetup/useProfile.ts
const {
      data: { vc },
    } = await axios<{ vc: VerifiableCredential }>(
      '/api/data-providers/StudioProfile/issue-vc',
      {
        method: 'POST',
        data: {
          holderDid,
          useremail,
          usermobile,
          userName,
          userage,
          usercountry,
          usercity,
        },
      },
    )

    // make unsigned VC
    //pages/api/data-providers/StudioProfile/issue-vc.page.ts
     const unsignedStudioProfileVc = generateStudioProfileVc(
    holderDid,
    credentialSubject
  )

  //sign credentials 
  //pages/api/data-providers/StudioProfile/issue-vc.page.ts
  const { vc } = await cloudWalletClient.signCredential(
    { vc: unsignedStudioProfileVc },
    { accessToken: cloudWalletAccessToken }
  )

// Final call to Affinidi API from Issuer for signing
//pages/api/clients/cloud-wallet-client.ts
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
  }

```
### `Storage`


```typescript
//Store signed credentials in user wallet
//pages/components/StudioProfileSetup/useProfile.ts
 await axios('/api/cloud-wallet/store-vc', {
      method: 'POST',
      headers: createCloudWalletAuthenticationHeaders(),
      data: { vc },
    })

//Final call to Affinidi API from holder to store the given VC in wallet
//pages/api/clients/cloud-wallet-client.ts
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
  }

```
</details>

---

<details>
  <summary> Lab 2 : </summary>

  ## Issue Game Settings as digital credentials

- Click on the first game [Board tennis](http://localhost:3000/Games/game1). This is a simulated game where the game level and no. of hours played will keep increasing which simulates actual game hours.
  - To make the system play as both players, ``press 0``
 - you may change the game settings like Theme color, game sound and Alias, these settings will be issued as VC to your wallet only if you press the `save settings` button 
 - Once you press the save settings button, a VC is issued by the application and stored in your credentials wallet.
 - you may check the newly issued VC from the menu [wallet credentials](http://localhost:3000/wallet)](http://localhost:3000/wallet)

## `Issuance of game settings as VC`

```typescript
//Game settings type
//types/vc.ts
type Preferences = {
    gamename?: string
    vcId?: string
    nickname: string
    themecolor: string
    gamevolume: string
}

// Internal call to use game settings to issue as VC 
//pages/Games/game1/components/SaveGamePreferences.tsx
await axios(
                `/api/game/export-preferences`,
                {
                    method: "POST",
                    headers,
                    data: preferences,
                }
            );
```
#### `Backend API Operation to Get access token of User's Wallet and Project wallet create Unsinged VC, sign Unsigned VC using project credentials, store signed VC in user's wallet using user's wallet credentials `

```typescript
//pages/api/game/export-preferences.page.ts
```
   #### `Getting access token of user wallet to store VC `
```typescript
  const accessToken = authenticateCloudWallet(req);
```
   #### `creating Unsinged VC`
 ```typescript 
const preferenceVc = await generatePreferencesVc(
            holderDid.did,
            preferences
        );
```
  #### `getting access token of Project's wallet to sign VC `

```typescript 
const {
            wallet: { accessToken: cloudWalletAccessToken },
```
   #### `signing VC using the project's credentials`   
     
```typescript 
        
const { vc } = await cloudWalletClient.signCredential(
            { vc: preferenceVc },
            { accessToken: cloudWalletAccessToken }
        );
```
 #### `storing signed VC in the user's wallet by calling to wallet client function `
 
```typescript 
 await cloudWalletClient.storeCredentials(
            {
                vcs: [vc as VerifiableCredential],
            },
            { accessToken }
        );

        success = true;
            
```


</details>

---

<details>
  <summary> Lab 3 : </summary>

## Request credentials to provide a seamless experience
 - While Still logged in go to the second game [Screen](http://localhost:3000/Games/game2) tennis](http://localhost:3000/Games/game2)
 - You may play the game here and build your level with the default color profile and - settings 
 - The second game provides an option to import game reputation, game settings and profile VC if you already have it and use them to provide you a seamless transition from the previous game
 - once you click the import button following operation starts
    - A `Share REQUEST Token` for three types of VC is generated 
      - Studio profile VC
      - GameSettings VC
      - Game stats VC
    - Upon receiving the request token, the application checks if the user has the requested VCs.
    - Consent is taken from the user to share the available VC for requested VC types if the user has the VC in the wallet.
    - If user gives consent to share VC, a `Share RESPONSE Token` is generated using the user's wallet credentials. This token is passed to the game.
    - The game application validates the `RESPONSE` token against the `REQUEST` Token. If the token is valid, it will utilize the data from VC to offer a personalized gaming experience 

#### `Create share request token`

```typescript
//pages/Games/game2/index.page.tsx
 const vcTypes = ["AffinidiStudioProfileVC", "GameSettings","GameReputation"];
 //verifier building share REQUEST token of two VC type, studio and game settings
  const reqToken = await GenerateRequestToken(vcTypes);
//pages/Games/tokenOperations.ts
  const response = await axios(
            '/api/verifier/share-request-token',
            {
                method: 'POST',
                headers: createCloudWalletAuthenticationHeaders(),
                data: { credentialsType: vcTypes }
            }

        )

//pages/api/verifier/share-request-token.page.ts
 const {
    wallet: { accessToken: cloudWalletAccessToken },
  } = await iamClient.authenticateCloudWallet({ did: projectDid ?? '' })

  const { shareRequestToken } = await cloudWalletClient.createShareRequestToken(
    { credentialsType },
    { accessToken: cloudWalletAccessToken }
  );


//pages/api/clients/cloud-wallet-client.ts
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

```
#### `Check available VC in the wallet for a request token`

```typescript
 //pages/api/holder/get-vcs-for-shareRequestToken.page.ts
 const { vcs } = await cloudWalletClient.getCredentialsForRequestToken({shareRequestToken}, { accessToken });
//pages/api/clients/cloud-wallet-client.ts
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

```

#### `Create a share response token for a request token`

```typescript
//pages/api/holder/build-shaResponseToken.page.ts
const accessToken = authenticateCloudWallet(req);

const { shareRequestToken } = requestSchema.parse(req.body);

const { vcs } = await cloudWalletClient.getCredentialsForRequestToken({ shareRequestToken }, { accessToken });

const { shareResponseToken } = await cloudWalletClient.getShareResponseToken({ shareRequestToken, vcs }, { accessToken });

//pages/api/clients/cloud-wallet-client.ts

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

```

#### `Validate share response token`

```typescript
//pages/api/verifier/verify-shareResponseToken.page.ts

 const { shareRequestToken, shareResponseToken } = requestSchema.parse(req.body)
  const {
    wallet: { accessToken: cloudWalletAccessToken },
  } = await iamClient.authenticateCloudWallet({ did: projectDid ?? '' })

  const { verifyShareResponseTokenResult } = await verifierClient.verifyShareResponse(
    { shareRequestToken, shareResponseToken },
    { accessToken: cloudWalletAccessToken })

//pages/api/clients/verifier-client.ts
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

```

  </details>

  ---


