<template>
  <div class="sign-up-pannel" :class="{'p1': p1, 'p2': p2, 'p3': p3, 'b': b}">
    <div class="cancel" @click="cancelSignIn" />
    <div class="title">{{ title }}</div>
    <div class="content" :class="{'p1': p1, 'p2': p2, 'p3': p3}">
      <!-- 3 steps in total -->
      <RoleSelection @completeRole="completeRole"  />
      <AccountInfo @goPrevious="goPrevious" @completeAccount="completeAccount" />
      <RoleInfo @goPrevious="goPrevious" @completeInfo="completeInfo" :roleID="roleID" />
    </div>
    
  </div>
</template>

<script>
import RoleSelection from './RoleSelection.vue'
import RoleInfo from './RoleInfo.vue'
import AccountInfo from './AccountInfo.vue'
import { role } from '../../config/auth'
import api from '../../request'
import { ElMessage } from 'element-plus'
import { handleResult } from '../../utils'

export default {
  components: {
    RoleSelection,
    RoleInfo,
    AccountInfo,
  },
  data () {
    const form = {
      username: '',
      password: '',
      role_id: 0,
      marriage_status: 0,
      gender: 0,
      birth: 0,
      annual_income: 0,
      street: null,
      city: null,
      state_id: null,
      zip_code: null,
      registrationLock: false, // in case users register multiple times, after click on register, lock the button until callback
    }
    let currentProgress = 1
    return {
      currentProgress,
      form,
      roleID: 0,
    }
  },
  computed: {
    canShowRoleSelection () {
      return true
    },
    // can show progress 2 only if role id is selected
    canShowAccountInfo () {
      return this.form.role_id 
    },
    canShowRoleInfo () {
      return this.canShowAccountInfo && this.form.username && this.form.password 
    },
    p1 () {
      return this.canShowRoleSelection && this.currentProgress == 1
    },
    p2 () {
      return this.canShowAccountInfo && this.currentProgress == 2
    },
    p3 () {
      return this.canShowRoleInfo && this.currentProgress == 3
    },
    // show business customer form height
    b () {
      return this.roleID == role.BUSINESS_CUSTOMER
    },
    title () {
      if (this.p1) return 'Sign Up'
      return this.form.role_id == role.HOME_CUSTOMER ? 'Home Customer' : 'Business Customer'
    },
  },
  methods: {
    cancelSignIn () {
      this.$emit('cancelSignUp')
    },
    completeRole (role) {
      const { role_id } = role
      this.form = { ...this.form, role_id }
      this.roleID = role_id
      this.currentProgress = this.currentProgress + 1 // continue to next page
    },
    goPrevious () {
      this.currentProgress = this.currentProgress - 1
    },
    completeAccount (account) {
      this.form = { ...this.form, ...account }
      this.currentProgress = this.currentProgress + 1 // continue to next page
    },
    async completeInfo (form) {
      this.form = { ...this.form, ...form }
      await this.onRegister()
    },
    async onRegister () {
      const { register } = api
      if (this.registrationLock) {
        ElMessage({
          message: 'Chill. We are processing your registration.',
          type: 'error',
        })
        return 
      }
      this.registrationLock = true
      const res = await register(this.form)
      this.registrationLock = false
      if (!handleResult(res)) return
      this.$emit('showSignInPanel')
    },
  },
  mounted () {
    console.log('form', this.form)
  },
}
</script>

<style lang="scss">
.sign-up-pannel {
  width: 460px;
  height: 300px;
  background-color: #333;
  /* filter: blur(1px); */
  opacity: 0.7;
  position: relative;
  left: 50%;
  transform: translate(-50%);
  border-radius: 20px;
  overflow: hidden;
  transition: 0.3s;
  padding-top: 106px;
  &.p1 {
    height: 210px;
    top: 180px;
  }
  &.p2 {
    height: 244px;
    top: 180px;
  }
  &.p3 {
    height: 555px;
    top: 100px;
    &.b {
      height: 555px;
      .sign-up-content.role-info {
        height: auto;
      }
    }
  }
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
    width: 300px;
  }
  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 36px;
    margin: 20px auto;
    width: 380px;
    cursor: default;
    .label {
      color: #fff;
      font-weight: 400;
      font-size: 18px;
      width: 50px;
      text-align: left;
      line-height: 36px;
    }
    .input {
      width: 250px;
    }
  }
  .content {
    position: absolute;
    width: 1380px;
    transition: 0.3s;
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    align-items: flex-start;
    .sign-up-content {
      width: 460px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .options {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 385px;
      margin-top: 5px;
    }

    &.p1 {
      margin-left: 0;
    }
    &.p2 {
      margin-left: -460px;
    }
    &.p3 {
      margin-left: -920px;
      overflow: scroll;
      height: 550px;
    }
  }
  /* .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  } */
}
</style>