# PARKINGPAL - SEBA MASTER 2022
## Installation

- [Node.js](https://nodejs.org/) use version in .nvrmc
- NPM

```sh
node -v
> v16.*

npm -v
> v8.*
```

- [MongoDB](https://mongodb.com/) you can use local or MongoDB Atlas


## Server Setup
### Copy .env.example and fill out a local .env with valid values
```sh
cp .env.example .env  
```
### Run server

```sh
npm i # only required on package updates and first setup
npm run dev:server # start server in dev mode (nodemon)
```

On success, server should now be running on port 3001.

## Client Setup
### Copy .env.example and fill out a local .env with valid values
```sh
cp .env.example .env  
```
### Start client

```sh
cd client 
npm i
npm start
```

Client should now be running on port 3000

## Other
### React Component Definitions

Use functional components over class components:

```javascript
const Welcome = (props) => { 
  return <h1>Hello, {props.name}</h1>; 
}

export default Welcome;
```
### Code Formatting

[Prettier](https://prettier.io/docs/en/options.html) - > .prettierrc
 
Can be set as default formatter in VSCODE
## Styling

- [TailwindCSS](https://tailwindcss.com/) - for styling components
- [Mui UI Library](https://mui.com/) - as component library



