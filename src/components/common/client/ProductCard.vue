<template>
  <div class="product-card">
    <div class="img">
      <img :id="product.id" src="@/assets/bg.jpeg" alt="">
    </div>
    <div class="product-panel">
      <div class="p-name">
        {{ product.name }}
      </div>
      <div class="p-price">
        <span class="price">${{ Number(product.price / 100).toFixed(2) }}</span><span> / {{ product.unit }}</span>
      </div>
      <div class="p-description">
        {{ product.description }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: ['product'],
  watch: {
    product: {
      deep: true,
      handler: function (newValue, oldValue) {
        if (newValue.imgList) {
          console.log('new', newValue)
          const img = newValue.imgList[0]
          document.getElementById(newValue.id).src = `data:image/${img.type};base64,${img.data}`
        }
      },
    },
  },
  mounted () {
    if (this.product.imgList) {
      console.log('p', this.product)
      const img = this.product.imgList[0]
      document.getElementById(this.product.id).src = `data:image/${img.type};base64,${img.data}`
    }
  },
}
</script>

<style lang="scss" scoped>
.product-card {
  width: 200px;
  height: 315px;
  border: 1px solid #f8f8f8;
  border-radius: 10px;
  position: relative;
  font-family: 'Roboto', Helvetica, Arial;
  color: #333;
  margin: 20px 10px;
  .img {
    position: absolute;
    top: 0;
    left: 0;
    width: 200px;
    height: 200px;
    img {
      width: 200px;
      height: 200px;
      border-radius: 10px 10px 0 0;
    }
  }
  .product-panel {
    position: absolute;
    top: 200px;
    width: 200px;
    height: 200px;
    .p-type {

    }
    .p-name {
      position: absolute;
      /* left: 8px;
      top: 5px; */
      color: #333;
      font-size: 20px;
      letter-spacing: 0.1rem;
      width: 200px;
      top: 10px;
      padding: 0 5px;
      height: 30px;
      line-height: 30px;
      text-overflow: ellipsis;
      text-align: left;
      font-weight: 600;
      box-sizing: border-box;
      /* color: $super-dark-yellow;
      font-size: 18px;
      letter-spacing: 0.1rem;
      font-weight: 800; */
    }
    .p-price {
      position: absolute;
      top: 40px;
      height: 30px;
      line-height: 30px;
      color: #666;
      font-weight: 450;
      text-align: left;
      width: 200px;
      padding: 0 5px;
      box-sizing: border-box;
      .price {
        color: #111;
        font-weight: 600;
      }
    }
    .p-description {
      position: absolute;
      top: 65px;
      height: 60px;
      line-height: 30px;
      text-overflow: ellipsis;
      padding: 0 5px;
      font-size: 13px;
      text-align: left;
      box-sizing: border-box;
    }
    .p-buy {
      position: absolute;
      top: 120px;
      width: 200px;
      padding: 0 5px;
      height: 60px;
    }
  }
}
</style>