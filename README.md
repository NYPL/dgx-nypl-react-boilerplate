# NYPL React Boilerplate

Isomorphic React boilerplate

The goods:

* ES6 - compile with Babel and Webpack
* Flux - [Alt](http://alt.js.org/) and [Iso](https://github.com/goatslacker/iso)
* Webpack-dev-server with react-hot-loader
* NYPL Header and Footer npm modules
_NOTE_: This app is currently running on React 16. The NYPL Header and Footer are not on React 16 at the moment so they have been temporarily excluded. 

### Usage
Clone the repo and run `npm install`.
Then run `npm run init` which will:
* remove the git reference and create a new one
* run through `npm init`. Do this to create a new repo name.

### Starting the app
When running the app in development or production mode, the local server will be located at `localhost:3001`.

#### Development mode
Run the app in development mode with `npm run start:dev`. This will also create a webpack dev server. The webpack dev server will pick up any changes in the React components and live reload the page.

#### Production mode
Run the app in production mode with `npm start`. This will compile the Javascript and SCSS into separate minified files.

### Test
To run unit tests, run `npm test` in the terminal. Or run `npm run test-with-coverage` to run the test and see the test coverage.
