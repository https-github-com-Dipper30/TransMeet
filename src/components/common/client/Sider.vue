<template>
  <div id="sider" :class="{'collapsed': collapse}">
    <menu-item imgSrc="../../../assets/common/signout.png" @click="onSignOut">
      <img id="img" src="../../../assets/common/signout.png" alt="">
     {{ $t("home.menu.logout") }}
    </menu-item>
    <div class="gap" />
    <language-set :locale="locale" />
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
    }
  },
  methods: {
    alterSider () {
      this.collapse = !this.collapse
      console.log(this.collapse)
    },
    onSignOut () {
      this.$store.commit('setUser', null)
      localStorage.setItem('token', null)
      this.$router.push('/index')
    },
  },
  created () {
    this.locale = this.$i18n.locale
  },
}
</script>

<style lang="scss" scoped>
#sider {
  width: 300px;
  height: 100vh;
  box-shadow: rgb(0 0 0 / 20%) 0px 8px 24px;
  position: fixed;
  left: 0;
  top: 0;
  transition: 0.8s;
  padding-top: 50px;
  box-sizing: border-box;
  .gap {
    height: 20px;
    background-color: #f8f8f8;
    width: 100%;
  }
  &.collapsed {
    left: -300px;
  }
}
</style>