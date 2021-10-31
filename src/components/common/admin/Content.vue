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
  height: 100%;
  top: 70px;
  left: 200px;
  width: 100%;
  position: fixed;
  overflow: scroll;
  background-color: $admin-bg;
  transition: 0.4s;
  &.collapse {
    left: 50px;
  }
}
</style>