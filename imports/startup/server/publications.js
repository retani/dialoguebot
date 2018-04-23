import { Meteor } from 'meteor/meteor';

import Entries from '../../collections/entries';
import Styles from '../../collections/styles';
import Players from '../../collections/players';

import PlayersSchema from '../../schemas/player';

Meteor.publish('entries', function (query={}) {
  return Entries.find(query, {sort: {key: 1}})
});

Meteor.publish('styles', function (query={}) {
  return Styles.find(query)
});

Meteor.publish('players', function (query={}) {
  const cursor = Players.find(query)
  if (query.key != undefined && cursor.count()==0) {
    Players.insert(PlayersSchema.clean({key:query.key}))
  }
  return cursor
});
