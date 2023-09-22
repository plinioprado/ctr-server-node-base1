// Install controller

const dao = require('../dao/postgresql/aux');
const logger = require('./logger');
const settings = require('../settings.json');

const resetDb = async () => {
  try {
    logger.log(`controller install will reset db`);

    let result;
    for (i in settings.scripts.resetDb) {
      const fileName = __dirname.replace(`/controller`, settings.scripts.resetDb[i]);
      result = await dao.runScript(fileName);
    }

    logger.log(`controller install did reset db and got`, result);
    return true;
  } catch (err) {
    logger.log(`controller install failed to reset db: ${err}`);
    throw err
  }
}

module.exports = {
  resetDb
}
