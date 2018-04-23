import SimpleSchema from 'simpl-schema';

const PlayerSchema = new SimpleSchema(
  {
    key: {
      type: String,
      required: true
    },
    pointer: {
      type: String,
      defaultValue:"A100",
    },
    status: {
      type: String,
      defaultValue: "stop"
    }
  },
  {
    clean: {getAutoValues: true },
    requiredByDefault: false
  })

export default PlayerSchema;
