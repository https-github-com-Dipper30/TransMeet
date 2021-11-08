<template>
  <div class="cart-logo">
    <img src="../../assets/common/cart.png" alt="">
    <div class="cart-items"> 0</div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
}
</script>

<style lang="scss" scoped>
.cart-logo {
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