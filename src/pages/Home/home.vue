<template>
  <div>
    <typeNav />
    <List />
    <Commend />
    <Rank />
    <Like />
    <Floor />
    <Floor />
    <Brand />
  </div>
</template>

<script>
import List from '@/pages/Home/List/List'
import Commend from '@/pages/Home/Recommend/recommend'
import Rank from '@/pages/Home/Rank/rank'
import Like from '@/pages/Home/Like/like'
import Floor from '@/pages/Home/Floor/Floor'
import Brand from '@/pages/Home/Brand/brand'
export default {
  components: {
    List,
    Commend,
    Rank,
    Like,
    Floor,
    Brand
  }
}
</script>

<style>

</style>