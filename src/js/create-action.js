import context from './application-context';

export const createAction = ({ type, payload, meta }) => {
  // TODO check payload type and send it further accordingly.
  if (Array.isArray(payload) && !meta) {
    return context.dispatch(type, payload);
  }
  context.dispatch(type, { ...payload, ...meta });
};

export const createBatchActions = (...actions) => {
  context.batch(() => {
    actions.forEach((action) => createAction(action));
  });
};
