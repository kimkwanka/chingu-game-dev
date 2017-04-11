/* eslint-disable no-underscore-dangle */
const sortById = (a, b) => {
  if (a._id.length > b._id.length) {
    return 1;
  } else if (a._id.length < b._id.length) {
    return -1;
  }
  if (a._id > b._id) {
    return 1;
  } else if (a._id < b._id) {
    return -1;
  }
  return 0;
};

const teams = (state = [], action) => {
  switch (action.type) {
    case 'SORT_BY_ID': {
      return state.sort(sortById);
    }
    default:
      return state;
  }
};

export default teams;
