// docs/model/country.js: country model

const format = {
  listHeader: 'Countries',
  itemHeader: 'Country',
  columns: [
    {
      name: 'cod',
      listPosition: 1,
      formPosition: 1,
      type: 'string',
      primaryKey: true,
      default: '',
      required: true,
      label: 'Cod',
      fieldMd: 6,
      minlength: 3,
      maxlength: 3
    },
    {
      name: 'name',
      listPosition: 2,
      formPosition: 2,
      type: 'string',
      default: '',
      required: true,
      label: 'Name',
      fieldMd: 6,
      minlength: 3,
      maxlength: 30
    },
    {
      name: 'cod_alpha2',
      listPosition: 3,
      formPosition: 3,
      type: 'string',
      default: '',
      required: true,
      label: 'Alpha2',
      fieldMd: 6,
      minlength: 2,
      maxlength: 2
    },
    {
      name: 'cod_numeric',
      listPosition: 4,
      formPosition: 4,
      type: 'number',
      default: '',
      required: true,
      label: 'Numeric code',
      fieldMd: 6,
      minlength: 1,
      maxlength: 3
    },
    {
      name: 'name_iso',
      listPosition: 0,
      formPosition: 5,
      type: 'string',
      default: '',
      label: 'ISO name',
      fieldMd: 12,
      maxlength: 240
    },
    {
      name: 'name_official',
      listPosition: 0,
      formPosition: 6,
      type: 'string',
      default: '',
      label: 'Official name',
      fieldMd: 12,
      maxlength: 240
    },
    {
      name: 'descr',
      listPosition: 0,
      formPosition: 7,
      type: 'string',
      default: '',
      label: 'Descr',
      fieldMd: 12,
      maxlength: 240
    },
    {
      name: 'active',
      listPosition: 5,
      formPosition: 8,
      type: 'boolean',
      default: true,
      required: true,
      label: 'Active',
      fieldMd: 6
    }
  ]
};

module.exports = format;
