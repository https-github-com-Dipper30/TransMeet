<template>
  <div class="search-box" @keypress.enter="onSearch">
    <img src="../../../assets/common/search.png" alt="" @click.prevent="onSearch">
    <input v-model="searchInput" class="search-input" type="text" />
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchInput: '',
    }
  },
  methods: {
    onSearch () {
      console.log('search: ', this.searchInput)
    },
  },
}
</script>

<style lang="scss" scoped>
.search-box {
  width: 150px;
  height: 32px;
  position: relative;
  img {
    width: 18px;
    height: 18px;
    position: absolute;
    left: 10px;
    top: 7px;
    cursor: pointer;
  }
  .search-input {
    width: 160px;
    height: 30px;
    background-color: #f8f8f8;
    border: none;
    border-radius: 30px;
    &:focus-visible {
      border: none;
      outline: 2px solid #222;
    }
    padding-left: 40px; 
    line-height: 28px;
    font-size: 20px;
    color: #333;
  }
}
</style>