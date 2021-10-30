<template>
  <div class="sign-up-content role-selection">
    <t-button class="role-btn home" :class="{'selected': selectedRole == role.HOME_CUSTOMER}" :data-role="role.HOME_CUSTOMER" @click="selectRole">Sign Up As Home Customer</t-button>
    <div class="or"> OR </div>
    <t-button class="role-btn" :class="{'selected': selectedRole == role.BUSINESS_CUSTOMER}" :data-role="role.BUSINESS_CUSTOMER" @click="selectRole">Sign Up As Business Customer</t-button>
  </div>
</template>

<script>
import TButton from '../../components/common/TButton.vue'
import { role } from '../../config/auth'

export default {
  components: {
    TButton,
  },
  data () {
    return {
      role,
      selectedRole: 0,
    }
  },
  methods: {
    selectRole (e) {
      const role_id = Number(e.srcElement.dataset.role)
      this.selectedRole = role_id
      this.$emit('completeRole', { role_id })
    },
  },
}
</script>

<style lang="scss" scoped>
.role-selection {
  padding-top: 25px;
  .role-btn {
    width: 270px;
  }
  .selected {
    color: $yellow;
  }
  .or {
    margin: 15px auto;
    cursor: default;
    color: #fff;
    font-size: 20px;
    font-weight: 800;
    height: 30px;
    line-height: 30px;
  }
}

</style>