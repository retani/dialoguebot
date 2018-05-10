import { Random } from 'meteor/random'
import SimpleSchema from 'simpl-schema';
import {
  MultilingualStringSchema,
  MultilingualTextSchema
} from './multilingual';
import choiceSchema from './choice';
import LongTextField from 'uniforms-unstyled/LongTextField';

const entrySchemaDefinitions =   {
  _id: {
    type: String,
    autoValue: ()=>Random.id(),
    uniforms: { component: () => null },
  },  
  key: {
    type: String,
    required: true,
  },
  text_display_delay: {
    label: "Text display delay (s)",
    type: Number,
    defaultValue: 0,
    min:0,
    max:999,
    columnclass:"narrow",
  },
  text_speak_delay: {
    label: "Text speak or listen delay (s)",
    type: Number,
    defaultValue: 0,
    min:0,
    max:999,
    columnclass:"narrow",
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
    uniforms: { component: () => null },
  },
  choices: {
    type: Array,
    minCount: 1,
    //defaultValue: [choiceSchema.clean({})],
    defaultValue: [],
  },
  'choices.$': {
    type: choiceSchema,
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
