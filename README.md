# gaming-portable-reputation
Showcasing portable reputation in gaming using Affinidi's verifiable credentials ecosystem. 

This solution aims to provoke thought process of  gamig studios 
with the ability to chart the course for their 
players' success by offering a portable gaming 
reputation that maximises the use of zero-party 
data with Affinidi developer tools. 

Affinidi's comprehensive suite of developer tools, 
services, and privacy-preserving technologies 
helps gaming studios attract new customers and 
retain more players, ensuring a more secure and 
immersive gaming experience for everyone

## Getting started

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
   **Enter values for `PROJECT_ID`, `PROJECT_DID` and `API_KEY_HASH` from your Affinidi project properties.** These are filled for you automatically if you used the [VS Code Extension](https://github.com/affinidi/vscode-extension) or [CLI](https://github.com/affinidi/affinidi-cli) to generate the app.
    
 4. Launch the app:
    ```
    $ npm run dev
    ```
    
    App will be available locally on http://localhost:3000.


## Run Local
 ```
    npm run dev
 ```

## Run with docker
 ```
   COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose build

   docker-compose up -d
   
 ```
 
 
 
 
## Tools & frameworks

This project is built with **NextJS** framework, which allows you to quickly build apps using **TypeScript** and **React**. NextJS has built-in router, server-side rendering, backend support and useful extensions like Next Auth for authenticating via Github and other data providers.  
Read [NextJS docs](https://nextjs.org/docs/getting-started){:target="_blank" rel="noopener"}, [React docs](https://reactjs.org/docs/getting-started.html).  

We also use **Styled Components** and **Tailwind CSS** to build the UI.  
Read [Styled Components docs](https://styled-components.com/docs), [Tailwind CSS docs](https://tailwindcss.com/docs/installation). 

To make API requests, **axios** library is used.  
Read [axios docs](https://axios-http.com/docs/intro).  

Backend requests are validated with **zod** and logged with **pino**.  
Read [Zod docs](https://www.npmjs.com/package/zod), [pino docs](https://www.npmjs.com/package/pino).  

Github profile data is fetched using **Octokit** and **GraphQL**.  
Read [Octokit docs](https://github.com/octokit/octokit.js), [GraphQL docs](https://graphql.org/learn/).  
 
