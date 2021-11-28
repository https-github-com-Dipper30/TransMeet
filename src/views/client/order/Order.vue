<template>
  <div id="order">
    <div class="list" v-if="!empty">
      <order-item v-for="order of orders" :key="order.id" :item="order" />
    </div>
    <t-empty v-else> {{ $t('order.empty') }} </t-empty>
  </div>
</template>

<script>
import { getWindowPath, handleResult } from '../../../utils'
import api from '../../../request'
import TEmpty from '../../../components/common/TEmpty.vue'
import OrderItem from './OrderItem.vue'

export default {
  components: {
    TEmpty,
    OrderItem,
  },
  data () {
    return {
      uid: null,
      orders: [],
      count: 0,
    }
  },
  computed: {
    empty () {
      return this.count == 0
    },
  },
  methods: {
    async fetchOrderData () {
      const { getOrders } = api
      const res = await getOrders({ uid: this.uid })
      if (!handleResult(res), false) return
      const { count, rows } = res.data
      this.orders = rows
      this.count = count
      console.log(res)
    },
  },
  created () {
    const { param } = getWindowPath()
    const uid = param[0].groups.v
    this.uid = uid
    this.fetchOrderData()
  },
}
</script>

<style>

</style>