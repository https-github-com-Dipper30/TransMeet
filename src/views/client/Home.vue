<template>
  <div class="home">
    {{ $t("message.hello") }} 
    Welcome Home!
    <div class="bg"></div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {

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