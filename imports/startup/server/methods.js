import { Meteor } from 'meteor/meteor';
import Players from '../../collections/players'
import Entries from '../../collections/entries'

Meteor.methods({
  'example'({ }) {
    // do something
  },
  'setPlayer'(key,data) {
    console.log(key,data)
    Players.update({key},{$set:data})
  },  
  'importEntries'(json) {
    console.log("received entries import", json)
    Entries.remove({}, {multi:true})
    for (let entry of json) {
      Entries.insert(entry)
    }
  }
});
