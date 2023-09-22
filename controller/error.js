const errGetStatusCode = (err) => {
  try {
    if (/[0-9]{3},/.test(err.substring(0,4))) return Number(err.substring(0,3));
    return 500;
  } catch {
    return 500;
  }
}

const errorGetMessage = (err, op) => {
  try {
    msg = /[0-9]{3},/.test(err.substring(0,4)) ? err.substring(4) : err;
    return { message: `server failed to ${op}: ${msg}` }; 
  } catch {
    return { message: `server failed to ${op}` }; 
  }

}

module.exports = {
  errGetStatusCode,
  errorGetMessage
}
