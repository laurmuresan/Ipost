import formValidator from '../form-validator';
import { validationMessagesMap } from '../resources/entity-widget-mapping';

/**
 * Validations:
 * - isSet
 * - startingWithLetter
 * - alphaNumeric
 * - alphaNumericUnderscoreSpace
 * */

const propertiersValidationSchema = {
  name: {
    mandatory: (value) => formValidator(value).isMandatory(),
  },
  subject: {
    mandatory: (value) => formValidator(value).isMandatory(),
  },
  language: {
    mandatory: (value) => formValidator(value).isMandatory(),
  },
  tableName: {
    mandatory: (value) => formValidator(value).isMandatory(),
    startsWithLetter: (value) => formValidator(value).startsWithLetter(),
    isAlphaNumericUnderscore: (value) => formValidator(value).isAlphaNumericUnderscore()
  },
  filterName: {
    mandatory: (value) => formValidator(value).isMandatory(),
    startsWithLetter: (value) => formValidator(value).startsWithLetter(),
    isAlphaNumericSpace: (value) => formValidator(value).isAlphaNumericSpace()
  }
};

export function mapErrors(errorObject, type) {
  let result = {};

  Object.keys(errorObject).forEach((field) => {
    result[field] = {};
    Object.keys(errorObject[field]).forEach((rule) => {
      let inputField = field;
      if (field === 'filterName' || field === 'tableName') {
        inputField = 'name';
      }
      result[field][rule] = validationMessagesMap[rule](type, inputField);
    });
  });

  return result;
}


export const propertiesValidator = (fields) => {
  let result = {};
  const validationSchema = propertiersValidationSchema;

  Object.keys(fields).forEach((item) => {
    if (validationSchema[item]) {

      Object.keys(validationSchema[item]).forEach((validator) => {
        const isValid = validationSchema[item][validator](fields[item]);

        if (!result[item] && !isValid) {
          result[item] = {};
        }

        if (!isValid && Object.keys(result[item]).length < 1) {
          result[item][validator] = isValid;
        }
      });
    }
  });

  return result;
};

export const contentValidator = (fields) => {
  const { content } = fields;

  if (!content) {
    return true;
  }

  if (!content.length || !content.trim().length) {
    return true;
  }

  return false;
};

// export const previewValidator = (location, content, successCallback, errorCallback) => {
//   const valid = contentValidator({content});
//
//   if (location === 'preview' && valid) {
//     successCallback();
//   } else {
//     errorCallback();
//   }
// };
