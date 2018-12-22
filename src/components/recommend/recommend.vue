<template>
  <div class="recommend"  ref="page_2">
    <div>
      <!--滑动广告-->
      <div class="block swiper">
        <el-carousel trigger="click" height="150px">
          <el-carousel-item v-for="item in gg_list" :key="item.id">
            <img :src="item.path" class="b_img">
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="swiper_bg"></div>
      <!--榜单-->
      <div class="menu">
        <ul>
          <li>
            <div>
              <img src="../../../static/image/fm.png">
            </div>
            <span>私人FM</span>
          </li>
          <li @click="menu_click">
            <div>
              <img src="../../../static/image/redays.png">
            </div>
            <span>每日推荐</span>
          </li>
          <li>
            <div>
              <img src="../../../static/image/gedan.png">
            </div>
            <span>歌单</span>
          </li>
          <li>
            <div>
              <img src="../../../static/image/phb.png">
            </div>
            <span>排行榜</span>
          </li>
        </ul>

      </div>
      <!--推荐歌单-->
      <div class="bangdan">
        <h4>推荐榜单<i class="el-icon-arrow-right"></i></h4>
        <ul>
          <li v-for="item in re_list">
            <div>
              <img class="fengmian" :src="item.picUrl">
            </div>
            <p class="play-count"><img src="../../../static/image/ear.png" class="earSize">{{item.playCount}}</p>
            <p class="text">{{item.name}}</p>
          </li>
        </ul>
        <div class="clearfloat"></div>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import store from "../../vuex/store"
  import router from '../../router/index'
  import header from '../header/header.vue'
  import BScroll from 'better-scroll';
  export default{
    data(){
          return{
            re_list:[],
            gg_list:[
              {
                id:'0',
                path:'../../../static/image/gg.jpg'
              },
              {
                id:'1',
                path:'../../../static/image/gg2.jpg'
              },
              {
                id:'2',
                path:'../../../static/image/gg3.jpg'
              },
            ],
          }
      },
    created(){
      //展示头部
      this.init();

      //滑动
      this.$nextTick(()=> {
        this._initScroll();
      });

      //获取数据
      this.$nextTick(()=>{
        this.getMusicData();
      });
    },
    methods:{
      getMusicData(){//获取推荐榜单
          const that = this;
          this.axios.get("/api/personalized/").then(response =>{
              that.re_list = response.data.result;
              store.state.re_list = that.re_list;
          });
      },
      menu_click(){//点击菜单
        this.$router.push({path:"days"})
      },
      init(){
        store.state.header_show=true;
      },
      _initScroll(){
        let scroll = new BScroll(this.$refs.page_2, {
          click: true
        });
      },
    },
    component:{
      'v-header':header
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .recommend
    position absolute
    margin-top 100px
    height 600px
    z-index -100
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 200px;
      margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
    .swiper_bg
      position: absolute;
      background-color: #d44439;
      width:100%;
      height:100px;
      top: 0
      z-index -100
    .swiper
      margin 0 10px 10px 10px;
      .b_img
        width 100%
        height 100%
    .menu
      background-color #ffffff
      border-bottom 1px solid #f3f3f3
      height 50px
      ul
        display: flex;
        li
          flex 1
          text-align center
          float left
          list-style none
          img
            background-color #d44439
            text-align center
            border-radius 90px
          span
            color: black
            font-size 10px
    .bangdan
      margin-top 5px
      ul
        li
          position relative
          margin-top 15px
          width 120px
          float left
          list-style none
          margin-left 5px
          .fengmian
            width 116px
            height 116px
          .play-count
            position absolute
            top 0;
            right 5px;
            font-size 10px;
            color #ffffff
          .earSize
            width 15px;
            height:15px;
          .text
            font-size 10px
            height 30px
            word-wrap:break-word;
            word-break:break-all;
            overflow: hidden;
      .clearfloat
        clear:both;
        height:0;
        font-size: 1px
    .el-carousel__item h3 {
      color: #475669;
      font-size: 14px;
      opacity: 0.75;
      line-height: 150px;
      margin: 0;
    }
    .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
    }
    .el-carousel__item:nth-child(2n+1) {
      background-color: #d3dce6;
    }
</style>
