import SimpleSchema from 'simpl-schema';
import {
  MultilingualStringSchema,
  MultilingualTextSchema
} from './multilingual';
import Choice from './choice';
import LongTextField from 'uniforms-bootstrap3/LongTextField';

const Entry = new SimpleSchema(
  {
    key: {
      type: String,
      required: true
    },
    text_display_delay: {
      type: SimpleSchema.Integer,
      defaultValue: 0,
      min:0,
      max:99999,
    },
    text_speak_delay: {
      type: SimpleSchema.Integer,
      defaultValue: 0,
      min:0,
      max:99999
    },
    text_display: {
      type: MultilingualStringSchema,      
    },
    text_speak: {
      type: MultilingualStringSchema,
    },
    style_key: {
      type: String,
      label: "Style"
    }
  },
  {
    clean: {getAutoValues: true },
    requiredByDefault: false
  }
);

export default Entry;
