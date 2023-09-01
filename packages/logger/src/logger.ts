/* eslint-disable no-console */
const LogVerbosity: Record<string, number> = {
  SILLY: 0,
  DEBUG: 1,
  LOG: 2,
  INFO: 3,
  WARN: 4,
  ERROR: 5,
  SILENT: 6,
}

const logLevel = (): number => {
  return process.env.LOG_LEVEL && Object.keys(LogVerbosity).includes(process.env.LOG_LEVEL)
    ? LogVerbosity[process.env.LOG_LEVEL]
    : LogVerbosity.INFO;
};

export const logger = {
  silly: (...args: unknown[]): void => {
    if (logLevel() <= LogVerbosity.SILLY) {
      console.debug('[SILLY]', ...args);
    }
  },
  debug: (...args: unknown[]): void => {
    if (logLevel() <= LogVerbosity.DEBUG) {
      console.debug(...args);
    }
  },
  log: (...args: unknown[]): void => {
    if (logLevel() <= LogVerbosity.LOG) {
      console.log(...args);
    }
  },
  info: (...args: unknown[]): void => {
    if (logLevel() <= LogVerbosity.INFO) {
      console.info(...args);
    }
  },
  warn: (...args: unknown[]): void => {
    if (logLevel() <= LogVerbosity.WARN) {
      console.warn(...args);
    }
  },
  error: (...args: unknown[]): void => {
    if (logLevel() <= LogVerbosity.ERROR) {
      console.error(...args);
    }
  },
};
