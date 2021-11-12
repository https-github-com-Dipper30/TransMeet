<template>
  <div class="home">
    {{ $t("home.slogan") }} 
    <!-- Welcome Home! -->
    <!-- <div class="bg"></div> -->
    <category-menu @selectCate="onCateChange" />
    <type-bar :cate="cate" @selectType="onTypeChange" />
    <t-empty v-if="isEmpty" />
    <div class="list" v-else>
      <product-card v-for="product of products" :key="product.id" :product="product"></product-card>
    </div>
  </div>
</template>

<script>
import CategoryMenu from './CategoryMenu.vue'
import TypeBar from './TypeBar.vue'
import api from '../../../request'
import TEmpty from '../../../components/common/TEmpty.vue'
import ProductCard from '../../../components/common/client/ProductCard.vue'

export default {
  name: 'Home',
  components: {
    CategoryMenu,
    TypeBar,
    TEmpty,
    ProductCard,
  },
  data () {
    return {
      cate: 0,
      type: 0,
      products: [],
    }
  },
  computed: {
    isEmpty () {
      return this.products.length == 0
    },
  },
  methods: {
    onCateChange (cate) {
      if (typeof cate != 'number' || cate < 0 || cate > 6) return
      if (this.cate == cate) return
      this.cate = cate
      if (this.cate == 0) {
        this.products = []
        return
      }
    },
    async onTypeChange (type) {
      if (this.type == type) return
      this.type = type
      const { getProducts } = api
      const p = {
        listed: true,
        type: this.type,
        cate: this.cate,
        showStores: false,
        pic: true,
      }
      const res = await getProducts(p)
      this.products = res.data.rows
    },
  },
  mounted () {
    
  },
}
</script>

<style lang="scss" scoped>
.home {
  height: calc(100vh - 50px);
  /* overflow: scroll; */
  position: relative;
  margin: 0 150px;
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
  .list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }
}
</style>
