const parentFormat = require('./role');

const format = {
  ...parentFormat,
  listHeader: 'Tenants',
  itemHeader: 'Tenant',
  validateDelete: (id) => { if (id === 'default') throw `400,can't delete tenant default` }
}

module.exports = format;
