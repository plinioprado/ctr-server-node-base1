const format = {
    listHeader: 'Roles',
    itemHeader: 'Role',
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
        maxlength: 6
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
        name: 'descr',
        listPosition: 0,
        formPosition: 3,
        type: 'string',
        default: '',
        label: 'Descr',
        fieldMd: 12,
        maxlength: 240
      },
      {
        name: 'active',
        listPosition:3,
        formPosition: 4,
        type: 'boolean',
        default: true,
        required: true,
        label: 'Active',
        fieldMd: 6
      }
    ]
  };

module.exports = format;
