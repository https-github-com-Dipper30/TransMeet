<template>
  <div class="product">
    <t-bread-crumb :config="breadConfig"></t-bread-crumb>
    <t-admin-table ref="staffTable"
      :config="config"
      :tableData="tableData"
      :total="total"
      @fetchData="fetchData"
      @onClickAddProduct="onClickAddProduct"
    >
      <template v-slot:options="{ scope }">
        <el-button type="warning" :data-row="scope" circle>
          <el-icon>
            <star />
          </el-icon>
        </el-button>
        <el-button type="danger" circle>
          <el-icon>
            <delete />
          </el-icon>
        </el-button>
      </template>
    </t-admin-table>
    <add-product-dialog ref="dialog"></add-product-dialog>
  </div>
</template>

<script>
import TAdminTable from '../../../components/common/admin/TTable.vue'
import productConfig from './ProductConfig.js'
import api from '../../../request'
import { handleResult } from '../../../utils'
import { Search, Edit, Check, Message, Star, Delete } from '@element-plus/icons'
import TBreadCrumb from '../../../components/common/admin/TBreadCrumb.vue'
import AddProductDialog from './AddProductDialog.vue'

export default {
  components: {
    TAdminTable,
    AddProductDialog,
    // eslint-disable-next-line vue/no-unused-components
    Star,
    // eslint-disable-next-line vue/no-unused-components
    Delete,
    TBreadCrumb,
  },
  data () {
    const breadConfig = [
      { name: 'Home', to: '/admin' },
      { name: 'Product' },
    ]
    return {
      config: {},
      tableData: [],
      total: 0,
      breadConfig,
    }
  },
  methods: {
    async fetchData (p) {
      const { getStaff } = api
      const res = await getStaff(p, true)
      const { count, rows } = res.data
      this.tableData = rows
      this.total = count
    },
    onClickAddProduct () {
      this.$refs['dialog'].setVisible()
    },
  },
  created () {
    this.config = productConfig
  },
}
</script>

<style>

</style>