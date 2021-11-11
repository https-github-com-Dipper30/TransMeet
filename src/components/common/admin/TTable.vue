<template>
  <div class="t-table">
    <!-- search box -->
    <panel class="search-panel" v-if="config.searchBox" :class="{ 'hide': hideSearchBox }">
      <div class="search-box" v-for="item in config.searchBox" :key="item.label">
        <el-icon class="minus" @click="onHideSearchBox">
          <minus />
        </el-icon>
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
          <!-- dynamic -->
          <el-select v-if="item.dynamic" v-model="searchBox[item.value]" :placeholder="item.label" @click="initOptions(`${item.dynamic}`, `${item.options}`)">
            <el-option
              v-for="op in computeOptionName(item.options)"
              :key="op.value"
              :label="op.label"
              :value="op.value"
            >
            </el-option>
          </el-select>
          <el-select v-else v-model="searchBox[item.value]" :placeholder="item.label">
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
      <t-button type="search" class="search-box-btn" @onClick="onSearch">Search</t-button>
    </panel>
    <!-- search box ends -->

    <!-- operation and title -->
    <panel class="title-panel" v-if="config.operation">
      <div class="title"> {{ config.operation.title }} </div>
      <div class="operation">
        <span />
        <t-button v-for="button of config.operation.buttons" :key="button.label" @onClick="submitEvent(button.eventName)"> {{ button.label }}</t-button>
      </div>
    </panel>
    <!-- operation and title ends -->

    <!-- table -->
    <panel class="table-panel">
      <div class="table" v-if="tableData && tableData.length > 0">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column v-if="indexed" type="index" fixed :index="indexMethod" />
          <el-table-column
            v-for="item of config.table.attributes"
            :key="item.label"
            :fixed="item.fixed"
            :prop="item.prop || item.label"
            :label="item.label"
            :width="item.width || 200"
          >
            <template v-if="item.slot" #default="scope">
              <div v-if="item.slot=='options'">
                <slot :name="item.slot" :scope="scope"></slot>
              </div>
              <div v-html="item.slot(scope.row)" v-else />            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager" v-if="tableData && tableData.length > 0">
        <span>Total: {{ total }}</span>
        <el-pagination
          background
          layout="prev, pager, next, sizes"
          :default-current-page="1"
          :page-sizes="[10, 20, 50]"
          v-model:pageSize="searchBox.size"
          :default-page-size="20"
          v-model:currentPage="searchBox.page"
          @sizeChange="handleSizeChange"
          @currentChange="handlePageChange"
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
import { getWindowHeight, debounce } from '../../../utils'
import api from '../../../request'
import { Minus } from '@element-plus/icons'

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
    Minus,
  },
  data () {
    return {
      hideSearchBox: false,
      searchBox: {
        page: 1,
        size: 20,
      },
      size: 20,
      options1: [],
      options2: [],
      options3: [],
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
    tableOption () {
      return this.config?.table
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
        if (this.searchBox[attr] || this.searchBox[attr] === false) p[attr] = this.searchBox[attr]
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
    onSearch () {
      this.searchBox.page = 1
      this.fetchData()
    },
    onClickOptions (index, rows, act) {
      this.$emit(`${act}`, index, rows)
    },
    indexMethod (index) {
      return index + 1
    },
    handlePageChange (currentPage) {
      const p = this.formParameter()
      this.$emit('fetchData', { ...p })
    },
    handleSizeChange (currentSize) {
      const p = this.formParameter()
      // console.log('size', currentSize, this.)
      this.$emit('fetchData', { ...p })
    },
    /**
     * emit searching method for dynamic options
     * @param {string} methodName search event
     * @param {string} dynamicOptions the prop name for the options
     */
    async initOptions (methodName, dynamicOptions) {
      if (this[dynamicOptions]?.length > 0) return
      const method = api[methodName]
      if (typeof method != 'function') return false
      
      const options = await method.call(this)
      this[dynamicOptions] = options || []
      // await this.$emit('getOptions', [methodName, dynamicOptions])
      // this.setValue('regionOptions', [{value: 1, label:'?'}])
    },
    computeOptionName (optionName) {
      return this[optionName]
    },
    submitEvent (eventName, ...args) {
      this.$emit(eventName, ...args)
    },
    setValue (propName, value) {
      this[propName] = value
    },
    // initOptionName () {
    //   const { searchBox } = this.config
    //   if (!searchBox) return
    //   for (let s of searchBox) {
    //     if (s.type == 'selector' && s.dynamic) this[s.options] = []
    //   }
    // },
    resizeTable () {
      const tablePanel = document.getElementsByClassName('table-panel')
      const tp = tablePanel[0]
      if (!tp) return
      const offSetTop = tp?.getBoundingClientRect()?.top || 0
      const windowHeight = getWindowHeight()
      tp.style.height = `${windowHeight - offSetTop - 20}px`
    },
    onHideSearchBox () {
      this.hideSearchBox = !this.hideSearchBox
      setTimeout(this.resizeTable, 800)
    },
  },
  mounted () {
    this.resizeTable()
    this.fetchData()
    window.addEventListener('resize', debounce(this.resizeTable, 500))
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
    position: relative;
    margin-bottom: 10px;
    transition: 0.3s;
    height: 100%;
    &.hide {
      height: 50px;
      width: 50px;
      overflow: hidden;
    }
    .minus {
      width: 20px;
      height: 20px;
      position: absolute;
      right: 5px;
      top: 5px;
      cursor: pointer;
    }
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
  .title-panel {
    height: 40px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    background-color: $admin-bg;
    .title {
      text-align: center;
      height: 30px;
      line-height: 40px;
      font-weight: 600;
      font-size: 20px;
    }
    .operations {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-end;
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
      .el-pagination.is-background .el-pager li:not(.disabled).active {
        &:hover {
          color:#fff;
        }
        background-color: $admin-highlight;
        color: #fff;
      }
      .el-pagination.is-background .el-pager li:not(.disabled):hover {
        color: $admin-highlight;
      }
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