# Voting System REST API
![CI-voting-sys](https://github.com/fabidick22/voting-sys-rest-api/workflows/CI-voting-sys/badge.svg)

A REST API for voting system

**Characteristic:**
- MVC as a design pattern
- Basic token-based authentication (do not use this method, it is just an example)

### Main tools used
- [Express](https://expressjs.com/)
- [Mongodb](https://www.mongodb.com)
- [Mongoose]()
- [SwaggerUI](https://github.com/scottie1984/swagger-ui-express)
- [Morgan](https://github.com/expressjs/morgan)
- [Docker](https://www.docker.com/)

## Getting Started
Clone this repository and install dependencies
```
> git clone git@github.com:fabidick22/voting-sys-rest-api.git
> cd voting-sys-rest-api

> npm install
```
#### Run development with nodemon
```
> npm run  start
```

#### Build and run for production 
```
> npm run server
```

#### Tests (Not implemented yet)
Unit tests:
```
> npm run test:specs
```

Black-box end-to-end tests:
```
npm run test:e2e
```


### Deploy App
Make sure you have the `.env` file you can see the template in the `.env.template` file
_Example:_
```
NODE_ENV=development
DB_HOST=db                              (to connect in docker-compose)
DB_USER=root                            (database user for the app)
DB_PASS=superPasswd                     (database password for the app)
SECRET_TOKEN=""                         (optional for the dev environment)
MONGO_INITDB_ROOT_USERNAME=root         (for mongoDB)
MONGO_INITDB_ROOT_PASSWORD=superPasswd  (for mongoDB)
```
From the root directory:
```
# Build your docker
> docker-compose up
```

**Start local (dev) app and deploy mongo in Docker**
```
# Build your docker
> docker-compose up db
> npm start # dev environment
```

### Functionality test
After having the database and your API running, you can test the functionalities from the UI provided by swagger-UI.
You must bear in mind that first you have to create a user from this endpoint (`/users/signUp`) then you will have a token that you must set in the swagger authorizer to be able to use the other endpoits

## API documentation
Checkout `localhost:3000/docs`.
Base path: `localhost:3000/api/v1`

## Module structure
```
.
├── app.js
├── config
├── config.js
├── controllers
├── docker-compose.yml
├── Dockerfile
├── middlewares
├── models
├── node_modules
├── package.json
├── package-lock.json
├── README.md
├── routes
├── test
├── utils
└── votingOAS.yaml

8 directories, 8 files
```
### References:
- https://medium.com/wolox/documenting-a-nodejs-rest-api-with-openapi-3-swagger-5deee9f50420
- https://twm.me/correct-way-to-use-mongoose/
