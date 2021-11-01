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
      options: [
        {
          value: 1,
          label: '1',
        },
        {
          value: 2,
          label: '2',
        },
        {
          value: 3,
          label: '3',
        },
      ],
    },
    {
      type: 'date',
      label: 'store',
      value: 'store_assigned',
    },
    {
      type: 'inputNumber',
      label: 'salary',
      value: 'salary',
    },
    {
      type: 'input',
      label: 'job title',
      value: 'job_title',
    },
  ],
  table: {
    indexed: true,
    attributes: [
      {
        label: 'id',
        width: 200,
      },
      {
        label: 'name',
        prop: 'name',
        width: 200,
      },
      {
        label: 'job',
        prop: 'job_title',
      },
      {
        label: 'salary',
        width: 200,
      },
      {
        label: 'store',
        prop: 'store_assigned',
        width: 100,
      },
      {
        label: 'region',
        prop: 'region_assigned',
      },
    ],
    options: [
      {
        label: 'name',
        style: 'normal',
        act: 'actName',
      },
    ],
  },
}