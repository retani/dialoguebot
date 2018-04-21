import { Mongo } from 'meteor/mongo';

const Styles = new Mongo.Collection('styles');

Styles.allow({
  insert: () => userId => userId || false,
  update: () => userId => userId || false,
  remove: () => userId => userId || false
});

export default Styles;
