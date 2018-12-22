<template>
  <div class="animationShow">
    <div>
      <button @click="first()">transition过度</button>
      <transition name="first">
        <p v-if="firstShow">transition过度</p>
      </transition>
    </div>

    <br>
    <br>
    <div :class="[isShowing ? blurClass : '', bkClass]">
        <h3>Let's trigger this here modal! 基于状态的Css3过度效果</h3>
        <button @click="toggleShow">
          <span v-if="isShowing">Hide Child</span>
          <span v-else>Show Child</span>
        </button>
    </div>

    <br>
    <br>

    <div>
      <button @click="second()">动画</button>
        <p v-if="isShowing" class="cssAnimation">动画</p>
    </div>



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
            <img src="../../../static/image/comment.png">
          </div>
        </li>
        <li>
          <div>
            <img src="../../../static/image/shenglue2.png">
          </div>
        </li>
      </ul>
    </div>

    <div class="music">
      <div style="display: flex; line-height: 20px;">
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
              <img v-if="isPlaying" src="../../../static/image/pause.png" @click="playShow()">
              <img v-else="isPlaying" src="../../../static/image/radios.png" @click="playShow()">
            </div>
          </li>
          <li>
            <div class="img-show">
              <img src="../../../static/image/right.png" @click="nextShow()" >
            </div>

          </li>
          <li>
            <div class="img-show">
              <img src="../../../static/image/hide.png">
            </div>
          </li>
        </ul>
      </div>


      <audio ref="audio"  :src="songs[num].url" controls="controls" @ended="endShow"></audio>
    </div>


  </div>
</template>

<script type="text/ecmascript-6">
  var time;
  export default{
      data(){
          return{
            firstShow:true,
            secondShow:true,
            isShowing:false,
            bkClass:'bk',
            blurClass:'blur',
            isPlaying:false,
            songs:[
              {
                url:'../../../static/music/1.mp3'
              },
              {
                url:'../../../static/music/2.mp3'
              },
              {
                url:'../../../static/music/3.mp3'
              }
            ],
            num:'0',
            cTime:null,//总时间
            dTime:null,//当前播放时间
            timeShow:false,//开始计算时间
            love:false,//收藏
            loopState:'1'
          }
      },
      created(){

      },
      computed:{

      },
      methods:{
        first(){
          this.firstShow = !this.firstShow;
        },
        second(){
          this.isShowing = !this.isShowing;
        },
        toggleShow(){
            this.isShowing = !this.isShowing;
        },
        playShow(){//播放
          const audio = this.$refs.audio;
          if(!this.isPlaying){
            audio.play();
            this.isPlaying = true;
            this.cTime = audio.duration;
            this.dTime = audio.currentTime;
            //要不断的获取当前播放的时间进度
            this.startTime();
          }else{
            audio.pause();
            this.isPlaying=false;
            //停止要不断的获取当前播放的时间进度
            this.startTime();
          }
        },
        pauseShow(){//暂停
          const audio = this.$refs.audio;
          if(this.isPlaying){
            audio.pause();
            this.isPlaying=false;
            this.startTime();
          }
        },
        endShow(){
          console.log("播放结束 自动播放下一首了");
          this.nextShow();
        },
        preShow(){
          console.log("上一首");
          if(this.num){
            if(time){
              clearInterval(time);
              this.timeShow=false;
            }
            this.num--;
          }else{
            alert("这是第一首")
          }
        },
        nextShow(){
          console.log("下一首" + this.songs.length);
          if(this.num<this.songs.length-1){
            if(time){
              clearInterval(time);
              this.timeShow=false;
            }
            this.num++;
          }else{
            alert("这是最后一首了")
          }
        },
        com_time(){//计算时间
          if(this.cTime>0){
            return this.dTime/this.cTime * 100
          }
          return 0;
        },
        getSecond(){//不断刷新当前播放时间
          const audio = this.$refs.audio;
          this.dTime = audio.currentTime;
        },
        startTime(){//开始计算时间 //暂停计算时间
          if(!this.timeShow){
            time = setInterval(this.getSecond,100);
            this.timeShow=true;
          }else{
            clearInterval(time);//删除循环
            this.timeShow=false;
          }
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
        }
      },
      watch:{
        dTime(val,oval){
          console.log(val + "---"+ oval);
        }
      }
  }
</script>


<style lang="stylus" rel="stylesheet/stylus" type="text/stylus">

  /*过度效果*/
  .first-enter-active,.first-leave-active{//过度效果 可以复用
    transition opacity 0.25s ease-out
  }
  .first-enter,.first-leave-to{//这是动画的初始和结束位置
    opacity 0
  }

 /*   css3过度效果*/
  .bk{
    transition all 0.1s ease-out
  }
  .blur{
    filter:blur(2px)
    opacity 0.4
  }

 /* 动画效果*/
  .second-enter-active,.second-leave-active{
    /*animation bouncein 3s ease-out*/ //过度加动画
  }

  .cssAnimation{//直接在class中设置动画
    animation:bouncein 2s linear 1s infinite
  }

  @keyframes bouncein{
    0%{
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
  .music
    .progressShow
      margin 0 auto
      margin-top 10px;
      width 80%
  .footer-title
    background-color #99a9bf
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
    background-color: #99a9bf
    ul
      display: flex
      li
        flex 1
        list-style:none;
        text-align center
        .img-show
          margin-top 15px;
          img
            width 30px;
            height 25px;
        &:nth-child(3) img
          margin-top -15px;
          width 50px;
          height 50px;
</style>
