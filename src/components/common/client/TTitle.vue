<template>
  <div class="t-title">
    {{ title }}
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: 'Title',
    },
  },
}
</script>

<style lang="scss">
.t-title {
  color: #333;
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 00.1rem;
  width: 1120px;
  margin: 20px auto;
  text-align: left;
}
</style>