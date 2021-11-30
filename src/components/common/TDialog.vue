<template>
  <el-dialog
      v-model="dialogVisible"
      :title="title"
      :width="width"
      :height="height"
      class="t-dialog"
    >
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button v-if="showCancel" @click="setHidden">{{ cancelText }}</el-button>
          <el-button v-if="showConfirm" type="primary" @click="submitEvent('onConfirm')"
            >{{ confirmText }}</el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script>
export default {
  props: {
    title: { type: String, default: 'Dialog' },
    height: { type: String, default: '400px' },
    width: { type: String, default: '500px' },
    cancelText: { type: String, default: 'Cancel' },
    confirmText: { type: String, default: 'Confirm' },
    showCancel: { type: Boolean, default: true },
    showConfirm: { type: Boolean, default: true },
  },
  data () {
    return {
      dialogVisible: false,
    }
  },
  computed: {
    computeShowCancel () {
      return this.showCancel
    },
    computeShowConfirm () {
      return this.showConfirm
    },
  },
  methods: {
    setVisible (clearData = false) {
      this.dialogVisible = true
      if (clearData) this.submitEvent('clearData')
    },
    setHidden (clearData = true) {
      this.dialogVisible = false
      if (clearData) this.submitEvent('clearData')
    },
    submitEvent (eventName, ...args) {
      this.$emit(eventName, ...args)
    },
  },
  created () {

  },
}
</script>

<style lang="scss">
.t-dialog {
  overflow: scroll;
}
</style>