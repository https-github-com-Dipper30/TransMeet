<template>
  <div id="sider" :class="{'collapsed': collapse}">
    <div id="mask" :class="{'hide': collapse}" @click="alterSider(true)" />
    <div class="menu">
      {{ $t("home.menu.title") }}
    </div>
    <menu-item @click="onClickMenu" data-menuid=1 :selected="selected=='1'">
      <img id="img" src="../../../assets/common/home.png" alt="">
     {{ $t("home.menu.home") }}
    </menu-item>
    <menu-item @click="onClickMenu" data-menuid=2 :selected="selected=='2'">
      <img id="img" src="../../../assets/common/order.png" alt="">
     {{ $t("home.menu.order") }}
    </menu-item>
    <menu-item @click="onClickMenu" data-menuid=3 :selected="selected=='3'">
      <img id="img" src="../../../assets/common/account.png" alt="">
     {{ $t("home.menu.account") }}
    </menu-item>
    <menu-item @click="onClickMenu" data-menuid=4 :selected="selected=='4'">
      <img id="img" src="../../../assets/common/help.png" alt="">
     {{ $t("home.menu.help") }}
    </menu-item>
    <menu-item @click="onClickMenu" data-menuid=5 :selected="selected=='5'">
      <img id="img" src="../../../assets/common/signout.png" alt="">
     {{ $t("home.menu.logout") }}
    </menu-item>
    <div class="gap" />
    <div class="options">
      <language-set :locale="locale" />
    </div>
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'
import LanguageSet from './LanguageSet.vue'

export default {
  components: {
    MenuItem,
    LanguageSet,
  },
  data () {
    return {
      collapse: true,
      locale: '',
      selected: '1',
    }
  },
  methods: {
    alterSider (v) {
      if (v && this.collapse != v) this.collapse = v
      else this.collapse = !this.collapse
    },
    onClickMenu (e) {
      const id = e.target.dataset.menuid
      this.selected = id
      switch (id) {
        case '1':
          this.toHome()
          break
        case '2':
          this.toOrders()
          break
        case '3':
          this.toAccount()
          break
        case '4':
          break
        case '5':
          this.onSignOut()
          break
        default: return
      }
    },
    onSignOut () {
      this.$store.commit('setUser', null)
      localStorage.setItem('token', null)
      this.$router.push('/index')
    },
    toHome () {
      this.$router.push('/')
    },
    toOrders () {
      const id = this.$store.getters.getUserID
      if (!id) {
        this.$message({
          message: 'You are not logged in.',
          type: 'error',
        })
        return
      }
      this.$router.push(`/order?user=${id}`)
    },
    toAccount () {
      const id = this.$store.getters.getUserID
      if (!id) {
        this.$message({
          message: 'You are not logged in.',
          type: 'error',
        })
        return
      }
      this.$router.push(`/account?user=${id}`)
    },
  },
  created () {
    this.locale = this.$i18n.locale
  },
}
</script>

<style lang="scss" scoped>
#sider {
  width: 260px;
  height: 100vh;
  box-shadow: rgb(0 0 0 / 20%) 0px 8px 24px;
  position: fixed;
  left: 0;
  top: 0;
  transition: 0.5s;
  padding-top: 150px;
  box-sizing: border-box;
  min-height: 600px;
  overflow: scroll;
  cursor: default;
  z-index: 10;
  background-color: #fff;
  #mask {
    position: fixed;
    height: 100vh;
    width: calc(100vw - 260px);
    box-sizing: border-box;
    right: 0;
    top: 0;
    background: transparent;
    &.hide {
      right: calc(260px - 100vw);
    }
  }
  .menu {
    position: absolute;
    font-size: 22px;
    font-weight: 500;
    color: #333;
    top: 80px;
    left: 20px;
  }
  .gap {
    height: 20px;
    background-color: #f8f8f8;
    width: 100%;
  }
  &.collapsed {
    left: -260px;
    box-shadow: none;
  }
  .options {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 260px;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
}
</style>