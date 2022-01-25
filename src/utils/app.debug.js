export function log(...args) {
  var DEBUG = process.env.REACT_APP_ENV == "production" ? false : true;
  if (DEBUG) {
    args.length > 0 ? console.log(...args) : console.log("");
  } else {
    return;
  }
}

export function warn(...args) {
  var DEBUG = process.env.REACT_APP_ENV == "production" ? false : true;
  if (DEBUG) {
    args.length > 0 ? console.warn(...args) : console.warn("");
  } else {
    return;
  }
}

export function error(...args) {
  var DEBUG = process.env.REACT_APP_ENV == "production" ? false : true;
  if (DEBUG) {
    args.length > 0 ? console.error(...args) : console.error("");
  } else {
    return;
  }
}

export function table(...args) {
  var DEBUG = process.env.REACT_APP_ENV == "production" ? false : true;
  if (DEBUG) {
    args.length > 0 ? console.table(...args) : console.table("");
  } else {
    return;
  }
}
