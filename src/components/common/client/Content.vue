<template>
  <div id="content">
    <slot />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
#content {
  padding-top: 50px;
  box-sizing: border-box;
  background: #f8f8f8;
  min-height: 100vh;
  height: 100%;
}
</style>