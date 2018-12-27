<template>
  <div>
    <div class="goods">
      <div class="menu-wrapper">
        <ul ref="leftUI">
          <li class="menu-item" v-for="(good,index) in goods":key="index"  :class="{current: currentIndex === index}"  @click="clickItem(index)">
            <span class="text bottom-border-1px">
               <img class="icon" :src="good.icon" v-if="good.icon">
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>

      <div class="foods-wrapper">
        <ul ref="rightUI">
          <li class="food-list-hook" v-for="(good,index) in goods" :key="index" >
            <h1 class="title">{{good.name}}</h1>
            <ul>
              <li class="food-item bottom-border-1px" v-for="(food,index) in good.foods" :key="index" @click="isShow(food)">
                <div class="icon">
                  <img width="57" height="57" :src="food.image">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}份</span>
                    <span>好评率{{food.rating}}%</span></div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                  </div>
                  <div class="cartcontrol-wrapper">
                    <CartControl :food="food"/>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      <ShopCart/>
    </div>
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import  BScroll from 'better-scroll';
  import Food from '../../../components/Food/Food';
  import ShopCart from '../../../components/ShopCart/ShopCart'
  export default {
    name: 'ShopGoods',
    data(){
      return {
        scrollY: 0, // 右侧列表滑动的Y轴坐标  ==> 右侧滑动过程中不断改变
        tops: [], // 右侧所有分类li的距离顶部的值  ==> 在列表第一次显示之后统计一次就可以(后面就不变了)
        food: {},
      }
    },
    computed: {
      ...mapState({
        goods: state => state.shop.goods,
      }),
      //获取当前分类的下标
      currentIndex(){
        //获取到状态
        const {scrollY,tops} = this
        //找到满足条件的下标返回，与class里面的index比较。
         const index = tops.findIndex((top,index) =>{
          // scrollY在[top, nextTop)区间内
          return scrollY >= top && scrollY<tops[index+1];
        })
        if (index != this.index && this.leftScroll){
        //  保存新的index
          this.index = index
          // 当currentIndex发生改变时,将左侧列表进行编码滑动(尽量让当前分类滑动到最上面)
          const li = this.$refs.leftUI.children[index];
          this.leftScroll.scrollToElement(li,300)
        }
        return index;
      }
    },

    mounted() {
      //为了兼容老版本
      //新版本new BScroll(".menu-wrapper");
      this.$store.dispatch('getGoods',()=>{
       this.$nextTick(()=>{
         this._BScrollInit();
         this._initTops();
       })
      })
    },
    methods:{
      _BScrollInit(){
        this.leftScroll = new BScroll(".menu-wrapper",{
          click:true
        });
        this.rightScroll = new BScroll(".foods-wrapper",{
          click:true,
          probeType: 1, // 非实时(每隔一定时间才) ,触摸
        });
        //绑定右侧滑动的时间监听。
        this.rightScroll.on('scroll',(x,y)=>{
        //  更新状态
          this.scrollY = Math.abs(y)
        })
        // 监视右侧列表滑动结束的时间监听
        this.rightScroll.on('scrollEnd', ({x, y}) => {
          this.scrollY = Math.abs(y)
        })
      },
      //收集每一个li的高度,存储在tops里面。
      _initTops(){
        const tops = [];
        let top = 0;
        tops.push(top);
        const lis = this.$refs.rightUI.children;
        //将伪数组转换成真数组
        Array.prototype.slice.call(lis).forEach(li =>{
          top += li.clientHeight;
          tops.push(top);
        })
      //  更新状态
        this.tops = tops;
      },
    //  点击了某个分类项
      clickItem(index){
        const y = -this.tops[index]
        //立即更新目标坐标，保存到scroll
        this.scrollY = Math.abs(y);
        // 让右侧列表滑动到对应位置
        this.rightScroll.scrollTo(0,y,300)
      },
      isShow(food){
        //更新food
        this.food = food;
        this.$refs.food.toggleShow();
      }
    },
    components: {
      Food,
      ShopCart
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../../common/stylus/mixins.styl"

  .goods
    display: flex
    position: absolute
    top: 225px
    bottom: 46px
    width: 100%
    background: #fff;
    overflow: hidden
    .menu-wrapper
      flex: 0 0 80px
      width: 80px
      background: #f3f5f7
      .menu-item
        display: table
        height: 54px
        width: 56px
        padding: 0 12px
        line-height: 14px
        &.current
          position: relative
          z-index: 10
          margin-top: -1px
          background: #fff
          color: $green
          font-weight: 700
          .text
            border-none()
        .icon
          display: inline-block
          vertical-align: top
          width: 12px
          height: 12px
          margin-right: 2px
          background-size: 12px 12px
          background-repeat: no-repeat
        .text
          display: table-cell
          width: 56px
          vertical-align: middle
          bottom-border-1px(rgba(7, 17, 27, 0.1))
          font-size: 12px
    .foods-wrapper
      flex: 1
      .title
        padding-left: 14px
        height: 26px
        line-height: 26px
        border-left: 2px solid #d9dde1
        font-size: 12px
        color: rgb(147, 153, 159)
        background: #f3f5f7
      .food-item
        display: flex
        margin: 18px
        padding-bottom: 18px
        bottom-border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom: 0
        .icon
          flex: 0 0 57px
          margin-right: 10px
        .content
          flex: 1
          .name
            margin: 2px 0 8px 0
            height: 14px
            line-height: 14px
            font-size: 14px
            color: rgb(7, 17, 27)
          .desc, .extra
            line-height: 10px
            font-size: 10px
            color: rgb(147, 153, 159)
          .desc
            line-height: 12px
            margin-bottom: 8px
          .extra
            .count
              margin-right: 12px
          .price
            font-weight: 700
            line-height: 24px
            .now
              margin-right: 8px
              font-size: 14px
              color: rgb(240, 20, 20)
            .old
              text-decoration: line-through
              font-size: 10px
              color: rgb(147, 153, 159)
          .cartcontrol-wrapper
            position: absolute
            right: 0
            bottom: 12px
</style>
