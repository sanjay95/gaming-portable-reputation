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


- Users may wish to play a second game [Screen tennis](http://localhost:3000/Games/game2). Here user will be prompted to import VC based on his logged-in status. If not logged in, the user may log in based on the message displayed on the screen
- if the user wishes to import VCs and agrees to share with the Screen tennis game, his settings and stats from the first game will be utilized and the second game may accept the stats and offer users to play the game from an advanced level.

</details>

---

<details>
  <summary> Lab 3 : </summary>

## Change project with modified data issuance and verification

Current game stats just save the Game level and the hours played. Let's Include the scores of the game too in Game stats. 

Please follow the instruction below to enable new data in GameReputation issuance.

### Prepare VC schema 

- Let's add the score to the existing game schema. 
- add score to game and add to game state 
- change the unsigned VC 
  

  </details>

  ---
