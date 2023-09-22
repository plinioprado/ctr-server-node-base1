// format control

const getFormat = (table) => {
  const fileName = __dirname.replace('/controller', `/model/${table}.js`);
  const format = require(fileName)
  if (!format) throw 'format not found';

  return format;
}

const getPrimaryFieldName = (format) => {
  const name = format.columns.filter(it => it.primaryKey)[0].name;

  return name;
}

module.exports = {
  getFormat,
  getPrimaryFieldName
}
