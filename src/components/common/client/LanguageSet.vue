<template>
  <div id="language">
    <img id="img" src="../../../assets/common/language.png" alt="">
    <el-select v-model="language" :placeholder="languageConfig.language" @change="switchLanguage">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      >
      </el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  data () {
    const options = [
      {
        value: 'en',
        label: 'English',
      },
      {
        value: 'zh_cn',
        label: '中文',
      },
    ]
    const languageConfig = {
      'en': 'English',
      'zh_cn': '中文',
    }
    return {
      options,
      language: 'en',
      languageConfig,
    }
  },
  methods: {
    switchLanguage (e) {
      this.$i18n.locale = e
      localStorage.setItem('locale', e)
    },
  },
  created () {
    this.language = this.$i18n.locale
  },
}
</script>

<style lang="scss">
#language {
  position: relative;
  height: 50px;
  text-align: left;
  display: flex;
  padding-left: 10px;
  align-items: center;
  img {
    width: 24px;
    height: 24px;
    position: absolute;
    left: 22px;
    z-index: 10;
    top: 13px;
    cursor: pointer;
  }
  .el-select {
    --el-select-input-focus-border-color: #111;
    --el-select-input-font-size: 18px;
    --el-select-font-size: 18px;
    border: 1px solid #111;
    border-radius: 30px;
    line-height: 30px;
    height: 30px;
    width: 200px;
    .el-input__inner {
      border-radius: 30px;
      line-height: 30px;
      height: 30px;
      color: #333;
      font-size: 14px;
      font-weight: 400;
      padding-left: 50px;
    }
    .el-input__suffix {
      top: -3px;
    }
    .el-input__icon {
      line-height: 30px;
    }
    .el-input .el-select__caret {
      color: #111;
      font-size: 20px;
      font-weight: 600;
    }
  }
}
.el-select-dropdown__item {
    &.selected {
      color: $yellow;
      font-size: 14px;
      font-weight: 400;
    }
    color: #666;
    font-size: 14px;
    font-weight: 400;
  }
</style>