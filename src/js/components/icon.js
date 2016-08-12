import React, { Component, PropTypes } from 'react';
import { IMG_DIR } from '../resources/config';
import SVGIcons from '../resources/svg-icons';

class Icon extends Component {
  static displayName = 'Icon';

  static propTypes = {
    type: PropTypes.string.isRequired,
    name: PropTypes.string,
    imo: PropTypes.bool
  };

  static defaultProps = {
    type: 'font',
    imo: false
  };

  strategies() {
    var self = this;

    return {
      'img': self.renderIMGIcon.bind(this),
      'svg': self.renderSVGIcon.bind(this),
      'font': self.renderFontIcon.bind(this, 'ti'),
      'font-awesome': self.renderFontIcon.bind(this, 'fa fa')
    };
  }

  renderIMGIcon() {
    const { name, ...rest } = this.props;

    return (
      <img
        src={IMG_DIR + name}
        {...rest}
      />
    );
  }

  renderSVGIcon() {
    const { name, type, width, height, className, ...rest } = this.props;
    const hasWidthOrHeight = width && height;
    const SVGMatch = '<svg ';
    const SVGReplace = `<svg style="width: ${width}px; height: ${height}px;" `;

    let iconString;

    if (!name || !SVGIcons.hasOwnProperty(name)) {
      return null;
    }

    if (hasWidthOrHeight) {
      iconString = SVGIcons[name].replace(SVGMatch, SVGReplace);
    }

    return (
      <i
        svg={null}
        {...rest}
        className={`${type}-icon ${className || ''}`}
        dangerouslySetInnerHTML={{ __html: iconString }}
      />
    );
  }

  renderFontIcon(fontType) {
    const { name, className = '' } = this.props;

    return (
      <i
        aria-hidden='true'
        className={`icon-${name} ${className}`}
      />
    );
  }

  render() {
    const { type } = this.props;
    const strategies = this.strategies();

    return strategies[type]();
  }
}

export default Icon;
