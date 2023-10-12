// Data access object for postgreSql

require('dotenv').config();

const logger = require('../../controller/logger');

const getList = async (table, primaryFieldName, fieldNameList) => {
  try {
    logger.log(`dao ${table} will get list`);

    const fieldNameText = getFieldNameText(fieldNameList)
    const text = `SELECT ${fieldNameText} FROM ctr.${table} ORDER BY ${primaryFieldName}`;
    logger.log(`dao ${table} queryText is ${text}`);

    const result = await runQuery(text);
    logger.log(`dao ${table} did get list`, JSON.stringify(result));

    return result.rows;
  } catch(err) {
    logger.log(`dao failed to get list ${table}`, err);
    throw err;
  }
};

const getOptionList = async (table, primaryFieldName) => {
  try {
    const text = `SELECT ${primaryFieldName} AS value, name AS text, active FROM ctr.${table} ORDER BY ${primaryFieldName};`;
    logger.log(`dao ${table} queryText is ${text}`);

    const result = await runQuery(text);
    logger.log(`dao ${table} did get options`, JSON.stringify(result));

    return result.rows;
  } catch (err) {
    logger.log(`dao ${table} failed to get options`, JSON.stringify(err));
    throw err;
  }
};

const getById = async (table, id, primaryFieldName, fieldNameList) => {
  try {
    logger.log(`dao ${table} will get item ${id}`);

    const primaryFieldValue = quoteIfString(id);
    const fieldNameText = getFieldNameText(fieldNameList);
    const queryText = `SELECT ${fieldNameText} FROM ctr.${table} WHERE ${primaryFieldName} = ${primaryFieldValue};`;
    logger.log(`dao ${table} get item query is ${queryText}`);

    const result = await runQuery(queryText);
    logger.log(`dao ${table} did get item`, JSON.stringify(result));

    return result.rows[0];
  } catch(err) {
    logger.log(`dao ${table} failed to get item`, err);
    throw err;
  }
};

const create = async (table, data) => {
  try {
    logger.log(`dao ${table} will create`);

    const keys = Object.keys(data);
    const values = Object.keys(data).map(it => data[it]);

    const query1 = `INSERT INTO ctr.${table} (`;
    let query2 = '';
    const query3 = ') VALUES (';
    let query4 = '';
    const query5 = ') RETURNING *;';
    for (i = 0; i < keys.length; i++) {
      if (i > 0) query2 += ', ';
      query2 +=  keys[i];

      if (i > 0) query4 += ', ';
      query4 += `$${i + 1}`;
    }
    const text = query1 + query2 + query3 + query4 + query5;
    logger.log(`dao ${table} create will query: ${text}`);

    const result = await runQuery(text, values)
    logger.log(`dao ${table} did create item`, JSON.stringify(result));

    return result.rows[0];
  } catch (err) {
    if (err.constraint === `${table}_pkey`) {
      logger.log(`dao failed to create ${table}: ${err.detail}`);
      throw '400,duplicated primary key';
    }
    logger.log(`dao failed to create ${table}: ${err}`);
    throw err;
  }
};

const upd = async (table, data, primaryFieldName) => {
  try {
    logger.log(`dao ${table} will update: ${JSON.stringify(data)}`);

    const keys = Object.keys(data).filter(it => it !== primaryFieldName);
    const values = [data[primaryFieldName]].concat(keys.map(it => data[it]));

    const text1 = `UPDATE ctr.${table} SET`;
    const text2 = keys.reduce((acc, it, ndx) => `${acc} ${ndx > 0 ? ',' :''}${it} = $${ndx + 2}`, '');
    const text3 = ` WHERE ${primaryFieldName} = $1 RETURNING *;`
    const text = text1 + text2 + text3;
    logger.log(`dao ${table} update will query: ${text}`);

    const result = await runQuery(text, values);
    logger.log(`dao ${table} did update item`, JSON.stringify(result));

    return result.rows[0];
  } catch (err) {
    logger.log(`dao failed to update ${table}`);
    throw err;
  }
};

const del = async (table, id, primaryFieldName) => {
  try {
    logger.log(`dao will delete ${table}`);

    const queryText = `DELETE FROM ctr.${table} WHERE ${primaryFieldName} = ${quoteIfString(id)};`
    const result = await runQuery(queryText);
    logger.log('dao did delete item', JSON.stringify(result));

    return result;
  } catch (err) {
    logger.log(`dao failed to delete ${table}`, JSON.stringify(err));
    throw err;
  }
};

const getUserRoleById = async (id) => {
  try {
    const queryText = `SELECT role_cod FROM ctr.user WHERE id = ${id};`
    const result = await runQuery(queryText);

    return result.rows[0];
  } catch (err) {
    logger.log('dao failed to get user role for id', `: ${JSON.stringify(err)}`);
    throw err;
  }
};

const login = async (email, pass) => {
  try {
    const queryText = `SELECT
        ctr.user.id AS user_id,
        ctr.user.name AS user_name,
        ctr.user.active AS user_active,
        ctr.user.role_cod AS user_role,
        ctr.role.active AS role_active
      FROM ctr.user INNER JOIN ctr.role ON ctr.role.cod = ctr.user.role_cod
      WHERE ctr.user.email = '${email}' AND ctr.user.pass = '${pass}';`;
    logger.log(`dao login will query: ${queryText}`);

    const result = await runQuery(queryText);

    if (result.rows.length === 0) throw 'Not found';
    if (!result.rows[0].user_active) throw 'User not active';
    if (!result.rows[0].role_active) throw 'Role not active';

    return result.rows[0];
  } catch (err) {
    throw err;
  }
}

const runScript = async (fileName) => {
  logger.log(`dao install will run file ${fileName}`);

  const fs = require('fs');
  const queryText = fs.readFileSync(fileName, 'utf8');
  const result = await runQuery(queryText);

  logger.log('dao install did reset db', JSON.stringify(result));
  return true;
}

const runQuery = async (text, values = []) => {
  const  { Client } = require('pg');

  const client = new Client({
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
  });

  await client.connect();
  const result = await client.query(text, values)
  await client.end()

  return result;
}

const quoteIfString = (value) => {
  return typeof value === 'string' ? `'${value}'` : value;
}

const getFieldNameText = (list) => {
  return list.reduce((acc, it, index) => `${acc}${index && ','} ${it}`);
}

module.exports = {
  getList,
  getOptionList,
  getById,
  create,
  upd,
  del,
  runScript,
  getUserRoleById,
  login,
  runQuery
}
