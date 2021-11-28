<template>
  <div class="rateStar" :class="{ 'disabled': disabled}">
    <el-icon class="icon" :class="{ 'highlight': highlight }">
      <star-filled />
    </el-icon>
  </div>
</template>

<script>
import { StarFilled } from '@element-plus/icons'

export default {
  name: 'RateStar',
  props: {
    highlight: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: Number,
      default: 0,
    },
  },
  components: {
    StarFilled,
  },
}
</script>

<style lang="scss">
.rateStar {
  cursor: pointer;
  width: 25px;
  height: 25px;
  display: block;
  box-sizing: border-box;
  &.disabled {
    cursor: default;
  }
  .icon {
    width: 25px;
    height: 25px;
    color: #666;
    &.highlight {
      color: $yellow;
    }
  }
}
</style>