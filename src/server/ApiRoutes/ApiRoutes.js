import express from 'express';
import axios from 'axios';

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
      angularApps: [
        { id: 'Locations', link: 'https://nypl.org/locations' },
        { id: 'Divisions', link: 'https://nypl.org/research-divisions' },
        { id: 'Profiles', link: 'https://nypl.org/staff-profiles' },
      ],
      reactApps: [
        { id: 'Staff Picks', link: 'https://nypl.org/staffpicks' },
        {
          id: 'Book Lists',
          link: 'https://nypl.org/browse/recommendations/lists/nypl_mid_manhattan',
        },
        { id: 'Header', link: 'https://nypl.org' },
        { id: 'Homepage', link: 'https://nypl.org' },
        { id: 'New Arrivals', link: 'https://nypl.org/newarrivals' },
        { id: 'Search Beta', link: 'https://nypl.org/searchbeta' },
        { id: 'Blogs Beta', link: 'https://nypl.org/blog/beta' },
      ]
    },
  };

  next();
}

router
  .route('/')
  .get(MainApp);

export default router;
