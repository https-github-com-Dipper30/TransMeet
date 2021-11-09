<template>
  <div class="menu-item" @click="onClick" :class="{'selected': selected}">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    selected: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick () {
      
    },
  },
  mounted () {
  },
}
</script>

<style lang="scss">
.menu-item {
  height: 46px;
  line-height: 46px;
  color: #333;
  font-size: 20px;
  font-weight: 600;
  position: relative;
  cursor: pointer;
  border-bottom: 1px solid #f8f8f8;
  text-align: left;
  padding-left: 70px;
  &:hover {
    background-color: #f8f8f8;
    color: #333;
  }
  img {
    position: absolute;
    width: 22px;
    height: 22px;
    top: 11px;
    left: 20px;
  }
  &.selected {
    color: $yellow;
  }
}
</style>