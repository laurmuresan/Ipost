class PromiseError extends Error {
  constructor(message) {
    super();

    this.name = 'SuperagentPromiseError';
    this.message = message || 'Bad request';
  }
}

export default PromiseError;
