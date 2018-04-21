import SimpleSchema from 'simpl-schema';
import { Random } from 'meteor/random'

const Choice = new SimpleSchema(
  {
    _id: {
      type: String,
      defaultValue: Random.id(),
    },
    keywords: {
      type: String,
      defaultValue:"",
    },
    post_delay: {
      type: SimpleSchema.Integer,
      defaultValue: 0,
      min:0,
      max:99999,
    },
    next_key: {
      type: String,
      defaultValue:"",
    }

  },
  {
    clean: {getAutoValues: true },
    requiredByDefault: false
  })

export default Choice