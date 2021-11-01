<template>
  <div id="admin-content" :class="{'collapse': collapse}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<style lang="scss" scoped>
#admin-content {
  box-sizing: content-box;
  top: 70px;
  left: 200px;
  width: calc(100vw - 240px);
  height: calc(100vh - 110px);
  position: fixed;
  overflow: scroll;
  background-color: $admin-bg;
  transition: 0.4s;
  padding: 20px;
  &.collapse {
    left: 50px;
    width: calc(100vw - 90px);
  }
}
</style>