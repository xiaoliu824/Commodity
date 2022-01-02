<template>
  <div class="swiper-container" ref="myfloor">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(cur, index) in list" :key="cur.id">
        <img :src="cur.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
// 引入Swiper
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ['list'],
  watch: {
    list: {
      immediate: true, //初始化执行，
      // 现在通过watch监听banner属性 属性值的变化
        // 如果执行handler方法,代表组件实例上已经有数据了
        // 当前这个函数执行: 只能保证banners数据有了，无法保证v-for遍历结构
        // 遍历结束后,结构才完整
      handler() {
        this.$nextTick(() => {
          // eslint-disable-next-line no-unused-vars
          var mySwiper = new Swiper(this.$refs.myfloor, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
              // 点击小球时切换图片
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};
</script>

<style>
</style>