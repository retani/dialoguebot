import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';

SimpleSchema.extendOptions(['columnclass']);

SimpleSchema.defineValidationErrorTransform((e) => {
  return new Meteor.Error(400, e.message)
});
