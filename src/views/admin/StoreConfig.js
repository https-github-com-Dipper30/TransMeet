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
        width: 100,
      },
      {
        label: 'Manager',
        prop: 'Staff.name',
      },
      {
        label: 'Name',
        prop: 'name',
      },
      {
        label: 'Region',
        prop: 'Region.name',
      },
      {
        label: 'State',
        prop: 'State.name',
      },
      {
        label: 'City',
        prop: 'city',
      },
      {
        label: 'Street',
        prop: 'street',
      },
      {
        label: 'Zip Code',
        prop: 'zip_code',
      },
      {
        label: 'Options',
        slot: 'options',
        fixed: 'right',
      },
    ],
  },
}