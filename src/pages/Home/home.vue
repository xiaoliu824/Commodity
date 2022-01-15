<template>
  <div>
    <typeNav />
    <List />
    <Commend />
    <Rank />
    <Like />
    <Floor v-for="(floor, index) in FList" :key="floor.id" :listdata="floor" />
    <Brand />
  </div>
</template>

<script>
import { mapState } from "vuex";
import List from "@/pages/Home/List/List";
import Commend from "@/pages/Home/Recommend/recommend";
import Rank from "@/pages/Home/Rank/rank";
import Like from "@/pages/Home/Like/like";
import Floor from "@/pages/Home/Floor/Floor";
import Brand from "@/pages/Home/Brand/brand";
export default {
  components: {
    List,
    Commend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState({
      FList: (state) => state.home.FloorList,
    }),
  },
  mounted() {
    // 派发请求，得到数据
    this.$store.dispatch("getfloorList");
    this.$store.dispatch("GetUserInfos");
  },
};
</script>

<style>
</style>