import { formatTS } from '../../../utils'

export default {
  searchBox: [
    {
      type: 'input',
      label: 'Order ID',
      value: 'oid',
    },
    {
      type: 'inputNumber',
      label: 'User ID',
      value: 'uid',
    },
    {
      type: 'inputNumber',
      label: 'Product ID',
      value: 'pid',
    },
    {
      type: 'selector',
      label: 'Region',
      value: 'rid',
      dynamic: 'getRegionOptions',
      options: 'options1',
    },
    {
      type: 'selector',
      label: 'Store',
      value: 'sid',
      dynamic: 'getStoreOptions',
      options: 'options2',
    },
    {
      type: 'inputNumber',
      label: 'Price <=',
      value: 'price',
    },
  ],
  operation: {
    title: 'Order Table',
    // buttons: [
    //   {
    //     label: 'Add Product',
    //     eventName: 'onClickAddProduct',
    //   },
    // ],
  },
  table: {
    indexed: true,
    attributes: [
      {
        label: 'ID',
        prop: 'id',
        width: 200,
      },
      {
        label: 'User ID',
        width: 100,
        prop: 'User.id',
      },
      {
        label: 'Product Name',
        prop: 'Product.name',
      },
      {
        label: 'Region',
        prop: 'Region.name',
        width: 150,
      },
      {
        label: 'Store',
        prop: 'Store.name',
        width: 150,
      },
      {
        label: 'Amount',
        prop: 'amount',
        width: 150,
      },
      {
        label: 'Price',
        prop: 'price',
      },
      {
        label: 'Create Time',
        prop: 'time',
        slot: (row) => formatTS(row.time),
      },
      {
        label: 'Status',
        prop: 'status',
        slot: (row) => [
          ' - ',
          'INITIATED',
          'PENDING',
          'OVERTIME',
          'ABORTED',
          'FINISHED',
        ][row.status],
      },
    ],
  },
}