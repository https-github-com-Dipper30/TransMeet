<template>
  <div class="type-bar">
    <div class="types" v-if="cate>0 && cate<=6">
      <div class="item" v-for="(t, index) of types" :key="t.id" @click="onSelectType(t.code, index)">
        <img :id="t.code" src="@/assets/common/types/1.jpg" :alt="t.name" />
        <div class="label" :class="{'selected': selected == index}">{{ $t(`home.type.${t.code}`) }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '../../../request'
import tempImg from '@/assets/common/types/temp.png'
import { nextTick } from 'vue-demi'

export default {
  props: {
    cate: {
      type: Number,
      default: 0,
    },
  },
  watch: {
    cate: async function (newValue, oldValue) {
      console.log('new', newValue)
      if (newValue < 0 || newValue > 6) return
      if (newValue == 0) {
        // TODO hot sale products
      } else {
        const { getTypeOptions } = api
        const types = await getTypeOptions({ cate_code: this.cate }, false) // do not format result
        this.types = types
        nextTick(() => {
          types.forEach(type => this.setImg(type.code))
        })
        this.onSelectType(this.types[0].code, 0)
      }
    },
  },
  data () {
    return {
      types: [],
      selected: 0,
    }
  },
  methods: {
    setImg (id) {
      const img = document.getElementById(id)
      if (!img) return
      let i
      try {
        // eslint-disable-next-line global-require
        i = require(`@/assets/common/types/${id}.jpg`)
      } catch (error) {
        i = tempImg
      }
      img.src = i
    },
    onSelectType (typeCode, index) {
      this.selected = index
      this.$emit('selectType', typeCode)
    },
  },
}
</script>

<style lang="scss">
.type-bar {
  .types {
    width: 700px;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    margin: 0 auto;
    .item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      img {
        display: block;
        width: 30px;
        height: 30px;
        margin-bottom: 10px;
      }
      .label {
        position: relative;
        &.selected {
          &::before {
            width: 100%;
            height: 4px;
            content: '';
            z-index: -1;
            border-radius: 30px;
            left: 50%;
            top: 18px;
            transform: translateX(-50%);
            background-color: $yellow;
            position: absolute;
          }
        }
      }
      
    }
  }
}
</style>