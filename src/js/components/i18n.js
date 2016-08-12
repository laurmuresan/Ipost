import has from 'lodash/has';
import React, { Component, PropTypes } from 'react';
import createFragment from 'react-addons-create-fragment';
import context from '../application-context';

class I18n extends Component {
  static displayName = 'I18n';

  static defaultProps = {
    children: PropTypes.string.isRequired
  };

  static getDataBindings(getters) {
    return {
      lang: getters.intl.lang
    };
  }

  static interpolate(string, options = {}) {
    const marker = /\(\(([\w_]+)\)\)/g;
    const split = string.split(marker);

    const result = {
      'text_0': split[0]
    };

    for (let i = 1; i < split.length; i += 2) {
      let key = split[i];
      let replaceWith = options[key];

      if (replaceWith === undefined) {
        replaceWith = `((${key}))`;
      }

      let j = 0;

      while (has(result, `${j}_${key}`)) {
        j++;
      }

      result[`${j}_${key}`] = replaceWith;
      result[`text_${(i + 1)}`] = split[i + 1];
    }

    return createFragment(result);
  }

  render() {
    const { reactor, children, lang, ...rest } = this.props; // eslint-disable-line no-unused-vars
    let string = null;

    if (typeof children !== 'string') {
      return (
        <span className='text-error'>
          {`<I18n> component requires at least one child which must be a string...`}
        </span>
      );
    }

    string = lang.get(children) || children;

    return (
      <span>
        {I18n.interpolate(string, rest)}
      </span>
    );
  }
}

const ConnectI18n = context.connect(I18n);
export default ConnectI18n;
