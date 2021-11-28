<template>
  <div class="order-item">
    <div class="header">
      <div class="no">
        <span class="label">{{ $t('order.no') }}</span> <span :id="`order${item.id}`">{{ item.id }}</span>
        <!-- <el-button type="info" circle> -->
        <el-icon class="copy" @click="copyId">
          <document-copy />
        </el-icon>
        <!-- </el-button> -->
      </div>
      <div class="date">
        {{ date }}
      </div>
    </div>
    <div class="panel">
      <div class="info">
      <img class="order-pic" :id="`orderPic${pid}`" src='@/assets/bg.jpeg' alt='pic'>
      <div class="product">
        <div class="name">{{ product.name }}</div>
      </div>
      <div class="amount">
        {{ $t('order.amount') }} <span class="value">{{ item.amount }} * {{ product.unit }} </span>
      </div>
      <div class="price">
        {{ $t('order.price') }} <span class="value">{{ item.price }} $</span>
      </div>
    </div>
    
    <div class="review">
      <div class="label" :class="{ 'rated': rated }">
        {{ rated ? $t('order.rated') : $t('order.unrated') }}
      </div>
      <div class="legend" v-if="!rated"><span>1</span><span>5</span></div>
      <rate :rate="item.rate" :oid="item.id" :disabled="rated" />
    </div>
    </div>
    
  </div>
</template>

<script>
import { nextTick } from 'vue-demi'
import api from '../../../request'
import { formatTS } from '../../../utils'
import { DocumentCopy } from '@element-plus/icons'
import Rate from './Rate.vue'

export default {
  props: ['item'],
  components: {
    DocumentCopy,
    Rate,
  },
  data () {
    return {
      imgList: [],
      pid: null,
    }
  },
  computed: {
    product () {
      return this.item.Product
    },
    date () {
      return formatTS(this.item.time)
    },
    rated () {
      return this.item.rate > 0 && this.item.rate < 6
    },
  },
  methods: {
    copyId (e) {
      //如果需要回调：
      this.$copyText(this.item.id).then( e => {
          this.$message({
            message: this.$i18n.locale == 'en' ? 'Copied!' : '已复制订单号',
            type: 'success',
          })
      })
    },
  },
  async created () {
    const pid = this.item.Product.id || null
    this.pid = pid
    const { getProductImg } = api
    const res = await getProductImg({ id: pid })
    this.imgList = res?.data?.imgList || []
    nextTick(() => {
      const img = this.imgList[0]
      if (img) {
        const i = document.getElementById(`orderPic${this.pid}`)
        i.src = `data:image/${img.type};base64,${img.data}`
      }
    })
  },
  mounted () {
  },
}
</script>

<style lang="scss" scoped>
.order-item {
  color: #333;
  font-size: 13px;
  border-radius: 10px;
  cursor: default;
  width: 800px;
  margin: 20px auto;
  .header {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    line-height: 50px;
    .no {
      .label {
        color: $super-dark-yellow;
        font-size: 15px;
      }
      .copy {
        cursor: pointer;
        margin-left: 10px;
        &:hover {
          color: $yellow;
        }
      }
    }
  }
  .panel {
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    .info {
      height: 100px;
      width: 550px;
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
      border-right: solid 1px #e8e8e8;
      .order-pic {
        width: 100px;
        height: 100px;
        border-radius: 10px 0 0 10px;
        cursor: pointer;
      }
      .product, .amount, .price {
        width: 150px;
        text-overflow: wrap;
      }
      .value {
        color: $super-dark-yellow;
        font-size: 14px;
      }
    }
    .review {
      width: 250px;
      height: 100px;
      align-self: flex-end;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      .label {
        height: 40px;
        line-height: 40px;
        color: $yellow;
        &.rated {
          color: #333;
        }
      }
      .legend {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 167px;
      }
    }
  }
  
}
</style>