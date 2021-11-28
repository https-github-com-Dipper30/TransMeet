<template>
  <client-layout>
    <router-view />
  </client-layout>
</template>

<script>
import ClientLayout from '../../components/common/client/Layout.vue'

export default {
  components: {
    ClientLayout,
  },
  async mounted () {
    await this.$store.dispatch('actCart')
  },
}
</script>

<style>

</style>