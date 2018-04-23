import { Mongo } from 'meteor/mongo';

const Players = new Mongo.Collection('players');

Players.allow({
  insert: () => userId => userId || false,
  update: () => userId => userId || false,
  remove: () => userId => userId || false
});

export default Players;
