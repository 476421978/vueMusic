<template>
  <div class="footer" v-if="cShow">
    <div class="footer-left" @click="goPlay()">
      <div class="left-img">
        <img :src="pSong.pic">
      </div>
      <div class="left-text">
        <p>{{pSong.title}}</p>
        <span>横滑可以切换上下首哦</span>
      </div>
    </div>

    <div class="footer-right">
      <el-progress type="circle" :percentage="com_time" class="pp" :show-text="false" :width="40"
        style="position:relative;left: 35px; z-index: 10">
      </el-progress>
      <img v-if="getisPlaying" src="../../../static/image/pause2.png" @click="pauseShow()">
      <img v-else="getisPlaying" src="../../../static/image/radio2.png" @click="playShow()">
      <img src="../../../static/image/hide-2.png">
    </div>

    <audio ref="audio"  :src="pSong.url" @ended="endShow"></audio>
  </div>
</template>

<script type="text/ecmascript-6">
  import store from '../../vuex/store'
  import router from '../../router/index'
  var time;
 export default{
     data(){
       return{
         pSong:[],
         cTime:null,
         dTime:null
       }
     },
     created(){
       this.getSong();
       console.log("footer")
     },
     updated(){
       console.log("footer2")
       /*this.getSong();*/
     },
     mounted(){
       console.log("mounted")
     },
     destroyed(){
       console.log("destroyed")
     },
     methods:{
       goPlay(){
         //跳转到播放界面
         if(time){
           clearInterval(time);
         }
         this.$router.push({path:'play'});
       },
       getSong(){//获取当前播放歌曲
         this.pSong = this.Song;
         if(this.getisPlaying){
           console.log("播放");
           this.playShow();
         }else{
           console.log("暂停");
           /*this.pauseShow();*/
         }
       },
       playShow(){//播放
         const audio = this.$refs.audio;
         audio.play();
         store.state.isPlaying = true;
         this.cTime = audio.duration;
         this.dTime = audio.currentTime = this.getPlayTime;
         //要不断的获取当前播放的时间进度
         this.startTime();
       },
       pauseShow(){
         const audio = this.$refs.audio;
         audio.pause();
         store.state.isPlaying=false;
         //停止要不断的获取当前播放的时间进度
         this.startTime();
       },
       startTime(){//开始计算时间 //暂停计算时间
         if(store.state.isPlaying){
           time = setInterval(this.getSecond,500);
         }else{
           store.state.playTime = this.dTime;
           clearInterval(time);//删除循环
         }
       },
       getSecond(){//不断刷新当前播放时间
         console.log("不断刷新当前播放时间");
         const audio = this.$refs.audio;
         this.dTime = audio.currentTime;
       },
       endShow(){
         console.log("播放结束 自动播放下一首了");
         this.nextShow();
       },
       preShow(){//上一首
         const index = store.getters.getSongIndex(this.pSong.id);
         store.commit("preSong",index);
       },
       nextShow(){//下一首
         const index = store.getters.getSongIndex(this.pSong.id);
         store.commit("nextSong",index);
       },
     },
     computed:{
         cShow(){//显示/隐藏
             return store.state.footer_show
         },
         Song(){//当前播放的歌曲
             return store.state.playSong
         },
         getPlayTime(){//获取歌曲播放的时间段
             return store.state.playTime
         },
         getisPlaying(){//播放状态
            return store.state.isPlaying
          },
         com_time(){//计算时间
           if(this.cTime>0){
             return this.dTime/this.cTime * 100
           }
          return 0;
         },
     },
     watch:{
       getisPlaying(val){
         console.log("监听播放状态");
       }
     }
 }
</script>

<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">
  .footer
    position absolute
    display flex
    bottom 0
    height 50px
    width 100%
    background-color #ffffff
    .footer-left
      flex-grow 1
      display flex
      .left-img img
        width 50px;
        height:50px;
      .left-text
        margin-left 5px
        span
          font-size 12px;
          color #99a9bf
    .footer-right
      display flex
      margin-right 10px
      align-items center
      img
        z-index 20
        padding-right 10px
        width 30px;
        height 30px;


</style>
