const format = {
  listHeader: 'Roles',
  itemHeader: 'Role',
  columns: [
    {
      name: 'key',
      listPosition: 1,
      formPosition: 1,
      type: 'string',
      primaryKey: true,
      default: '',
      required: true,
      label: 'Key',
      fieldMd: 4,
      minlength: 3,
      maxlength: 30
    },
    {
      name: 'value',
      listPosition: 2,
      formPosition: 2,
      type: 'string',
      default: '',
      required: true,
      label: 'Value',
      fieldMd: 4,
      maxlength: 30
    },
    {
      name: 'grp',
      listPosition: 3,
      formPosition: 3,
      type: 'string',
      default: '',
      label: 'Group',
      fieldMd: 4,
      maxlength: 30
    },
    {
      name: 'descr',
      listPosition: 0,
      formPosition: 4,
      type: 'string',
      default: '',
      label: 'Descr',
      fieldMd: 12,
      maxlength: 240
    },
    {
      name: 'active',
      listPosition:4,
      formPosition: 5,
      type: 'boolean',
      default: true,
      required: true,
      label: 'Active',
      fieldMd: 6
    },
    {
      name: 'tenant_cod',
      listPosition: 0,
      formPosition: 6,
      type: 'select',
      default: 'default',
      required: true,
      label: 'Tenant',
      fieldMd: 6,
      options: [
        {
          value: 'default',
          text: 'default'
        }
      ]
    }
  ]
};

module.exports = format;
