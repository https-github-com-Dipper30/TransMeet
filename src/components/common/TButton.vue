<template>
  <div class="t-btn" :class="{'normal': type == 'normal', 'light': type == 'light', 'disabled': disabled}" @click="onClick">
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
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick (e) {
      if (!this.disabled) this.$emit('onClick', e)
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
  &.disabled {
    cursor: not-allowed;
    /* cursor: url('../../assets/common/disable.ico'); */
  }
  &.normal {
    color: $text-color;
    border-radius: 50vh;
    background-color: #fff;
    &.disabled {
      color: #333;
    }
  }
  &.light {
    color: #fff;
    padding: 2px 4px;
  }
  &.normal:hover {
    background-color: $yellow;
    color: #fff;
    &.disabled {
      background-color: #fff;
      color: #333;
    }
  }
  &.normal:active {
    background-color: $light-yellow;
    &.disabled {
      background-color: #fff;
    }
  }
  &.light:hover {
    color: $yellow;
    &.disabled {
      color: #fff;
    }
  }
  &.light:active {
    color: $light-yellow;
    &.disabled {
      background-color: #fff;
    }
  }
}

</style>