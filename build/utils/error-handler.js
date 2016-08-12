import notify from 'gulp-notify';

export default function errorHandler(errorObject, callback) {
  notify.onError(
    errorObject
      .toString()
      .split(': ')
      .join(':\n')
  ).apply(this, arguments);

  if (typeof this.emit === 'function') {
    this.emit('end');
  }
};
