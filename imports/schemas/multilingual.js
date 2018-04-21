import SimpleSchema from 'simpl-schema';
import LongTextField from 'uniforms-bootstrap3/LongTextField';

const MultilingualTextSchema = new SimpleSchema(
  {
    de: {
      type: String,
      uniforms: {
        component: LongTextField,
        className: 'languageField'
      }
    },
    en: {
      type: String,
      uniforms: {
        component: LongTextField,
        className: 'languageField'
      },
    }
  },
  {
    clean: {
      getAutoValues: true
    }
  }
);

const MultilingualStringSchema = new SimpleSchema(
  {
    de: {
      type: String,
      uniforms: {
        className: 'languageField'
      }
    },
    en: {
      type: String,
      uniforms: {
        className: 'languageField'
      },
      optional: true
    }
  },
  {
    clean: {
      getAutoValues: true
    }
  }
);

export { MultilingualStringSchema, MultilingualTextSchema };
