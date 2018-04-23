import { Meteor } from 'meteor/meteor';
import Players from '../../collections/players'

Meteor.methods({
  'example'({ }) {
    // do something
  },
  'setPlayer'(key,data) {
    console.log(key,data)
    Players.update({key},{$set:data})
  },  
});
