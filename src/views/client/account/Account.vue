<template>
  <div class="account">
    <t-title :title="$t('home.menu.account')" />
    <div class="admin" v-if="role=='admin'">
      <img class="avatar" src="@/assets/avatar/default-avatar.jpg" alt="avatar">
      <div class="welcome"> {{ $t('account.welcome', { name: user.name || 'admin' }) }} </div>
    </div>
    <div class="info" v-else>
      <div class="options" v-if="!editing">
        <el-button type="primary" circle @click="onEdit(true)">
          <el-icon>
            <edit />
          </el-icon>
        </el-button>
      </div>
      <div class="options" v-else>
        <el-button type="info" circle @click="onEdit(false)">
          <el-icon>
            <close />
          </el-icon>
        </el-button>
        <t-button @onClick="onUpdate">Update</t-button>
      </div>

      <div class="row">
        <div class="label">
          {{ $t('account.userName') }}
        </div>
        <div class="value" v-if="!editing">
          {{ user.username }}
        </div>
        <div class="input" v-else>
          <el-input v-model="form.username"></el-input>
        </div>
      </div>

      <!-- home user -->
      <div class="row" v-if="role=='home'">
        <div class="label">
          {{ $t('account.phone') }}
        </div>
        <div class="value" v-if="!editing">
          {{ user.phone }}
        </div>
        <div class="input" v-else>
          <el-input v-model="form.phone"></el-input>
        </div>
      </div>
      <div class="row" v-if="role=='home'">
        <div class="label">
          {{ $t('account.email') }}
        </div>
        <div class="value" v-if="!editing">
          {{ user.email }}
        </div>
        <div class="input" v-else>
          <el-input v-model="form.email"></el-input>
        </div>
      </div>
      <div class="row" v-if="role=='home'">
        <div class="label">
          {{ $t('account.gender') }}
        </div>
        <div class="value" v-if="!editing">
          {{ genderName }}
        </div>
        <div class="input" v-else>
          <el-select v-model="form.gender" :placeholder="form.gender">
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
      <div class="row" v-if="role=='home'">
        <div class="label">
          {{ $t('account.birth') }}
        </div>
        <div class="value" v-if="!editing">
          {{ birthDay }}
        </div>
        <div class="input" v-else>
          <el-date-picker v-model="form.birth" type="date" placeholder="Pick a day">
        </el-date-picker>
        </div>
      </div>
      <!-- home user ends -->

      <!-- business user -->
      <div class="row" v-if="role=='business'">
        <div class="label">
          {{ $t('account.bName') }}
        </div>
        <div class="value" v-if="!editing">
          {{ user.name }}
        </div>
        <div class="input" v-else>
          <el-input v-model="form.name"></el-input>
        </div>
      </div>
      <div class="row" v-if="role=='business'">
        <div class="label">
          {{ $t('account.cate') }}
        </div>
        <div class="value" v-if="!editing">
          {{ bCate }}
        </div>
        <div class="input" v-else>
          <el-select v-model="form.cate" :placeholder="form.cate">
            <el-option
              v-for="item in bTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </div>
      </div>
      <!-- business user ends -->

      <!-- common attributes -->
      <div class="row">
        <div class="label">
          {{ $t('account.income') }}
        </div>
        <div class="value" v-if="!editing">
          {{ income }} $
        </div>
        <div class="input" v-else>
          <el-input-number
            v-model="form.annual_income"
            :min="0"
            :max="1000000000"
            controls-position="right"
          />
        </div>
      </div>
      <div class="row">
        <div class="label">
          {{ $t('account.state') }}
        </div>
        <div class="value" v-if="!editing">
          {{ stateName }}
        </div>
        <div class="input" v-else>
          <el-select v-model="form.state_id" :placeholder="form.state_id">
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
          {{ $t('account.city') }}
        </div>
        <div class="value" v-if="!editing">
          {{ user.city }}
        </div>
        <div class="input" v-else>
          <el-input v-model="form.city"></el-input>
        </div>
      </div>
      <div class="row">
        <div class="label">
          {{ $t('account.street') }}
        </div>
        <div class="value" v-if="!editing">
          {{ user.street }}
        </div>
        <div class="input" v-else>
          <el-input v-model="form.street"></el-input>
        </div>
      </div>
      <div class="row">
        <div class="label">
          {{ $t('account.zip') }}
        </div>
        <div class="value" v-if="!editing">
          {{ user.zip_code }}
        </div>
        <div class="input" v-else>
          <el-input v-model="form.zip_code"></el-input>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import { getWindowPath, handleResult, convertBigMoney, formatTS } from '../../../utils'
import TTitle from '../../../components/common/client/TTitle.vue'
import { role, businessType } from '../../../config'
import api from '../../../request'
import { Edit, Close } from '@element-plus/icons'
import TButton from '../../../components/common/TButton.vue'
import { nextTick } from 'vue-demi'

/**
 * annual_income: 200000
auth: (5) [1, 2, 3, 4, 5]
birth: 1680000000
city: "Pittsburgh"
email: null
gender: 123456
id: 1
marriage_status: 0
phone: null
role_id: 1
state_id: 4
street: "332 N Craig"
uid: 2
username: "dipper"
zip_code: 15213
 */

export default {
  components: {
    TTitle,
    TButton,
    Close,
    Edit,
  },
  data () {
    const genderOptions = [
      {
        value: 0,
        label: 'Male',
      },
      {
        value: 1,
        label: 'Female',
      },
      {
        value: 2,
        label: 'Not Applied',
      },
    ]
    const bTypeOptions = [
      {
        value: 1,
        label: 'Factory',
      },
      {
        value: 2,
        label: 'Internet Service',
      },
      {
        value: 3,
        label: 'Media',
      },
    ]
    return {
      genderOptions,
      bTypeOptions,
      uid: null,
      user: null,
      editing: false,
      form: {
        username: '',
        birth: 1680000000,
        city: 'Pittsburgh',
        email: null,
        gender: 2,
        street: '',
        cate: 1,
        name: '',
        city: '',
        zip_code: null,
        annual_income: 0,
        state_id: 0,
      },
      stateOptions: [],
    }
  },
  computed: {
    role () {
      let res = 'admin'
      if (this.user?.role_id == role.HOME_CUSTOMER) res = 'home'
      if (this.user?.role_id == role.BUSINESS_CUSTOMER) res = 'business'
      return res
    },
    stateName () {
      let name = 'Unknown'
      for (let i of this.stateOptions) {
        if (i.value == this.user.state_id) {
          name = i.label
          break
        }
      }
      return name
    },
    income () {
      return convertBigMoney(this.user.annual_income)
    },
    bCate () {
      let name = 'Unknown'
      if (businessType.FACTORY == this.user.cate) name = 'Factory'
      if (businessType.INTERNET_SERVICE == this.user.cate) name = 'Internet Service'
      if (businessType.MEDIA == this.user.cate) name = 'Media'
      return name
    },
    genderName () {
      return ['Male', 'Female', 'Not Applied'][this.user.gender]
    },
    birthDay () {
      return formatTS(this.user.birth, 'YYYY-MM-DD')
    },
  },
  methods: {
    fetchUserData () {

    },
    onEdit (edit = true) {
      this.editing = edit
      this.initForm()
    },
    initForm () {
      this.form = {
        username: this.user.username,
        birth: this.user.birth * 1000,
        city: this.user.city,
        email: this.user.email,
        phone: this.user.phone,
        gender: this.user.gender,
        street: this.user.street,
        cate: this.user.cate,
        name: this.user.name,
        city: this.user.city,
        zip_code: this.user.zip_code,
        annual_income: convertBigMoney(this.user.annual_income),
        state_id: this.user.state_id,
      }
    },
    async onUpdate () {
      if (this.lock) return
      this.lock = true
      const { updateUserInfo, getUserInfo } = api
      const res = await updateUserInfo({ ...this.form,
        uid: this.uid,
        birth: Math.floor(this.form?.birth / 1000) || 0,
        annual_income: this.form.annual_income * 100,
        role_id: this.user.role_id,
      })
      this.lock = false
      if (!handleResult(res, true, 'Updated')) return
      const user = await getUserInfo({ uid: this.uid })
      if (!handleResult(res, false)) return
      this.user = user.data
      this.$store.state.user = user.data
      nextTick(() => {
        this.editing = false
      })
    },
  },
  async created () {
    const { param } = getWindowPath()
    const uid = Number(param[0].groups.v)
    this.uid = uid
    this.user = this.$store.getters.getUser
    console.log(this.user, typeof this.uid)
    this.fetchUserData()
    const { getStatesOptions } = api
    const stateOptions = await getStatesOptions()
    this.stateOptions = stateOptions
    this.initForm()
  },
}
</script>

<style lang="scss">
.account {
  color: #333;
  .admin {
    margin: 50px auto;
    width: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .avatar {
      width: 150px;
      height: 150px;
      border-radius: 10px;
    }
    .welcome {
      height: 40px;
      line-height: 40px;
      margin: 40px auto;
      color: $text-color;
      font-size: 22px;
      font-size: 600;
      letter-spacing: 0.1rem;
      cursor: default;
    }
  }
  .info {
    width: 1120px;
    box-sizing: border-box;
    margin: 20px auto;
    border-radius: 10px;
    background-color: #fff;
    position: relative;
    padding: 40px 20px;
    .options {
      height: 50px;
      width: 300px;
      position: absolute;
      right: 0;
      top: 20px;
      padding: 10px 20px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
      .t-btn {
        background-color: $yellow;
        margin-left: 20px;
        &:hover {
          background-color: $super-dark-yellow;
        }
      }
    }
    .row {
      width: 1120px;
      height: 50px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      .label {
        width: 200px;
        text-align: right;
        padding: 10px 20px;
        line-height: 40px;
        font-size: 18px;
      }
      .value, .input {
        width: 600px;
        .el-input, .el-date-editor.el-input, .el-date-editor.el-input__inner, .el-input__inner, .el-input-number {
          width: 400px;
        }
        .el-input__inner {
          width: 400px;
        }
      }
    }
  }

}
</style>