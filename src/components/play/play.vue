<template>
  <div class="play">
    <div class="title">
      <div class="cssBack">
        <i class="el-icon-back" @click="back"></i>
      </div>
      <div class="name">
        <p>播放界面</p>
      </div>
      <div class="share">
        <img src="../../../static/image/share2.png">
      </div>
    </div>
    <!--滚动封面-->
    <div class="fm">
      <div>
        <img :src="pSong.pic" class="fm_img" :class="{'fm-imging':getisPlaying}">
      </div>
      <div>
        <img :src="pSong.pic" class="fm-bg">
      </div>
    </div>
    <!--菜单-->
    <div class="footer-title">
      <ul>
        <li>
          <div @click="loveShow()">
            <img :src="loveImage()">
          </div>
        </li>
        <li>
          <div>
            <img src="../../../static/image/download2.png">
          </div>
        </li>
        <li>
          <div>
            <el-badge :value="999" class="item">
              <img src="../../../static/image/comment.png">
            </el-badge>
          </div>
        </li>
        <li>
          <div>
            <img src="../../../static/image/shenglue2.png">
          </div>
        </li>
      </ul>
    </div>
    <!--播放器-->
    <div class="music">
      <div class="music-time">
        <p style="font-size: 15px">{{Math.floor(dTime)}}s</p>
        <el-progress :percentage="com_time()" :show-text="false" class="progressShow"></el-progress>
        <p style="font-size: 15px">{{Math.floor(cTime)}}s</p>
      </div>
      <div class="menu-control">
        <ul>
          <li>
            <div class="img-show">
              <img :src="loopShow()" @click="loopChange()">
            </div>
          </li>
          <li>
            <div class="img-show">
              <img src="../../../static/image/left.png" @click="preShow()">
            </div>
          </li>
          <li>
            <div class="img-show">
              <img v-if="getisPlaying" src="../../../static/image/pause.png" @click="playShow()">
              <img v-else="getisPlaying" src="../../../static/image/radios.png" @click="playShow()">
            </div>
          </li>
          <li>
            <div class="img-show">
              <img src="../../../static/image/right.png" @click="nextShow()" >
            </div>
          </li>
          <li>
            <div class="img-show">
              <img src="../../../static/image/hide.png" @click="hideShow()">
            </div>
          </li>
        </ul>
      </div>
      <audio ref="audio"  :src="pSong.url" @ended="endShow"></audio>
    </div>

    <transition
      name="fade">
      <div class="popover" v-if="proShow" ref="popover">
        <div>
          <ul>
            <li class="popover-li">
              <p>总共{{listSongs.length}}首</p>
              <div class="p-li-img">
                <img src="../../../static/image/hide-shou.png" @click="hideShow()">
              </div>
            </li>
            <li v-for="(item,index) in listSongs"  @click="selectSong(index)">
              <strong><p>{{item.title}}-<span>{{item.author}}</span></p></strong>
              <div class="p-li-img" @click.stop="delectSong(index)">
                <img src="../../../static/image/error.png">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>

<script type="text/ecmascript-6">
  import store from '../../vuex/store'
  import router from '../../router/index'
  import BScroll from 'better-scroll';
  var time;
  export default{
    data(){
      return{
        pSong:[],
        listSongs:[],
        sLrc:[],
        cTime:null,//总时间
        dTime:null,//当前播放时间
        timeShow:false,//开始计算时间
        love:false,//收藏
        loopState:'1',
        proShow:false,
        songMsg:[]
      }
    },
    created(){
       this.init();
    },
    updated(){//dom变化 数据更新 都会调用一次
    },
    methods:{
      init(){
        store.state.header_show=false;
        store.state.footer_show = false;
        //获取歌曲信息
        this.$nextTick(()=>{
          if(store.state.playSong.id){
            store.getters.getUrl;
            store.getters.getLrc;
            this.listSongs = store.getters.getListSongs;
          }
        });
        if(store.state.playSong.id){
          this.pSong = store.state.playSong;
        }
      },
      _initScroll(){
        let scroll = new BScroll(this.$refs.popover,{
          click: true
        });
      },
      back(){
        if(!store.state.isPlaying){
        }
        clearInterval(time);
        this.$router.history.go(-1)
      },
      playShow(){//播放
        const audio = this.$refs.audio;
        if(!store.state.isPlaying){
          audio.play();
          store.state.isPlaying = true;
          this.cTime = audio.duration;

          if(store.state.playId===this.pSong.id){
            this.dTime = audio.currentTime = this.getPlayTime;
          }else{
            this.dTime = audio.currentTime
          }
          //要不断的获取当前播放的时间进度
          this.startTime();
        }else{
          audio.pause();
          store.state.isPlaying=false;
          //停止 删除不断的获取当前播放的时间进度
          this.startTime();
        }
      },
      pauseShow(){//暂停
        const audio = this.$refs.audio;
        if(store.state.isPlaying){
          audio.pause();
          store.state.isPlaying=false;
          this.startTime();
        }
      },
      endShow(){
        console.log("播放结束 自动播放下一首了");
        this.nextShow();
      },
      preShow(){//上一首
        const index = store.getters.getSongIndex(this.pSong.id);
        store.commit("preSong",index);
        this.init();

      },
      nextShow(){//下一首
        const index = store.getters.getSongIndex(this.pSong.id);
        store.commit("nextSong",index);
        this.init();
      },
      com_time(){//计算时间
        if(this.cTime>0){
          return this.dTime/this.cTime * 100
        }
        return 0;
      },
      getSecond(){//不断刷新当前播放时间
        console.log("不断刷新当前播放时间");
        const audio = this.$refs.audio;
        this.dTime = audio.currentTime;
      },
      startTime(){//开始计算时间 //暂停计算时间
        if(store.state.isPlaying){
          time = setInterval(this.getSecond,500);
        }else{
          store.state.playTime = this.dTime;
          clearInterval(time);//删除循环
        }
        //记录当前播放歌曲的ID 等下进行对比是否是同一首歌
        store.state.playId = this.pSong.id;
      },
      loveShow(){//收藏歌曲
        this.love = !this.love
      },
      loveImage(){
        if(this.love){
          return "../../../static/image/love-full.png"
        }
        return "../../../static/image/love.png"
      },
      loopChange(){
        switch(this.loopState){
          case "1":
            this.loopState = "2";
            break;
          case "2":
            this.loopState = "3";
            break;
          case "3":
            this.loopState = "1";
            break;
          default:
            break;
        }
      },
      loopShow(){
        switch (this.loopState){
          case "1":
            return "../../../static/image/loop.png";
            break;
          case "2":
            return "../../../static/image/loop2.png";
            break;
          case "3":
            return "../../../static/image/loop3.png";
            break;
          default:
            break;
        }
      },
      hideShow(){//播放单
          this.proShow = !this.proShow;
          if(this.proShow){
            this.$nextTick(()=>{
              this._initScroll();
            })
          }
      },
      selectSong(index){//选歌
          store.commit("selectSong",index);
          this.init();
      },
      delectSong(index){
          store.commit("delectSong",index)
      }
    },
    computed:{
        getisPlaying(){
            return store.state.isPlaying
        },
        getPlayTime(){
           return store.state.playTime
        }
    },
    components: {

    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .play
    background-color black
    opacity 0.9
    .title
      height 60px
      line-height 30px
      background-color black
      color: #ffffff
      display flex
      justify-content:space-between
      border-bottom 1px solid #f3f3f3
      .cssBack
        line-height 60px
        font-size  20px
        margin-right 5px
      .name
        line-height 60px
       p
        font-size 15px;
      .share
        line-height 60px
    .fm
      position relative
      width 100%
      height 480px
      text-align center
      z-index -10
      color: #ffffff
      opacity 1
      .fm_img
        margin-top 100px
        border-radius 180px
        background-size 100%
        width 300px
        height 300px
      .fm-bg
        height 100%
        width 100%
        z-index -10
        position absolute
        top 0
        left 0
        filter blur(3px)
      .fm-imging
        animation playShow2 30s linear infinite
    .music
      background-color black
      color: #ffffff
      .music-time
        display flex
        line-height 20px
        margin 10px 0
      .progressShow
        margin 0 auto
        margin-top 10px;
        width 80%
    .footer-title
      background-color black
      color: #ffffff
      ul
        display flex
        li
          flex 1;
          width 50px;
          text-align center
          list-style none
          img
            width 25px;
            height 30px;
    .menu-control
      background-color black
      color: #ffffff
      ul
        display: flex
        li
          flex 1
          list-style:none;
          text-align center
          .img-show
            margin-top 15px;
            img
              width 25px;
              height 20px;
          &:nth-child(3) img
            margin-top -15px;
            width 50px;
            height 50px;
    .popover
      position: absolute;
      bottom: 0;
      background-color #ffffff
      height: 300px;
      width: 100%;
      border-radius 25px 25px 0 0
      overflow hidden
      ul
        li
          padding  10px 0;
          border-bottom 1px solid #dadada
          position relative
          .p-li-img
            position absolute
            right 10px;
            top 10px
          p
            margin-left 5px
            font-size 15px
            color: #000000
            span
              font-size 12px;
              color: #99a9bf
  @keyframes playShow2{
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }

  .fade-enter-active{
    animation fadeShow-leave 1s
  }

  .fade-leave-active{
    animation fadeShow-enter 1s
  }

  @keyframes fadeShow-enter{
    0%{
      transform translate(0,0)
    }
    100%{
      transform translate(0,302px)
    }
  }

  @keyframes fadeShow-leave{
    0%{
      transform translate3d(0,302px,0)
    }
    100%{
      transform translate3d(0,0,0)
    }
  }

</style>
