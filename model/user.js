const format = {
  listHeader: 'Users',
  itemHeader: 'User',
  columns: [
    {
      name: 'id',
      listPosition: 1,
      formPosition: 1,
      type: 'serial',
      primaryKey: true,
      default: '',
      required: true,
      label: 'Id',
      fieldMd: 6
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
      name: 'email',
      listPosition: 3,
      formPosition: 3,
      type: 'string',
      default: '',
      label: 'E-mail',
      required: true,
      fieldMd: 6
    },
    {
      name: 'pass',
      listPosition: 0,
      formPosition: 4,
      type: 'password',
      default: '',
      label: 'Pass',
      required: true,
      fieldMd: 6,
      minlength: 5,
      maxlength: 30
    },
    {
      name: 'active',
      listPosition: 4,
      formPosition: 5,
      type: 'boolean',
      default: true,
      required: true,
      label: 'Active',
      fieldMd: 6
    },
    {
      name: 'role_cod',
      listPosition: 5,
      formPosition: 6,
      type: 'select',
      default: 'user',
      required: true,
      label: 'Role',
      fieldMd: 6,
      options: [
        {value: '', text: 'select...'},
        {value: 'admin', text: 'admin'},
        {value: 'guest', text: 'guest'},
        {value: 'super', text:'super'},
        {value:'user', text: 'user'}
      ]
    },
    {
      name: 'tenant_cod',
      listPosition: 0,
      formPosition: 7,
      type: 'select',
      default: 'default',
      readonly: true,
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
