import express from 'express';
import axios from 'axios';
import parser from 'jsonapi-parserinator';

import appConfig from '../../../appConfig.js';

// Syntax that both ES6 and Babel 6 support
const { api } = appConfig;

const router = express.Router();
const appEnvironment = process.env.APP_ENV || 'production';
const apiRoot = api.root[appEnvironment];

function createOptions(apiValue) {
  return {
    endpoint: `${apiRoot}${apiValue.endpoint}`,
    includes: apiValue.includes,
    filters: apiValue.filters,
  };
}

function fetchApiData(url) {
  return axios.get(url);
}

function MainApp(req, res, next) {
  res.locals.data = {
    Store: {
      _angularApps: ['Locations', 'Divisions', 'Profiles'],
      _reactApps: ['Staff Picks', 'Header', 'Book Lists'],
    },
  };

  next();
}


router
  .route('/')
  .get(MainApp);

export default router;
