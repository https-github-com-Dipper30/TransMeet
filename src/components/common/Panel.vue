<template>
  <div class="panel">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.panel {
  width: fit-content;
  height: fit-content;
  border-radius: 5px;
  box-sizing: border-box;
  background-color: #fff;
}
</style>