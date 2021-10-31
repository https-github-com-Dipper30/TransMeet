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
