<template>
  <div class="type-nav">
    <div class="container">
      <!--事件委派-->
      <div @mouseleave="leave" @mouseenter="enterCateList">
        <h2 class="all">全部商品分类</h2>
        <transition>
          <!--三级联动-->
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2" @click="goSearch">
              <!--一级分类-->
              <div
                class="item"
                v-for="(cateOne, index) in categoryList"
                :key="index"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mousemove="changeIndex(index)">
                  <a
                    :data-categoryName="cateOne.categoryName"
                    :data-category1id="cateOne.categoryId"
                  >
                    {{ cateOne.categoryName }}
                  </a>
                </h3>
                <!--二 三级分类-->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(cateTwo, index) in cateOne.categoryChild"
                    :key="index"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="cateTwo.categoryName"
                          :data-category2id="cateTwo.categoryId"
                        >
                          {{ cateTwo.categoryName }}
                        </a>
                      </dt>
                      <dd>
                        <em
                          v-for="(cateThree, index) in cateTwo.categoryChild"
                          :key="index"
                        >
                          <a
                            :data-categoryName="cateThree.categoryName"
                            :data-category3id="cateThree.categoryId"
                          >
                            {{ cateThree.categoryName }}
                          </a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
// 按需引入lodash
import throttle from "lodash/throttle";
export default {
  name: "typeNav",
  data() {
    return {
      currentIndex: -1, //用来存储当前是一级菜单哪个索引
      isShow: true, //控制菜单显示与隐藏
    };
  },
  computed: {
    ...mapState({
      //右侧需要的是一个函数,当使用这个计算属性的时候,右侧函数会立即执行一次
      //注入一个state,其实即为大仓库(管理所有小仓库)的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    //鼠标进入一级菜单修改索引值
    //一级菜单节流操作
    changeIndex: throttle(function (index) {
      this.currentIndex = index;
    }, 50),
    //当鼠标移出时,修改索引
    leave() {
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.isShow = false;
      }
    },
    //路由的跳转
    goSearch(event) {
      //利用事件委派+编程式导航解决
      //事件委派,将所有子节点都委派给了父节点,需要区分出点的是一级、二级、三级
      //获取当前点击的元素
      let element = event.target;
      // 节点有一个属性dataset属性,可以获取节点的自定义属性与属性值
      console.log(element.dataset);
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      // 如果标签身上有categoryname属性,必然是a标签
      if (categoryname) {
        //整理路由参数
        let location = { name: "search" };
        let query = { categoryName: categoryname };
        if (category1id) {
          query.category1id = category1id;
        } else if (category2id) {
          query.category2id = category2id;
        } else {
          query.category3id = category3id;
        }
        // 如果有params参数就带过去
        if (this.$route.params) {
          //整理完参数
          location.query = query;
          location.params = this.$route.params;
          //路由的跳转
          this.$router.push(location);
        }
      }
    },
    enterCateList() {
      this.isShow = true;
    },
  },
  //组件挂载完成,发送请求
  mounted() {
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }
    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }

        .cur {
          background-color: skyblue;
        }
      }
    }

    //过渡动画样式
    //过渡动画开始状态(进入)
    .v-enter {
      height: 0px;
    }
    //定义动画、速率
    .v-enter-active {
      transition: all 0.5s linear;
    }
    //过渡动画结束状态(进入)
    .v-enter-to {
      height: 461px;
    }
  }
}
</style>