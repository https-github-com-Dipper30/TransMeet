<template>
  <div class="t-table">
    <!-- search box -->
    <panel class="search-panel" v-if="config.searchBox">
      <div class="search-box" v-for="item in config.searchBox" :key="item.label">
        <div class="label">{{ item.label }}: </div>

        <div class="box" v-if="item.type=='input'">
          <el-input v-model="searchBox[item.value]"></el-input>
        </div>

        <div class="box" v-if="item.type=='inputNumber'">
          <el-input-number
            v-model="searchBox[item.value]"
            :min="0"
            :max="1000000000"
            controls-position="right"
          />
        </div>

        <div class="box" v-if="item.type=='date'">
          <el-date-picker v-model="searchBox[item.value]" type="date" placeholder="Pick a day">
          </el-date-picker>
        </div>

        <div class="box" v-if="item.type=='selector'">
          <el-select v-model="searchBox[item.value]" :placeholder="item.label">
            <el-option
              v-for="op in item.options"
              :key="op.value"
              :label="op.label"
              :value="op.value"
            >
            </el-option>
          </el-select>
        </div>

      </div>
      <t-button type="search" class="search-box-btn" @onClick="reset">Reset</t-button>
      <t-button type="search" class="search-box-btn" @onClick="fetchData">Search</t-button>
    </panel>
    <!-- search box ends -->

    <!-- table -->
    <panel class="table-panel">
      <div class="table" v-if="tableData && tableData.length > 0">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column v-if="indexed" type="index" :index="indexMethod" />
          <el-table-column
            v-for="item of config.table.attributes"
            :key="item.label"
            :fixed="Boolean(item.fixed)"
            :prop="item.prop || item.label"
            :label="item.label"
            :width="item.width || 200"
          />
        </el-table>
      </div>
      <div class="pager" v-if="tableData && tableData.length > 0">
        <el-pagination
          background
          layout="prev, pager, next"
          :default-current-page="1"
          :pageSize="searchBox.size"
          :default-page-size="20"
          v-model:currentPage="searchBox.page"
          @currentChange="pagerChange"
          :total="total"
        />
      </div>
      
      <div v-if="!tableData || tableData.length == 0" class="empty"> 
        <div class="empty-img"></div>  
      </div>
    </panel>
    
    <!-- table ends -->
  </div>
</template>

<script>
import Panel from '../Panel.vue'
import TButton from '../TButton.vue'
import { getWindowHeight } from '../../../utils'

export default {
  props: {
    config: {
      default: {},
    }, 
    tableData: {
      type: Array,
      default: () => [],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  components: {
    Panel,
    TButton,
  },
  data () {
    return {
      searchBox: {
        page: 1,
        size: 20,
      },
      size: 20,
    }
  },
  computed: {
    computeConfig () {
      return this.config
    },
    computeData () {
      return this.tableData
    },
    indexed () {
      return this.config?.table?.indexed || false
    },
    // pageCount () {
    //   return Math.ceil(this.total / this.size)
    // },
  },
  watch: {
    computeConfig: {
      deep: true,
      immediate: true,
      handler: function (newValue, oldValue) {
        if (!newValue.searchBox) {
          return
        } 
        let o = {}
        for (let s of newValue.searchBox) {
          const attr = s.value || s.lable
          o[attr] = null
        }
        this.searchBox = o
      },
    },
    // tableData: {
    //   deep: true,
    //   handler: function (newValue, oldValue) {
    //     this.searchBox.page = 1
    //     this.searchBox.size = 20
    //   },
    // },
  },
  methods: {
    formParameter () {
      const p = {}
      for (let attr in this.searchBox) {
        if (this.searchBox[attr]) p[attr] = this.searchBox[attr]
      }
      return p
    },
    reset () {
      this.searchBox = {
        page: 1,
        size: 20,
      }
      this.$emit('fetchData')
    },
    fetchData () {
      const p = this.formParameter()
      if (p != {}) this.$emit('fetchData', p)
      else this.$emit('fetchData')
    },
    onClickOptions (index, rows, act) {
      this.$emit(`${act}`, index, rows)
    },
    indexMethod (index) {
      return index
    },
    pagerChange (currentPage) {
      const p = this.formParameter()
      this.$emit('fetchData', { ...p })
    },
  },
  mounted () {
    console.log(this.tableData)
    const tablePanel = document.getElementsByClassName('table-panel')
    const tp = tablePanel[0]
    const offSetTop = tp.getBoundingClientRect().top
    const windowHeight = getWindowHeight()
    console.log(offSetTop, windowHeight)
    tp.style.height = `${windowHeight - offSetTop - 20}px`

  },
}
</script>

<style lang="scss">
.t-table {
  width: 100%;
  height: 100%;
  background-color: $admin-bg;
  .search-panel {
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
    padding: 10px;
    width: 100%;
    margin-bottom: 20px;
    .search-box-btn {
      margin-left: 60px;
      width: 70px;
    }
    .search-box {
      display: flex;
      flex-direction: row;
      align-items: center;
      flex-wrap: wrap;
      width: 280px;
      margin: 10px 0;
      .label {
        text-align: right;
        width: 90px;
        margin: 0 10px 0 0; 
      }
      .box {
        width: 180px;
        .el-input-number__decrease, .el-input-number__increase {
          width: 20px;
        }
        .el-input, .el-select, .el-date-editor.el-input, .el-input-number {
          width: 180px;
        }
      }
      
    }
  }
  .table-panel {
    width: 100%;
    /* padding: 20px; */
    padding-bottom: 5px;
    /* background-color: #999; */
    .table {
      height: calc(100% - 50px);
      overflow: scroll;
      box-shadow: $admin-theme;
      .el-table {
        --el-table-header-background-color: #232e43;
        --el-table-header-font-color: #fff;
        --el-table-font-color: $text-color;
      }
    }
    .pager {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      height: 50px;
      margin-right: 30px;
    }
  }
  .empty {
    padding: 50px;
    .empty-img {
      background: url('../../../assets/page/empty.png') no-repeat;
      background-size: 100%;
      width: 300px;
      height: 300px;
      margin: 0 auto;
    }
  }
}
</style>