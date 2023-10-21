const format = {
  listHeader: 'Currencies',
  itemHeader: 'Currency',
  columns: [
    {
      name: 'cod',
      type: 'string',
      primaryKey: true,
      default: '',
      required: true,
      minlength: 3,
      maxlength: 3,
      label: 'Cod',
      listPosition: 1,
      formPosition: 1,
      fieldMd: 4
    },
    {
      name: 'name',
      type: 'string',
      default: '',
      required: true,
      minlength: 3,
      maxlength: 30,
      label: 'Name',
      listPosition: 2,
      formPosition: 2,
      fieldMd: 4
    },
    {
      name: 'active',
      listPosition: 3,
      formPosition: 3,
      type: 'boolean',
      default: true,
      required: true,
      label: 'Active',
      fieldMd: 4
    },
    {
      name: 'cod_numeric',
      type: 'integer',
      default: 0,
      label: 'Numeric code',
      listPosition: 4,
      formPosition: 4,
      fieldMd: 4
    },
    {
      name: 'minorunit',
      type: 'integer',
      default: 2,
      label: 'Minor unit',
      listPosition: 5,
      formPosition: 5,
      fieldMd: 4
    },
    {
      name: 'source',
      type: 'string',
      default: '',
      maxlength: 30,
      label: 'Source',
      listPosition: 0,
      formPosition: 6,
      fieldMd: 4
    },
    {
      name: 'countries',
      type: 'string',
      default: '',
      maxlength: 240,
      label: 'Countries',
      listPosition: 0,
      formPosition: 7,
      fieldMd: 12
    },
    {
      name: 'obs',
      type: 'string',
      default: '',
      maxlength: 240,
      label: 'Obs',
      listPosition: 0,
      formPosition: 7,
      fieldMd: 12
    }
  ]
}

module.exports = format;
