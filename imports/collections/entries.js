import { Mongo } from 'meteor/mongo';

const Entries = new Mongo.Collection('entries');

Entries.allow({
  insert: () => userId => userId || false,
  update: () => userId => userId || false,
  remove: () => userId => userId || false
});

export default Entries;
