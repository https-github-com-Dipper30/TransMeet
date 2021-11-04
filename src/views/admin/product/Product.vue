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
        <el-button type="primary" circle @click="onCheckImg(scope)">
          <el-icon>
            <search />
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
        
        <el-button type="success" @click="onListProduct(scope.row.id)" v-if="!scope.row.listed">
          List
        </el-button>
        <el-button type="info" @click="onUnistProduct(scope.row.id)" v-else>
          Unlist
        </el-button>
      </template>
    </t-admin-table>
    <add-product-dialog ref="dialog"></add-product-dialog>
    <t-dialog ref="picDialog" title="Images" :showCancel="false" confirmText="OK" @onConfirm="setHidden">
      <div class="imgList" v-if="imgList && imgList.length > 0">
        <div class="img" v-for="(img, index) of imgList" :key="index">
          <img :src="`data:image/${img.type};base64,${img.data}`" alt="img" />
        </div>
      </div>
      <t-empty v-else />
    </t-dialog>
  </div>
</template>

<script>
import TAdminTable from '../../../components/common/admin/TTable.vue'
import productConfig from './ProductConfig.js'
import api from '../../../request'
import { Search, Edit, Check, Message, Star, Delete } from '@element-plus/icons'
import TBreadCrumb from '../../../components/common/admin/TBreadCrumb.vue'
import AddProductDialog from './AddProductDialog.vue'
import TDialog from '../../../components/common/TDialog.vue'
import TEmpty from '../../../components/common/TEmpty.vue'
import { handleResult } from '../../../utils'

export default {
  components: {
    TAdminTable,
    AddProductDialog,
    TDialog,
    TEmpty,
    // eslint-disable-next-line vue/no-unused-components
    // Star,
    // eslint-disable-next-line vue/no-unused-components
    Delete,
    Search,
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
      imgList: [],
    }
  },
  methods: {
    async fetchData (p) {
      const { getProducts } = api
      const res = await getProducts(p)
      const { count, rows } = res.data
      this.tableData = rows
      console.log(rows)
      this.total = count
    },
    onClickAddProduct () {
      this.$refs['dialog'].setVisible()
    },
    async onCheckImg (scope) {
      const { getProductImg } = api
      console.log(scope.row.id)
      const res = await getProductImg({ id: scope.row.id })
      this.imgList = res?.data?.imgList || []
      this.setVisible()
    },
    setVisible () {
      this.$refs['picDialog'].setVisible()
    },
    setHidden () {
      this.$refs['picDialog'].setHidden()
    },
    async onListProduct (id) {
      console.log(id)
      if (!id) {
        this.$message({
          message: 'Cannot find product id.',
          type: 'warning',
        })
        return
      }
      const { listProduct } = api
      const res = await listProduct({ pid: id, sid: [1, 20, 11] })
      if(!handleResult(res)) return
      this.fetchData()
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
  },
  created () {
    this.config = productConfig
  },
}
</script>

<style lang="scss">
.imgList {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  .img {
    img {
      width: 200px;
      height: 200px;
      border-radius: 10px;
      display: block;
    }
    
  }
}

</style>