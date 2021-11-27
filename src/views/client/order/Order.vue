<template>
  <div>order</div>
</template>

<script>
import { getWindowPath } from '../../../utils'
import api from '../../../request'

export default {
  data () {
    return {
      uid: null,
    }
  },
  methods: {
    async fetchOrderData () {
      const { getHistoryOrders } = api
      // const res = await getHistoryOrders()
      // console.log(res)
    },
  },
  created () {
    const { param } = getWindowPath()
    const uid = param[0].groups.v
    this.uid = uid
  },
}
</script>

<style>

</style>