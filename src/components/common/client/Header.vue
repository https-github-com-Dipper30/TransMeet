<template>
  <div id="header">
    <div class="home">
      <img src="../../../assets/common/menu-dark.png" alt="menu" @click="alterSider">
      <div class="home-btn" @click="goToHome">
        Home
      </div>
    </div>
    <div class="logo">
      TransMeet
    </div>
    <div class="options">
      <search-box />
      <div class="cart">
        <cart-logo />
      </div>
    </div>
  </div>
</template>

<script>
import CartLogo from '../CartLogo.vue'
import SearchBox from './SearchBox.vue'

export default {
  components: {
    CartLogo,
    // TButton,
    SearchBox,
  },
  methods: {
    alterSider () {
      this.$emit('alterSider')
    },
    goToHome () {
      this.$router.push('/')
    },
  },
}
</script>

<style lang="scss" scoped>
#header {
  position: fixed;
  z-index: 100;
  top: 0px;
  left: 0px;
  height: 48px;
  width: 100%;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  background-color: rgb(255, 255, 255);
  border-bottom: 1px solid rgb(231, 231, 231);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: default;
  .home {
    width: 280px;
    height: 40px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    img {
      margin-left: 20px;
      margin-right: 50px;
      width: 30px;
      height: 30px;
      display: block;
      cursor: pointer;
    }
    .home-btn {
      height: 30px;
      line-height: 30px;
      background-color: #111;
      color: #fff;
      cursor: pointer;
      padding: 0px 10px;
      border-radius: 20px;
      &:hover {
        background-color: $admin-highlight;
      }
    }
  }
  .logo {
    width: 200px;
    height: 35px;
    line-height: 35px;
    font-size: 24px;
    font-weight: 800;
    color: $text-color;
  }
  .options {
    display: flex;
    width: 350px;
    justify-content: space-around;
    align-items: center;
    .cart {
      color: #fff;
      width: 80px;
    }
  }
  
}
</style>