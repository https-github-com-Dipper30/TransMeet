<template>
  <div class="entry">
    <div class="bg" />
    <div class="title">
      TransMeet
    </div>
    <div class="auth-header">
      <TButton class="item sign-in" type="light" @click="showSignInPanel">Sign In</TButton>
      <TButton class="item sign-up" type="normal" @click="showSignUpPanel">Sign Up</TButton>
    </div>
    <div class="slogan p1">
      TransMeet
    </div>
    <div class="slogan p2">
      All
    </div>
    <div class="slogan p3">
      You Want
    </div>
    <div class="slogan p4">
      To Eat
    </div>
    <SignIn v-if="showSignIn" @cancelSignIn="cancelSignIn" />
    <SignUp v-if="showSignUp" @cancelSignUp="cancelSignUp" />
  </div>
</template>

<script>
import SignIn from './SignIn.vue'
import SignUp from './SignUp.vue'
import TButton from '../../components/common/TButton.vue'

export default {
  name: 'Home',
  components: {
    SignIn,
    SignUp,
    TButton,
  },
  data () {
    return {
      showSignIn: false,
      showSignUp: false,
    }
  },
  methods: {
    showSignInPanel () {
      this.showSignUp = false
      this.showSignIn = true
    },
    showSignUpPanel () {
      this.showSignIn = false
      this.showSignUp = true
    },
    cancelSignIn () {
      this.showSignIn = false
    },
    cancelSignUp () {
      this.showSignUp = false
    },
  },
}
</script>

<style lang="scss" scoped>
.bg {
  position: fixed;
  background-image: url('~@/assets/bg.jpeg');
  background-size: 100% 100%;
  width: 1280px;
  min-width: 100vw;
  height: 800px;
  min-height: 100vh;
  z-index: -1;
  top: 0;
}

.title {
  color: #fff;
  position: fixed;
  top: 20px;
  left: 50%;
  line-height: 36px;
  transform: translate(-50%, 0);
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 0.1rem;
  cursor: default;
}

.item {
  position: fixed;
  top: 20px;
  line-height: 30px;
}

.sign-in {
  right: 180px;
}

.sign-up {
  right: 60px;
  padding: 2px 10px;
}

.slogan {
  position: fixed;
  left: 80px;
  font-size: 44px;
  font-weight: 800;
  letter-spacing: 0.2rem;
  color: #fff;
  word-break: break-all;
  width: 300px;
  text-align: left;
  &.p1 {
    color: $yellow;
    top: max(10%, 120px);
  }
  &.p2 {
    top: max(23%, 240px);
  }
  &.p3 {
    top: max(68%, 520px);
  }
  &.p4 {
    top: max(81%, 640px);
  }
}

.content-pannel {
  width: 460px;
  height: 430px;
  background-color: #333;
  /* filter: blur(1px); */
  opacity: 0.7;
  position: relative;
  top: 180px;
  left: 50%;
  transform: translate(-50%);
  border-radius: 20px;
  padding-top: 60px;
  .row {
    width: 350px;
    height: 35px;
    margin: 0 auto;
    margin-top: 60px;
    color: #fff;
    margin-top: 30px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    .i {
      width: 250px;
    }
  }
}
</style>
