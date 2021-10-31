<template>
  <div id="admin-layout">
    <Header @touchMenu="touchMenu" />
    <Sider :collapse="collapse" />
    <Content :collapse="collapse">
      <slot></slot>
    </Content>
    <!-- <Footer /> -->
  </div>
</template>

<script>
import Header from './Header.vue'
import Footer from './Footer.vue'
import Sider from './Sider.vue'
import Content from './Content.vue'

export default {
  name: 'AdminLayout',
  components: {
    Header,
    // Footer,
    Sider,
    Content,
  },
  data () {
    return {
      collapse: false,
    }
  },
  methods: {
    touchMenu () {
      this.collapse = !this.collapse
    },
  },
}
</script>

<style>

</style>