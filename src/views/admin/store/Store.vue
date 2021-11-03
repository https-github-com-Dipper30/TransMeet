<template>
  <div class="store">
    <t-bread-crumb :config="breadConfig"></t-bread-crumb>

    <TAdminTable :config="config" :tableData="tableData" :total="total" @fetchData="fetchData">
      <template v-slot:options="{ scope }">
        <el-tooltip
            class="item"
            effect="dark"
            content="Set Manager"
            placement="top"
          >
            <el-button type="warning" :data-row="scope" circle @click="openManagerPopUp(scope)">
              <el-icon>
                <user />
              </el-icon>
            </el-button>
          </el-tooltip>
        <el-button type="danger" circle>
          <el-icon>
            <delete />
          </el-icon>
        </el-button>
      </template>
    </TAdminTable>
    <!-- dialog to set store manager -->
    <el-dialog
      v-model="setManagerDialogVisible"
      title="Select Staff"
      width="600px"
    >
      <div class="empty" v-if="!staff||staff.length==0"> Empty </div>
      <div class="list" v-else>
        <el-table
          ref="singleTable"
          :data="staff"
          highlight-current-row
          style="width: 100%"
          @currentChange="onSelectStaff"
        >
          <el-table-column type="index" width="50" />
          <el-table-column property="name" label="Name" width="120" />
          <el-table-column property="Store.name" label="Store" width="120" />
          <el-table-column property="Region.name" label="Region" />
        </el-table>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="setManagerDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onSetManager"
            >Confirm</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import TAdminTable from '../../../components/common/admin/TTable.vue'
import storeConfig from './StoreConfig.js'
import api from '../../../request'
import { User, Delete } from '@element-plus/icons'
import { ElMessage } from 'element-plus'
import { handleResult } from '../../../utils'
import TBreadCrumb from '../../../components/common/admin/TBreadCrumb.vue'

export default {
  components: {
    TAdminTable,
    TBreadCrumb,
    User,
    Delete,
  },
  data () {
    const breadConfig = [
      { name: 'Home', to: '/admin' },
      { name: 'Store', to: '/admin/store' },
    ]
    return {
      config: {},
      tableData: [],
      total: 0,
      setManagerDialogVisible: false,
      staff: [],
      breadConfig,
    }
  },
  methods: {
    async fetchData (p) {
      // get store data
      const { getStores } = api
      const res = await getStores(p)
      const { count, rows } = res.data
      this.total = count
      this.tableData = rows
    },
    async openManagerPopUp (e) {
      // show set manager pop up
      this.setManagerDialogVisible = true
      // const { row } = e.srcElement.dataset
      this.storeID = e.row.id
      // this.storeID = 
      if (!this.staff || this.staff.length == 0) {
        const { getStaff } = api
        const res = await getStaff({ size: 1000000 })
        const { rows } = res.data
        this.staff = rows
      }
    },
    onSelectStaff (e) {
      const { id } = e
      this.managerID = id
    },
    async onSetManager () {
      const p = { manager_id: this.managerID, store_id: this.storeID }
      if (!p.manager_id || !p.store_id) {
        ElMessage({
          message: 'Please Select Staff',
          type: 'error',
        })
        return
      } else {
        const { setManager } = api
        const res = await setManager(p)
        if (!handleResult(res)) return
        this.setManagerDialogVisible = false
        // after updating, refetch data
        this.fetchData()
      }

    }
  },
  created () {
    this.config = storeConfig
  },
}
</script>

<style>
.list {
  height: 300px;
  width: 500px;
  overflow: scroll;
  margin: 10px auto;
}
</style>