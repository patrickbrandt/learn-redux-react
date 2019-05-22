import * as Sentry from '@sentry/browser';

const crashReporter = store => next => action => {
  try {
    return next(action);
  } catch (err) {
    FS.event('Redux error', {
      error: {
        name: err.name,
        message: err.message,
        fileName: err.fileName,
        lineNumber: err.lineNumber,
        stack: err.stack,
      },
      counter: store.getState(), //NOTE: strip out any sensitive fields first
    });
    throw err;
  }
};

export default crashReporter;