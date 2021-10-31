<template>
  <div id="admin-header">
    <div class="left">
      <div class="menu-bar" @click="touchMenu" />
      <div class="title"> Content Management System</div>
    </div>
    <div class="right">
      <div class="avatar" />
      <div class="name">{{ name }}</div>
    </div>
    
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
    }
  },
  methods: {
    touchMenu () {
      this.$emit('touchMenu')
    },
  },
  mounted () {
    const { name } = this.$store.getters.getUser
    this.name = name
  },
}
</script>

<style lang="scss" scoped>
#admin-header {
  height: 70px;
  width: 100vw;
  min-width: 800px;
  z-index: 11;
  top: 0;
  position: fixed;
  background-color: $admin-theme;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  .left, .right {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .left {
    width: 360px;
    .menu-bar {
      background-image: url('../../../assets/common/menu.png');
      background-size: 100% 100%;
      width: 30px;
      height: 30px;
      margin: 0 20px;
      cursor: pointer;
    }
  }
  .right {
    font-size: 16px;
    font-weight: 300;
    margin: 0 30px;
    width: 120px;
    .avatar {
      background: no-repeat center/80% url('../../../assets/avatar/default-avatar3.jpg') ;
      background-size: 100% 100%;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .name {
      margin: 0 20px 0 10px;
    }
  }
}
</style>