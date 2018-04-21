import SimpleSchema from 'simpl-schema';


const Choice = new SimpleSchema(
  {
    _id: {
      type: String,
      required: true
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
      type: String
    }

  },
  {
    clean: {getAutoValues: true },
    requiredByDefault: false
  })

export default Choice