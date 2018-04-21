import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import LongTextField from 'uniforms-bootstrap3/LongTextField';

const Style = new SimpleSchema(
  {
    key: {
      type: String,
      required: true
    },
    styles: {
      type: String,
      defaultValue:"",
      uniforms: {
        component: LongTextField,
        className: 'stylesField'
      }      
    },
  },
  {
    clean: {getAutoValues: true },
    requiredByDefault: false
  })

export default Style;
