# PARKINGPAL - SEBA MASTER 2022

## Installation

- [Node.js](https://nodejs.org/) version as stated in .nvmrc

```sh
node -v
> v16.*
```
- [MongoDB](https://mongodb.com/) you can use local or MongoDB Atlas


### Server

- NodeJS
- MongoDB
- ExpressJS
- JWT
- Passport JS

First, fill out .env with valid values (check .env.example for reference)

```sh
cd server 
npm i
npm run dev
```
Server should listen on port 3001

## 
### Client

- ReactJS
- Axios
- React Router Dom
- MUI
- TAilwindCSS

```sh
cd client 
npm i
npm start
```

Client should run on port 3000

## Development Guidelines

### Client

#### Component Definition

```javascript
const Welcome = (props) => { 
  return <h1>Hello, {props.name}</h1>; 
}

export default Welcome;
```

#### Styling

- [TailwindCSS](https://tailwindcss.com/) - for styling components
- [Mui UI Library](https://mui.com/) - as component library


