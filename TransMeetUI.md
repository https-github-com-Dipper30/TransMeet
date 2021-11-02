# TransMeetUI 使用文档

## TButton

#### 属性

1. type
定义按钮样式类型，可选值 'normal'(默认), 'light'

2. disabled
按钮是否禁用，禁用时无法点击

#### 事件

1. onClick
代替原生click事件，直接用作 <t-button @onClick="myEvent" />
如果使用 @click 可能会导致事件触发两次

## TTable

这是一个用配置文件可以自动生成查询框和表格的组件

config.js文件示例 

``` js
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
      dynamic: 'getRegionsOptions', // request method name
      options: 'options1',
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
```

#### 属性

1. config

#### 事件