<template>
  <div id="cart">
    <div class="title">
      {{ $t('cart.title') }}
    </div>
    <div class="list" v-if="!empty">
      <el-checkbox-group
        v-model="checkedItems"
        @change="selectedChange"
        class="check-list"
        border
      >
        <el-checkbox v-for="item in cartItems" :key="item.id" :label="item.id" :disabled="item.Product.listTS == null" >
          <cart-item :ref="`cart${item.id}`" :item="item" @click.prevent @updateCart="updateItemAmountById" @removeItem="removeItem(item.id)"></cart-item>
        </el-checkbox>
      </el-checkbox-group>
    </div>
    <div v-else>
      <t-empty></t-empty>
    </div>
    <div class="option">
      <div class="sum">
        <div class="count">
          {{ $t('cart.pCount', {number: checkedItems.length}) }}
        </div>
        <div class="totalPrice"><span class="text">{{ totalPrice }}</span> $</div>
      </div>
      <div class="purchase">
        <t-button class="buy-btn" @onClick="placeOrder" :disabled="lock||empty">{{ $t('cart.buy') }}</t-button>
      </div>
    </div>
    
  </div>
</template>

<script>
import { nextTick } from 'vue-demi'
import api from '../../../request'
import { handleResult, getWindowPath, getTimeStamp } from '../../../utils'
import CartItem from './CartItem.vue'
import TButton from '../../../components/common/TButton.vue'
import { ElLoading } from 'element-plus'
import TEmpty from '../../../components/common/TEmpty.vue'

export default {
  components: {
    CartItem,
    TButton,
    TEmpty,
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
      lock: false, // boolean
    }
  },
  methods: {
    async fetchCartData (uid) {
      uid = uid || this.id
      await this.$store.dispatch('actCart')
      this.cartItems = this.$store.getters.getCartItems
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
        if (item.selected && item.Product?.listTS) selectedItems.push(item.id)
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
    async placeOrder () {
      if (this.lock) return
      const { placeOrder } = api
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      this.lock = true
      const p = {
        uid: this.$store.getters.getUserID,
        time: getTimeStamp(),
        totalPrice: this.totalPrice,
        orders: this.cartItems.filter(item => this.checkedItems.includes(item.id)).map(item => {
          return {
            pid: item.Product.id,
            amount: this.$refs[`cart${item.id}`].amount,
            sid: item.sid,
            price: this.$refs[`cart${item.id}`].totalPrice,
          }
        }),
      }
      const res = await placeOrder(p)
      this.lock = false
      loading.close()
      if (!handleResult(res, false)) return   
      const isEngligh = this.$i18n.locale == 'en'
      res.data.forEach(r => {
        if (r.result == false) {
          ElNotification({
            title: isEngligh ? `Order ${r.id} is not completed due to unknown reason` : `订单 ${r.id} 处理时遇到错误`,
            message: r.msg,
            type: 'error',
          })
        }
      })
      await this.fetchCartData()
    },
  },
  computed: {
    empty () {
      return this.cartItems.length == 0
    },
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
  width: 1100px;
  color: #333;
  .title {
    text-align: left;
    color: $super-dark-yellow;
    font-size: 22px;
    font-weight: 600;
    line-height: 40px;
    height: 40px;
  }
  .list {
    border: 1px #777 solid;
    border-radius: 10px;
    width: 1100px;
    padding: 10px 20px;
    box-sizing: border-box;
  }
  .check-list {
    display: flex;
    flex-direction: column;
  }
  .el-checkbox {
    height: 120px;
  }
  .option {
    height: 60px;
    width: 1100px;
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
