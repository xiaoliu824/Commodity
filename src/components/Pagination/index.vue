<template>
  <div class="pagination">
    <!-- 上 -->
    <button :disabled="pageNO == 1"
     @click="$emit('getPage',pageNO - 1)"
    >
      上一页
    </button>
    <button v-if="startEndNUm.start > 1"
      @click="$emit('getPage',1)"
      :class="{active: pageNO == 1}"
    >1</button>
    <button v-if="startEndNUm.start > 2">...</button>

    <!--中-->
    <button
      v-for="(page, index) in startEndNUm.end"
      :key="index"
      v-if="page >= startEndNUm.start"
      @click="$emit('getPage',page)"
      :class="{active: pageNO == page}"
    >
      {{ page }}
    </button>

    <!--下 -->
    <button v-if="startEndNUm.end < totalPage - 1 ">...</button>
    <button v-if="startEndNUm.end < totalPage"
     @click="$emit('getPage',totalPage)"
     :class="{active: pageNO == totalPage}"
    >{{totalPage}}</button>
    <button :disabled="pageNO == totalPage"
     @click="$emit('getPage',pageNO + 1)"
    >
      下一页
    </button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ['pageNO','pageSize','total','severalnum'],
  computed: {
    // 计算总共多少页
    totalPage() {
      return Math.ceil(this.total / this.pageSize)
    },
    //计算出连续的页码的起始数字与结束数字[连续页码的数字:至少是5]
    startEndNUm() {
      const { pageNO,totalPage,severalnum } = this
      //先定义两个变量存储起始数字与结束数字
      let start =0,end = 0;
      //连续页码数字5【就是至少五页】，如果出现不正常的现象【就是不够五页】
      //不正常现象【总页数没有连续页码多】
      if(severalnum > totalPage ) {
        start = 1;
        end = totalPage;
      } else {
        //正常现象【连续页码5，但是你的总页数一定是大于5的】
        // 如果当前页数为8 开始为6 结束为10 6 7 8 9 10
        // 开始数字
        start = pageNO - parseInt(severalnum / 2);
        
        // 结束数字
        end = pageNO + parseInt(severalnum / 2);
        //把出现不正常的现象【start数字出现0|负数】纠正
        if(start < 1) {
          start = 1;
          end = severalnum;
        }
        //把出现不正常的现象[end数字大于总页码]纠正
        if(end > totalPage) {
          start = totalPage - severalnum + 1;
          end = totalPage;
        }
      }
      return { start, end };
    }
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center !important;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active{
  background: skyblue;
}
</style>
