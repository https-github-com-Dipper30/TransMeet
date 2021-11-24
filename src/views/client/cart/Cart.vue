<template>
  <div id="cart">
    <div class="title">
      {{ $t('cart.title') }}
    </div>
    <div class="list">
      <el-checkbox-group
        v-model="checkedItems"
        @change="selectedChange"
        class="check-list"
        border
      >
        <el-checkbox v-for="item in cartItems" :key="item.id" :label="item.id" >
          <cart-item :ref="`cart${item.id}`" :item="item" @click.prevent @updateCart="updateItemAmountById" @removeItem="removeItem(item.id)"></cart-item>
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div class="option">
      <div class="sum">
        <div class="count">
          {{ $t('cart.pCount', {number: checkedItems.length}) }}
        </div>
        <div class="totalPrice"><span class="text">{{ totalPrice }}</span> $</div>
      </div>
      <div class="purchase">
        <t-button class="buy-btn">{{ $t('cart.buy') }}</t-button>
      </div>
    </div>
    
  </div>
</template>

<script>
import { nextTick } from 'vue-demi'
import api from '../../../request'
import { handleResult, getWindowPath } from '../../../utils'
import CartItem from './CartItem.vue'
import TButton from '../../../components/common/TButton.vue'

export default {
  components: {
    CartItem,
    TButton,
  },
  data () {
    return {
      id: null,
      cartItems: [], // all item objects
      allItemIDs: [], // all item ids
      checkedItems: [], // selected item ids
      lastCopyOfCheckedItems: [], // to compare between recently modified checked items and original items, make updates according to ids
      imgList: [],
      totalPrice: 0,
    }
  },
  methods: {
    async fetchCartData (uid) {
      uid = uid || this.id
      const { getCartItems } = api
      const cartItems = await getCartItems({ uid })
      if (!handleResult(cartItems, false)) return
      this.cartItems = cartItems.data.rows
      nextTick(() => {
        this.findSelected()
        this.calculateTotalPrice()
      })
    },
    findSelected () {
      const selectedItems = []
      const allItemIDs = []
      this.cartItems.map(async (item) => {
        allItemIDs.push(item.id)
        if (item.selected) selectedItems.push(item.id)
      })
      this.checkedItems = selectedItems
      this.lastCopyOfCheckedItems = selectedItems
      this.allItemIDs = allItemIDs
    },
    async updateItemAmountById (p) {
      const { updateCartItem } = api
      await updateCartItem(p)
      this.calculateTotalPrice()
    },
    selectedChange (e) {
      const [added, removed] = this.compareCheckedItems()
      const { updateCartItem } = api
      const promiseArr = []
      added.forEach((id) => {
        promiseArr.push(updateCartItem({ id, selected: true }))
      })
      removed.forEach((id) => {
        promiseArr.push(updateCartItem({ id, selected: false }))
      })
      Promise.all(promiseArr).then(res => console.log('success', res))
      .catch(err => console.log(err))
      this.calculateTotalPrice()
      this.lastCopyOfCheckedItems = this.checkedItems
    },
    compareCheckedItems () {
      const commonList = []
      const removedList = this.lastCopyOfCheckedItems.filter(item => {
        if(this.checkedItems.includes(item)) {
          // share the same item, meaning the item has not been changed
          commonList.push(item)
          return false
        }
        return true
      })
      const selectedList = this.checkedItems.filter(item => !commonList.includes(item))
      console.log('removed: ', removedList, 'added: ', selectedList)
      return [selectedList, removedList]
    },
    calculateTotalPrice () {
      this.totalPrice = this.checkedItems.reduce((prev, item) => (prev + this.$refs[`cart${item}`].totalPrice), 0)
    },
    async removeItem (id) {
      const { removeCartItemByID } = api
      await removeCartItemByID({ id })
      await this.fetchCartData()
    },
  },
  computed: {
    // totalPrice () {
    //   const sum = this.cartItems.reduce((prev, item) => {
    //     if (item.selected) prev += item.amount * item.Product.price
    //     return prev
    //   }, 0)
    //   return sum
    // },
  },
  created () {
    const { param } = getWindowPath()
    const uid = param[0]?.groups?.v || null
    if (!uid) this.$router.push('/empty')
    this.id = uid
    this.fetchCartData(uid)
  },
}
</script>

<style lang="scss" scoped>
#cart {
  margin: 20px auto;
  width: 1000px;
  color: #333;
  .check-list {
    display: flex;
    flex-direction: column;
  }
  .el-checkbox {
    height: 120px;
  }
  .option {
    height: 60px;
    width: 1000px;
    font-size: 18px;
    font-weight: 600;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .sum {
      height: 60px;
      width: 700px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      .totalPrice {
        .text {
          color: $super-dark-yellow;
        }
      }
    }
    .purchase {
      width: 200px;
      .buy-btn {
        background-color: $super-dark-yellow;
        color: #fff;
        &:active {
          background-color: $yellow;
        }
      }
    }
  }
}
</style>>
