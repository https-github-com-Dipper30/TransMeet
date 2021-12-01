<template>
  <div class="search-box" @keypress.enter="onSearch">
    <img src="../../../assets/common/search.png" alt="" @click.prevent="onSearch">
    <input v-model="searchInput" class="search-input" type="text" />
    <div id="result" @click="showResult = false" v-if="showResult">
      <t-empty v-if="empty" />
      <div class="list" v-else>
        <product-card v-for="item of result" :key="item.id" :product="item" @click.stop="onProductDetail(item.id)"></product-card>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../request'
import TEmpty from '../TEmpty.vue'
import ProductCard from './ProductCard.vue'

export default {
  components: {
    TEmpty,
    ProductCard,
  },
  data () {
    return {
      searchInput: '',
      lock: false,
      showResult: false,
      result: [],
    }
  },
  computed: {
    empty () {
      return this.result.length == 0
    },
  },
  watch: {
    showResult (newValue, oldValue) {
      const mo = function (e) {
        e.preventDefault()
      }
      if (newValue == true) {
        // document.addEventListener('onScroll', mo, false) // 禁止页面滑动
      } else {
        // document.removeEventListener('onScroll', mo, false)
      }
    },
  },
  methods: {
    async onSearch () {
      if (this.lock) return
      this.lock = true
      const { searchProduct } = api
      const result = await searchProduct({ search: this.searchInput })
      this.lock = false
      this.showResult = true
      this.result = result
    },
    onProductDetail (pid) {
      if (!pid) return
      window.open(`/product/${pid}`, '_blank')
    },
  },
  
}
</script>

<style lang="scss" scoped>
.search-box {
  width: 150px;
  height: 32px;
  position: relative;
  img {
    width: 18px;
    height: 18px;
    position: absolute;
    left: 10px;
    top: 7px;
    cursor: pointer;
  }
  .search-input {
    width: 160px;
    height: 30px;
    background-color: #f8f8f8;
    border: none;
    border-radius: 30px;
    &:focus-visible {
      border: none;
      outline: 2px solid #222;
    }
    padding-left: 40px; 
    line-height: 28px;
    font-size: 20px;
    color: #333;
  }
  #result {
    position: fixed;
    top: 50px;
    left: 0;
    height: calc(100vh - 50px);
    width: calc(100vw);
    background: url('../../../assets/blbl.jpg') no-repeat;
    /* opacity: 0.9; */
    background-size: 100%;
    .list {
      width: 1140px;
      margin: 0 auto;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      .product-card {
        cursor: pointer;
      }
    }
  }
}
</style>