import { formatTS } from '../../../utils'

export default {
  searchBox: [
    {
      type: 'inputNumber',
      label: 'Product ID',
      value: 'pid',
    },
    {
      type: 'inputNumber',
      label: 'Store ID',
      value: 'sid',
    },
    {
      type: 'input',
      label: 'Product Name',
      value: 'name',
    },
    {
      type: 'selector',
      label: 'Category',
      value: 'cate',
      dynamic: 'getCateOptions',
      options: 'options1',
    },
    {
      type: 'selector',
      label: 'Type',
      value: 'type',
      dynamic: 'getTypeOptions',
      options: 'options2',
    },
    {
      type: 'selector',
      label: 'Region',
      value: 'region_id',
      dynamic: 'getRegionsOptions',
      options: 'options3',
    },
    {
      type: 'selector',
      label: 'Listed',
      value: 'listed',
      options: [
        {
          label: 'Both',
          value: null,
        },
        {
          label: 'Listed',
          value: true,
        },
        {
          label: 'Unlisted',
          value: false,
        },
      ],
    },
    {
      type: 'selector',
      label: 'Available',
      value: 'available',
      options: [
        {
          label: 'Both',
          value: null,
        },
        {
          label: 'Available',
          value: true,
        },
        {
          label: 'Unavailable',
          value: false,
        },
      ],
    },
    {
      type: 'inputNumber',
      label: 'Price <= ',
      value: 'price',
    },
  ],
  operation: {
    title: 'Product Table',
    buttons: [
      {
        label: 'List All Products',
        eventName: 'onClickListAll',
      },
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
        label: 'Product Name',
        prop: 'name',
      },
      {
        label: 'Amount',
        prop: 'amount',
        width: 150,
      },
      {
        label: 'Unit Price',
        prop: 'unitPrice',
        sortable: 'custom',
        sortChange: 'sortPrice',
        slot: (row) => `${(row.price / 100).toFixed(2)} $ / ${row.unit}`,
      },
      {
        label: 'Review',
        prop: 'avgRate',
        slot: (row) => row.avgRate == 0 ? 'Not Reviewed' : row.avgRate,
        width: 150,
      },
      {
        label: 'Category',
        prop: 'Category.name',
        width: 150,
      },
      {
        label: 'Type',
        prop: 'Type.name',
        width: 150,
      },
      {
        label: 'Create Time',
        prop: 'createTS',
        slot: (row) => formatTS(row.createTS),
      },
      {
        label: 'List Time',
        prop: 'listTS',
        slot: (row) => row.listTS ? formatTS(row?.listTS) : '-',
      },
      {
        label: 'Options',
        slot: 'options',
        width: 260,
        fixed: 'right',
      },
    ],
  },
}