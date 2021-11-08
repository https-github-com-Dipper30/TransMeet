<template>
  <div id="layout">
    <Header @alterSider="alterSider" />
    <Sider ref="sider" />
    <Content>
      <slot />
    </Content>
  </div>
</template>

<script>
import Header from './Header.vue'
import Sider from './Sider.vue'
import Content from './Content.vue'

export default {
  components: {
    Header,
    Sider,
    Content,
  },
  methods: {
    alterSider () {
      this.$refs['sider'].alterSider()
    },
  },
}
</script>

<style lang="scss" scoped>
#layout {
  
}
</style>