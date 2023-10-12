// logger controller

const settings = require('../settings.json')

const log = (message, message2) => {
  //const logConsole = settings.log.enable;

  const logConsole = message.match(/currency/) && message.match(/create/)

  if (logConsole) {
    if (!message2) console.log(message);
    else console.log(message, message2);
  }
}

module.exports = {
  log
}
