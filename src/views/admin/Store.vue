<template>
  <div class="store">
    <TAdminTable :config="config" :tableData="tableData" :total="total" @fetchData="fetchData" />
  </div>
</template>

<script>
import TAdminTable from '../../components/common/admin/TTable.vue'
import storeConfig from './StoreConfig.js'
import api from '../../request'

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
      // get store data
      const { getStores } = api
      const res = await getStores(p)
      const { count, rows } = res.data
      this.total = count
      this.tableData = rows
    },
  },
  async created () {
    this.config = storeConfig
    await this.fetchData()
  },
}
</script>

<style>

</style>