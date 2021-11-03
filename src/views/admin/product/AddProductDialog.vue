<template>
  <t-dialog title="Add Product" width="600px" confirmText="Add" ref="dialog" @onConfirm="onConfirm">
    <div class="content">
      <div class="row">
        <div class="label">Name</div>
        <div class="input h">
          <el-input v-model="form.name"></el-input>
        </div>
      </div>
      <div class="row">
        <div class="label">Category</div>
        <div class="input">
          <el-select v-model="form.cate" @change="getTypeOptions">
            <el-option
              v-for="op in cateOptions"
              :key="op.value"
              :label="op.label"
              :value="op.value"
            />
          </el-select>
        </div>
      </div>
      <div class="row">
        <div class="label">Type</div>
        <div class="input">
          <el-select v-model="form.type" no-data-text="Select Types">
            <el-option
              v-for="op in computedTypeOptions"
              :key="op.value"
              :label="op.label"
              :value="op.value"
            />
          </el-select>
        </div>
      </div>
      <div class="row">
        <div class="label">Price</div>
        <div class="input">
          <el-input-number v-model="form.price" />
        </div>
      </div>
      <div class="row">
        <div class="label">Unit</div>
        <div class="input h">
          <el-input v-model="form.unit" placeholder="eg: 100g" />
        </div>
      </div>
      <div class="row">
        <div class="label">Amount</div>
        <div class="input">
          <el-input-number v-model="form.amount" />
        </div>
      </div>
      <div class="row"></div>
      <div class="row">
        <div class="label">Images</div>
        <div class="input">
          <t-image-uploader :multipleImages="true" @submitImgSrc="setImgSrc" />
        </div>
      </div>
    </div>
  </t-dialog>
</template>

<script>
import TDialog from '../../../components/common/TDialog.vue'
import TImageUploader from '../../../components/common/TImageUploader.vue'
import { Plus } from '@element-plus/icons'
import api from '../../../request'

export default {
  components: {
    TDialog,
    // Plus,
    TImageUploader,
  },
  props: {
  
  },
  data () {
    return {
      dialogVisible: false,
      imageUrl: '',
      previewSrc: '',
      imgList: [],
      cateOptions: [],
      typeOptions: [],
      form: {
        name: '',
        cate: 1,
        type: null,
        price: 10,
        unit: '',
        amount: 10,
      },
    }
  },
  computed: {
    computeCateOption () {
      return this.cateOptions
    },
    computedTypeOptions () {
      return this.typeOptions
    },
  },
  methods: {
    setVisible () {
      this.$refs['dialog'].setVisible()
    },
    setHidden () {
      this.$refs['dialog'].setHidden()
    },
    onConfirm (e) {
      console.log('e', this.form, this.imgList)
    },
    myRequest (e) {
      console.log(e)
    },
    setImgSrc (srcList) {
      this.imgList = srcList
      console.log('src', srcList, srcList[0])
    },
    async getCateOptions () {
      const { getCateOptions } = api
      const res = await getCateOptions()
      this.typeOptions = []
      if (res) this.cateOptions = res
      this.form.type = null
    },
    async getTypeOptions () {
      const { getTypeOptions } = api
      const res = await getTypeOptions({ cate_code: this.form.cate || 1 })
      if (res) this.typeOptions = res
    },
  },

  created () {
    this.getCateOptions()
    this.getTypeOptions()
  },
}
</script>

<style lang="scss">
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: scroll;
  .row {
    margin: 10px;
    display: flex;
    align-items: center;
    .label {
      width: 100px;
      text-align: left;
      font-size: 16px;
      font-weight: 400;
      margin-left: 20px;
    }
    .input {
      width: 440px;
      text-align: left;
      &.h {
        .el-input__inner {
          width: 320px;
        }
      }
      
    }
  }
}
</style>