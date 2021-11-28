<template>
  <div class="order">
    <t-bread-crumb :config="breadConfig"></t-bread-crumb>
    <t-admin-table ref="staffTable"
      :config="config"
      :tableData="tableData"
      :total="total"
      @fetchData="fetchData"
      @onClickAddProduct="onClickAddProduct"
      @handleSort="handleSort"
    >
      <template v-slot:options="{ scope }">
        <el-button type="primary" circle @click="onCheckImg(scope)">
          <el-icon>
            <search />
          </el-icon>
        </el-button>
        <el-button type="primary" circle @click="openUpdateDialog(scope.row)">
          <el-icon>
            <edit />
          </el-icon>
        </el-button>
        <el-popconfirm title="Are you sure to delete this?" @confirm="onDeleteProduct(scope.row.id)">
          <template #reference>
            <el-button type="danger" circle>
              <el-icon>
                <delete />
              </el-icon>
            </el-button>
          </template>
        </el-popconfirm>
        <el-button type="success" @click="openListDialog(scope.row.id)" v-if="!scope.row.listed">
          List
        </el-button>
        <el-button type="info" @click="onUnlistProduct(scope.row.id)" v-else>
          Unlist
        </el-button>
      </template>
    </t-admin-table>
  </div>
</template>

<script>
import TAdminTable from '../../../components/common/admin/TTable.vue'
import orderConfig from './OrderConfig.js'
import api from '../../../request'
import { Search, Edit, Check, Message, Star, Delete } from '@element-plus/icons'
import TBreadCrumb from '../../../components/common/admin/TBreadCrumb.vue'
import TDialog from '../../../components/common/TDialog.vue'
import TEmpty from '../../../components/common/TEmpty.vue'
import { handleResult } from '../../../utils'

export default {
  components: {
    TAdminTable,
    // eslint-disable-next-line vue/no-unused-components
    // Star,
    // eslint-disable-next-line vue/no-unused-components
    Delete,
    Search,
    Edit,
    TBreadCrumb,
  },
  data () {
    const breadConfig = [
      { name: 'Home', to: '/admin' },
      { name: 'Order' },
    ]
    return {
      config: {},
      tableData: [],
      total: 0,
      breadConfig,
      imgList: [],
      availableStores: [], // stores that the product is available in
      sortDesc: null, // table data sort by price
    }
  },
  methods: {
    async fetchData (p) {
      // if (this.sortDesc == true || this.sortDesc == false) {
      //   p = p ? p : {}
      //   p = { ...p, sortDesc: this.sortDesc }
      // }
      const { getOrders } = api
      const res = await getOrders(p)
      const { count, rows } = res.data
      this.tableData = rows
      this.total = count
    },
    onClickAddProduct () {
      this.$refs['dialog'].setVisible()
    },
    async onCheckImg (scope) {
      const { getProductImg } = api
      const res = await getProductImg({ id: scope.row.id })
      this.imgList = res?.data?.imgList || []
      this.availableStores = scope.row.Stores
      this.setPicVisible()
    },
    setPicVisible () {
      this.$refs['picDialog'].setVisible()
    },
    setPicHidden () {
      this.$refs['picDialog'].setHidden()
    },
    clearPicData () {
      this.imgList = []
      this.availableStores = []
    },
    openListDialog (id) {
      this.$refs['listDialog'].setVisible()
      this.$refs['listDialog'].productID = id
    },
    openUpdateDialog (product) {
      this.$refs['updateDialog'].setVisible()
      this.$refs['updateDialog'].product2Update = product
    },
    async onDeleteProduct (id) {
      if (!id) {
        this.$message({
          message: 'Cannot find product id.',
          type: 'warning',
        })
        return
      }
      const { deleteProduct } = api
      const res = await deleteProduct({ pid: id })
      if(!handleResult(res)) return
      this.fetchData()
    },
    async onUnlistProduct (id) {
      if (!id) {
        this.$message({
          message: 'Cannot find product id.',
          type: 'warning',
        })
        return
      }
      const { unlistProduct } = api
      const res = await unlistProduct({ pid: id })
      if(!handleResult(res)) return
      this.fetchData()
    },
    handleSort ({ prop, order }) {
      if (prop == 'unitPrice') {
        switch (order) {
          case 'ascending':
            this.sortDesc = false
            this.fetchData()
            break
          case 'descending':
            this.sortDesc = true
            this.fetchData()
            break
          default:
            this.sortDesc = null
            this.fetchData()
        }
      } else {
        this.sortDesc = null
        this.fetchData()
      }
    },
  },
  created () {
    this.config = orderConfig
  },
}
</script>

<style lang="scss" scoped>
.store-title {
  font-size: 18px;
  font-weight: 400;
  color: $text-color;
}
.store {
  width: 300px;
  display: flex;
  margin: 10px auto;
  justify-content: center;
  .id {
    width: 100px;
    display: inline-block;
  }
  .name {
    width: 200px;
    display: inline-block;
  }
}
.imgList {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
  .img {
    img {
      width: 180px;
      height: 180px;
      border-radius: 10px;
      display: block;
    }
    
  }
}

</style>