<template>
  <div class="category-menu" @click="onSelectCategory">
    <div class="item" data-cate='0' :class="{'selected': selected == 0}">
      {{ $t('home.cate.hot') }}
    </div>
    <div class="item" data-cate='1' :class="{'selected': selected == 1}">
      {{ $t('home.cate.snack') }}
    </div>
    <div class="item" data-cate='2' :class="{'selected': selected == 2}">
      {{ $t('home.cate.drinks') }}
    </div>
    <div class="item" data-cate='3' :class="{'selected': selected == 3}">
      {{ $t('home.cate.wheat') }}
    </div>
    <div class="item" data-cate='4' :class="{'selected': selected == 4}">
      {{ $t('home.cate.seafood') }}
    </div>
    <div class="item" data-cate='5' :class="{'selected': selected == 5}">
      {{ $t('home.cate.fruits') }}
    </div>
    <div class="item" data-cate='6' :class="{'selected': selected == 6}">
      {{ $t('home.cate.meats') }}
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      selected: 0,
    }
  },
  methods: {
    onSelectCategory (e) {
      const cate = parseInt(e.target.dataset.cate)
      this.selected = cate
      this.$emit('selectCate', cate)
    },
  },
}
</script>

<style lang="scss">
.category-menu {
  position: fixed;
  top: 45%;
  transform: translateY(-50%);
  left: 30px;
  height: 265px;
  width: 90px;
  color: #444;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  padding: 5px 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  box-sizing: border-box;
  z-index: 9;
  .item {
    height: 36px;
    color: #3f3f3f;
    transition: 0.2s;
    width: 88px;
    line-height: 36px;
    letter-spacing: 0.1rem;
    text-align: center;
    background-color: #fff;
    cursor: pointer;
    box-sizing: border-box;
    &:hover {
      color: #fff;
      background-color: $yellow;
    }
    &.selected {
      color: #fff;
      background-color: $yellow;
    }
  }
}
</style>