<template>
  <client-layout>
    <keep-alive>
      <router-view />
    </keep-alive>
  </client-layout>
</template>

<script>
import ClientLayout from '../../components/common/client/Layout.vue'

export default {
  components: {
    ClientLayout,
  },
}
</script>

<style>

</style>