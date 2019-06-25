import path from 'path';
import express from 'express';
import compress from 'compression';
import colors from 'colors';

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Iso from 'iso';
import alt from './src/app/alt.js';

import appConfig from './appConfig.js';
import { config as analyticsConfig } from 'dgx-react-ga';

import Application from './src/app/components/Application/Application.jsx';
import apiRoutes from './src/server/ApiRoutes/ApiRoutes.js';

const ROOT_PATH = __dirname;
const INDEX_PATH = path.resolve(ROOT_PATH, 'src/client');
const DIST_PATH = path.resolve(ROOT_PATH, 'dist');
const VIEWS_PATH = path.resolve(ROOT_PATH, 'src/views');
const isProduction = process.env.NODE_ENV === 'production';
const app = express();

app.use(compress());

// Disables the Server response from
// displaying Express as the server engine
app.disable('x-powered-by');

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', VIEWS_PATH);

app.set('port', process.env.PORT || 3001);

app.use(express.static(DIST_PATH));
// For images
app.use('*/src/client', express.static(INDEX_PATH));


app.use('/', apiRoutes);

app.get('/', (req, res) => {
  alt.bootstrap(JSON.stringify(res.locals.data || {}));

  const iso = new Iso();
  const application = ReactDOMServer.renderToString(<Application />);

  iso.add(application, alt.flush());

  // First parameter references the ejs filename
  res.render('index', {
    application: iso.render(),
    appTitle: appConfig.appTitle,
    favicon: appConfig.favIconPath,
    gaCode: analyticsConfig.google.code(isProduction),
    apiUrl: res.locals.data.completeApiUrl,
    isProduction,
  });
});

app.listen(app.get('port'), (error) => {
  if (error) {
    console.log(colors.red(error));
  }

  console.log(colors.yellow.underline(appConfig.appName));
  // Display that dev mode is running
  if (!isProduction) {
    console.log(
      colors.green('Running in development mode with hot module loader')
    );
  }
  console.log(
    colors.green('Express server is listening at'),
    colors.cyan(`localhost: ${app.get('port')}`)
  );
});
