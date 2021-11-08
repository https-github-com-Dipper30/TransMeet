<template>
  <div class="no-auth">
    <div class="bg"></div>
    <div class="content">
      <p>You don't have access to this page...</p>
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
      this.$router.push('/index')
    },
  },
}
</script>

<style lang="scss" scoped>
.no-auth {
  .bg {
    background-image: url('../assets/page/noauth.jpg');
    background-size: 100% 100%;
    width: 300px;
    height: 400px;
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