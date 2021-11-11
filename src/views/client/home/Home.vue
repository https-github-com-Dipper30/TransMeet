<template>
  <div class="home">
    {{ $t("home.slogan") }} 
    <!-- Welcome Home! -->
    <!-- <div class="bg"></div> -->
    <category-menu @selectCate="onCateChange" />
    <type-bar :cate="cate" @selectType="onTypeChange" />
  </div>
</template>

<script>
import CategoryMenu from './CategoryMenu.vue'
import TypeBar from './TypeBar.vue'

export default {
  name: 'Home',
  components: {
    CategoryMenu,
    TypeBar,
  },
  data () {
    return {
      cate: 1,
    }
  },
  methods: {
    onCateChange (cate) {
      if (typeof cate != 'number' || cate < 0 || cate > 6) return
      this.cate = cate
    },
    async onTypeChange (type) {
      console.log('type changed to ', type)
    },
  },
  mounted () {
    
  },
}
</script>

<style lang="scss" scoped>
.home {
  height: calc(100vh - 50px);
  overflow: scroll;
  position: relative;
  .s {
    height: 2000px;
  }
  .bg {
    background-image: url('../../../assets/bg1.jpeg');
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
