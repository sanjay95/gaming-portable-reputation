# Portable reputation – Uses of Verifiable Credentials

This is a ready-to-use reference app that showcases usage of Affinidi API for issuing, sharing and storing verifiable credentials in the wallet.

---
<details>
  <summary> Lab 0 : </summary>

## Pre-Requisite

To run this lab you need to setup the Issuer credentails. 
To Know more about Issuer, [click here](https://academy.affinidi.com/what-are-verifiable-credentials-79f1846a7b9#:~:text=about%20these%20entities.-,Issuer,-An%20issuer%20is)

 To setup issuer credentails, you need PROJECT_ID, PROJECT_DID, API_KEY_HASH

We will use Affnidi's VS code extension tool to generate these required data.
#### Please follow the instruction below.

You need to have installed on your machine:

- [NodeJs v16 and higher](https://nodejs.org). (it's recommended to use [nvm](https://github.com/nvm-sh/nvm))

Instal Affinidi extension from extension market place:

```
Go to to extension market place and search Affinidi or Affinidi.affinidi
or browse https://marketplace.visualstudio.com/items?itemName=Affinidi.affinidi
```
[Affinidi's VS code Extension](https://marketplace.visualstudio.com/items?itemName=Affinidi.affinidi)

In order to use the extension, you first need to create an Affinidi account and a project

```
To do that, click on Affinidi logo in sidebar, then click on “Create an account with Affinidi”, 

enter your email and the OTP code that you received in your inbox.
```
![alt text](https://github.com/affinidi/vscode-extension/raw/HEAD/media/docs/create_account.png "")

Once the account is created, a project named Default Project will be created automatically. As part of it, a digital identity will be created for you – your personal DID.

Initially the Default Project will be set as your Active Project.

![alt text](https://github.com/affinidi/vscode-extension/raw/HEAD/media/docs/default_project.png)
![alt text](https://github.com/affinidi/vscode-extension/raw/HEAD/media/docs/inactive_projects.png)



Either create a new project or use the default project. 
To get the project details. click on default project as below.

<img width="1075" alt="image" src="https://user-images.githubusercontent.com/1314582/236203164-f3a74bb0-be58-4daf-a07b-8beb24ec8bc7.png">



Take the values  of PROJECT_ID, PROJECT_DID, API_KEY_HASH from here to use later in gaming project. 

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
   **Enter values for `PROJECT_ID`, `PROJECT_DID` and `API_KEY_HASH` from your Affinidi project properties** from previous steps.you can also use [CLI](https://github.com/affinidi/affinidi-cli) to create the project.
    
 4. Launch the app:
    ```
    $ npm run dev
    ```
    
    App will be available locally on http://localhost:3000.

</details>

---
<details>
  <summary> Lab 1 : </summary>

## use project to Issue and store Verifiable Credentails 

This is a simple web app with user resgitration and two simplae games.
You can play games without login, but stats and settings will not be saved. 

To persist the changes and create portable reputation. user need to login as game player. 

There will be total three types of Verifiable credentials will be created. 

1. Studio Profile
2. GameSetting
3. GameStats

### creating studio profile and Issuing ProfileVC

- browse the application at http://localhost:3000.
- Click on JOIN OUR TEAM button 
- enter email and provide the OTP
- first login will prompt to complete profile (here Studio profile VC will be issued to logged in user wallet)

As soon as you save profile, your wallet will be active with profile VC. 
You can browset [wallet credentials](http://localhost:3000/wallet) to view the credentials issued to you and stored in our wallet. 

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

<details>
  <summary> Lab 2 : </summary>
- CLick on first game [Board tennis](http://localhost:3000/Games/game1). This is simulated game where game level and no of hours played will keep increasing simulating hours of play.
- User has option to save the stats. Current stats will be issued as GameReputation Verifiable credentials to user wallet
- User may wish to play second game [Screen tennis](http://localhost:3000/Games/game2). Here user will be promted to import VC based on his logged in status. if not logged-in, user may login based on message displayed on screen
- if user wishes to import VCs and agrees to share with Screen tesnnis game, his settings and stats from first game will utulized and second game may honor the stats and offer to play from advanced level

</details>

---

<details>
  <summary> Lab 3 : </summary>

## change project with modified data issuance and verification

Current game stats just save Game level and no of hours played. 
Lets Include the scores of game too in Game stats. 

Please folllow the instruction below to enable new data in GameReputation issuance.

### Prepare VC schema 

- Let's add score to exiting game schema. 
- add scrore to game and add to game state 
- change the unsigned VC 
  

  </details>

  ---
