import { jobTitle } from '../../config/common'

export default {
  searchBox: [
    {
      type: 'inputNumber',
      label: 'id',
      value: 'id',
    },
    {
      type: 'selector',
      label: 'region',
      value: 'region_assigned',
      dynamic: 'getRegionsOptions', // request method name and convert into options
      options: 'options1',
    },
    {
      type: 'inputNumber',
      label: 'Store ID',
      value: 'store_assigned',
    },
    {
      type: 'inputNumber',
      label: 'Salary <=',
      value: 'salary',
    },
    {
      type: 'selector',
      label: 'Job Title',
      value: 'job_title',
      options: [
        {
          value: null,
          label: 'All',
        },
        {
          value: jobTitle.SALESPERSON,
          label: 'Sales Person',
        },
        {
          value: jobTitle.STORE_MANAGER,
          label: 'Store Manager',
        },
        {
          value: jobTitle.REGION_MANAGER,
          label: 'Region Manager',
        },
      ],
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
        label: 'Name',
        prop: 'name',
        width: 200,
      },
      {
        label: 'Job',
        prop: 'job2String',
      },
      {
        label: 'Salary',
        label: 'salary',
        width: 150,
      },
      {
        label: 'Store',
        prop: 'Store.name',
      },
      {
        label: 'Region',
        prop: 'Region.name',
      },
      {
        label: 'Options',
        slot: 'options',
        fixed: 'right',
      },
    ],
  },
}