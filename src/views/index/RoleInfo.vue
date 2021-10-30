<template>
  <div class="sign-up-content role-info" @keypress.enter.capture="register">
    <!-- if home user
    "marriage_status"
    "gender"
    "birth" -->
    <!-- if business user
    "name"
    "cate" -->
    <!-- common
    "annual_income": 99000000,
    "street": "No Street",
    "city": "Pittsburgh",
    "state_id": 4,
    "zip_code": 15213, -->
     <div class="row" v-if="roleID == business">
      <div class="label">
        Business Name:
      </div>
      <div class="input">
        <el-input class="in" placeholder="# University Of Pittsburgh" v-model="name" />
      </div>
    </div>
     <div class="row" v-if="roleID == business">
      <div class="label">
        Business Type:
      </div>
      <div class="input">
        <el-select v-model="cate" placeholder="Select Type"  @click="initOptions('businessTypes')">
          <el-option
            v-for="item in businessTypeOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="row" v-if="roleID == home">
      <div class="label">
        Marriage:
      </div>
      <div class="input">
        <el-select v-model="marriageStatus" placeholder="Select Marriage Status">
          <el-option
            v-for="item in marriageOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="row" v-if="roleID == home">
      <div class="label">
        Gender:
      </div>
      <div class="input">
        <el-select v-model="gender" placeholder="Select Gender">
          <el-option
            v-for="item in genderOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="row" v-if="roleID == home">
      <div class="label">
        Birth:
      </div>
      <div class="input">
        <el-date-picker v-model="birth" type="date" placeholder="Pick Your Birth Day" />
      </div>
    </div>
    <div class="row">
      <div class="label">
        Annual Income:
      </div>
      <div class="input">
        <el-input
          v-model="annualIncome"
          placeholder="Your Annual Income"
          :min="1"
          :max="100000000"
        >
        <template #suffix>
          <div class="dollar"></div>
        </template>
        </el-input>
      </div>
    </div>
    <div class="row">
      <div class="label">
        State:
      </div>
      <div class="input">
        <el-select v-model="state" placeholder="Select State"  @click="initOptions('states')">
          <el-option
            v-for="item in stateOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="row">
      <div class="label">
        City:
      </div>
      <div class="input">
        <el-input class="in" placeholder="# Pittsburgh" v-model="city" />
      </div>
    </div>
    <div class="row">
      <div class="label">
        Street:
      </div>
      <div class="input">
        <el-input class="in" placeholder="# 300, Fifth AVE" v-model="street" />
      </div>
    </div>
    <div class="row">
      <div class="label">
        Zip Code:
      </div>
      <div class="input">
        <el-input class="in" placeholder="# 15213" v-model="zipCode" />
      </div>
    </div>
    <div class="options">
      <t-button type="light" style="text-decoration: underline;" @onClick="goPrevious">Previous</t-button>
      <t-button :type="btnStyle" :disabled="!completed" @onClick="register">Register</t-button>
    </div>
  </div>
</template>

<script>
import TButton from '../../components/common/TButton.vue'
import { debounce, isNumber } from '../../utils'
import api from '../../request'
import { handleResult, getUnixTimeStamp } from '../../utils'
import { gender, marriageStatus } from '../../config/common'
import { role } from '../../config/auth'
import { ElMessage } from 'element-plus'

export default {
  components: {
    TButton,
  },
  props: {
    roleID: {
      type: Number,
      default: role.HOME_CUSTOMER,
    },
  },
  data () {
    let stateOptions = []
    let businessTypeOptions = []
    let marriageOptions = [
      {
        value: marriageStatus.SINGLE,
        label: 'Single',
      },
      {
        value: marriageStatus.MARRIED,
        label: 'Married',
      },
      {
        value: marriageStatus.DIVORCED,
        label: 'Divorced',
      },
    ]
    let genderOptions = [
      {
        value: gender.MALE,
        label: 'Male',
      },
      {
        value: gender.FEMALE,
        label: 'Female',
      },
      {
        value: gender.NOT_APPLY,
        label: 'Not Applied',
      },
      
    ]
    return {
      stateOptions,
      businessTypeOptions,
      marriageOptions,
      genderOptions,
      annualIncome: 10000,
      state: null,
      city: null,
      street: '',
      zipCode: null,
      marriageStatus: null,
      gender: null,
      birth: null,
      name: null,
      cate: null,
      business: -1, // role.BUSINESS_CUSTOMER
      home: -1,
    }
  },
  computed: {
    completed () {
      const b = Boolean(this.state && this.city && this.street && this.zipCode && this.annualIncome)
      if (this.roleID == role.HOME_CUSTOMER) return b && this.gender != null && this.birth && this.marriageStatus != null
      else return b && this.name && this.cate
    },
    btnStyle () {
      return this.completed ? 'normal' : 'light'
    },
  },
  methods: {
    register () {
      if (!this.completed) return
      this.annualIncome = parseInt(this.annualIncome)
      this.zipCode = parseInt(this.zipCode)
      if (!isNumber(this.annualIncome)) {
        ElMessage({
          message: 'Please input number as annual income.',
          type: 'error',
        })
        return
      }
      if (!isNumber(this.zipCode) || String(this.zipCode).length != 5) {
        ElMessage({
          message: 'Please input 5-digit number as zip code.',
          type: 'error',
        })
        return
      }
      let form = {}
      const common = {
        state_id: this.state,
        city: this.city,
        zip_code: this.zipCode,
        annual_income: this.annualIncome,
        street: this.street,
      }
      if (this.roleID == role.HOME_CUSTOMER) {
        const home = {
          gender: this.gender,
          marriage_status: this.marriageStatus,
          birth: getUnixTimeStamp(this.birth),
        }
        form = { ...common, ...home }
      } else if (this.roleID == role.BUSINESS_CUSTOMER) {
        const business = {
          name: this.name,
          cate: this.cate,
        }
        form = { ...common, ...business }
      }
      this.$emit('completeInfo', form)
    },
    goPrevious () {
      // debounce, cannot go back within 500 ms
      debounce(() => this.$emit('goPrevious'), 500, this)()
    },
    // async getStates () {
    //   const states = await getStatesAPI()
    //   return states
    // },
    async initOptions (type) {
      const { getStates, getBusinessTypes } = api
      if (type == 'states' && this.stateOptions.length == []) {
        const res = await getStates()
        if (!handleResult(res, false)) return
        const { data: states } = res
        const stateOptions = []
        states.map( ({ id, name }) => {
          stateOptions.push({ value: id, label: name })
          this.stateOptions = stateOptions
        })
      } else if (type == 'businessTypes' && this.businessTypeOptions.length == []) {
        const res = await getBusinessTypes()
        if (!handleResult(res, false)) return
        const { data: businessTypes } = res
        const businessTypeOptions = []
        businessTypes.map( ({ type, name }) => {
          businessTypeOptions.push({ value: type, label: name })
        })
        this.businessTypeOptions = businessTypeOptions
      }
    },
  },
  created (){
    this.business = role.BUSINESS_CUSTOMER
    this.home = role.HOME_CUSTOMER
  },
  async mounted () {
    // if (this.stateOptions.length == 0 || this.businessTypeOptions.length == 0) await this.initOptions()
    
  },
}
</script>

<style lang="scss">
.sign-up-content {
  &.role-info {
    .row {
      margin: 10px auto;
      .label {
        font-size: 14px;
        width: 105px;
      }
      .input {
        .el-input {
          --el-input-placeholder-color: #888;
          --el-input-font-color: #333;
          height: 30px;
          line-height: 30px;
          & ::placeholder {
            font-size: 12px;
            font-weight: 300;
          }
        }
        .el-input__inner {
          height: 30px;
          line-height: 30px;
          font-size: 16px;
          font-weight: 400;
          width: 250px;
        }
        .el-input-number {
          line-height: 30px;
        }
        .el-input-number__decrease, .el-input-number__increase {
          height: 29px;
        }
        .el-input__icon {
          height: 30px;
          line-height: 30px;
        }
        .el-date-editor {
          transform: translateX(-15px);
        }
        .dollar {
          background-image: url('../../assets/common/dollar.png');
          width: 20px;
          height: 20px;
          background-size: 100% 100%;
          transform: translateY(5px);
        }
      }
    }
  }
}
</style>