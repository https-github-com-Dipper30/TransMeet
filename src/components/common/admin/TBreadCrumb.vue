<template>
  <div class="t-bread">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item v-for="item of config" :key="item.label" :to="computedPath(item)"> {{ item.name }} </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: ['config'],
  methods: {
    computedPath (item) {
      return item.to ? { path: item.to } : {}
    },
  },
}
</script>

<style lang="scss">
.t-bread {
  box-sizing: border-box;
  margin-bottom: 15px;
  .el-breadcrumb__inner a:hover, .el-breadcrumb__inner.is-link:hover {
    color: $yellow;
  }
  .el-breadcrumb__item:last-child .el-breadcrumb__inner, .el-breadcrumb__item:last-child .el-breadcrumb__inner a, .el-breadcrumb__item:last-child .el-breadcrumb__inner a:hover, .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
    cursor: default;
    color: #555;
  }
}
</style>