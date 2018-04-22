import SimpleSchema from 'simpl-schema';
import { Random } from 'meteor/random'

const Choice = new SimpleSchema(
  {
    _id: {
      type: String,
      defaultValue: Random.id(),
      uniforms: { component: () => null },
    },
    keywords: {
      type: String,
      defaultValue:"",
    },
    post_delay: {
      label: "Post Delay (s)",
      type: Number,
      defaultValue: 0,
      min:0,
      max:999,
      columnclass:"narrow",
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