<template>
  <div class="home">
    <!-- Welcome Home! -->
    <!-- <div class="bg"></div> -->
    <category-menu @selectCate="onCateChange" />
    <type-bar :cate="cate" @selectType="onTypeChange" />

    <t-empty v-if="isEmpty" />
    <div class="list" v-if="cate!=0 && products.length>0">
      <product-card v-for="product of products" :key="product.id" :product="product" class="product-card" @click="checkProductDetail(product.id)" />
    </div>
    <div v-if="this.cate == 0" class="hot-sale">
      <div class="title">
        {{ $t('home.hotSale') }}
      </div>
      <div class="list" v-if="hotSale.length>0">
        <product-card v-for="product of hotSale" :key="product.id" :product="product" class="product-card" @click="checkProductDetail(product.id)" />
      </div>
      <t-empty v-else />
      <div class="title">
        {{ $t('home.highlyRated') }}
      </div>
      <div class="list" v-if="highlyRated.length>0">
        <product-card v-for="product of highlyRated" :key="product.id" :product="product" class="product-card" @click="checkProductDetail(product.id)" />
      </div>
      <t-empty v-else />

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
      hotSale: [],
      highlyRated: [],
    }
  },
  computed: {
    isEmpty () {
      return this.cate != 0 && this.products.length == 0
    },
  },
  methods: {
    onCateChange (cate) {
      if (typeof cate != 'number' || cate < 0 || cate > 6) return
      if (this.cate == cate) return
      this.cate = cate
      if (this.cate == 0) {
        this.products = []
        this.getRecommend()
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
    checkProductDetail (pid) {
      if (!pid) return
      window.open(`/product/${pid}`, '_blank')
    },
    async getRecommend () {
      const { getRecommendedProducts } = api
      const hotSale = await getRecommendedProducts({ type: 'sold' })
      const highlyRated = await getRecommendedProducts({ type: 'rate' })
      console.log(hotSale, highlyRated)
      this.hotSale = hotSale || []
      this.highlyRated = highlyRated || []
    },
  },
  mounted () {
    
  },
}
</script>

<style lang="scss" scoped>
.home {
  /* height: calc(100vh - 50px); */
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
    margin-top: 50px;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    background-color: #fff;
    .product-card {
      cursor: pointer;
    }
  }
  .hot-sale {
    margin: 20px auto;
    .title {
      width: 100%;
      text-align: left;
      color: $super-dark-yellow;
      font-size: 19px;
      font-weight: 600;
      line-height: 40px;
      height: 40px;
      margin: 20px 0 10px;
    }
    .list {
      margin-top: 0;
    }
  }
}
</style>
