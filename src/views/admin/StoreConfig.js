export default {
  searchBox: [
    {
      type: 'inputNumber',
      label: 'id',
      value: 'id',
    },
    {
      type: 'inputNumber',
      label: 'Manager ID',
      value: 'manager_id',
    },
    {
      type: 'selector',
      label: 'region',
      value: 'region_assigned',
      dynamic: 'getRegionsOptions', // request method name
      options: 'options1',
    },
  ],
  table: {
    indexed: true,
    attributes: [
      {
        label: 'ID',
        prop: 'id',
        width: 150,
      },
      {
        label: 'Manager ID',
        prop: 'manager_id',
        width: 200,
      },
      {
        label: 'Name',
        prop: 'name',
        width: 200,
      },
      {
        label: 'Street',
        prop: 'street',
        width: 200,
      },
      {
        label: 'State ID',
        prop: 'state_id',
      },
      // {
      //   label: 'Options',
      //   slot: 'options',
      //   fixed: 'right',
      // },
    ],
  },
}