const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const SlackStrategy = require('@aoberoi/passport-slack').default.Strategy;
const axios = require('axios');

const clientID = process.env.SLACK_CLIENT_ID || '';
const clientSecret = process.env.SLACK_CLIENT_SECRET || '';
const callbackURL = process.env.SLACK_CALLBACK_URL || '';
const token = process.env.SLACK_TOKEN || '';

const slackAuth = (app) => {
  app.use(session({
    store: new FileStore(),
    secret: '11THIS IS A SECRET STRING AND STUFF FOR HASHING THE SESSION11',
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new SlackStrategy({ clientID, clientSecret, redirect_uri: callbackURL },
  (accessToken, scopes, team, extra, profiles, done) => {
    axios.get(`https://slack.com/api/users.info?token=${token}&user=${profiles.user.id}`)
    .then((response) => {
      done(null, response.data.user);
    }).catch((err) => {
      console.log(err);
    });
  }));
  passport.serializeUser((user, done) => (done(null, user)));
  passport.deserializeUser((obj, done) => (done(null, obj)));

  app.get('/login', passport.authenticate('slack', {
    scope: ['identity.basic, identity.team'],
  }));
  app.get('/auth/slack/callback', passport.authenticate('slack'), (req, res) => {
    console.log('Logged In.', req.user);
    res.redirect('/authsuccess');
  });
  app.get('/logout', (req, res) => {
    req.logout();
    console.log('Logged out.');
    res.redirect('/');
  });
};

export default slackAuth;
