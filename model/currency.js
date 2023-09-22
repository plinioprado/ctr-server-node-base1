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
      type: 'number',
      default: '',
      required: true,
      label: 'Numeric code',
      listPosition: 4,
      formPosition: 4,
      fieldMd: 6
    },
    {
      name: 'digits',
      type: 'number',
      default: 2,
      required: true,
      label: 'Digits',
      listPosition: 5,
      formPosition: 5,
      fieldMd: 6
    },
    {
      name: 'countries',
      type: 'string',
      default: '',
      maxlength: 240,
      label: 'Descr',
      listPosition: 0,
      formPosition: 6,
      fieldMd: 12
    },
    {
      name: 'obs',
      type: 'string',
      default: '',
      maxlength: 240,
      label: 'Descr',
      listPosition: 0,
      formPosition: 7,
      fieldMd: 12
    }
  ]
}

module.exports = format;
