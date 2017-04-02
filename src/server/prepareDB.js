import axios from 'axios';
import { Users, Teams } from './db';
import TeamsJSON from '../json/teams.json';

const nMembers = 0;
const token = process.env.SLACK_TOKEN || '';

const getUserListFromSlack = (callback) => {
  axios.get(`https://slack.com/api/users.list?token=${token}`)
  .then((response) => {
    callback(response.data.members);
  }).catch((err) => {
    console.log(err);
  });
};

const updateUserFromSlack = (user, slackMembers) => {
  const index = -1;
  const ret = user;
  slackMembers.forEach((sm) => {
    if (sm.name === user.name) {
      ret.slackId = sm.id;
      ret.avatar = sm.profile.image_72;
    }
  });
  return ret;
};

const saveOrUpdateUser = (userId, teamId, slackMembers) => {
  Users.findById(userId, (findErr, user) => {
    if (findErr) {
      console.log('DB Find User Error', findErr);
    }
    if (user) {
      user.team = teamId;
      user = updateUserFromSlack(user, slackMembers);

      user.save((saveErr, savedUser) => {
        if (saveErr) {
          console.log('DB User Save Error', saveErr);
        } else {
          console.log('Updated: ', savedUser);
        }
      });
    } else {
      let newUser = new Users({
        _id: userId,
        name: userId,
        avatar: '',
        slackId: '',
        team: teamId,
        lastLogin: -1,
      });
      newUser = updateUserFromSlack(newUser, slackMembers);

      newUser.save((saveErr, savedUser) => {
        if (saveErr) {
          console.log('DB User Save Error', saveErr);
        } else {
          console.log('Saved: ', savedUser);
        }
      });
    }
  });
};

const saveOrUpdateTeam = (id, members) => {
  Teams.findById(id, (findErr, team) => {
    if (findErr) {
      console.log('DB Find Team Error', findErr);
    }
    if (team) {
      team.members = members;
      team.save((saveErr, savedTeam) => {
        if (saveErr) {
          console.log('DB Team Save Error', saveErr);
        } else {
          console.log('Updated: ', savedTeam);
        }
      });
    } else {
      const newTeam = new Teams({
        name: id,
        _id: id,
        members,
        tasks: [],
      });
      newTeam.save((saveErr, savedTeam) => {
        if (saveErr) {
          console.log('DB Team Save Error', saveErr);
        } else {
          console.log('Saved: ', savedTeam);
        }
      });
    }
  });
};

const prepareDB = () => {
  getUserListFromSlack((slackMembers) => {
    TeamsJSON.forEach((teamJSON) => {
      const members = [];
      teamJSON.members.forEach((memberName) => {
        members.push(memberName);
        saveOrUpdateUser(memberName, teamJSON.id, slackMembers);
      });
      saveOrUpdateTeam(teamJSON.id, members);
    });
    console.log('Saved ', nMembers, ' members');
  });
};

export default prepareDB;
