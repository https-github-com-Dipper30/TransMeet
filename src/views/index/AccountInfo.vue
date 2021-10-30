<template>
  <div class="sign-up-content account-info" @keypress.enter.capture="goNext">
    <div class="row">
      <div class="label">
        Username:
      </div>
      <div class="input">
        <el-input class="in" placeholder="Please input username" v-model="username"></el-input>
      </div>
    </div>
    <div class="row">
      <div class="label">
        Password:
      </div>
      <div class="input">
        <el-input class="in" placeholder="Password should be at least 6-digit long" v-model="password"></el-input>
      </div>
    </div>
    <div class="options">
      <t-button type="light" style="text-decoration: underline;" @onClick="goPrevious">Previous</t-button>
      <t-button :type="btnStyle" :disabled="!completed" @onClick="goNext">Next</t-button>
    </div>
  </div>
</template>

<script>
import TButton from '../../components/common/TButton.vue'
import { debounce } from '../../utils'

export default {
  components: {
    TButton,
  },
  data () {
    return {
      username: '',
      password: '',
      t: null,
    }
  },
  computed: {
    // lenth of password >= 6
    completed () {
      return this.username && this.password?.length >= 6
    },
    btnStyle () {
      return this.completed ? 'normal' : 'light'
    },
  },
  methods: {
    completeAccount () {
      if (this.completed) this.$emit('completeAccount', { username: this.username, password: this.password })
    },
    goPrevious () {
      // debounce, cannot go back within 500 ms
      debounce(() => this.$emit('goPrevious'), 500, this)()
    },
    goNext () {
      if (this.completed) this.$emit('completeAccount', { username: this.username, password: this.password })
    },
  },
}
</script>

<style lang="scss">
.account-info {
  .input {
    .el-input__inner {
      font-size: 16px;
      font-weight: 400;
    }
    .el-input {
      --el-input-placeholder-color: #888;
      --el-input-font-color: #333;
      & ::placeholder {
        font-size: 12px;
        font-weight: 300;
      }
    }
  }
}
</style>