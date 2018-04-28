import './migrations/001';

const version = 1;

Meteor.startup(() => {
  Migrations.migrateTo(version);
});