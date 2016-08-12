import isString from 'lodash/isString';
import ErrorHandler from './error-handler';

export default function formValidator(value) {
  const emailRegExp = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|test|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
  const domainNameRegExp = /^[a-z0-9.-]+[.]{1}([a-z]{1,6}\.)?[a-z]{2,6}.*$/i; //validator for domain names
  const nameRegExp = /^([A-Z][a-z .'-]*)*$/;
  const addressRegExp = /^[a-z0-9 ,.'-]*$/i;
  const otherAddressRegExp = /^[a-z ,.'-]*$/i;
  const phoneRegExp = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
  const itlRegExp = /^[A-Za-z][A-Za-z0-9_]*(?![A-Za-z0-9_])/;
  const textRegex = /([A-Za-z0-9])+/;
  const stringRegex = /^[\s\S]{0,255}$/;
  const integerRegex = /^[0-9]+$/;
  const dateRegex = /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/;
  const monetary = /^(\d*\.\d{1,2}|\d+)$/;
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
  const decimalRegex = /[0-9]+(\.[0-9][0-9]?)?/;

  const validator = {
    integer: {
      rule:  integerRegex,
      message: 'Invalid Integer',
    },
    string: {
      rule: stringRegex,
      message: 'Invalid String',
    },
    text: {
      rule: textRegex,
      message: 'Invalid String',
    },
    email: {
      rule: emailRegExp,
      message: 'invalid email'
    },
    datetime: {
      rule: dateRegex,
      message: 'Invalid Date',
    },
    decimal: {
      rule: decimalRegex,
      messgae: 'Invalid Decimal value'
    },
    monetary: {
      rule: monetary,
      message: 'Invalid monetary'
    }
  };


  return {
    value,

    editUser(key) {
      return !validator[key].rule.test(this.value) ? validator[key].message : null;
    },

    item() {  // you can use this to check if a field is filled or not
      return !this.value.trim().length ? 'This field is required.' : null;
    },

    integer() {
      return this.value % 1 !== 0 ? 'Invalid Integer' : null;
    },

    date() {
      return !validator.datetime.rule.test(this.value) ? validator.datetime.message : null;
    },

    email() {
      ErrorHandler.fatal(
        !isString(this.value),
        'formValidator#email(): value must be a string.'
      );

      return emailRegExp.test(this.value);
    },

    domainName() {
      ErrorHandler.fatal(
        !isString(this.value),
        'formValidator#domainName(): value must be a string.'
      );

      return domainNameRegExp.test(this.value);
    },

    mandatoryEmail() {
      return !this.value.trim().length ? 'This field is required.' :
        !emailRegExp.test(this.value) ? 'Invalid email format.' : null;
    },

    name() {
      return !this.value.trim().length ? 'This field is required.' :
        !(/[A-Z]/.test(this.value.charAt(0))) ?
          'The name has to start with an uppercase letter.' :
          !nameRegExp.test(this.value) ? 'Invalid format.' : null;
    },

    phone() {
      return !this.value.length ? null :
        !phoneRegExp.test(this.value) ? 'Please enter a valid number' : null;
    },

    address() {
      return !addressRegExp.test(this.value) ? 'Invalid format.' : null;
    },

    otherAddressFields() {
      return !otherAddressRegExp.test(this.value) ? 'Invalid format.' : null;
    },

    generalInfo() {
      return !addressRegExp.test(this.value) ? 'Invalid format.' : null;
    },

    url() {
      return !urlRegex.test(this.value) ? 'Invalid URL format.' : null;
    },

    createFilterName(itemType) {
      if (this.value) {
        if (!(this.value.length && this.value.trim().length)) {
          return `The ${itemType}'s name cannot be empty.`;
        }

        if (!(/^[a-zA-Z]/g).test(this.value)) {
          return 'The first character must be a letter.';
        }

        if (!(/^[a-zA-Z0-9 ]*$/g).test(this.value)) {
          return `Invalid characters detected.`;
        }
      } else {
        return `The ${itemType}'s name cannot be empty.`;
      }
    },

    createTableName(itemType) {
      if (this.value) {
        if (!(this.value.length && this.value.trim().length)) {
          return `The ${itemType}'s name cannot be empty.`;
        }

        if (!(/^[a-zA-Z]/g).test(this.value)) {
          return 'The first character must be a letter.';
        }

        if (!(/^[a-zA-Z0-9_ ]*$/g).test(this.value)) {
          return `The  ${itemType}'s name can contain only characters, numbers and underscore.`;
        }
      } else {
        return `The ${itemType}'s name cannot be empty.`;
      }
    },

    createTableDescription(itemType, length) {
      const maxLength = length ? parseInt(length) : 500;

      if (this.value) {
        if (this.value.length > maxLength) {
          return `The ${itemType}\'s description can have maximum ${maxLength} characters.`;
        } else {
          return false;
        }
      }
      return false;
    },

    createItemName(itemType) { //for validation in creating a new email, template, header or footer
      if (this.value) {
        if (!(this.value.length && this.value.trim().length)) {
          return `The ${itemType}\'s name cannot be empty.`;
        }
        if (this.value.length > 128) {
          return `The ${itemType}\'s name can have maximum 128 characters.`;
        } else {
          return false;
        }
      } else {
        return `The ${itemType}\'s name cannot be empty.`;
      }
    },

    createItemType(itemType) {
      if (!this.value) {
        if (!(this.value.length && this.value.trim().length)) {
          // return `The ${itemType}\'s name cannot be empty.`;
          return `The ${itemType}\'s type cannot be empty.`;
        }
      }
      return false;
    },

    createItemNotEmpty(itemName) {
      if (!this.value) {
        return `The ${itemName} field cannot be empty`;
      } else {
        if (!(this.value.length && this.value.trim().length)) {
          return `The ${itemName} field cannot be empty`;
        }
      }
      return false;
    },

    createArrayNotEmpty(itemName) {
        if (this.value && !(this.value.count ? this.value.count() : this.value.length)) {
            return `The ${itemName} field cannot be empty`;
        }
        return false;
      },

    createItemSubject(itemType) {
      if (this.value) {
        if (!(this.value.length && this.value.trim().length)) {
          return `The ${itemType}\'s subject cannot be empty.`;
        }
        if (this.value.length > 255) {
          return `The ${itemType}\'s subject can have maximum 255 characters.`;
        } else {
          return false;
        }
      } else {
        return `The ${itemType}\'s subject cannot be empty.`;
      }
    },

    selectItemLanguage(itemType) {
      if (this.value === '') {
        return `The ${itemType}\'s language cannot be empty`;
      }
      return false;
    },

    checkItl() {
      if (isString(this.value)) {
        if (this.value.length === 0) {
          return false;
        }

        if (this.value.length > 48) {
          return false;
        }

        if (!this.value.startsWith('{\\')) {
          return false;
        }

        if (!this.value.endsWith('}')) {
          return false;
        }

        const size = this.value.length - 1;

        return itlRegExp.test(this.value.slice(2, size));
      } else {
        return false;
      }
    },

    isMandatory() {
      if (this.value) {
        if (!(this.value.length || this.value.trim().length)) {
          return false;
        }
        return true;
      } else return false;
    },

    startsWithLetter() {
      return (/^[a-zA-Z]/g).test(this.value);
    },
    isAlphaNumeric() {
      return (/^[a-zA-Z0-9]*$/g).test(this.value);
    },
    isAlphaNumericSpace() {
      return (/^[a-zA-Z0-9 ]*$/g).test(this.value);
    },
    isAlphaNumericUnderscore() {
      return (/^[a-zA-Z0-9_ ]*$/g).test(this.value);
    }
  };
}
