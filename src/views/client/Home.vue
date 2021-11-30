<template>
  <div class="home">
    {{ $t("home.slogan") }} 
    Welcome Home!
    <div class="bg"></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

  },
  data () {
    return {
      locales: process.env.VUE_APP_I18N_SUPPORTED_LOCALE,
    }
  },
  mounted () {
  },
}
</script>

<style lang="scss" scoped>
.home {
  .bg {
    background-image: url('../../assets/bg1.jpeg');
    background-size: 100% 100%;
    width: 400px;
    height: 300px;
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
