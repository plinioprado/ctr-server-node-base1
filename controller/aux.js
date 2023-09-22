// Auxiliary table controller

const dao = require('../dao/postgresql/aux');
const logger = require('./logger');
const { getFormat, getPrimaryFieldName } = require('./format');

const getList = async (table) => {
  try {
    logger.log(`controller ${table} will get list`);

    const format = getFormat(table);

    const primaryFieldName = getPrimaryFieldName(format);
    const fieldNameList = getFieldsList(format);
    const resultData = await dao.getList(table, primaryFieldName, fieldNameList);
    const result = { data: resultData, format: format };

    logger.log(`controller ${table} did get list`, JSON.stringify(result));
    return result
  } catch (err) {
    logger.log(`controller ${table} failed to get list`, JSON.stringify(err));
    throw err
  }
};

const getOptionList = async (table) => {
  try {
    logger.log(`controller ${table} will get options`);

    const format = getFormat(table);
    const primaryFieldName = getPrimaryFieldName(format);

    const data = await dao.getOptionList(table, primaryFieldName);
    const result = { data: data, format: {} };
    logger.log(`controller ${table} did get options`, JSON.stringify(result));

    return result;
  } catch (err) {
    logger.log(`controller ${table} failed to get options`, JSON.stringify(err));
    throw err
  }
};

const getById = async (table, id) => {
  try {
    logger.log(`controller ${table} will get item ${id}`);

    const format = getFormat(table);
    const fieldNameList = getFieldsItem(format);
    const primaryFieldName = getPrimaryFieldName(format);

    const daoData = await dao.getById(table, id, primaryFieldName, fieldNameList);
    const data = dataDaoToItem(id, daoData, format)
    const result = { data: data, format: format };
    logger.log(`controller ${table} did get item`, JSON.stringify(result));

    return result;
  } catch (err) {
    logger.log(`controller ${table} failed to get item`, err);
    throw err
  }
};

const create = async (table, json) => {
  try {
    logger.log(`controller will create ${table} with: ${JSON.stringify(json)}`);

    const format = getFormat(table);
    const data = requestToData(json, format, false);

    const resultData = await dao.create(table, data);
    const result = { data: resultData }
    logger.log(`controller did create ${table}`, JSON.stringify(result));

    return result;
  } catch (err) {
    logger.log(`controller failed to create ${table}`, err);
    throw err;
  }
};

const upd = async (table, json) => {
  try {
    logger.log(`controller ${table} will update with ${JSON.stringify(json)}`);

    const format = getFormat(table);
    const data = requestToData(json, format, true);
    const primaryFieldName = getPrimaryFieldName(format);

    const resultData = await dao.upd(table, data, primaryFieldName);
    const result = { data: resultData }
    logger.log(`controller ${table} did update`, JSON.stringify(result));

    return result;
  } catch (err) {
    logger.log(`controller failed to update ${table}`, err);
    throw err;
  }
};

const del = async (table, id) => {
  try {
    logger.log(`controller ${table} will delete: ${id}`);

    const format = getFormat(table);
    const primaryFieldName = getprimaryFieldName(format);
    if (format.validateDelete) format.validateDelete(id);

    await dao.del(table, id, primaryFieldName);
    const result = { data: {[primaryFieldName]: id } }
    logger.log(`controller did delete ${table}`);

    return result;
  } catch (err) {
    logger.log(`controller failed to delete ${table}`, err);
    throw err;
  }
};

const requestToData = (json, format, exists) => {
  const data = {};

  const primaryFieldName = getprimaryFieldName(format);
  const primaryFieldFormat = format.columns.find(it => it.name === primaryFieldName);
  if (!json[primaryFieldName] && !(!exists && primaryFieldFormat.type === 'serial'))
    throw `400,missing data for primary field ${primaryFieldName}`;

  format.columns.forEach((it) => {
    if (
      !json.hasOwnProperty(it.name) ||
      (!exists && it.type === 'serial')
      ) return;

    if (!['string','number','boolean'].includes(typeof json[it.name]))
      throw `400,${it.name} has invalid type (contact support)`;
    if (it.required && [0,''].includes(json[it.name]))
      throw `400,mandatory ${it.name} is empty`
    data[it.name] = json[it.name];
  });

  return data;
}

const getprimaryFieldName = (format) => {
  return format.columns.find(el => el.primaryKey === true).name;
}

const getFieldsList = (format) => {
  return format.columns
    .filter((it) => it.listPosition > 0)
    .sort((a, b) => a.listPosition > b.listPosition ? 1 : -1)
    .map(it => it.name);
}

const getFieldsItem = (format) => {
  return format.columns
    .filter((it) => it.formPosition > 0)
    .map(it => it.name);
}

// helpers

const dataDaoToItem = (id, item, format) => {

  if (id !== '0') {
    return item;
  } else {
    const dataArray = format.columns
      .filter(it => it.formPosition !== 0)
      .map(it => {
        const key = it.name;
        const value = it.default ? it.default
          : it.type === 'serial' ? 0
          : it.type === 'number' ? 0
          : it.type === 'boolean' ? undefined
          : '';
        return [key, value]
      });
    const data = Object.fromEntries(dataArray)
    return data;
  }
}

module.exports = {
  getList,
  getOptionList,
  getById,
  create,
  upd,
  del
}
