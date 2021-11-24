<template>
  <div id="cart" @click="goToCart">
    <img src="../../assets/common/cart.png" alt="">
    <div class="cart-items"> {{ amount }} </div>
  </div>
</template>

<script>
export default {
  computed: {
    amount () {
      return this.$store.getters.getCartItemAmount
    },
  },
  methods: {
    goToCart () {
      const uid = this.$store.getters.getUserID
      if (!uid) return
      window.open(`/cart?user=${uid}`, '_blank')
    },
  },
}
</script>

<style lang="scss" scoped>
#cart {
  background-color: $yellow;
  border-radius: 35px;
  height: 35px;
  line-height: 35px;
  width: 80px;
  position: relative;
  cursor: pointer;
  &:hover {
    background-color: $dark-yellow;
  }
  img {
    width: 25px;
    height: 25px;
    position: absolute;
    left: 10px;
    top: 4px;
  }
  .cart-items {
    padding-left: 20px;
  }
}
</style>