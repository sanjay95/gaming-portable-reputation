# Portable reputation – Uses of Verifiable Credentials

This is a ready-to-use reference app that showcases usage of Affinidi API for issuing, sharing and storing verifiable credentials in the wallet.

---

## Pre-Requisite

To run this lab you need to setup the Issuer credentails. 
To Know more about Issuer, [click here](https://academy.affinidi.com/what-are-verifiable-credentials-79f1846a7b9#:~:text=about%20these%20entities.-,Issuer,-An%20issuer%20is)

 To setup issuer credentails, you need PROJECT_ID, PROJECT_DID, API_KEY_HASH

We will use Affnidi's CLI tool to generate these required data.
#### Please follow the instruction below.

You need to have installed on your machine:

- [NodeJs v16 and higher](https://nodejs.org). (it's recommended to use [nvm](https://github.com/nvm-sh/nvm))

Run the installation command:

```
npm install -g @affinidi/cli
```

To check Affinidi CLI version:

```
affinidi --version
```

&nbsp;


To start using Affinidi's privacy-preserving tools, please follow the next two steps:

1. authenticate by creating an account, or logging in to your account if you already have one
2. create a project, or activate a project if you already created one

### Authentication:

You will need your email address, and then the code sent to your email to confirm authentication.

To create an account:

```
affinidi sign-up
```

If you already have an account:

```
affinidi login
```

### Create or activate a project:

The `create` command creates and activates a project. Follow the prompts to choose a name or add a name directly after the command.

```
affinidi create project
```

The `use` command activates an already existing project:

```
affinidi use project [<project-id>]
```

You can also simply type this and follow the prompts to choose from a list of existing projects:

```
affinidi use project
```
To see the details of project for API key hash, DID and Project ID 

```
affinidi show project <project-id>
```
Take the values from here to use later in gaming project. 

---