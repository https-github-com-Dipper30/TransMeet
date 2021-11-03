export default {
  searchBox: [
    {
      type: 'inputNumber',
      label: 'Store ID',
      value: 'id',
    },
    {
      type: 'inputNumber',
      label: 'Manager ID',
      value: 'manager_id',
    },
    {
      type: 'selector',
      label: 'Region',
      value: 'region_id',
      dynamic: 'getRegionsOptions',
      options: 'options1',
    },
    {
      type: 'selector',
      label: 'State',
      value: 'state_id',
      dynamic: 'getStatesOptions',
      options: 'options2',
    },
  ],
  operation: {
    title: 'Product Table',
    buttons: [
      {
        label: 'Add Product',
        eventName: 'onClickAddProduct',
      },
    ],
  },
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