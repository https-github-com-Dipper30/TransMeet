<template>
  <div id="rate">
    <rate-star 
      :highlight="selectedRate >= 1" 
      @click="onRate(1)" 
      @mouseover="onHover(1)"
      @mouseleave="onLeave(1)"
      :disabled="disabled"
    />
    <rate-star 
      :highlight="selectedRate >= 2" 
      @click="onRate(2)" 
      @mouseover="onHover(2)"
      @mouseleave="onLeave(2)"
      :disabled="disabled"
    />
    <rate-star 
      :highlight="selectedRate >= 3" 
      @click="onRate(3)" 
      @mouseover="onHover(3)"
      @mouseleave="onLeave(3)"
      :disabled="disabled"
    />
    <rate-star 
      :highlight="selectedRate >= 4" 
      @click="onRate(4)" 
      @mouseover="onHover(4)"
      @mouseleave="onLeave(4)"
      :disabled="disabled"
    />
    <rate-star 
      :highlight="selectedRate >= 5" 
      @click="onRate(5)" 
      @mouseover="onHover(5)"
      @mouseleave="onLeave(5)"
      :disabled="disabled"
    />
  </div>
</template>

<script>
import { handleResult } from '../../../utils'
import RateStar from './Star.vue'
import api from '../../../request'

export default {
  components: {
    RateStar,
  },
  props: ['rate', 'disabled', 'oid'],
  data () {
    return {
      selectedRate: 0,
      lock: false,
      renewed: false,
    }
  },
  methods: {
    async onRate (e) {
      if (this.disabled || this.renewed) return
      if (!this.disabled) {
        this.selectedRate = e
      }
      this.lock = true
      const { rateOrder } = api
      const p = {
        uid: this.$store.getters.getUserID,
        oid: this.oid,
        rate: e,
      }
      const res = await rateOrder(p)
      this.lock = false
      if (!handleResult(res, true, 'Rated!')) this.selectedRate = 0
      this.selectedRate = e
      this.renewed = true
    },
    onHover (e) {
      if (!this.disabled && !this.renewed) this.selectedRate = e
    },
    onLeave (e) {
      if (!this.disabled && !this.lock && !this.renewed) this.selectedRate = 0
    },
  },
  mounted () {
    this.selectedRate = this.rate
  },
}
</script>

<style lang="scss" scoped>
#rate {
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 200px;
  align-items: center;
}
</style>