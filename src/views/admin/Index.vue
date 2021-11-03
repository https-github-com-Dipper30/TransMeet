<template>
  <admin-layout>
    <keep-alive>
      <router-view />
    </keep-alive>
  </admin-layout>
</template>

<script>
import AdminLayout from '../../components/common/admin/Layout.vue'

export default {
  components: {
    AdminLayout,
  },
}
</script>

<style>

</style>