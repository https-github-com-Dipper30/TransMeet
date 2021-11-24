<template>
  <div id="cartItem">
    <div class="pic">
      <img :id="`cartItemImg${item.id}`" src="@/assets/bg.jpeg" alt="" />
    </div>
    <div class="info">
      <div class="name">
        {{ item.Product.name }}
      </div>
      <div class="store">
        {{ $t('cart.storeName', { store: item.Store.name }) }}
      </div>
    </div>
    <div class="count">
      <el-input-number v-model="amount" :min="1" :max="maxAmount" @change="onProductAmountChange" /> &nbsp; {{ product.unit }}
    </div>
    <div class="price">
      <span class="label">{{ $t('cart.price') }}:</span> &nbsp; {{ totalPrice }} $
    </div>
    <div class="options">
      <el-button @click="onRemoveItem" type="danger" circle>
        <el-icon>
          <delete />
        </el-icon>
      </el-button>
    </div>
  </div>
</template>

<script>
import api from '../../../request'
import { Delete } from '@element-plus/icons'

export default {
  props: ['item'],
  components: {
    Delete,
  },
  data () {
    return {
      imgList: [],
      amount: 1,
    }
  },
  computed: {
    product () {
      return this.item.Product
    },
    totalPrice () {
      return this.amount * this.product.price
    },
    maxAmount () {
      return this.product.amount
    },
  },
  watch: {
    item: {
      deep: true,
      handler (newValue, oldValue) {
        console.log(newValue.amount)
        this.amount = newValue.amount
      },
    },
  },
  methods: {
    onProductAmountChange () {
      const p = {
        id: this.item.id,
        amount: this.amount,
      }
      this.$emit('updateCart', p)
    },
    onRemoveItem () {
      this.$emit('removeItem')
    },
  },
  created () {
    this.amount = this.item.amount
  },
  async mounted () {
    const { getProductImg } = api
    const res = await getProductImg({ id: this.item?.Product?.id })
    this.imgList = res?.data?.imgList || []
    const img = this.imgList[0]
    if (img) {
      const i = document.getElementById(`cartItemImg${this.item.id}`)
      i.src = `data:image/${img.type};base64,${img.data}`
    }
  },
}
</script>

<style lang="scss">
#cartItem {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 20px auto;
  height: 90px;
  color: #333;
  box-sizing: border-box;
  .pic {
    img {
      width: 90px;
      height: 90px;
    }
    margin-right: 20px;
  }
  .info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 90px;
    width: 190px;
    text-overflow: ellipsis;
    .name, .store {
      text-align: left;
      padding-left: 10px;
      color: #333;
      font-size: 14px;
      line-height: 40px;
    }
    .name {
      color: $super-dark-yellow;
      font-size: 16px;
      font-weight: 800;
      width: 120px;
    }
  }
  .count {
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
  .price {
    width: 100px;
    text-align: left;
    padding-left: 40px;
    .label {
      color: $super-dark-yellow;
      font-size: 16px;
    }
  }
}
</style>