<template>
  <div class="menu-item" @click="onClick">
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      default: '',
    },
  },
  methods: {
    onClick () {
      
    },
  },
  mounted () {
    const s = document.getElementById('img')
    console.log('s', s)
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
  &:hover {
    background-color: $yellow;
    color: #fff;
  }
  img {
    position: absolute;
    width: 22px;
    height: 22px;
    top: 11px;
    left: 20px;
  }
}
</style>