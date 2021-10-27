<template>
  <div class="entry">
    <div class="bg" />
    <div class="title">
      TransMeet
    </div>
    <div class="auth-header">
      <div class="item sign-in" @click="showSignIn = true">Sign In</div>
      <div class="item sign-up">Sign Up</div>
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
    <div class="content-pannel" v-if="showSignIn">
      <div class="title">Sign In</div>
      <el-input v-model="username" placeholder="Please input username" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {
  },
  data () {
    return {
      username: '',
      showSignIn: false,
    }
  },
  methods: {

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
  width: 90px;
  height: 36px;
  line-height: 36px;
  font-weight: 700;
  font-size: 16px;
  cursor: pointer;
}

.sign-in {
  color: #fff;
  top: 20px;
  right: 180px;
}

.sign-in:hover {
  transition: 0.3s;
  color: $yellow;
}

.sign-up {
  color: $text-color;
  right: 60px;
  border-radius: 50vh;
  background-color: #fff;
}

.sign-up:hover {
  transition: 0.3s;
  background-color: $yellow;
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
  width: 480px;
  height: 630px;
  background-color: #333;
  /* filter: blur(1px); */
  opacity: 0.7;
  position: fixed;
  top: max(10%, 100px);
  left: 50%;
  transform: translate(-50%);
  border-radius: 20px;
  
}
</style>
