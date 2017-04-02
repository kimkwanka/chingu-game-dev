import express from 'express';
import bodyParser from 'body-parser';
import slackAuth from './slackAuth';
import prepareDB from './prepareDB';

const app = express();

const path = require('path');

const handleReactRoutes = require('./handleReactRoutes').default;

prepareDB();

app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

slackAuth(app);

app.get('*', handleReactRoutes);

app.use(express.static(path.join(__dirname, '../../dist/public')));

export default app;
