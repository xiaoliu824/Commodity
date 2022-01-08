<template>
  <div class="swiper-container" ref="swicur">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(slide, index) in skuImageList"
        :key="slide.id"
        @click="changeCurrentIndex(index)"
      >
        <img :src="slide.imgUrl" :class="{ active: currentIndex == index }" />
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "ImageList",
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: ["skuImageList"],
  watch: {
    //监听数据:可以保证数据一定ok，但是不能保证v-for遍历结构是否完事。
    skuImageList: {
      handler() {
        // 保证结构完毕
        this.$nextTick(() => {
          new Swiper(this.$refs.swicur, {
            // 前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            // 显示几个图片设置
            slidesPerView: 3,
            //每一次切换图片个数
            slidesPerGroup: 1,
          });
        });
      },
    },
  },
  methods: {
    // 改变当前索引值
    changeCurrentIndex(index) {
      // 将索引值改变为当前点击项
      this.currentIndex = index
      // 告知兄弟组件当前点击的第几个
      this.$bus.$emit('getIndex',this.currentIndex)
    }
  }
};
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>
