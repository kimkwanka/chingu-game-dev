const user = (state = {
  name: '',
  loggedIn: false,
  lastLogin: -1,
  avatar: '',
  slackId: '',
  teamId: '',
  timeZoneOffset: 0,
}, action) => {
  switch (action.type) {
    case 'HYDRATE_USER':
      // console.log('USER:', action.user);
      return action.user;
    default:
      return state;
  }
};

export default user;
