<template>
  <div class="home">
    <div class="row">
      <div class="welcome">
        <div class="title">
          Welcome! TransMeet Logs:
        </div>
        <div class="line">2021.11.30: v1 Online</div>
        <div class="line">2021.12.1: Admin Home: E-Charts</div>
      </div>
      <div id="profitChart"></div>
    </div>
    <div class="row">
      <div id="consumptionChart"></div>
    </div>
  </div>
</template>

<script>
import api from '../../request'
import echarts from '@/lib/echarts'

export default {
  data () {
    return {
      profitData: [],
      consumptionData: [],
      consumptionX: [],
    }
  },
  methods: {
    async getProfitsByRegion () {
      const { getProfitsByRegion: getProfitsByRegionAPI } = api
      const res = await getProfitsByRegionAPI()
      this.profitData = res.options
      this.initProfitChart()
    },
    async getConsumptionsByUser () {
      const { getConsumptionsByUser: getConsumptionsByUserAPI } = api
      const res = await getConsumptionsByUserAPI()
      this.consumptionData = res.data
      this.consumptionX = res.x
      this.initConsumptionChart()
    },
    initProfitChart () {
      const chart = echarts.init(document.getElementById('profitChart'))
      chart.setOption({
        title: {
          text: 'Profits Of Each Region',
        },
        tooltip: {},
        series: [
          {
            type: 'pie',
            data: this.profitData,
          },
        ],
      })
    },
    initConsumptionChart () {
      const chart = echarts.init(document.getElementById('consumptionChart'))
      chart.setOption({
        title: {
          text: 'Users Ranked By Total Consumption',
        },
        tooltip: {},
        xAxis: {
          data: this.consumptionX,
        },
        yAxis: {},
        series: [
          {
            type: 'bar',
            stack: 'x',
            data: this.consumptionData,
          },
        ],
      })
    },
  },
  created () {
    this.getProfitsByRegion()
    this.getConsumptionsByUser()
  },
} 
</script>

<style lang="scss" scoped>
.home {
  .row {
    width: 1000px;
    height: 400px;
    display: flex;
    margin: 20px auto;
    justify-content: space-between;
    align-items: center;
    cursor: default;
    .welcome {
      height: 300px;
      width: 450px;
      text-align: center;
      font-size: 26px;
      font-weight: 800;
      letter-spacing: 0.1rem;
      display: flex;
      flex-direction: column;
      background-color: #fff;
      border-radius: 10px;
      .title {
        padding: 20px 10px;
      }
      .line {
        border-bottom: 1px solid #f8f8f8;
        width: 100%;
        height: 40px;
        line-height: 40px;
        color: $super-dark-yellow;
        font-size: 14px;
        font-weight: 400;
        text-align: left;
        padding: 2px 10px;
      }
    }
    #profitChart {
      width: 500px;
      height: 400px;
      display: block;
    }
    #consumptionChart {
      width: 1000px;
      height: 400px;
      display: block;
    }
  }
  
}
</style>