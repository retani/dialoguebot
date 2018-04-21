/* eslint-disable no-console, no-undef */

import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';

import Entries from '../../collections/entries';
import Styles from '../../collections/styles';

Meteor.startup(() => {

  // console.log('running fixures');

  /*
  if (Meteor.users.find({ username: 'admin' }).count() == 0) {
    console.log('seeding admin user');
    Accounts.createUser({
      username: 'admin',
      password: 'password'
    });
  }

  if (Meteor.users.find({ username: 'editor' }).count() == 0) {
    console.log('seeding editor user');
    Accounts.createUser({
      username: 'editor',
      password: 'password'
    });
  }
  */

  if (Styles.find().count()==0) {
    const style = {
      key: "normal",
      styles: ""
    }
    console.log('inserting initial style ', style);
    Styles.insert(style)
  }

  if (Entries.find().count()==0) {
    const entry = {
      key:"A100",
      text_display:{en:"Hi"},
      text_display_delay: 1000,
      text_speak:{en:"I say hi"},
      text_speak_delay: 2000,
      style_key: "normal"
    }
    console.log('inserting initial entry ', entry);
    Entries.insert(entry)
  }

})