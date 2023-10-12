// Session controller

const logger = require('./logger');
const staticSettings = require('../settings.json');
const dao = require('../dao/postgresql/aux');

const getAccess = (role) => {
  const access = require('../dao/json/access.json');
  return access[role];
}

const login = async (email, pass) => {
  try {
    logger.log(`controller will login with ${email}/${pass}`);
    const resultData = await dao.login(email, pass);
    const token = staticSettings.auth.token;
    const selectOptions = await getSelectioOptions();

    const data = {
      user_id: resultData.user_id,
      user_name: resultData.user_name,
      user_role: resultData.user_role,
      auth_access: JSON.stringify(getAccess(resultData.user_role)),
      auth_token: token,
      selectOptions: selectOptions
    }

    logger.log(`controller did login and session: ${JSON.stringify(data)}`);
    return { data: data };

  } catch (err) {
    logger.log(`login did fail: ${err}`);
    throw err;
  }
};

const checkAccess = async (url, authorization, method) => {
  try {
    if (!staticSettings.auth.enabled) return;
    if (url === '/api/login') return;

    if (!authorization || typeof authorization !== 'string') {
      throw `invalid access`;
    }

    const aAuthorization = authorization.split(':');

    const token = aAuthorization[1];
    if (token !== staticSettings.auth.token) throw 'Invalid token';

    const userId = aAuthorization[0];
    const user = await dao.getUserRoleById(userId);
    const table = url.replace('/api/', '').split('/')[0];
    const access = getAccess(user.role_cod)[table];

    const pass =
    (method === 'POST' && /c/.test(access)) ||
    (method === 'GET' && /r/.test(access)) ||
    (method === 'PUT' && /u/.test(access)) ||
    (method === 'DELETE' && /d/.test(access));

    if (!pass) throw `invalid access for ${user.role_cod} ${table} ${method}`;

    return;
  } catch(err) {
    logger.log(err);
    throw err;
  }
}

const getSelectioOptions =  async () => {
  const tables = staticSettings.selectOptions;

  let list = {};
  for (table in tables) {
    const ctrName = tables[table];
    const ctr = require(`./${ctrName}`);
    const tableOptions = await ctr.getOptionList(table);
    list[table] = tableOptions.data;
  }

  return list;
}

module.exports = {
  login,
  checkAccess
}
