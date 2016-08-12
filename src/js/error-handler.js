class ErrorHandler {
  static fatal(condition, message) {
    var error;

    if (condition) {
      if (!message) {
        throw new Error(
          '`ErrorHandler.fatal()`: requires an error message argument'
        );
      }

      if (typeof message === 'object') {
        message = JSON.stringify(message);
      }

      error = new Error('' + message);
      error.framesToPop = 1;

      throw error;
    }
  }

  static info(condition, message) {
    if (console && console.info) {
      console.info(message);
    }
  }

  static warn(condition, message) {
    if (console && console.warn && condition) {
      console.warn(message);
    }
  }

  static log(condition, message) {
    if (console && console.log) {
      console.log(message);
    }
  }

  static error(condition, message) {
    if (console && console.error) {
      console.error(message);
    }
  }
}

export default ErrorHandler;
