<template>
  <div class="t-btn" :class="type">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TButton',
  props: {
    type: {
      type: String,
      default: 'normal',
    },
  },
}
</script>

<style lang="scss" scoped>
.t-btn {
  line-height: 34px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  padding: 2px 18px;
  transition: 0.1s;
  &.normal {
    color: $text-color;
    border-radius: 50vh;
    background-color: #fff;
  }
  &.light {
    color: #fff;
  }
  &.normal:hover {
    background-color: $yellow;
    color: #fff;
  }
  &.normal:active {
    background-color: $light-yellow;
  }
  &.light:hover {
    color: $yellow;
  }
  &.light:active {
    color: $light-yellow;
  }
}

</style>