<template>
  <div class="t-image-uploader">
    <div v-for="(img, index) of imgList" :key="index" class="preview">
      <img v-if="index < maxImages" :src="img" alt="preview" />
    </div>
    <div class="add" @click="onClickInput">  
      <input type="file" ref="imgInput" accept="image/jpeg, image/jpg, image/png" class="img-input" :multiple="multipleImages" @change="onImgChange" />
      <el-icon>
        <plus class="plus-icon"  />
      </el-icon>
    </div>
  </div>
</template>

<script>
import { Plus } from '@element-plus/icons'

export default {
  props: {
    multipleImages: {
      type: Boolean,
      default: false,
    },
    maxImages: {
      type: Number,
      default: 3,
    },
  },
  components: {
    Plus,
  },
  data () {
    return {
      imgList: [],
      imgSrc: '',
    }
  },
  methods: {
    async onImgChange (e) {
      const files = e.target.files
      const that = this
      const res = []
      this.imgList = []
      for (let i = 0; i < files.length && i < this.maxImages; i++) {
        const file = files[i]
        const reader = new FileReader()
        reader.onload = function (e) {
          const dataUrl = e.target.result
          res.push(dataUrl)
          that.imgList.push(dataUrl)
        }
        await reader.readAsDataURL(file)
      }
      this.$emit('submitImgSrc', this.imgList)
    },
    onClickInput (e) {
      const i = this.$refs['imgInput']
      i.click()
    },
  },
}
</script>

<style lang="scss" scoped>
.t-image-uploader {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  .preview {
    display: flex;
    img {
      width: 100px;
      height: 100px;
      border-radius: 10px;
      display: inline-block;
      margin-right: 10px;
    }
  }
  .add {
    width: 100px;
    height: 100px;
    border: 1px dashed #d9d9d9;
    border-radius: 10px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover {
      border: 1px dashed $blue;
    }
    
    .img-input {
      width: 80px;
      height: 80px;
      position: absolute;
      visibility: hidden;
    }
    .el-icon {
      display: block;
      svg {
        width: 40px;
        height: 40px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }
  }
}
</style>