<template>
  <div class="not-found">
    <div class="bg"></div>
    <div class="content">
      <p>Ummm... This page does not exist.</p>
      <p><TButton type="light" class="to-home" @click="toHome">Click Me To Home</TButton></p>
    </div>
  </div>
</template>

<script>
import TButton from '../components/common/TButton.vue'

export default {
  components: {
    TButton,
  },
  methods: {
    toHome () {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
.not-found {
  .bg {
    background-image: url('../assets/page/404.jpg');
    background-size: 100% 100%;
    width: 300px;
    height: 280px;
    margin: 0 auto;
    margin-top: 100px;
  }
  .content {
    width: 600px;
    height: 200px;
    margin: 0 auto;
    margin-top: 50px;
  }
  .to-home {
    color: $text-color;
  }
}
</style>
