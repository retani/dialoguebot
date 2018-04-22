import { Meteor } from 'meteor/meteor';

import Entries from '../../collections/entries';
import Styles from '../../collections/styles';

Meteor.publish('entries', function (query={}) {
  return Entries.find(query, {sort: {key: 1}})
});

Meteor.publish('styles', function (query={}) {
  return Styles.find(query)
});
