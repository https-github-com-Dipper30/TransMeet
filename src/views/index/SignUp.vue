<template>
  <div class="sign-up-pannel" :class="{'p1': p1, 'p2': p2, 'p3': p3}">
    <div class="cancel" @click="cancelSignIn" />
    <div class="title">{{ title }}</div>
    <div class="content" :class="{'p1': p1, 'p2': p2, 'p3': p3}">
      <!-- 3 steps in total -->
      <RoleSelection @selectRole="selectRole"  />
      <AccountInfo @goPrevious="goPrevious" />
      <RoleInfo @goPrevious="goPrevious" />
    </div>
    
  </div>
</template>

<script>
import RoleSelection from './RoleSelection.vue'
import RoleInfo from './RoleInfo.vue'
import AccountInfo from './AccountInfo.vue'
import { role } from '../../config/auth'

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
    }
    let currentProgress = 1
    return {
      currentProgress,
      form,
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
    title () {
      if (this.p1) return 'Sign Up'
      return this.form.role_id == role.HOME_CUSTOMER ? 'Home Customer' : 'Business Customer'
    },
  },
  methods: {
    cancelSignIn () {
      this.$emit('cancelSignUp')
    },
    selectRole (role_id) {
      this.form.role_id = role_id
      this.currentProgress = 2 // continue to next page
    },
    goPrevious () {
      this.currentProgress = this.currentProgress - 1
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
  padding-top: 80px;
  overflow: hidden;
  transition: 0.3s;
  &.p1 {
    height: 265px;
    top: 180px;
  }
  &.p2 {
    height: 300px;
    top: 130px;
  }
  &.p3 {
    height: 500px;
    top: 120px;
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
  .content {
    overflow: hidden;
    position: absolute;
    width: 1380px;
    transition: 0.3s;
    display: flex;
    flex-direction: row;
    /* justify-content: center; */
    align-items: center;

    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      height: 36px;
      margin: 20px auto;
      width: 380px;
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

    .options {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      width: 385px;
      margin-top: 30px;
    }

    &.p1 {
      margin-left: 0;
    }
    &.p2 {
      margin-left: -460px;
    }
    &.p3 {
      margin-left: -920px;
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