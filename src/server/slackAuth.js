const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const SlackStrategy = require('@aoberoi/passport-slack').default.Strategy;
const axios = require('axios');
const MockStrategy = require('passport-mock-strategy');

const slackAuth = (app) => {
  app.use(
    session({
      store: new FileStore(),
      secret: '11THIS IS A SECRET STRING AND STUFF FOR HASHING THE SESSION11',
      resave: false,
      saveUninitialized: false,
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new MockStrategy(
      {
        name: 'mock',
        user: {
          name: 'kimkwanka',
          loggedIn: true,
          lastLogin: -1,
          avatar: '',
          teamId: 'game-dev-team-76',
          timeZoneOffset: 0,
          admin: true,
        },
      },
      (user, done) => {
        done(null, user);
      },
    ),
  );
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  app.get('/login', passport.authenticate('mock'), (req, res) => {
    res.redirect('/authsuccess');
  });

  app.get('/logout', (req, res) => {
    req.logout();
    // console.log('Logged out.');
    res.redirect('/');
  });
};

export default slackAuth;
