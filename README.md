# Installation

1. Clone or fork this repo
2. Navigate in the terminal to this repo's folder on your local machine and run `npm i` to install all necessary dependencies.
3. Create a `.env` file in the root directory and populate with the URI of your SQL database for users.
4. Run the `npm run dev` command in the terminal to both build and start the application. 
    - Alternatively, you can run `npm start` to start the server, or `npm run build` to build using Webpack.
    - To run tests, run `npm test`.

    "start": "NODE_ENV=production node server/server.js",
    "build": "NODE_ENV=production webpack",
    "dev": "NODE_ENV=development concurrently \"webpack-dev-server --open --history-api-fallback\" \"nodemon ./server/server.js\" ",
    "test": "NODE_ENV=test jest --verbose"