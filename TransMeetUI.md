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
  searchBox: [ // 筛选框配置
    {
      type: '', // 必选，筛选框类型，可选值 'input' || 'inputNumber' || 'selector'(下拉框) || 'date'(日期选择器)
      label: '', // 必选，筛选框的文字标签
      value: [param], // 筛选框绑定的变量名，也是最终提交表单中的变量名
    },
    {
      type: 'inputNumber',
      label: 'id',
      value: 'id',
    },
    // 动态下拉列表
    {
      type: 'selector',
      label: 'region',
      value: 'region_assigned',
      dynamic: 'getRegionsOptions', // 动态列表索取数据时调用的请求方法名， 该方法直接在request文件中定义
      options: 'options1', // 动态列表获取到数据后绑定的options名，目前只有options1~3 共3个变量可绑定，请限制动态下拉列表在3个及以内
    },
    // 静态下拉列表
    {
      type: 'selector',
      label: 'Job Title',
      value: 'job_title',
      options: [ // options直接写死
        {
          value: null, // options被选中后绑定的值
          label: 'All', // options文字
        },
        {
          value: jobTitle.SALESPERSON,
          label: 'Sales Person',
        },
      ],
    },
  ],
  table: { // 表格配置
    indexed: true, // 可选, 是否需要索引
    attributes: [ // 表头设置
      {
        label: 'ID', // 必选, 列名
        prop: 'id', // 可选，该列对应列表数据中每项的属性名的值，若无prop，则默认为label值
        width: 150, // 可选，该列宽度(px)，默认为200
        fixed: 'right', // 可选，是否固定该列，可选值 true || 'left' || 'right'
        slot: [name], // 可选，若声明slot，该列的内容可自定义，该slot命名为 [name]，在页面中以该名字对应的具名插槽进行调用
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

页面配置属性，细节如上

2. total

展示表格总数据量，并会用于确定分页时的总页数

3. tableData

用于展示表格的数据

#### 事件

1. fetchData

渲染数据事件
