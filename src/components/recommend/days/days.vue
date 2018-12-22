<template>
  <div class="days">

    <div class="title">
      <i class="el-icon-back" @click="back"></i>
      <span>每日推荐</span>
    </div>

    <!--歌单-->
    <div class="bd">
      <div class="re_img">
        <img src="../../../../static/image/gg.jpg" style="width: 100%;height: 150px">
      </div>

      <div ref="bdBS" style="height: 500px; overflow: hidden">
        <ul>
          <li class="list-li">
            <img src="../../../../static/image/radio2.png">
            <span>播放全部</span>
          </li>
          <li class="list-li" v-for="(item,index) in songs">
            <div class="list-li-fengmian">
              <img :src="item.album.picUrl" style="width: 50px;height: 50px;">
            </div>
            <div class="list-li-name">
              <p>{{item.name}}</p>
              <p class="list-li-name-sq">{{item.artists[0].name}}-{{item.album.name}}</p>
            </div>
            <div class="list-li-bf">
              <img src="../../../../static/image/radio2.png" @click="playShow(index)">
              <img src="../../../../static/image/shenglue.png">
            </div>
          </li>
        </ul>
      </div>

    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import store from '../../../vuex/store'
  import router from '../../../router/index'
  import BScroll from 'better-scroll';
  export default{
      data(){
        return{
          songs:[],
          songMsg:[],
          sLrc:[]
        }
      },
      created(){
        this.init();
        this.$nextTick(()=>{
          this.getBd();
          this._initScroll();
        });
      },
      methods:{
        init(){
          store.state.header_show=false;
          store.state.footer_show = true;
        },
        back(){
          this.$router.push({path:"recommend"})
        },
        getBd(){//获取榜单
          const that = this;
          this.axios.get('/api/recommend/songs').then(response=> {
              that.songs = response.data.recommend;
              /*console.log(that.songs);*/
              that.addListSongs();
          }).catch(error=> {
            console.log(error);
          });

        },
        addListSongs(){//将歌单的数据整合全部添加到state.listsongs中
          /*for(var i=0;i<this.songs.length;i++){
            const songs={};
            songs.id = this.songs[i].id;
            songs.title = this.songs[i].name;
            songs.author = this.songs[i].artists[0].name;
            songs.pic = this.songs[i].album.blurPicUrl;
            store.commit('addSongs',songs);
          }*/
        },
        playShow(i){
            //先跳转到播放界面 记录当前要播放的歌曲信息
          store.state.playSong.id=this.songs[i].id;
          store.state.playSong.title = this.songs[i].name;
          store.state.playSong.author = this.songs[i].artists[0].name;
          store.state.playSong.pic = this.songs[i].album.blurPicUrl;

          const songs={};
          songs.id = this.songs[i].id;
          songs.title = this.songs[i].name;
          songs.author = this.songs[i].artists[0].name;
          songs.pic = this.songs[i].album.blurPicUrl;
          store.commit('addSongs',songs);

          //根据ID 找到播放地址mp3
          this.$router.push({path:'play'});
        },
        _initScroll(){
          let scroll = new BScroll(this.$refs.bdBS,{
            click: true
          });
        },
      },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .days
    z-index 1000
    width 100%
    height 100%
    .title
      height 30px
      line-height 30px
      background-color #d44439
      color: #ffffff
    .bd
      .list-li
        border-top  1px solid #f2f2f2
        padding 10px
        display flex
        &:first-child
          border-radius 20px 20px 0  0
        &:last-child
          border-bottom 1px solid #f2f2f2
        .list-li-fengmian
          width 50px;
          height 50px
          margin-right 10px
        .list-li-name
          .list-li-name-sq
            font-size 10px
            color #666
        .list-li-bf
          position absolute
          right 10px;
          line-height 70px
</style>
