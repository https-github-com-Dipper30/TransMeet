<template>
  <div class="staff">
    <TAdminTable :config="config" :tableData="tableData" :total="total" @fetchData="fetchData" />
  </div>
</template>

<script>
import TAdminTable from '../../components/common/admin/TTable.vue'
import staffConfig from './StaffConfig.js'
import api from '../../request'
import { handleResult } from '../../utils'

export default {
  components: {
    TAdminTable,
  },
  data () {
    return {
      config: {},
      tableData: [],
      total: 0,
    }
  },
  methods: {
    async fetchData (p) {
      console.log('p', p)
      const { getStaff } = api
      const res = await getStaff(p)
      if (!handleResult(res, false)) return
      const { count, rows } = res.data
      this.tableData = rows
      this.total = count
    },
  },
  async created () {
    this.config = staffConfig
    await this.fetchData()
  },
}
</script>

<style>

</style>