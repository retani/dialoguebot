import SimpleSchema from 'simpl-schema';
import {
  MultilingualStringSchema,
  MultilingualTextSchema
} from './multilingual';
import choiceSchema from './choice';
import LongTextField from 'uniforms-bootstrap3/LongTextField';

const entrySchemaDefinitions =   {
  key: {
    type: String,
    required: true,
  },
  text_display_delay: {
    label: "Text display delay (s)",
    type: SimpleSchema.Integer,
    defaultValue: 0,
    min:0,
    max:999,
  },
  text_speak_delay: {
    label: "Text speak delay (s)",
    type: SimpleSchema.Integer,
    defaultValue: 0,
    min:0,
    max:999
  },
  text_display: {
    label: "Text to display",
    type: MultilingualStringSchema,  
    minCount: 1,
    defaultValue: MultilingualStringSchema.clean({}),
  },
  text_speak: {
    label: "Text to speak",
    type: MultilingualStringSchema,
    minCount: 1,
    defaultValue: MultilingualStringSchema.clean({}),
  },
  style_key: {
    type: String,
    label: "Style",
    defaultValue: "normal",
  },
  choices: {
    type: Array,
    minCount: 1,
    defaultValue: [choiceSchema.clean({})],
  },
  'choices.$': {
    type: choiceSchema
  }
}

const entrySchema = new SimpleSchema(
  entrySchemaDefinitions,
  {
    clean: {getAutoValues: true },
    requiredByDefault: false
  }
);

export {entrySchema, entrySchemaDefinitions};
