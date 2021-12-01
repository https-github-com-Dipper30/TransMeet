<template>
  <div class="sign-in-pannel">
    <div class="cancel" @click="cancelSignIn" />
    <div class="title">Sign In</div>
    <div class="row">
      <div class="label">Username</div>
      <div class="i"><el-input v-model="username" autofocus @keypress.enter="onLogIn" placeholder="Please input username" /></div>
    </div>
    <div class="row">
      <div class="label">Password</div>
      <div class="i"><el-input v-model="password" @keypress.enter="onLogIn" placeholder="Please input password" show-password /></div>
    </div>
    <div class="options">
      <t-button type="light" class="fgt">Forget your account?</t-button>
      <t-button type="normal" @click="onLogIn">Login</t-button>
    </div>
  </div>
</template>

<script>
import TButton from '../../components/common/TButton.vue'
import api from '../../request'
import { handleResult } from '../../utils/index.js'
import { access } from '../../config/auth.js'

export default {
  components: {
    TButton,
  },
  props: {
  },
  data () {
    return {
      username: '',
      password: '',
      loginLock: false,
    }
  },
  methods: {
    async onLogIn () {
      if (this.loginLock) {
        ElMessage({
          message: 'Chill. We are processing your registration.',
          type: 'error',
        })
        return 
      }
      const { login } = api
      this.loginLock = true
      const p = {
        username: this.username,
        password: this.password,
      }
      const res = await login(p)
      this.loginLock = false
      if(!handleResult(res, true, 'Welcome!')) return
      const { token, user } = res.data
      this.$store.commit('setToken', token)
      this.$store.commit('setUser', user)
      const { auth } = user
      localStorage.setItem('token', token)
      localStorage.setItem('userId', user.uid)
      if (auth.includes(access.LOG_IN_ADMIN)) {
        // go to admin, open in new page
        let routeData = this.$router.resolve({
          path: '/admin',
        })
        window.open(routeData.href, '_blank')
        // this.$router.push('/admin')
      } else if (auth.includes(access.LOG_IN_MAIN)){
        // go to home
        this.$router.push('/')
      }
    },
    cancelSignIn () {
      this.$emit('cancelSignIn')
    },
  },
  mounted () {
  },
}
</script>

<style lang="scss" scoped>
.sign-in-pannel {
  width: 460px;
  height: 300px;
  background-color: #333;
  /* filter: blur(1px); */
  opacity: 0.7;
  position: relative;
  top: 180px;
  left: 50%;
  transform: translate(-50%);
  border-radius: 20px;
  padding-top: 80px;
  .cancel {
    background-image: url('../../assets/common/cancel.png');
    background-size: 100% 100%;
    position: absolute;
    right: 10px;
    top: 10px;
    height: 25px;
    width: 25px;
    cursor: pointer;
  }
  .title {
    color: #fff;
    position: fixed;
    top: 50px;
    left: 50%;
    line-height: 36px;
    transform: translate(-50%, 0);
    font-size: 25px;
    font-weight: 800;
    letter-spacing: 0.1rem;
    cursor: default;
  }
  .row {
    width: 350px;
    height: 35px;
    margin: 0 auto;
    margin-top: 50px;
    color: #fff;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
    font-size: 18px;
    .i {
      width: 250px;
    }
  }
  .options {
    display: flex;
    flex-direction: row;
    width: 360px;
    margin: 0 auto;
    margin-top: 40px;
    justify-content: space-between;
    .fgt {
      text-align: left;
      padding-left: 4px;
      font-size: 14px;
      font-weight: 400;
    }
  }
}
</style>