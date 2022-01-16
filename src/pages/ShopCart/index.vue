<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}.00</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('subtra', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              minnum="1"
              class="itxt"
              :value="cart.skuNum"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuNum * cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="delGood(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllchecked && cartInfoList.length > 0"
         @change="updateAll"
       />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" href="###" target="_blank">结算</a> -->
          <router-link class="sum-btn" to='/trade'>结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    // 拉取数据
    getData() {
      // 获取个人购物车数据
      this.$store.dispatch("reqGetShopList");
    },
    // 修改产品数量(节流)
    handler: throttle(async function (type, disNum, cart) {
      //type:为了区分这三个元素
      //disNum形参:+ 变化量（1）  -变化量（-1）   input最终的个数（并不是变化量）
      //cart:哪一个产品【身上有id】
      //向服务器发请求，修改数量
      switch (type) {
        //加号
        case "add":
          disNum = 1;
          break;
        case "minus":
          //判断产品的个数大于1，才可以传递给服务器-1
          //如果出现产品的个数小于等于1，传递给服务器个数0（原封不动）
          disNum = cart.skuNum > 1 ? -1 : 0;
          break;
        case "change":
          // //用户输入进来的最终量，如果非法的（带有汉字|出现负数），带给服务器数字零
          if (isNaN(disNum) || disNum < 1) {
            disNum = 0;
          } else {
            //属于正常情况（小数：取证），带给服务器变化的量 用户输入进来的 - 产品的起始个数
            disNum = parseInt(disNum) - cart.skuNum;
          }
          // disNum = (isNaN(disNum)||disNum<1)?0:parseInt(disNum) - cart.skuNum;
          break;
      }
      //派发action
      try {
        //代表的是修改成功
        await this.$store.dispatch("addShopCar", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        //再一次获取服务器最新的数据进行展示
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    }, 500),
    // 修改某一个选中的状态
    async updateChecked(cart, event) {
      try {
        //带给服务器的参数isChecked，不是布尔值，应该是0|1
        // 是否选中
        let IsCheck = event.target.checked ? "1" : "0";
        await this.$store.dispatch("CartStatus", {
          skuID: cart.skuId,
          isChecked: IsCheck,
        });
        // 拉取数据
        this.getData()
      } catch (e) {
        alert(e.message);
      }
    },
    // 删除单个商品
    async delGood(cart) {
      try {
        await this.$store.dispatch('delCart',cart.skuId)
        this.getData()
      } catch (error) {
        alert(error.message) 
      }
    },
    // 删除所有选中的产品
    async deleteAll() {
      try {
        await this.$store.dispatch('delAllchecked')
        // 拉取数据
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改所有商品的状态
    async updateAll(event) {
      try {
        // 是否选中
      let isChecked = event.target.checked ? '1' : '0'
      await this.$store.dispatch('updateAllStatus',isChecked)
      // 拉取数据
      this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters(["cartlist"]),
    // 购物车数据
    cartInfoList() {
      return this.cartlist.cartInfoList || [];
    },
    // 是否全部选中
    isAllchecked() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
    // 计算总价
    totalPrice() {
      let result = this.cartInfoList.reduce(function (prev, next) {
        return prev + next.cartPrice * next.skuNum;
      }, 0);
      return result;
    },
  },
};
</script>


<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;
  text-align: left;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
