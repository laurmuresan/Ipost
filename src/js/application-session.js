import forEach from 'lodash/forEach';

class ApplicationSession {
  constructor() {
    this.promisesMap = {};
    this.promises = [];
  }

  load(dependencies) {
    if (dependencies) {
      return this.runInParallel(dependencies);
    }
  }

  runInParallel(tasks) {
    forEach(tasks, (task, name) => {
      const len = this.promises.length;

      this.promises.push(task());

      if (len + 1) {
        this.promisesMap[name] = len;
      }
    });

    return Promise.all(this.promises);
  }
}

export default ApplicationSession;
