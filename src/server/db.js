const mongoURI = 'mongodb://localhost:27017/fcc' || process.env.MONGODB_URI || 'mongodb://localhost:27017/fcc';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

mongoose.connect(mongoURI);
const db = mongoose.connection;

// eslint-disable-next-line
db.on('error', console.log.bind(console, 'connection error:'));
db.once('open', () => { /* Connection was established */ });

const userSchema = new Schema({
  _id: String,
  name: String,
  lastLogin: Number,
  avatar: String,
  slackId: String,
  team: { type: String, ref: 'Teams' },
  timeZoneOffset: Number,
});

// Team Schema
const teamSchema = new Schema({
  _id: String,
  name: String,
  members: [{ type: String, ref: 'Users' }],
  tasks: [],
});


const Users = mongoose.model('Users', userSchema);
const Teams = mongoose.model('Teams', teamSchema);

module.exports = { Users, Teams };
