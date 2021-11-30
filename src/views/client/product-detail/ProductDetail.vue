<template>
  <div class="product-detail">
    <t-empty v-if="!itemAvailable" text="Product Not Found." />
    <div class="product-type" v-if="itemAvailable">
      <div> {{ product.Type.name }} </div>
      <div class="select-store">
        <span> {{ $t('product.store') }} </span>
        <el-select v-model="store" :placeholder="defaultStore" @change="onStoreChange">
          <el-option
            v-for="item in storeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div v-if="itemAvailable" class="product-detail-panel">
      <div class="img">
        <img id="pDetailImg" src="@/assets/bg.jpeg" alt="">
      </div>
      <div class="content">
        <div class="product-name">
          {{ product.name }}
        </div>
        <div class="product-price">
          {{ unitPrice }}
        </div>
        <div class="product-description">
          {{ product.description }}
        </div>
        <div class="product-amount">
          <div class="input">
            <el-input-number v-model="productAmount" :min="1" :max="maxAmount" @change="onProductAmountChange" /> {{ product.unit }}
          </div>
          <div class="total-price">
            {{ $t('product.total') }}: &nbsp; {{ totalPrice }} $
          </div>
        </div>
        <div class="product-inventory">
          {{ $t('product.inventory') }}: &nbsp; {{ $t('product.left', { amount: product.amount, unit: product.unit }) }}
        </div>
        <div class="product-options">
          <t-button v-if="!isInCart" class="cart-btn" @onClick="addToCart"> <span class="add-icon"></span> {{ $t('product.addToCart') }} </t-button>
          <t-button v-else>in cart</t-button>
          <!-- <t-button @onClick="onPurchase" :disabled="!itemAvailable"> {{ $t('product.buy') }} </t-button> -->
        </div>
      </div>
    </div>
    <div class="recommend" v-if="recommendation.length > 0">
      <div class="title">
        {{ $t('product.recommend') }}
      </div>
      <div class="list">
        <product-card v-for="item of recommendation" :key="item.id" :product="item" @click="checkProductDetail(item.id)" />
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../request'
import { handleResult } from '../../../utils'
import TEmpty from '../../../components/common/TEmpty.vue'
import { nextTick } from 'vue-demi'
import TButton from '../../../components/common/TButton.vue'
import { access } from '../../../config/auth'
import ProductCard from '../../../components/common/client/ProductCard.vue'

export default {
  components: {
    TEmpty,
    TButton,
    ProductCard,
  },
  data () {
    return {
      product: null,
      productAmount: 1,
      storeOptions: [],
      store: null,
      cartLock: false,
      isInCart: false,
      recommendation: [],
    }
  },
  computed: {
    itemAvailable () {
      return this.product != null && this.product.Stores?.length > 0 && this.product?.amount > 0
    },
    unitPrice () {
      return `$ ${(this.product.price / 100).toFixed()} / ${this.product.unit}`
    },
    totalPrice () {
      return ((this.product?.price / 100) || 0) * this.productAmount
    },
    maxAmount () {
      return this.product?.amount || 100
    },
    defaultStore () {
      return this.storeOptions[0]?.label || 'Unavailable'
    },
    storeIDs () {
      return this.product.Stores.map(s => (s.id))
    },
    // if uid, pid and sid are all the same, the product is in the cart already
    // isInCart () {
    //   return this.storeIDs
    // },
  },
  methods: {
    async addToCart () {
      if (this.cartLock || !this.itemAvailable) return
      const user = this.$store.getters.getUser
      const { addToCart, isInCart: isInCartAPI } = api
      const p = {
        uid: user.uid,
        pid: this.product.id,
        sid: this.store || this.storeOptions[0]?.value || null,
        amount: this.productAmount,
      }
      this.cartLock = true
      const res = await addToCart(p)
      // added, renew vuex
      await this.$store.dispatch('actCart')
      this.cartLock = false
      if (!handleResult(res)) return
      this.checkIfIsInCart()
      // console.log(this.storeIDs)
    },
    onPurchase () {
      if (!user.auth.includes(access.BUY_PRODUCTS)) {
        const m = this.$i18n.locale == 'en' ? 'Sorry, you are not authorized to buy products.' : '非常抱歉，您并没有购买权限'
        this.$message({
          message: m,
          type: 'error',
        })
        return
      }
    },
    async checkIfIsInCart () {
      const user = this.$store.getters.getUser
      const { isInCart: isInCartAPI } = api
      const isInCart = await isInCartAPI({
        uid: user.uid,
        pid: this.product.id,
        sid: this.store || this.storeOptions[0]?.value || null,
      })
      if (isInCart?.data) this.isInCart = true
      else this.isInCart = false
    },
    onStoreChange () {
      this.checkIfIsInCart()  
    },
    // fetch recommendation
    async fetchRecommendation () {
      const { getRecommendedProducts } = api
      this.recommendation = await getRecommendedProducts({ type: 'rate' })
    },
    // link to product
    checkProductDetail (pid) {
      if (!pid) return
      window.open(`/product/${pid}`, '_blank')
    },
  },
  async created () {
    const { pathname } = window.location
    const reg = /^\/(product)\/(\d+$)/g
    const r = reg.test(pathname)
    if (!r) this.product = null
    const pid = Number(RegExp.$2)
    const { getProducts } = api
    const p = {
      size: 1,
      pid,
      pic: true,
      showStores: true,
      listed: true,
    }
    const product = await getProducts(p)
    if (!handleResult(product, false)) this.product = null
    else this.product = product.data.rows[0]

    nextTick(() => {
      if (this.product.imgList?.length > 0) {
        const img = this.product.imgList[0]
        const i = document.getElementById('pDetailImg')
        i.src = `data:image/${img.type};base64,${img.data}`
      }
      this.checkIfIsInCart()
    })
    const stores = this.product.Stores
    if (!stores || stores.length == 0) {
      this.$message({
        message: 'Product not listed in any store!',
        type: 'warning',
      })
      return
    }
    this.fetchRecommendation()
    stores.forEach(store => {
      this.storeOptions.push({ value: store.id, label: store.name })
    })
  },
  mounted () {
    
  },
}
</script>

<style lang="scss">
.product-detail {
  color: #333;
  cursor: default;
  .product-type {
    width: 900px;
    padding-top: 40px;
    text-align: left;
    color: $super-dark-yellow;
    font-size: 24px;
    font-weight: 800; 
    margin: auto;
    line-height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .select-store {
      color: #333;
      font-size: 14px;
    }
  }
  .product-detail-panel {
    display: flex;
    background-color: #fff;
    flex-direction: row;
    margin: 0 auto;
    width: 900px;
    box-sizing: border-box;
    .content {
      display: flex;
      flex-direction: column;
      height: 400px;
      width: 400px;
      margin-left: 30px;
      .product-name {
        height: 50px;
        line-height: 50px;
        font-size: 22px;
        font-weight: 700;
        text-align: left;
      }
      .product-price {
        height: 40px;
        line-height: 30px;
        padding: 5px 0;
        font-size: 22px;
        font-weight: 500;
        text-align: left;
      }
      .product-description {
        line-height: 30px;
        width: 400px;
        height: 150px;
        text-align: left;
        text-overflow: wrap;
      }
      .product-amount {
        height: 50px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .el-input-number__decrease, .el-input-number__increase {
          background: $yellow;
          color: #fff;
        }
        .el-input {
          --el-input-focus-border: $dark-yellow;
          --el-input-border-color: $yellow;
          --el-input-placeholder-color: $yellow;
          --el-input-hover-border: $dark-yellow;
        }
      }
      .product-inventory {
        height: 30px;
        font-size: 13px;
        color: #333;
        text-align: left;
        line-height: 30px; 
      }
      .product-options {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        .cart-btn {
          width: 160px;
          padding-left: 40px;
          box-sizing: border-box;
          color: #111;
          border-radius: 5px;
          background-color: $yellow;
          position: relative;
          &:hover {
            /* background-color: $super-dark-yellow; */
            border: 1px solid #333;
            .add-icon {
              left: 13px;
            }
          }
          &:active {
            background-color: $light-yellow;
          }
          .add-icon {
            position: absolute;
            top: 3px;
            left: 14px;
            background: url('../../../assets/common/add.png');
            background-size: 100%;
            width: 30px;
            height: 30px;
          }
        }
      }
    }
    .img {
      img {
        width: 400px;
        height: 400px;
      }
    }
  }
  .recommend {
    margin: 30px auto;
    width: 930px;
    .title {
      text-align: left;
      padding-left: 10px;
      height: 50px;
      line-height: 50px;
      font-size: 22px;
      font-weight: 700;
      color: $super-dark-yellow;
    }
    .list {
      width: 930px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .product-card {
        cursor: pointer;
      }
    }
  }
}
</style>