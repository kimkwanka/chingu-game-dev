/* eslint-disable consistent-return */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import getRoutes from '../shared/routes';
import { hydrateStore } from '../shared/store';
import { Users, Teams } from './db';

const css = (process.env.NODE_ENV !== 'production') ? '' : 'link rel="stylesheet" href="/style.css"';
const webRoot = (process.env.NODE_ENV !== 'production') ? 'http://localhost:8081' : '';

const saveUserLoginToDB = (username, timestamp) => {
  Users.findById(username, (dbFindErr, foundUser) => {
    if (dbFindErr) {
      console.log('DB User FindById Error', dbFindErr);
    } else if (foundUser) {
      // console.log('Found:', foundUser);
      foundUser.lastLogin = timestamp;
      foundUser.save((dbSaveErr, savedUser) => {
        if (dbSaveErr) {
          console.log('DB Save Error', dbSaveErr);
        } else {
          // console.log('Updated: ', savedUser);
        }
      });
    } else {
      console.log('Couldn\'t find', username);
    }
  });
};

const matchReactRoutes = (store, req, res, next) => (matchErr, redirect, props) => {
  if (matchErr) {
    res.status(500).send(matchErr.message);
  } else if (redirect) {
    res.redirect(redirect.pathname + redirect.search);
  } else if (props) {
    const appHtml = renderToString(
      <Provider store={store}>
        <RouterContext {...props} />
      </Provider>,
    );
    res.status(200).render('index', { content: appHtml, preloadedState: store.getState(), title: 'ChinguGameDev', css, webRoot });
  } else {
    next(); // Let Express handle all other routes
  }
};

export default (req, res, next) => {
  // req.user is != undefined when successfully logged in with Slack (slackAuth.js)
  const timestamp = Date.now();
  let user = { name: '', loggedIn: false, lastLogin: -1, avatar: '', teamId: '', timeZoneOffset: 0, admin: false };
  let team = { name: '', id: '', members: [], tasks: [] };
  const teams = [];
  let store;

  if (req.user) {
    saveUserLoginToDB(req.user.name, timestamp);
    Users.findById(req.user.name)
    .populate('team')
    .exec((userErr, dbUser) => {
      if (userErr) {
        console.log('DB Find User Error', userErr);
      }
      if (dbUser) {
        dbUser.lastLogin = timestamp;
        user = {
          name: dbUser.name,
          loggedIn: true,
          lastLogin: dbUser.lastLogin,
          avatar: dbUser.avatar,
          slackId: dbUser.slackId,
          team: dbUser.team._id,
          timeZoneOffset: dbUser.timeZoneOffset,
          admin: dbUser.name === 'kimkwanka' || dbUser.name === 'chance',
        };
        team = {
          name: dbUser.team.name,
          tasks: dbUser.team.tasks,
          members: [],
          id: dbUser.team._id,
        };
        dbUser.team.populate('members', (teamErr, dbTeam) => {
          if (teamErr) {
            console.log('DB Find Team Error', teamErr);
          }
          if (dbTeam) {
            dbTeam.members.forEach((tm) => {
              const newTeamMember = {
                name: tm.name,
                avatar: tm.avatar,
                lastLogin: tm.lastLogin,
                timeZoneOffset: tm.timeZoneOffset,
              };
              // console.log('TM:', newTeamMember);
              team.members.push(newTeamMember);
            });
          }
          Teams.find({})
          .populate('members')
          .exec((err, foundTeams) => {
            if (err) {
              console.log('DB Find All Teams Error', err);
            }
            // console.log('Sent all team data');
            if (foundTeams) {
              foundTeams.forEach((ft) => {
                const newTeam = {
                  name: ft.name,
                  tasks: ft.tasks,
                  members: [],
                  _id: ft._id,
                };
                ft.members.forEach((m) => {
                  newTeam.members.push({
                    name: m.name,
                    avatar: m.avatar,
                    lastLogin: m.lastLogin,
                    timeZoneOffset: m.timeZoneOffset,
                  });
                });
                teams.push(newTeam);
              });
            }
            store = hydrateStore({ user, team, teams });
            match({ routes: getRoutes(store), location: req.url }, matchReactRoutes(store, req, res, next));
          });
          
        });
      } else {
        console.log('User not found in DB', req.user.name);
        user.loggedIn = true;
        store = hydrateStore({ user, team });
        match({ routes: getRoutes(store), location: req.url }, matchReactRoutes(store, req, res, next));
      }
    });
  } else {
    store = hydrateStore({ user, team });
    match({ routes: getRoutes(store), location: req.url }, matchReactRoutes(store, req, res, next));
  }
};
