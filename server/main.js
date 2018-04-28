import { Meteor } from 'meteor/meteor';
import { WebApp } from 'meteor/webapp';

import '../imports/startup/both/simple-schema-configuration';
import '../imports/startup/both/accounts';
import '../imports/startup/server/users';
import '../imports/startup/server/migrate';
import '../imports/startup/server/fixtures';
import '../imports/startup/server/publications';
import '../imports/startup/server/methods';

Meteor.startup(() => {

});
