<template>
  <div class="home">
    <t-title :title="$t('home.menu.home')" />
    <!-- Welcome Home! -->
    <!-- <div class="bg"></div> -->
    <category-menu @selectCate="onCateChange" />
    <type-bar :cate="cate" @selectType="onTypeChange" />

    <t-empty v-if="isEmpty" />
    <div class="sort" v-if="cate!=0 && products.length>0">
      <el-select v-model="sort" @change="onSort" :placeholder="sortText">
        <el-option
          v-for="item in sortOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
    </div>
    
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
import TTitle from '../../../components/common/client/TTitle.vue'
import { ArrowDown } from '@element-plus/icons'

export default {
  name: 'Home',
  components: {
    CategoryMenu,
    TypeBar,
    TEmpty,
    ProductCard,
    TTitle,
  },
  data () {
    const sortOptions = [
      {
        value: 1,
        label: this.$t('home.sort.default'),
      },
      {
        value: 2,
        label: this.$t('home.sort.ascend'),
      },
      {
        value: 3,
        label: this.$t('home.sort.desc'),
      },
    ]
    return {
      cate: 0,
      type: 0,
      products: [],
      hotSale: [],
      highlyRated: [],
      sort: 1,
      sortOptions,
    }
  },
  computed: {
    isEmpty () {
      return this.cate != 0 && this.products.length == 0
    },
    sortMethod () {
      return this.sort == 1 ? null : (this.sort == 2 ? 'price' : 'price_desc')
    },
    sortText () {
      return this.sort == 1 ? this.$t('home.sort.default') : (this.sort == 2 ? this.$t('home.sort.ascend') : this.$t('home.sort.desc'))
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
      this.getProducts()
    },
    checkProductDetail (pid) {
      if (!pid) return
      window.open(`/product/${pid}`, '_blank')
    },
    async getProducts () {
      const { getProducts: getProductsApi } = api
      const p = {
        listed: true,
        type: this.type,
        cate: this.cate,
        showStores: false,
        pic: true,
        sort: this.sortMethod,
      }
      const res = await getProductsApi(p)
      this.products = res.data.rows
    },
    async getRecommend () {
      const { getRecommendedProducts } = api
      const hotSale = await getRecommendedProducts({ type: 'sold' })
      const highlyRated = await getRecommendedProducts({ type: 'rate' })
      this.hotSale = hotSale || []
      this.highlyRated = highlyRated || []
    },
    onSort (e) {
      this.sort = e
      this.getProducts()
    },
  },
  mounted () {
    this.getRecommend()
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
  .sort {
    color: $super-dark-yellow;
    display: block;
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    text-align: left;
    .el-select {
      width: 220px;
    }
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
    margin-top: 30px;
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
      text-align: center;
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
