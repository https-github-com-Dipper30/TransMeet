<template>
  <div id="admin-sider" :class="{ collapse: collapse }">
    <div class="row" data-item=1 :class="{'selected': selected == 1}" @click="onClick">
      <div class="icon">
        <el-icon>
          <house />
        </el-icon>
      </div>
      <div class="text">Home</div>
    </div>
    <div class="sub-menu" :class="{'unfold': fold == 2 || selected>=2 && selected <3}">
      <div class="row" data-item=2 @click="onClickSubMenu">
        <div class="icon">
          <el-icon>
            <coin />
          </el-icon>
        </div>
        <div class="text">Data</div>
        <div class="fold-icon">
          <el-icon :class="{'arrow-fold': fold == 2 || selected>=2 && selected <3}">
            <arrow-down />
          </el-icon>
        </div>
      </div>
      <div class="sub-row" data-item=2.1 :class="{'selected': selected == 2.1}" @click="onClick">
        <div class="short" v-if="collapse">Staff</div>
        <div class="text" v-else>Staff</div>
      </div>
      <div class="sub-row" data-item=2.2 :class="{'selected': selected == 2.2}" @click="onClick">
        <div class="short" v-if="collapse">Store</div>
        <div class="text" v-else>Store</div>
      </div>
      <div class="sub-row" data-item=2.3 :class="{'selected': selected == 2.3}" @click="onClick">
        <div class="short" v-if="collapse">Product</div>
        <div class="text" v-else>Product</div>
      </div>
    </div>
    
    <div class="row" data-item=3 :class="{'selected': selected == 3}" @click="onClick">
      <div class="icon">
        <el-icon>
           <chat-round />
        </el-icon>
      </div>
      <div class="text">Chats</div>
    </div>
    <div class="footer" :class="{'collapse': collapse}">{{ collapse? `${version}` : `INFSCI2710 TransMeet ${version}` }}</div>

  </div>
</template>

<script>
import {
  House,
  ChatRound,
  Coin,
  IconMenu,
  ArrowDown,
  ArrowUp,
} from '@element-plus/icons'

export default {
  components: {
    House,
    ChatRound,
    Coin,
    // IconMenu,
    ArrowDown,
  },
  props: {
    collapse: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    const menuRoute = {
      1: '/admin',
      2.1: '/admin/staff',
      2.2: '/admin/store',
      2.3: '/admin/product',
      3: '/admin/chat',
    }
    return {
      selected: 1,
      fold: 0,
      version: 'v1.0',
      menuRoute,
    }
  },
  methods: {
    onClick (e) {
      const item = Number(e.currentTarget.dataset.item)
      if (this.selected == item) return
      this.selected = Number(e.currentTarget.dataset.item)
      this.fold = 0
      this.$router.push(this.menuRoute[this.selected])
    },
    onClickSubMenu (e) {
      if (this.fold == Number(e.currentTarget.dataset.item)) this.fold = 0 // fold
      else this.fold = Number(e.currentTarget.dataset.item) // unfold
    },
  },
}
</script>

<style lang="scss" scoped>
#admin-sider {
  height: 100vh;
  min-height: 800px;
  width: 200px;
  z-index: 10;
  position: fixed;
  top: 0;
  padding-top: 70px;
  background-color: $admin-light-theme;
  transition: 0.4s;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding-bottom: 60px;
  overflow: hidden;
  &.collapse {
    width: 50px;
    .row, .sub-row {
      &.selected {
        background-color: $admin-highlight;
      }
    }
    .sub-menu {
      .sub-row {
        &.selected {
          background-color: $admin-highlight;
        }
      }
    }
  }
  .row, .sub-row {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    /* justify-content: space-around; */
    align-items: center;
    cursor: pointer;
    transition: 0.1s;
    font-weight: 600;
    .icon {
      width: 40px;
      margin: 0 15px;
    }
    .text {
      width: 100px;
      text-align: left;
    }
    &:hover {
      color: $blue;
      background-color: $admin-highlight;
    }
    &.selected {
      /* background-color: $admin-highlight; */
      color: $blue;
    }

    .el-icon {
      color: #fff;
      font-size: 20px;
    }
    .fold-icon {
      .el-icon {
        color: #fff;
        font-size: 15px;
      }
    }
  }
  .sub-menu {
    height: 50px;
    overflow: hidden;
    transition: 0.3s;
    &.unfold {
      height: 200px;
    }
    .el-icon {
      transition: 0.3s;
      &.arrow-fold {
      transform: rotate(180deg);
      }
    }

    .sub-row {
      font-size: 15px;
      font-weight: 400;
      background-color: $admin-super-light-theme;
      .icon {
        margin-left: 20px;
      }
      &.selected {
        /* background-color: $admin-highlight; */
        color: $blue;
      }
      .text {
        margin-left: 70px;
      }
      .short {
        text-align: center;
        font-size: 12px;
        width: 100%;
        font-weight: 600;
      }
    }
  }
  
  .footer {
    position: absolute;
    bottom: 140px;
    height: 60px;
    line-height: 60px;
    font-size: 14px;
    color: #fff;
    text-align: left;
    padding-left: 10px;
    &.collapse {
      width: 50px;
    }
  }
}
</style>