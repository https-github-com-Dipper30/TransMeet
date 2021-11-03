<template>
  <div class="empty">
    <img src="../../assets/page/empty.png" alt="">
    <div class="text">It is empty.</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.empty {
  margin: 0 auto;
  display: flex;
  flex-direction: column
  ;
  justify-content: center;
  align-items: center;
  img {
    width: 250px;
    height: 200px;
    display: block;
  }
  .text {
    text-align: center;
    font-size: 20px;
    font-weight: 600;
    color: $text-color;
  }
}
</style>