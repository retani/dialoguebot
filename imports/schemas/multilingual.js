import SimpleSchema from 'simpl-schema';
import LongTextField from 'uniforms-bootstrap3/LongTextField';

const MultilingualTextSchema = new SimpleSchema(
  {
    de: {
      type: String,
      defaultValue:"",
      uniforms: {
        component: LongTextField,
        className: 'languageField'
      }
    },
    en: {
      type: String,
      defaultValue:"",
      uniforms: {
        component: LongTextField,
        className: 'languageField'
      },
    }
  },
  {
    clean: {
      getAutoValues: true
    },
    requiredByDefault: false
  }
);

const MultilingualStringSchema = new SimpleSchema(
  {
    de: {
      type: String,
      defaultValue:"",
      uniforms: {
        className: 'languageField'
      }
    },
    en: {
      type: String,
      defaultValue:"",
      uniforms: {
        className: 'languageField'
      },
    }
  },
  {
    clean: {
      getAutoValues: true
    },
    requiredByDefault: false
  }
);

export { MultilingualStringSchema, MultilingualTextSchema };
