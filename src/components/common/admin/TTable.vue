<template>
  <div class="t-table">
    <panel class="search-panel" v-if="config.searchBox">
      <div class="search-box" v-for="item in config.searchBox" :key="item.label">
        <div class="label">{{ item.label }}: </div>

        <div class="box" v-if="item.type=='input'">
          <el-input v-model="searchBox[item.value]"></el-input>
        </div>

        <div class="box" v-if="item.type=='inputNumber'">
          <el-input-number
            v-model="searchBox[item.value]"
            :min="1"
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
      <t-button type="search" class="search-box-btn">Search</t-button>
    </panel>
  </div>
</template>

<script>
import Panel from '../Panel.vue'
import TButton from '../TButton.vue'

export default {
  props: {
    config: {
      default: {
        searchBox: [
          {
            type: 'inputNumber',
            label: 'id',
            value: 'id',
          },
          {
            type: 'selector',
            label: 'region',
            value: 'region',
            options: [
              {
                value: 1,
                label: '1',
              },
              {
                value: 2,
                label: '2',
              },
              {
                value: 3,
                label: '3',
              },
            ],
          },
          {
            type: 'date',
            label: 'store',
            value: 'store',
          },
          {
            type: 'inputNumber',
            label: 'salary',
            value: 'salary',
          },
          {
            type: 'input',
            label: 'job title',
            value: 'jobTitle',
          },
        ],
      },
    },  
  },
  components: {
    Panel,
    TButton,
  },
  data () {
    return {
      searchBox: {},
    }
  },
  computed: {
    computeConfig () {
      return this.config
    },
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
  },
  methods: {

  },
  mounted () {
    // console.log(this)

  },
}
</script>

<style lang="scss" scoped>
.t-table {
  width: 100%;
  height: 100%;
  background-color: #fff;
  .search-panel, .search-box {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    flex-wrap: wrap;
    width: 1120px;
    .search-box-btn {
      width: 80px;
    }
    .search-box {
      width: 280px;
      .label {
        text-align: right;
        min-width: 60px;
        margin: 0 10px; 
      }
      .box {
        min-width: 180px;
        .el-input-number {
          width: 180px;
        }
        .el-input-number__decrease, .el-input-number__increase {
          width: 20px;
        }
        .el-input, .el-select, .el-date-editor.el-input, .el-date-editor.el-input__inner {
          width: 180px;
        }

      }
      
    }
  }
}
</style>