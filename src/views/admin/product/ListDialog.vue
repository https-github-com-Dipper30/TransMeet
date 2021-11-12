<template>
  <t-dialog title="Select Stores" width="600px" confirmText="List" ref="dialog" @onConfirm="onConfirm" @clearData="clearData">

    This product will be listed to following {{ stores.length }} stores  ( shown as ids ):
      <el-input v-model="storeIDs" />

      <el-table
        class="table"
        ref="storeTable"
        :data="stores"
        style="width: 100%"
        @selectionChange="onSelectStores"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column type="index" width="50" />
        <el-table-column property="id" label="Store ID" width="120" />
        <el-table-column property="name" label="Store Name" width="120" />
        <el-table-column property="Region.name" label="Region" />
      </el-table>

  </t-dialog>
</template>

<script>
import TDialog from '../../../components/common/TDialog.vue'
import api from '../../../request'
import { handleResult } from '../../../utils'

export default {
  components: {
    TDialog,
    // Plus,
  },
  props: {
  
  },
  data () {
    return {
      dialogVisible: false,
      stores: [],
      selectedStores: [],
      storeIDs: '',
      productID: null,
      lock: false,
    }
  },
  watch: {
    selectedStores: {
      deep: true,
      handler: function (newValue, oldValue) {
        let res = ''
        for (let s of newValue) {
          res += `${s.id},`
        }
        this.storeIDs = res
      },
    },
  },
  computed: {
    // storeIDs () {
      
    // },
  },
  methods: {
    setVisible (clearData = false) {
      // this.resetForm()
      this.$refs['dialog'].setVisible(clearData)
      this.fetchStoreData()
    },
    setHidden (clearData = true) {
      // this.resetForm()
      this.$refs['dialog'].setHidden(clearData)
    },
    clearData () {
      this.productID = null,
      this.stores = []
      this.selectedStores = []
      this.storeIDs = ''
      this.lock = false
    },
    onSelectStores (val) {
      this.selectedStores = val
    },
    async fetchStoreData () {
      const { getStores } = api
      const stores = await getStores({ size: 100000 })
      this.stores = stores.data.rows
    },
    async onConfirm (e) {
      // form store ids to array and filter duplicates
      let res = this.storeIDs.split(',')
      res.pop()
      res = res.filter((e, index, arr) => arr.lastIndexOf(e) == index)
      res = res.map(e => parseInt(e))
      await this.onListProduct(res)
      // console.log('e', this.form, this.imgList)
      // const files = this.imgList
      // const { uploadProductImage, addProduct } = api
      // const added = await addProduct(this.form)
      // if (!handleResult(added, false)) return

      // const { id } = added.data
      // const upload = await uploadProductImage(files, [{ prop: 'id', value: id }])
      // if (!handleResult(upload)) return
      // this.setHidden()
    },
    async onListProduct (sid) {
      console.log(this.productID, sid)
      if (this.lock) {
        this.$message({
          message: 'Processing...',
          type: 'warning',
        })
        return
      }
      if (!this.productID) {
        this.$message({
          message: 'Cannot find product id.',
          type: 'error',
        })
        return
      } else if (sid.length == 0) {
        this.$message({
          message: 'Please input at least 1 store id.',
          type: 'error',
        })
        return
      }
      const { listProduct } = api
      this.lock = true
      const res = await listProduct({ pid: this.productID, sid })
      this.lock = false
      if (!handleResult(res)) return
      this.$emit('fetchData')
      this.setHidden()
    },
  },

  created () {

  },
}
</script>

<style lang="scss" scoped>
.el-table {
  height: 450px;
  overflow: scroll;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  overflow: scroll;
  /* .table { */
    
  /* } */
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